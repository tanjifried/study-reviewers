/* Render original .afjson data using AutomataStudio's actual model and SVG renderer. */
const fs = require("node:fs");
const crypto = require("node:crypto");
const path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const root = path.resolve(__dirname, "..");
const sources = path.join(__dirname, "automata-studio");
async function build() {
  const lessons = [1, 2, 3, 4, 5, 6].map((n) =>
    JSON.parse(
      fs.readFileSync(path.join(__dirname, `lesson-${n}.json`), "utf8"),
    ),
  );
  const drills = JSON.parse(
    fs.readFileSync(path.join(__dirname, "drills.json"), "utf8"),
  );
  const machines = {};
  for (const file of fs
    .readdirSync(__dirname)
    .filter((f) => /^diagrams-.*\.json$/.test(f))) {
    const group = JSON.parse(
      fs.readFileSync(path.join(__dirname, file), "utf8"),
    );
    for (const [id, machine] of Object.entries(group)) {
      if (machines[id]) throw Error(`Duplicate diagram: ${id}`);
      machines[id] = machine;
    }
  }
  fs.rmSync(path.join(root, "diagrams"), { recursive: true, force: true });
  fs.mkdirSync(path.join(root, "diagrams"), { recursive: true });
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome",
    headless: true,
    args: ["--no-sandbox"],
  });
  const diagrams = {};
  try {
    const page = await browser.newPage({
      viewport: { width: 1000, height: 700 },
    });
    for (const [id, machine] of Object.entries(machines)) {
      await page.goto("about:blank");
      await page.setContent(
        '<!doctype html><svg width="1000" height="700"></svg>',
      );
      for (const file of ["automaton.js", "layout.js", "graph.js"])
        await page.addScriptTag({ path: path.join(sources, file) });
      const svg = await page.evaluate((m) => {
        const automaton = Automaton.fromJSON(m);
        if (!Object.keys(automaton.positions).length)
          automaton.positions = computeLayeredLayout(automaton);
        const graph = new GraphView(document.querySelector("svg"));
        graph.setAutomaton(automaton);
        return graph.toStandaloneSvg("#ffffff", { clean: true });
      }, machine);
      fs.writeFileSync(path.join(root, "diagrams", `${id}.svg`), svg);
      const fileMachine = { ...machine };
      delete fileMachine.provenance;
      fs.writeFileSync(
        path.join(root, "diagrams", `${id}.afjson`),
        JSON.stringify(fileMachine, null, 2) + "\n",
      );
      diagrams[id] = {
        src: `diagrams/${id}.svg`,
        title: machine.name,
        description: `${machine.name}. Start: ${machine.start_state}. Accepting: ${machine.accept_states.join(", ") || "none"}. See the adjacent transition table for every edge.`,
        provenance: machine.provenance,
        table: {
          states: machine.states,
          alphabet: machine.alphabet,
          start: machine.start_state,
          accept: machine.accept_states,
          rows: machine.states.map((state) => ({
            state:
              (state === machine.start_state ? "→ " : "") +
              (machine.accept_states.includes(state) ? "* " : "") +
              state,
            targets: machine.alphabet.map((symbol) => {
              const values = (machine.transitions[state] || {})[symbol] || [];
              return values.length === 1
                ? values[0]
                : values.length
                  ? `{${values.join(", ")}}`
                  : "∅";
            }),
          })),
        },
      };
      // ε-transitions must remain visible in the accessible table as well.
      if (machine.states.some((s) => (machine.transitions[s] || {})["ε"])) {
        diagrams[id].table.alphabet = [...machine.alphabet, "ε"];
        diagrams[id].table.rows.forEach((row, i) => {
          const values =
            (machine.transitions[machine.states[i]] || {})["ε"] || [];
          row.targets.push(values.length ? `{${values.join(", ")}}` : "∅");
        });
      }
    }
  } finally {
    await browser.close();
  }
  const bankOf = (value) => ({
    questions: value.lessons.map((l) => l.questions),
    tables: Object.fromEntries(
      Object.entries(value.diagrams)
        .filter(([id]) => !id.startsWith("drill-"))
        .map(([id, d]) => [id, d.table]),
    ),
  });
  const bank = bankOf({ lessons, diagrams });
  const version = crypto
    .createHash("sha256")
    .update(JSON.stringify(bank))
    .digest("hex")
    .slice(0, 16);
  let compatibleVersions = [];
  try {
    const oldText = fs.readFileSync(path.join(root, "content.js"), "utf8");
    const previous = JSON.parse(
      oldText
        .slice(oldText.indexOf("window.AUTOMATA_DATA = ") + 23)
        .replace(/;\s*$/, ""),
    );
    if (JSON.stringify(bankOf(previous)) === JSON.stringify(bank))
      compatibleVersions = [
        ...new Set([previous.version, ...(previous.compatibleVersions || [])]),
      ].filter((v) => v !== version);
  } catch {}
  const data = { version, compatibleVersions, lessons, diagrams, drills };
  const ids = new Set();
  for (const l of lessons) {
    if (l.questions.length !== 15) throw Error(`${l.id}: expected15 questions`);
    for (const q of l.questions) {
      if (ids.has(q.id)) throw Error(`Duplicate question ID ${q.id}`);
      ids.add(q.id);
      if (q.kind === "identification") {
        if (
          typeof q.answer !== "string" ||
          !q.answer ||
          !Array.isArray(q.acceptedAnswers) ||
          !q.acceptedAnswers.includes(q.answer)
        )
          throw Error(`Bad identification ${q.id}`);
        if (!q.sourceFrame || !fs.existsSync(path.join(root, q.sourceFrame)))
          throw Error(`Missing definition frame ${q.id}`);
      } else if (
        q.choices.length !== 4 ||
        !Number.isInteger(q.answer) ||
        q.answer < 0 ||
        q.answer > 3
      )
        throw Error(`Bad choices ${q.id}`);
      if (!l.segments.some((s) => s.id === q.segmentId))
        throw Error(`Missing source segment ${q.id}`);
    }
    for (const item of [...l.segments, ...l.questions])
      if (item.diagram && !diagrams[item.diagram])
        throw Error(`Missing figure ${item.diagram}`);
  }
  for (const drill of drills) {
    if (drill.questions.length !== 15)
      throw Error("Expected15 focused questions");
    const source = lessons.find((l) => l.id === drill.sourceLessonId);
    if (!source) throw Error("Missing drill source lesson");
    for (const q of drill.questions) {
      if (
        ids.has(q.id) ||
        !diagrams[q.diagram] ||
        q.choices.length !== 2 ||
        ![0, 1].includes(q.answer) ||
        !source.segments.some((s) => s.id === q.segmentId)
      )
        throw Error("Invalid drill question " + q.id);
      ids.add(q.id);
    }
  }
  fs.writeFileSync(
    path.join(root, "content.js"),
    "// Original study explanations and practice questions; source videos remain on YouTube.\nwindow.AUTOMATA_DATA = " +
      JSON.stringify(data, null, 2).replace(/</g, "\\u003c") +
      ";\n",
  );
  console.log(
    `Built ${lessons.length} lessons, ${ids.size} questions, ${Object.keys(diagrams).length} AutomataStudio diagrams.`,
  );
}
build().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
