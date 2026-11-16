const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const root = path.resolve(__dirname, "../_site");
const captures = path.resolve(__dirname, "../.impeccable/review");
const errors = [];
const server = http.createServer((req, res) => {
  let target = path.resolve(
    root,
    "." + new URL(req.url, "http://localhost").pathname,
  );
  if (!target.startsWith(root + path.sep)) {
    res.writeHead(404);
    return res.end();
  }
  if (fs.existsSync(target) && fs.statSync(target).isDirectory())
    target = path.join(target, "index.html");
  if (!fs.existsSync(target)) {
    res.writeHead(404);
    return res.end();
  }
  const types = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".svg": "image/svg+xml",
    ".afjson": "application/json",
  };
  res.setHeader(
    "Content-Type",
    types[path.extname(target)] || "application/octet-stream",
  );
  fs.createReadStream(target).pipe(res);
});
async function fit(page) {
  const problem = await page.evaluate(() =>
    document.documentElement.scrollWidth <= innerWidth + 2
      ? null
      : {
          width: innerWidth,
          scroll: document.documentElement.scrollWidth,
          nodes: [...document.querySelectorAll("main *")]
            .filter((e) => e.getBoundingClientRect().right > innerWidth + 2)
            .map((e) => ({
              tag: e.tagName,
              class: e.className,
              text: e.textContent.slice(0, 90),
              right: e.getBoundingClientRect().right,
            }))
            .slice(0, 15),
        },
  );
  assert(!problem, JSON.stringify({ url: page.url(), problem }));
}
async function saved(page, id = "final") {
  return page.evaluate(
    (id) =>
      JSON.parse(localStorage.getItem("automata-progress-v1")).attempts[id],
    id,
  );
}
(async () => {
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${server.address().port}/automata/`;
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome",
    headless: true,
    args: ["--no-sandbox"],
  });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(base + "index.html");
    assert.equal(await page.locator('a.card[href^="lesson"]').count(), 6);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      for (let n = 1; n <= 6; n++) {
        await page.goto(base + `lesson.html?lesson=lesson-${n}`);
        await fit(page);
        assert.equal(await page.locator("h1").count(), 1);
        assert((await page.locator("section.segment").count()) >= 7);
        assert(
          await page
            .locator("img")
            .evaluateAll((images) =>
              images.every((i) => i.complete && i.naturalWidth > 0),
            ),
          "missing diagram",
        );
        assert(
          await page
            .locator('nav[aria-label="Lesson sections"] a')
            .evaluateAll((links) =>
              links.every(
                (a) =>
                  !!document.getElementById(
                    decodeURIComponent(a.hash.slice(1)),
                  ),
              ),
            ),
          "broken section link",
        );
      }
    }
    fs.mkdirSync(captures, { recursive: true });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(base + "lesson.html?lesson=lesson-4");
    await page.screenshot({
      path: path.join(captures, "desktop.png"),
      fullPage: true,
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({
      path: path.join(captures, "mobile.png"),
      fullPage: true,
    });
    await page.locator("details summary").click();
    await page.getByRole("searchbox").fill("closure");
    assert((await page.locator("details div p").count()) > 0);
    await page.route("https://www.youtube-nocookie.com/**", (r) =>
      r.fulfill({
        status: 200,
        contentType: "text/html",
        body: "<p>Test player</p>",
      }),
    );
    await page.getByRole("button", { name: "Load video here" }).first().click();
    assert(
      (await page.locator("iframe").first().getAttribute("src")).includes(
        "start=41",
      ),
    );
    // All six lesson quizzes expose fifteen questions and source references.
    for (let n = 1; n <= 6; n++) {
      await page.goto(base + `quiz.html?lesson=lesson-${n}`);
      await page
        .getByRole("button", { name: "Start new attempt", exact: true })
        .click();
      assert.equal(await page.locator("fieldset").count(), 15);
      assert.equal(
        await page.getByRole("link", { name: /Review source:/ }).count(),
        15,
      );
      await fit(page);
    }
    await page.goto(base + "quiz.html?lesson=final");
    const count = page.locator("input[type=number]");
    assert.equal(await count.getAttribute("max"), "90");
    for (const value of ["0", "1.5", "91", ""]) {
      await count.fill(value);
      await page
        .getByRole("button", { name: "Start new attempt", exact: true })
        .click();
      assert.equal(
        await page.locator("fieldset").count(),
        0,
        "invalid count started attempt",
      );
    }
    await count.fill("5");
    await page.locator("#instant").uncheck();
    await page
      .getByRole("button", { name: "Start new attempt", exact: true })
      .click();
    let attempt = await saved(page);
    assert.equal(attempt.items.length, 5);
    assert.equal(new Set(attempt.items.map((i) => i.questionId)).size, 5);
    const first = page.locator("fieldset").first();
    await first.locator('input[value="0"]').check();
    await first.locator('input[value="1"]').check();
    assert.equal((await saved(page)).answers[attempt.items[0].questionId], 1);
    assert.equal(await page.locator(".feedback").count(), 0);
    await page.reload();
    await page
      .getByRole("button", { name: "Resume attempt", exact: true })
      .click();
    assert.equal(await page.locator(".feedback").count(), 0);
    assert(
      await page
        .locator("fieldset")
        .first()
        .locator('input[value="1"]')
        .isChecked(),
    );
    const answers = await page.evaluate(() => {
      const s = JSON.parse(localStorage.getItem("automata-progress-v1"))
        .attempts.final;
      return s.items.map(
        (item) =>
          AUTOMATA_DATA.lessons
            .find((l) => l.id === item.lessonId)
            .questions.find((q) => q.id === item.questionId).answer,
      );
    });
    for (let i = 0; i < answers.length; i++)
      await page
        .locator("fieldset")
        .nth(i)
        .locator(`input[value="${answers[i]}"]`)
        .check();
    assert.equal(await page.locator(".feedback").count(), 0);
    await page
      .getByRole("button", { name: "Submit answers", exact: true })
      .click();
    assert.equal(
      (await page.locator("[data-score]").textContent()).trim(),
      "Score: 5 / 5",
    );
    assert.equal(await page.locator(".feedback").count(), 5);
    assert(await page.locator("fieldset input").first().isDisabled());
    await page.reload();
    await page
      .getByRole("button", { name: "Review submitted attempt" })
      .click();
    assert.equal(await page.locator(".feedback").count(), 5);
    // Immediate feedback preserves the selected input and keyboard focus.
    await page.goto(base + "quiz.html?lesson=lesson-2");
    await page.getByRole("button", { name: "Resume attempt" }).click();
    const target = page.locator("fieldset").nth(3).locator('input[value="0"]');
    await target.focus();
    await target.check();
    assert(await target.evaluate((el) => document.activeElement === el));
    assert.equal(await page.locator(".feedback").count(), 1);
    await page
      .getByRole("button", { name: "Submit answers", exact: true })
      .click();
    assert(
      await page
        .getByRole("status")
        .filter({ hasText: "Please answer every question" })
        .count(),
    );
    assert.equal(
      await page
        .locator("fieldset")
        .first()
        .locator("input")
        .first()
        .evaluate((el) => document.activeElement === el),
      true,
    );
    // Both stale bank revisions and malformed saved shapes recover without crashing.
    for (const bad of [
      { items: "bad", answers: {} },
      { items: [null], answers: {}, instant: true, submitted: false },
      {
        items: attempt.items,
        answers: {},
        instant: false,
        submitted: false,
        version: "old",
      },
    ]) {
      await page.evaluate(
        (bad) =>
          localStorage.setItem(
            "automata-progress-v1",
            JSON.stringify({ attempts: { final: bad } }),
          ),
        bad,
      );
      await page.goto(base + "quiz.html?lesson=final");
      assert(
        await page
          .getByRole("status")
          .filter({ hasText: "saved attempt is invalid" })
          .count(),
      );
    }
    await page.evaluate(() =>
      localStorage.setItem("automata-progress-v1", "{broken"),
    );
    await page.goto(base + "index.html");
    assert.equal(await page.locator('a.card[href^="lesson"]').count(), 6);
    assert(await page.locator("#storage-warning").count());
    await context.close();
    const blocked = await browser.newContext();
    await blocked.addInitScript(() => {
      Storage.prototype.setItem = function () {
        throw new Error("storage disabled");
      };
    });
    const p = await blocked.newPage();
    p.on("pageerror", (e) => errors.push(e.message));
    await p.goto(base + "quiz.html?lesson=lesson-1");
    await p
      .getByRole("button", { name: "Start new attempt", exact: true })
      .click();
    assert(await p.locator("#storage-warning").count());
    await p.locator("fieldset input").first().check();
    assert.equal(await p.locator(".feedback").count(), 1);
    await blocked.close();
    assert.deepEqual(errors, []);
    console.log(
      "Passed six lesson/quizzes,320/390/1440px layouts,player links,search,exam limits,both feedback modes,resume,scoring,focus and storage recovery.",
    );
  } finally {
    await browser.close();
    await new Promise((r) => server.close(r));
  }
})().catch((e) => {
  console.error(e);
  server.close();
  process.exitCode = 1;
});
