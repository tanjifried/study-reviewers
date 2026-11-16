# Study reviewers

Four study packs in one mobile-friendly static website:

- Python: 13 lessons, 302 original practice questions, randomized quizzes, and a configurable final (40 questions by default).
- Software Engineering: 10 lessons with slides, explanations, cheat sheets, quizzes, and a final.
- Information Assurance and Security: Authentication and Avalanche Effect only.
- Automata Theory: six topic-ordered lessons, 90 original practice questions, 20 AutomataStudio-rendered diagrams, and a configurable final.

Website: https://tanjifried.github.io/study-reviewers/

Source: https://github.com/tanjifried/study-reviewers (public).

## Use

Open `index.html`, choose a subject, and start a lesson or quiz. Progress is stored separately for each subject in the current browser on the current device. It does not sync across devices. Previous progress from local files belongs to a different browser origin and does not automatically transfer to the hosted website.

Final-exam setup lets you choose the number of questions and feedback after each answer or after submission. Python supports up to 302 questions; Software Engineering supports up to 180, Security up to 58 (one per concept), and Automata up to 90. Settings apply to new attempts. The slide-based quiz wording follows the original slide terminology and definitions, retaining the documented corrections where a source slide has an error.

Automata adds English explanations, timestamped source steps, searchable Taglish paraphrases of the speaker's points, optional YouTube players, diagram transition tables, and downloadable SVG and AutomataStudio `.afjson` files. It saves in-progress attempts and completed-attempt history locally. See [Automata documentation](automata/README.md) for source attribution, limitations, and regeneration.

The downloadable website works offline when its complete runtime files are kept together. Online reference links and YouTube players require internet access. The hosted version does not currently install or cache itself as an offline app.

## Deployment and verification

Push to `main` to validate local links, prepare `_site`, and deploy through GitHub Actions. No runtime dependencies or server are required. To prepare the same artifact locally:

```sh
python3 scripts/prepare_site.py
```

Only runtime HTML, CSS, JavaScript, PDFs, images, and downloadable Automata machine files are published. Original PowerPoints, authoring files, renderer sources, and reference screenshots stay out of `_site`. The repository itself is public. No full source-video transcript, downloaded video, or audio is shipped.

Browser checks require Node.js, Playwright, and a browser. `PLAYWRIGHT_MODULE` can point to an existing Playwright installation. The Automata browser suite and generator use Google Chrome at `/usr/bin/google-chrome` by default; set `CHROME_BIN` to another compatible Chromium executable if needed.

```sh
node tests/automata-data.cjs
python3 scripts/prepare_site.py
PLAYWRIGHT_MODULE=/path/to/playwright node tests/automata-browser.cjs
PLAYWRIGHT_MODULE=/path/to/playwright node tests/final-exams.cjs
```

`tests/final-exams.cjs` covers the incumbent subjects' exam settings, feedback, scoring, saved attempts, and legacy lesson behavior. `tests/automata-data.cjs` checks lesson/question references, machine/table consistency, conversion language equivalence over bounded test words, and minimization results. `tests/automata-browser.cjs` checks responsive lessons and quizzes at 320, 390, and 1440 pixels, timestamp links, speaker-note search, exam validation, feedback timing, answer editing, resume, scoring, keyboard focus, and storage failures. The embedded-player test uses a stub; it does not verify YouTube playback availability.

The existing packs retain their lesson content and question banks. This is independent study material, not an official Pearson product.
