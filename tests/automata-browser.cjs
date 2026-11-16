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
    ".jpg": "image/jpeg",
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
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      for (let n = 1; n <= 6; n++) {
        await page.goto(base + `lesson.html?lesson=lesson-${n}`);
        await fit(page);
        const frames = page.locator(".source-frame img");
        assert((await frames.count()) >= 7);
        await frames.first().scrollIntoViewIfNeeded();
        await frames.first().evaluate((i) => i.decode());
        assert(await frames.first().evaluate((i) => i.naturalWidth >= 640));
        assert.equal(
          await page.getByRole("button", { name: "Load video here" }).count(),
          0,
          "lessons still rely on video embeds",
        );
        await page.goto(base + `quiz.html?lesson=lesson-${n}`);
        await page.evaluate(() => {
          index = saved[active].ids.findIndex((id) => lookup[id].kind === "mc");
          renderQuestion();
        });
        await fit(page);
        assert.equal(
          await page.locator(".question").count(),
          1,
          "must show one question at a time",
        );
        assert.equal(await page.locator(".option").count(), 4);
        assert.equal(await page.locator("[data-jump]").count(), 15);
        assert.equal(
          await page
            .locator(".letter")
            .allTextContents()
            .then((x) => x.join("")),
          "ABCD",
        );
      }
    }
    fs.mkdirSync(captures, { recursive: true });
    for (const [name, width, height] of [
      ["desktop", 1440, 1000],
      ["mobile", 390, 844],
      ["user-320", 320, 844],
    ]) {
      await page.setViewportSize({ width, height });
      await page.goto(base + "quiz.html?lesson=lesson-2");
      await page.evaluate(() => {
        index = saved[active].ids.findIndex(
          (id) => lookup[id].kind === "mc" && lookup[id].diagram,
        );
        renderQuestion();
      });
      await page.screenshot({ path: path.join(captures, name + ".png") });
      await page.evaluate(() => {
        index = saved[active].ids.findIndex(
          (id) => lookup[id].kind === "identification",
        );
        renderQuestion();
      });
      await page.screenshot({
        path: path.join(captures, name + "-identification.png"),
      });
      await page.goto(base + "lesson.html?lesson=lesson-4#l4-s07");
      await page
        .locator(".source-frame img")
        .first()
        .evaluate((i) => i.decode());
      await page.screenshot({
        path: path.join(captures, name + "-frames.png"),
      });
    }
    await page.goto(base + "lesson.html?lesson=lesson-4");
    await page.locator("details summary").click();
    await page.getByRole("searchbox").fill("closure");
    assert((await page.locator("details div p").count()) > 0);
    await page.goto(base + "quiz.html?lesson=final");
    assert.equal(await page.locator("#final-count").getAttribute("max"), "90");
    for (const value of ["0", "1.5", "91", ""]) {
      await page.fill("#final-count", value);
      await page.click("#final-start");
      assert.equal(await page.locator(".question").count(), 0);
    }
    await page.fill("#final-count", "5");
    await page.uncheck("#final-instant");
    await page.click("#final-start");
    assert.equal(await page.evaluate(() => saved.final.ids.length), 5);
    await page.evaluate(() => {
      const all = LESSONS.flatMap((l) => l.questions);
      saved.final.ids = [
        all.find((q) => q.kind === "identification").id,
        ...all
          .filter((q) => q.kind === "mc")
          .slice(0, 4)
          .map((q) => q.id),
      ];
      index = 0;
      renderQuestion();
    });
    const firstKind = await page.evaluate(
      () => lookup[saved.final.ids[index]].kind,
    );
    if (firstKind === "identification") {
      await page.fill("#typed-answer", "wrong term");
      await page.locator("#identification-form button").click();
      await page.fill(
        "#typed-answer",
        "  " +
          (await page.evaluate(() =>
            lookup[saved.final.ids[index]].options[0].toUpperCase(),
          )) +
          "  ",
      );
      await page.locator("#identification-form button").click();
      assert.equal(
        await page.evaluate(() => saved.final.answers[saved.final.ids[0]]),
        0,
      );
    } else {
      await page.click('[data-option="0"]');
      await page.click('[data-option="1"]');
      assert.equal(
        await page.evaluate(() => saved.final.answers[saved.final.ids[0]]),
        1,
      );
    }
    assert.equal(await page.locator(".feedback").count(), 0);
    await page.reload();
    await page.click("#final-resume");
    assert.equal(await page.locator(".feedback").count(), 0);
    for (let i = 0; i < 5; i++) {
      const answer = await page.evaluate(
        () => lookup[saved.final.ids[index]].answer,
      );
      if (await page.locator("#typed-answer").count()) {
        await page.fill(
          "#typed-answer",
          await page.evaluate(() => lookup[saved.final.ids[index]].options[0]),
        );
        await page.locator("#identification-form button").click();
      } else await page.click(`[data-option="${answer}"]`);
      assert.equal(await page.locator(".feedback").count(), 0);
      if (i < 4) await page.click("#next");
    }
    await page.click("#submit-exam");
    assert.equal((await page.locator(".score").textContent()).trim(), "5 / 5");
    await page.click("#review");
    assert.equal(await page.locator(".feedback").count(), 1);
    // Lesson practice scores and locks the first selection, matching the other packs.
    await page.goto(base + "quiz.html?lesson=lesson-2");
    await page.evaluate(() => {
      index = saved[active].ids.findIndex((id) => lookup[id].kind === "mc");
      renderQuestion();
    });
    const chosen = await page.evaluate(
      () => lookup[saved[active].ids[index]].answer,
    );
    await page.click(`[data-option="${chosen}"]`);
    assert.equal(await page.locator(".feedback").count(), 1);
    assert(await page.locator(".option").first().isDisabled());
    const questionBefore = await page.locator("#prompt").textContent();
    await page.click("#next");
    assert.notEqual(
      await page.locator("#prompt").textContent(),
      questionBefore,
    );
    await page.click("#prev");
    assert.equal(await page.locator("#prompt").textContent(), questionBefore);
    // All18 source identification prompts accept normalized terms/aliases and lock practice after checking.
    for (let n = 1; n <= 6; n++) {
      await page.goto(base + `quiz.html?lesson=lesson-${n}`);
      const ids = await page.evaluate(() =>
        saved[active].ids.filter((id) => lookup[id].kind === "identification"),
      );
      assert.equal(ids.length, 3);
      for (const id of ids) {
        await page.evaluate((id) => {
          index = saved[active].ids.indexOf(id);
          renderQuestion();
        }, id);
        assert.equal(await page.locator(".option").count(), 0);
        assert(await page.locator("#typed-answer").count());
        const term = await page.evaluate(
          (id) => lookup[id].acceptedAnswers.at(-1).toUpperCase(),
          id,
        );
        await page.fill("#typed-answer", "  " + term + "  ");
        await page.locator("#identification-form button").click();
        assert(
          (await page.locator(".feedback strong").textContent()).startsWith(
            "Correct.",
          ),
        );
        assert(await page.locator("#typed-answer").isDisabled());
      }
    }
    await page.goto(base + "quiz.html?lesson=lesson-1");
    await page.evaluate(() => {
      start("lesson-1", true);
      index = saved[active].ids.findIndex(
        (id) => lookup[id].kind === "identification",
      );
      renderQuestion();
    });
    await page.fill("#typed-answer", "---");
    await page.locator("#identification-form button").click();
    assert(
      await page
        .locator("#typed-answer")
        .evaluate((input) => input.validity.customError),
    );
    await page.fill(
      "#typed-answer",
      await page.evaluate(() => lookup[saved[active].ids[index]].options[0]),
    );
    assert.equal(
      await page
        .locator("#typed-answer")
        .evaluate((input) => input.validity.customError),
      false,
    );
    await page.locator("#identification-form button").click();
    assert(
      (await page.locator(".feedback strong").textContent()).startsWith(
        "Correct.",
      ),
    );
    await page.evaluate(() => {
      start("lesson-1", true);
      index = saved[active].ids.findIndex(
        (id) => lookup[id].kind === "identification",
      );
      renderQuestion();
    });
    await page.fill("#typed-answer", "not the term");
    await page.locator("#identification-form button").click();
    assert(
      (await page.locator(".feedback strong").textContent()).startsWith(
        "Incorrect.",
      ),
    );
    assert(await page.locator("#typed-answer").isDisabled());
    assert.equal(await page.locator(".definition-frame").count(), 1);
    // A saved attempt from the former UI migrates into the shared question layout.
    const old = await page.evaluate(() => {
      const id = AUTOMATA_DATA.lessons[0].questions.find(
        (q) => q.kind !== "identification",
      ).id;
      return {
        completed: {},
        attempts: {
          "lesson-1": {
            items: AUTOMATA_DATA.lessons[0].questions.map((q) => ({
              lessonId: "lesson-1",
              questionId: q.id,
            })),
            answers: { [id]: 2 },
            instant: true,
            submitted: false,
            version:
              AUTOMATA_DATA.compatibleVersions[0] || AUTOMATA_DATA.version,
          },
        },
        history: [],
      };
    });
    await page.evaluate((old) => {
      localStorage.removeItem("automata-quiz-v2");
      localStorage.setItem("automata-progress-v1", JSON.stringify(old));
    }, old);
    await page.goto(base + "quiz.html?lesson=lesson-1");
    assert.equal(
      await page.evaluate(() => Object.keys(saved["lesson-1"].answers).length),
      1,
    );
    await page.evaluate(() => {
      localStorage.setItem(
        "automata-quiz-v2",
        '{"final":{"ids":"bad","answers":{}}}',
      );
      localStorage.setItem("automata-progress-v1", "{}");
    });
    await page.goto(base + "quiz.html?lesson=final");
    assert.equal(await page.locator("#final-count").count(), 1);
    // The published former bank maps replaced MC slots to new unanswered typed slots.
    await page.evaluate(() => {
      localStorage.removeItem("automata-quiz-v2");
      const l = AUTOMATA_DATA.lessons[0];
      const kept = l.questions.find((q) => q.kind !== "identification").id;
      localStorage.setItem(
        "automata-progress-v1",
        JSON.stringify({
          completed: {},
          attempts: {
            "lesson-1": {
              items: l.questions.map((q) => ({
                lessonId: l.id,
                questionId: q.id.replace(/-id$/, ""),
              })),
              answers: { [kept]: 2 },
              instant: true,
              submitted: false,
              version: "fce2731284cbda61",
            },
          },
          history: [],
        }),
      );
    });
    await page.goto(base + "quiz.html?lesson=lesson-1");
    assert.equal(await page.evaluate(() => saved["lesson-1"].ids.length), 15);
    assert.equal(
      await page.evaluate(() => Object.keys(saved["lesson-1"].answers).length),
      1,
    );
    assert.equal(
      await page.evaluate(
        () =>
          saved["lesson-1"].ids.filter(
            (id) => lookup[id].kind === "identification",
          ).length,
      ),
      3,
    );
    await context.close();
    const blocked = await browser.newContext();
    await blocked.addInitScript(() => {
      Storage.prototype.setItem = function () {
        throw Error("storage disabled");
      };
    });
    const p = await blocked.newPage();
    p.on("pageerror", (e) => errors.push(e.message));
    await p.goto(base + "quiz.html?lesson=lesson-1");
    await p.evaluate(() => {
      index = saved[active].ids.findIndex((id) => lookup[id].kind === "mc");
      renderQuestion();
    });
    await p.locator(".option").first().click();
    assert.equal(await p.locator(".feedback").count(), 1);
    await blocked.close();
    assert.deepEqual(errors, []);
    console.log(
      "Passed source screenshot coverage, shared one-question quiz UI, A–D/progress/navigation, exam limits, both feedback modes, answer editing, resume, migration, scoring and phone layouts.",
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
