const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "../automata");
const c = vm.createContext({ console, window: {} });
for (const file of ["automaton.js", "algorithms.js"])
  vm.runInContext(
    fs.readFileSync(path.join(root, "build/automata-studio", file), "utf8"),
    c,
  );
vm.runInContext(fs.readFileSync(path.join(root, "content.js"), "utf8"), c);
const data = c.window.AUTOMATA_DATA;
assert.equal(data.lessons.length, 6);
assert.deepEqual(
  Array.from(data.lessons, (l) => l.videoId),
  [
    "yPaUNLEyFxo",
    "cmx06k7XSno",
    "adoZsRYd1Mw",
    "cSnfySSBL7A",
    "sVm9AE-DD3Q",
    "3PP21tlIKsE",
  ],
);
const raw = {};
for (const f of fs
  .readdirSync(path.join(root, "build"))
  .filter((f) => /^diagrams-.*\.json$/.test(f)))
  Object.assign(raw, JSON.parse(fs.readFileSync(path.join(root, "build", f))));
const qids = new Set();
for (const l of data.lessons) {
  assert.equal(l.questions.length, 15, l.id);
  const segments = new Set(l.segments.map((s) => s.id));
  assert.equal(segments.size, l.segments.length);
  for (const s of l.segments) {
    assert(
      s.start >= 0 &&
        s.start <= l.duration &&
        s.end >= s.start &&
        s.end <= l.duration + 1,
      s.id,
    );
    assert(s.notes.length && s.speakerNotes, s.id);
  }
  for (const q of l.questions) {
    assert(!qids.has(q.id));
    qids.add(q.id);
    if (q.kind === "identification") {
      assert.equal(typeof q.answer, "string");
      assert(q.acceptedAnswers.includes(q.answer));
      assert(fs.existsSync(path.join(root, q.sourceFrame)));
    } else {
      assert.equal(q.choices.length, 4);
      assert.equal(new Set(q.choices).size, 4);
      assert(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4);
    }
    assert(segments.has(q.segmentId));
    if (q.diagram) assert(raw[q.diagram]);
  }
}
assert.equal(qids.size, 90);
assert.equal(
  data.lessons
    .flatMap((l) => l.questions)
    .filter((q) => q.kind === "identification").length,
  18,
);
let frameCount = 0;
for (const l of data.lessons) {
  let count = 0;
  for (const segment of l.segments)
    for (const frame of segment.frames || []) {
      assert(fs.existsSync(path.join(root, frame.src)), frame.src);
      assert(frame.seconds >= 0 && frame.seconds < l.duration);
      assert(frame.width >= 640 && frame.height >= 360);
      count++;
      frameCount++;
    }
  assert(count >= 7, l.id + " needs source frames");
}
assert(frameCount >= 100, "missing source screenshot coverage");
function model(id) {
  c.raw = raw[id];
  assert(c.raw, id);
  return vm.runInContext("Automaton.fromJSON(raw)", c);
}
function accepts(id, word) {
  c.machine = model(id);
  c.word = word;
  return vm.runInContext("simulate(machine,word).accepted", c);
}
function words(alphabet, max) {
  let all = [""],
    frontier = [""];
  for (let i = 0; i < max; i++) {
    frontier = frontier.flatMap((w) => alphabet.map((x) => w + x));
    all.push(...frontier);
  }
  return all;
}
let traces = 0;
for (const [id, m] of Object.entries(raw)) {
  const file = JSON.parse(
    fs.readFileSync(path.join(root, "diagrams", id + ".afjson")),
  );
  assert.deepEqual(file.transitions, m.transitions, id);
  assert(
    fs
      .readFileSync(path.join(root, "diagrams", id + ".svg"), "utf8")
      .includes("<svg"),
    id,
  );
  for (const [s, row] of Object.entries(m.transitions)) {
    assert(m.states.includes(s));
    for (const [symbol, targets] of Object.entries(row)) {
      assert(symbol === "ε" || m.alphabet.includes(symbol));
      for (const target of targets) assert(m.states.includes(target));
    }
  }
  const table = data.diagrams[id].table;
  assert.equal(table.rows.length, m.states.length);
  for (let i = 0; i < m.states.length; i++)
    for (let j = 0; j < table.alphabet.length; j++) {
      const targets =
        (m.transitions[m.states[i]] || {})[table.alphabet[j]] || [];
      const expected =
        targets.length === 1
          ? targets[0]
          : targets.length
            ? `{${targets.join(", ")}}`
            : "∅";
      // ε table intentionally uses set notation, including a singleton.
      const cell = table.rows[i].targets[j];
      assert(
        cell === expected ||
          (table.alphabet[j] === "ε" && cell === `{${targets.join(", ")}}`),
        id,
      );
    }
}
for (const [nfa, dfa] of [
  ["l4-source-enfa", "l4-source-nfa"],
  ["l4-practice-enfa", "l4-practice-nfa"],
  ["l5-starts-zero-nfa", "l5-starts-zero-dfa"],
  ["l5-ends-one-nfa", "l5-ends-one-dfa"],
  ["l5-example-three-nfa", "l5-example-three-dfa"],
]) {
  for (const word of words(raw[nfa].alphabet, 7)) {
    assert.equal(
      accepts(nfa, word),
      accepts(dfa, word),
      `${nfa}/${dfa}: ${word}`,
    );
    traces++;
  }
}
for (const word of words(["0", "1"], 7)) {
  assert.equal(accepts("l3-starts-one", word), word.startsWith("1"), word);
  assert.equal(accepts("l3-source-table", word), word.includes("1"), word);
  assert.equal(
    accepts("l2-loop-nfa", word),
    word.endsWith("00") || word.endsWith("11"),
    word,
  );
}
for (const [id, count] of [
  ["l6-source-example-1", 4],
  ["l6-source-example-2", 5],
  ["l6-practice-reducible", 2],
  ["l6-practice-minimal", 2],
  ["l6-practice-unreachable", 1],
]) {
  c.machine = model(id);
  const result = vm.runInContext("minimizeDfa(machine)", c);
  assert.equal(result.dfa.states.length, count, id);
}
// Check the actual graph directly rather than depending on report object naming.
const visited = new Set(["q0"]),
  queue = ["q0"];
while (queue.length) {
  const s = queue.shift();
  for (const targets of Object.values(
    raw["l6-source-example-2"].transitions[s],
  ))
    for (const t of targets)
      if (!visited.has(t)) {
        visited.add(t);
        queue.push(t);
      }
}
assert.deepEqual(
  raw["l6-source-example-2"].states.filter((s) => !visited.has(s)),
  ["q3", "q7"],
);
c.machine = model("l6-source-example-2");
c.machine.startState = "q0";
assert(vm.runInContext('simulate(machine,"01").accepted', c));
c.machine.startState = "q6";
assert(!vm.runInContext('simulate(machine,"01").accepted', c));
assert.equal(accepts("l2-parity-square", "01"), true);
assert.equal(accepts("l2-parity-square", "11"), false);
assert.equal(accepts("l5-example-three-dfa", "ab"), true);
assert.equal(accepts("l5-example-three-dfa", "bb"), false);
console.log(
  `Validated6 lessons,90 questions,${Object.keys(raw).length} diagrams,${traces} NFA/conversion word comparisons and all minimization keys.`,
);
