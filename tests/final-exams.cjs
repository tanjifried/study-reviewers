// Requires Playwright with Chromium installed. An existing installation may be
// selected with PLAYWRIGHT_MODULE=/absolute/path/to/playwright.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const root = path.resolve(__dirname, '../_site');
const errors = [];
const server = http.createServer((req, res) => {
  let file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (!file.startsWith(root + path.sep)) { res.writeHead(404); return res.end(); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  res.setHeader('Content-Type', file.endsWith('.html') ? 'text/html' : file.endsWith('.css') ? 'text/css' : 'text/javascript');
  fs.createReadStream(file).pipe(res);
});
async function fits(page) {
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), 'page overflow');
}
async function slideFinal(page, base, pack) {
  const url = base + pack + '/quiz.html?lesson=final';
  await page.goto(url);
  const max = Number(await page.locator('#final-count').getAttribute('max'));
  for (const invalid of ['0', '1.5', String(max + 1), '']) {
    await page.fill('#final-count', invalid);
    await page.locator('#final-start').click();
    assert(await page.locator('#final-count').count(), 'invalid count started an exam');
  }
  await page.fill('#final-count', '5');
  await page.uncheck('#final-instant');
  await page.locator('#final-start').click();
  assert.equal(await page.evaluate(() => saved.final.ids.length), 5);
  assert.equal(await page.evaluate(() => new Set(saved.final.ids).size), 5);
  const q = await page.evaluate(() => lookup[saved.final.ids[index]]);
  await page.locator(`[data-option="${q.answer}"]`).click();
  assert.equal(await page.locator('.feedback,.option.correct,.option.incorrect,.choice-label').count(), 0, 'feedback leaked');
  assert.equal(await page.evaluate(() => (history.final || []).length), 0);
  await page.locator(`[data-option="${(q.answer + 1) % q.options.length}"]`).click();
  await page.locator(`[data-option="${q.answer}"]`).click();
  assert.equal(await page.evaluate(() => saved.final.answers[saved.final.ids[0]]), q.answer, 'answer cannot be edited');
  await page.locator('.brand').click(); // Remove focus from answer controls.
  const before = await page.evaluate(() => index);
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(() => index), before, 'Enter leaked correctness');
  const attempt = await page.evaluate(() => saved.final.attemptId);
  await page.reload();
  await page.locator('#final-resume').click();
  assert.equal(await page.evaluate(() => saved.final.attemptId), attempt);
  assert.equal(await page.evaluate(() => saved.final.feedback), false);
  assert.equal(await page.locator('.feedback,.option.correct,.option.incorrect,.choice-label').count(), 0);
  await fits(page);
  page.once('dialog', d => d.accept());
  await page.locator('#submit-exam').click();
  assert.equal((await page.locator('.score').textContent()).trim(), '1 / 5');
  assert.equal(await page.evaluate(() => history.final.length), 1);
  await page.locator('#review').click();
  assert(await page.locator('.feedback').count());
  await page.locator('details > summary').click();
  await page.locator('[data-jump="1"]').click();
  assert.match(await page.locator('#feedback').textContent(), /Unanswered/);
  assert.equal(await page.locator('.option:not(:disabled)').count(), 0);
  await page.reload(); await page.locator('#final-resume').click();
  assert.equal(await page.evaluate(() => history.final.length), 1, 'history duplicated');
  await page.locator('#restart').click();
  assert.equal(await page.locator('#final-count').inputValue(), '5');
  await page.fill('#final-count', '1'); await page.check('#final-instant');
  await page.locator('#final-start').click();
  const answer = await page.evaluate(() => lookup[saved.final.ids[0]].answer);
  await page.locator(`[data-option="${answer}"]`).click();
  assert(await page.locator('.feedback').count(), 'instant feedback absent');
  assert.equal(await page.locator('.option:not(:disabled)').count(), 0);
  await page.goto(url); await page.fill('#final-count', String(max)); await page.locator('#final-start').click();
  assert.equal(await page.evaluate(() => new Set(saved.final.ids).size), max);
  // Old attempts have no feedback/count/submitted settings and stay instant.
  await page.evaluate(() => { delete saved.final.feedback; delete saved.final.count; delete saved.final.submitted; persist(); });
  await page.reload(); await page.locator('#final-resume').click();
  const legacyAnswer = await page.evaluate(() => lookup[saved.final.ids[index]].answer);
  await page.locator(`[data-option="${legacyAnswer}"]`).click();
  assert(await page.locator('.feedback').count());
  await page.goto(base + pack + '/quiz.html?lesson=lesson-1');
  const lessonAnswer = await page.evaluate(() => lookup[saved[active].ids[index]].answer);
  await page.locator(`[data-option="${lessonAnswer}"]`).click();
  assert(await page.locator('.feedback').count(), 'lesson feedback changed');
}
async function pythonFinal(page, base) {
  const url = base + 'python/index.html#final';
  await page.goto(url);
  const max = Number(await page.locator('#final-count').getAttribute('max'));
  for (const invalid of ['0', '1.5', String(max + 1), '']) {
    await page.fill('#final-count', invalid); await page.locator('#start').click();
    assert(await page.locator('#final-count').count());
  }
  for (const count of [1, 40, max]) {
    await page.goto(base + 'python/index.html#home'); await page.goto(url);
    await page.fill('#final-count', String(count)); await page.locator('#start').click();
    assert.equal(await page.evaluate(() => run.questions.length), count);
    assert.equal(await page.evaluate(() => new Set(run.questions.map(q => q.id)).size), count);
    if (count >= 6) assert.equal(await page.evaluate(() => new Set(run.questions.map(q => q.area)).size), 6);
    assert.equal(await page.locator('#check').count(), 0);
    await fits(page);
  }
  await page.goto(base + 'python/index.html#home'); await page.goto(url);
  await page.fill('#final-count', '3'); await page.check('#instant'); await page.locator('#start').click();
  const q = await page.evaluate(() => run.questions[0]);
  if (q.parts.length === 1) await page.locator(`input[value="${q.parts[0].answer}"]`).check();
  else for (let i = 0; i < q.parts.length; i++) await page.selectOption('#p' + i, String(q.parts[i].answer));
  await page.locator('#check').click(); assert(await page.locator('.feedback').count());
  await page.locator('#summary').click(); page.once('dialog', d => d.accept()); await page.locator('#submit').click();
  await page.locator('#again').click();
  assert.equal(await page.evaluate(() => run.questions.length), 3);
  assert.equal(await page.evaluate(() => run.instant), true);
}
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}/`;
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of [390, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 850 } });
      const page = await context.newPage(); page.on('pageerror', e => errors.push(e.message));
      for (const pack of ['software-engineering', 'information-security']) await slideFinal(page, base, pack);
      await pythonFinal(page, base);
      await context.close();
    }
    assert.deepEqual(errors, []);
    console.log('Final-exam settings, bounds, sampling, feedback, editing, submission, resume, history, legacy attempts and lesson regression checks passed at 390px and 1440px.');
  } finally { await browser.close(); server.close(); }
})().catch(e => { console.error(e); server.close(); process.exitCode = 1; });
