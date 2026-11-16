# Automata source authoring

The six lesson JSON files contain newly written English explanations, timestamped Taglish paraphrases, source-video IDs, explicit editorial clarifications, and 15 original questions each. Teaching order puts Topic3 before Topic4. The original playlist order is retained in the research record.

`diagrams-*.json` contain explicit finite-automaton definitions, not screenshots. `build.cjs` loads AutomataStudio's actual `Automaton` and `GraphView`, renders standalone SVGs, writes downloadable `.afjson` machines, creates accessible transition-table data, validates question links, and emits `../content.js`. The data revision hash protects saved attempts from silent question-bank changes.

The engine snapshot in `automata-studio/` is from [tanjifried/automata-studio](https://github.com/tanjifried/automata-studio), commit `935ad976a272647432600d2c3eca7790ea1cb04d`. Its MIT license is retained in that directory. Do not replace the diagram renderer with guessed hand-drawn edges.

To regenerate from this directory's authored data:

```bash
PLAYWRIGHT_MODULE=/absolute/path/to/playwright node automata/build/build.cjs
node tests/automata-data.cjs
python3 scripts/prepare_site.py
PLAYWRIGHT_MODULE=/absolute/path/to/playwright node tests/automata-browser.cjs
```

Run these commands from the repository root. The renderer and browser test use `/usr/bin/google-chrome` by default; set `CHROME_BIN` for another Chromium executable. Playwright is an authoring/test dependency, not a dependency of the deployed website.

`build/` is excluded from the Pages artifact. Only authored browser content, recreated diagrams, and machine downloads are deployed. Raw video and machine-generated speech working files are not committed or published. The speaker section deliberately contains paraphrases and links to source playback, not a full transcript.

## Source review

All six videos were downloaded using yt-dlp2026.10.26 with its EJS dependency and Node runtime. Earlier download failures were resolved by updating that setup. A local MIME parser had changed binary JPEG bytes; preserving raw JPEG data recovered the storyboard sheets. Source review then used readable full-video samples, available automatic captions, and multilingual faster-whisper small-model output.

The local ASR can mistranscribe state names, negation and technical Taglish; it is working evidence, not authoritative text. Diagram transitions were checked against readable source tables/frames and independently simulated. Timestamps locate conceptual sections approximately. New examples and corrections are labeled; source material is not silently replaced by a practice variation.

`research-summary.md` records the important source corrections and verification limits. The public site contains the same provenance distinctions in lesson prose and figure captions.
