# Automata Theory study pack

The fourth subject in Study reviewers contains six lessons in teaching order, 15 questions per lesson (12 multiple-choice and 3 typed identification; 90 total), and 20 diagrams generated with AutomataStudio's actual SVG renderer.

## Lessons and sources

| Lesson | Source video | Playlist position |
| --- | --- | --- |
| Introduction to Automata Theory | [Introduction](https://www.youtube.com/watch?v=yPaUNLEyFxo) | 1 |
| Finite automata: states, symbols, DFA and NFA | [Finite automata](https://www.youtube.com/watch?v=cmx06k7XSno) | 2 |
| Transition diagrams and tables | [Diagrams and tables](https://www.youtube.com/watch?v=adoZsRYd1Mw) | 4 |
| Epsilon-NFA to NFA: eliminating ε-transitions | [Epsilon elimination](https://www.youtube.com/watch?v=cSnfySSBL7A) | 3 |
| NFA to DFA: subset construction | [Subset construction](https://www.youtube.com/watch?v=sVm9AE-DD3Q) | 5 |
| DFA Minimization | [Minimization](https://www.youtube.com/watch?v=3PP21tlIKsE) | 6 |

Lessons 3 and 4 intentionally follow topic order rather than the playlist's order. English explanations are paired with 110 directly displayed source screenshots, including intermediate diagram and table updates. Screenshots load lazily and open at full size. Source-video links are optional references. Separately searchable Taglish speaker-note paraphrases link back to the corresponding illustrated lesson section.

The notes are authored study material, not a complete transcript. Timing is approximate. Source review sampled speech and frames; it does not establish word-for-word or frame-by-frame verification. Source recreations, editorial completions/corrections, and original practice examples are labeled. [Research summary](build/research-summary.md) records the source coverage and corrections, including epsilon-closure acceptance and unreachable states in minimization. No full copyrighted transcript, downloaded source video, or audio is distributed in the repository or deployed website.

## Study and practice

Open `index.html` within this directory, or choose Automata from the site hub. Diagrams have adjacent transition tables, full-size SVG links and `.afjson` downloads for AutomataStudio. Quiz answers link back to the relevant lesson section. Identification shows preserved source wording or notation and asks for the term/name. Answers accept specified aliases with normalized capitalization, spacing and punctuation; matching is not fuzzy. The source frame is available in feedback. Practice scores the first submitted answer. The final supports 1–90 questions and immediate or after-submission feedback; deferred typed answers remain editable. Lesson completion, in-progress quiz attempts, and completed-attempt history stay in the current browser; clearing browser storage removes them. There is no account or cross-device sync.

Downloaded runtime pages, quizzes, diagrams, and machine files work offline when kept together. YouTube links and embeds require a network connection and remain subject to source availability.

## Files and regeneration

- `index.html`, `lesson.html`, `quiz.html`, `app.js`, `quiz.js`, `styles.css`, and `quiz.css` provide the static interface.
- `content.js` contains generated lessons, questions, and diagram metadata.
- `diagrams/` contains generated SVG and `.afjson` machine files.
- `build/lesson-*.json` and `build/diagrams-*.json` are the authored content and machine inputs.
- `build/automata-studio/` contains the renderer/model sources and their license; `build/build.cjs` generates the runtime artifacts.

Run from the repository root with Node.js, Playwright, and compatible Chrome/Chromium installed:

```sh
PLAYWRIGHT_MODULE=/path/to/playwright node automata/build/build.cjs
node tests/automata-data.cjs
python3 scripts/prepare_site.py
PLAYWRIGHT_MODULE=/path/to/playwright node tests/automata-browser.cjs
```

Omit `PLAYWRIGHT_MODULE` when `playwright` resolves normally. The generator and browser suite default to `/usr/bin/google-chrome`; set `CHROME_BIN` if your executable is elsewhere. The Python preparation script requires only the standard library and excludes authoring/build files from `_site`.

The data suite checks all 90 questions, 20 machines and their tables, 1,275 bounded-word conversion comparisons, and minimization results. These checks support the encoded examples; bounded comparisons alone are not general proofs of equivalence. Browser checks cover all lessons and quizzes at desktop and phone widths, source navigation, note search, exam feedback/settings, editing, resume, scoring, focus, and unavailable storage. They verify directly displayed source frames, all 18 identification items, deferred typed-answer editing, saved-progress migration, and recovery after invalid punctuation-only input.

Lesson 1 prioritizes core terms and concepts. Everyday-device examples remain optional source context and are excluded from its quiz. Key terms appear before the source walkthrough.

## Focused graph quizzes

- [DFA or NFA?](quiz.html?lesson=dfa-nfa): 15 original graph-classification questions, including branching, epsilon transitions, multiple accepting states and unreachable states.
- [Can this DFA be reduced?](quiz.html?lesson=minimization): 15 complete DFAs, mixing already-minimal graphs with equivalent-state and unreachable-state reductions. “Yes” means strictly fewer states for the same language.

These two tracks use 30 additional diagrams from AutomataStudio and have independent saved attempts/history. They are separate from the six-lesson 90-question final-exam pool. Classification uses the stated complete-DFA convention. Figure captions remain neutral so they do not reveal the answer. Each explanation identifies the relevant graph property; minimization feedback gives the minimum state count. Answer keys are tested against direct transition counting and an independent product-graph state-distinguishability search.

Authoring inputs are `build/drills.json` and `build/diagrams-drills.json`. Regenerate these inputs with `node automata/build/create-drills.cjs`, then run the usual renderer/data/browser checks.
