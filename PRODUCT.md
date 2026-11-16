# Study reviewers

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The owner studies Python, Software Engineering, Information Assurance and Security, and Automata Theory on phones and computers.

## Product Purpose

Combine four study packs into one website with a subject chooser, readable lessons, working quizzes, and saved progress.

## Capabilities and Constraints

- Preserve existing content, question banks, feedback, scoring, and citation links.
- Preserve the Python reviewer's exam appearance and optional instant final-exam feedback.
- Security includes Authentication and Avalanche Effect only.
- Automata contains six lessons in teaching order, with English explanations, timestamped source steps, separately searchable paraphrased Taglish speaker notes, 15 original questions per lesson, and 20 diagrams rendered by AutomataStudio.
- Automata diagrams include transition tables, full-size SVGs, and downloadable AutomataStudio machine files. Source recreations, editorial corrections, and original practice examples are identified.
- Link to the source YouTube videos at relevant timestamps and load embedded players on demand. Do not redistribute full copyrighted transcripts or source video/audio.
- Progress stays in the browser on each device; no account or cross-device syncing. Automata supports resuming attempts and reviewing completed-attempt history.
- Final exams let the learner choose their length and immediate or after-submission feedback. Existing attempts keep their own settings.
- Software Engineering and Security questions preserve source-slide vocabulary and phrasing, with documented factual corrections retained.
- Source is in the public `tanjifried/study-reviewers` repository; GitHub Pages publishes the website.
- Existing static HTML, CSS, and JavaScript remain the stack; downloaded runtime website files also work offline, except online sources and video players.

## Brand Commitments

Retain the existing study-pack appearance. The subject chooser and Automata extension continue the plain, readable study interface. This extension does not establish a new visual identity or replace the existing subjects' design decisions.

## Evidence on Hand

The `python`, `software-engineering`, and `information-security` directories contain the incumbent generated lessons, quizzes, and supporting assets. `automata` contains the fourth pack; `automata/build` contains authored lesson data, machine definitions, renderer sources, and generation scripts. `automata/build/research-summary.md` records source coverage and factual corrections.

The incumbent CSS already varies by subject: the chooser uses system type and a blue accent; Python uses system type, green/teal accents, white reading panels, and a separate exam layout; the slide-based subjects use Arial, blue accents, white reading surfaces, and bordered lesson sections. Automata retains the same readable static-pack conventions with a constrained reading column, restrained green accents, white bordered sections, visible focus states, and phone-sized controls. Its Georgia headings are local to that subject, not a new site-wide typography rule. There is no existing `DESIGN.md` or design sidecar to update; that documentation gap predates this ordinary extension.

## Automata corrections confirmed by the owner

- Use the same single-question quiz layout and A–D controls as the Software Engineering and Security packs.
- Display 110 source screenshots directly in the lesson flow; video links are supplementary.
- Automata alone uses 12 multiple-choice questions and 3 typed identification items per lesson. Identification presents preserved source wording or notation and expects the term/name. Other subject banks are unchanged.
