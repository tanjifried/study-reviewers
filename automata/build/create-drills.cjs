/* Original graph practice. Answer keys are derived from machine definitions. */
const fs = require("node:fs"),
  path = require("node:path"),
  vm = require("node:vm");
const root = __dirname,
  ctx = vm.createContext({ console });
for (const f of ["automaton.js", "algorithms.js"])
  vm.runInContext(
    fs.readFileSync(path.join(root, "automata-studio", f), "utf8"),
    ctx,
  );
const diagrams = {},
  classifications = [],
  reductions = [];
function machine(states, alphabet, finals, rows, start = states[0]) {
  return {
    states,
    alphabet,
    start_state: start,
    accept_states: finals,
    transitions: Object.fromEntries(
      states.map((s, i) => [
        s,
        Object.fromEntries(
          alphabet.map((a, j) => [
            a,
            Array.isArray(rows[i][j])
              ? rows[i][j]
              : rows[i][j] === null
                ? []
                : [rows[i][j]],
          ]),
        ),
      ]),
    ),
  };
}
function addClassification(m) {
  const n = classifications.length + 1,
    id = `drill-classify-${n}`;
  m.name = `Graph C${String(n).padStart(2, "0")}`;
  m.provenance = "Original graph for focused exam practice.";
  diagrams[id] = m;
  const epsilon = m.states.find((s) => (m.transitions[s]?.["ε"] || []).length);
  let branch, missing;
  for (const s of m.states)
    for (const a of m.alphabet) {
      const t = m.transitions[s]?.[a] || [];
      if (t.length > 1 && !branch) branch = { s, a, t };
      if (!t.length && !missing) missing = { s, a };
    }
  const dfa = !epsilon && !branch && !missing;
  let explanation = dfa
    ? `Every state has exactly one destination for each symbol in Σ={${m.alphabet.join(", ")}} and there are no ε-transitions. The number of accepting states and unreachable states does not change determinism.`
    : epsilon
      ? `The ε-transition from ${epsilon} consumes no input symbol. A DFA cannot contain ε-transitions, so this is an ε-NFA and belongs to the NFA choice.`
      : `At ${branch.s}, symbol ${branch.a} can reach {${branch.t.join(", ")}}. That gives multiple destinations for the same state–symbol pair, so this is an NFA, not a DFA.`;
  classifications.push({
    id: `classify-v1-q${n}`,
    kind: "mc",
    prompt: `Alphabet Σ={${m.alphabet.join(", ")}}. Is this graph a DFA or an NFA?`,
    choices: ["DFA", "NFA (including ε-NFA)"],
    answer: dfa ? 0 : 1,
    diagram: id,
    explanation,
    segmentId: "dfa-and-nfa",
  });
}
function addReduction(m) {
  const n = reductions.length + 1,
    id = `drill-reduce-${n}`;
  m.name = `Graph M${String(n).padStart(2, "0")}`;
  m.provenance = "Original complete DFA for focused exam practice.";
  diagrams[id] = m;
  ctx.raw = m;
  vm.runInContext(
    "globalThis.current=Automaton.fromJSON(raw);globalThis.result=minimizeDfa(current)",
    ctx,
  );
  const r = ctx.result;
  const groups = Array.from(r.steps.at(-1).groups, (g) => Array.from(g)),
    removed = Array.from(r.removedUnreachable),
    minimum = r.dfa.states.length,
    can = minimum < m.states.length;
  const format = (g) => "{" + g.join(", ") + "}";
  let reasons = [];
  if (removed.length)
    reasons.push(
      `Remove unreachable ${format(removed)}; removing unreachable states preserves the language.`,
    );
  for (const g of groups.filter((g) => g.length > 1))
    reasons.push(
      `Merge equivalent states ${format(g)}: they have the same accept/reject behavior for every continuation.`,
    );
  const explanation = can
    ? `Yes. ${reasons.join(" ")} This reduces ${m.states.length} states to ${minimum}.`
    : `No. ${minimum === 1 ? "One reachable state is already the smallest possible DFA." : "All states are reachable, and the stable equivalence classes are " + groups.map(format).join(" | ") + ". Every pair is distinguishable, so no merge preserves the language."} The minimum remains ${minimum} states.`;
  reductions.push({
    id: `reduce-v1-q${n}`,
    kind: "mc",
    prompt:
      "Can this DFA be reduced to fewer states without changing its accepted language?",
    choices: ["Yes — it can be reduced further", "No — it is already minimal"],
    answer: can ? 0 : 1,
    diagram: id,
    explanation,
    minimumStates: minimum,
    segmentId: removed.length ? "l6-s12" : "l6-s09",
  });
}
const m = machine;
addClassification(
  m(
    ["q0", "q1"],
    ["0", "1"],
    ["q0"],
    [
      ["q1", "q0"],
      ["q0", "q1"],
    ],
  ),
);
addClassification(
  m(
    ["q0", "q1"],
    ["0", "1"],
    ["q1"],
    [
      [["q0", "q1"], "q0"],
      ["q1", "q1"],
    ],
  ),
);
addClassification(
  m(
    ["A", "B", "C"],
    ["a", "b"],
    ["B", "C"],
    [
      ["B", "C"],
      ["A", "B"],
      ["C", "A"],
    ],
  ),
);
let e = m(
  ["A", "B"],
  ["0", "1"],
  ["B"],
  [
    ["A", "A"],
    ["B", "B"],
  ],
);
e.transitions.A["ε"] = ["B"];
addClassification(e);
addClassification(m(["q0"], ["0", "1"], ["q0"], [["q0", "q0"]]));
addClassification(
  m(
    ["p", "r", "f"],
    ["a", "b"],
    ["f"],
    [
      ["r", "p"],
      [["r", "f"], "p"],
      ["f", "f"],
    ],
  ),
);
addClassification(
  m(
    ["q0", "q1", "u"],
    ["0", "1"],
    ["q1"],
    [
      ["q0", "q1"],
      ["q0", "q1"],
      ["u", "u"],
    ],
  ),
);
addClassification(
  m(
    ["A", "B", "C"],
    ["0", "1"],
    ["C"],
    [
      ["A", ["B", "C"]],
      ["A", "C"],
      ["C", "C"],
    ],
  ),
);
addClassification(
  m(
    ["A", "B"],
    ["a", "b"],
    [],
    [
      ["B", "A"],
      ["A", "B"],
    ],
  ),
);
e = m(["q0", "q1", "q2"], ["a"], ["q2"], [["q1"], ["q2"], ["q2"]]);
e.transitions.q0["ε"] = ["q1"];
e.transitions.q1["ε"] = ["q0"];
addClassification(e);
addClassification(
  m(
    ["q0", "q1", "q2"],
    ["0", "1"],
    ["q0"],
    [
      ["q1", "q0"],
      ["q2", "q1"],
      ["q0", "q2"],
    ],
  ),
);
addClassification(
  m(
    ["q0", "q1", "q2"],
    ["0", "1"],
    ["q2"],
    [
      ["q1", "q0"],
      ["q1", ["q0", "q2"]],
      ["q2", "q2"],
    ],
  ),
);
addClassification(
  m(
    ["A", "B", "C"],
    ["a", "b"],
    ["C"],
    [
      ["B", "A"],
      ["B", "C"],
      ["C", "C"],
    ],
  ),
);
e = m(
  ["p", "q", "r"],
  ["0", "1"],
  ["r"],
  [
    ["p", "q"],
    ["q", "r"],
    ["r", "r"],
  ],
);
e.transitions.q["ε"] = ["r"];
addClassification(e);
addClassification(
  m(
    ["q0", "q1", "q2"],
    ["a", "b"],
    ["q1", "q2"],
    [
      [["q0", "q1"], "q2"],
      ["q1", "q2"],
      ["q2", "q0"],
    ],
  ),
);
// Reducible and irreducible graphs are deliberately mixed, including reachability cases.
addReduction(
  m(
    ["p", "r", "f"],
    ["0", "1"],
    ["f"],
    [
      ["r", "f"],
      ["p", "f"],
      ["f", "f"],
    ],
  ),
);
addReduction(
  m(
    ["e", "o"],
    ["0", "1"],
    ["e"],
    [
      ["o", "e"],
      ["e", "o"],
    ],
  ),
);
addReduction(
  m(
    ["s", "f1", "f2"],
    ["a", "b"],
    ["f1", "f2"],
    [
      ["f1", "f2"],
      ["f1", "f1"],
      ["f2", "f2"],
    ],
  ),
);
addReduction(m(["q0"], ["0", "1"], ["q0"], [["q0", "q0"]]));
addReduction(
  m(
    ["q0", "q1", "u"],
    ["0", "1"],
    ["q1"],
    [
      ["q0", "q1"],
      ["q0", "q1"],
      ["u", "u"],
    ],
  ),
);
addReduction(
  m(
    ["q0", "q1"],
    ["0", "1"],
    ["q1"],
    [
      ["q0", "q1"],
      ["q0", "q1"],
    ],
  ),
);
addReduction(
  m(
    ["A", "B", "C"],
    ["0", "1"],
    [],
    [
      ["B", "A"],
      ["C", "B"],
      ["A", "C"],
    ],
  ),
);
addReduction(
  m(
    ["q0", "q1", "q2"],
    ["0", "1"],
    ["q0"],
    [
      ["q1", "q0"],
      ["q2", "q1"],
      ["q0", "q2"],
    ],
  ),
);
addReduction(
  m(
    ["A", "B", "C", "D"],
    ["a"],
    ["A", "B", "C", "D"],
    [["B"], ["C"], ["D"], ["A"]],
  ),
);
addReduction(
  m(
    ["s", "a", "found"],
    ["a", "b"],
    ["found"],
    [
      ["a", "s"],
      ["a", "found"],
      ["found", "found"],
    ],
  ),
);
addReduction(
  m(
    ["q0", "q1", "q2", "q3"],
    ["0", "1"],
    ["q3"],
    [
      ["q1", "q2"],
      ["q1", "q3"],
      ["q1", "q3"],
      ["q3", "q3"],
    ],
  ),
);
addReduction(
  m(["q0", "q1", "q2", "q3"], ["a"], ["q3"], [["q1"], ["q2"], ["q3"], ["q3"]]),
);
addReduction(
  m(
    ["e0", "o0", "e1", "o1"],
    ["0", "1"],
    ["e0", "e1"],
    [
      ["o0", "e1"],
      ["e0", "o1"],
      ["o1", "e0"],
      ["e1", "o0"],
    ],
  ),
);
addReduction(m(["q0"], ["a", "b"], [], [["q0", "q0"]]));
addReduction(m(["s", "u"], ["a"], ["s"], [["s"], ["u"]]));
const drills = [
  {
    id: "dfa-nfa",
    title: "DFA or NFA?",
    subtitle: "15 graph-classification questions",
    sourceLessonId: "lesson-2",
    instructions:
      "Use the complete-DFA convention: exactly one destination per state and input symbol, with no ε-transitions. Choose NFA for branching or ε-NFA graphs. A double circle marks an accepting state; it does not by itself imply nondeterminism.",
    questions: classifications,
  },
  {
    id: "minimization",
    title: "Can this DFA be reduced?",
    subtitle: "15 graph-minimization questions",
    sourceLessonId: "lesson-6",
    instructions:
      "All figures in this quiz are complete DFAs. Answer Yes only if the equivalent DFA can have fewer states. Check both unreachable states and equivalent reachable states. Minimizing an already-minimal DFA does not reduce its state count.",
    questions: reductions,
  },
];
fs.writeFileSync(
  path.join(root, "diagrams-drills.json"),
  JSON.stringify(diagrams, null, 2) + "\n",
);
fs.writeFileSync(
  path.join(root, "drills.json"),
  JSON.stringify(drills, null, 2) + "\n",
);
console.log(
  "Authored two focused quizzes,30 graphs and30 algorithm-checked answer keys.",
);
