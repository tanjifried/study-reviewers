(() => {
  "use strict";
  const data = window.AUTOMATA_DATA,
    main = document.querySelector("main"),
    params = new URLSearchParams(location.search),
    key = "automata-progress-v1";
  const el = (tag, text, attrs = {}) => {
    const n = document.createElement(tag);
    if (text != null) n.textContent = text;
    Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
    return n;
  };
  const add = (p, ...nodes) => nodes.forEach((n) => p.append(n));
  const link = (text, href, cls) =>
    el("a", text, { href, ...(cls ? { class: cls } : {}) });
  let state = { completed: {}, attempts: {}, history: [] },
    storage = true;
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "{}");
    if (saved && typeof saved === "object") {
      state.completed =
        saved.completed && typeof saved.completed === "object"
          ? saved.completed
          : {};
      state.attempts =
        saved.attempts && typeof saved.attempts === "object"
          ? saved.attempts
          : {};
      state.history = Array.isArray(saved.history)
        ? saved.history.filter(
            (h) =>
              h &&
              typeof h.title === "string" &&
              Number.isFinite(h.score) &&
              Number.isInteger(h.total) &&
              h.total > 0,
          )
        : [];
    }
  } catch (e) {
    storage = false;
  }
  function save() {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      storage = false;
      warn();
    }
  }
  function warn() {
    if (!storage && !document.getElementById("storage-warning"))
      main.prepend(
        el(
          "p",
          "Browser storage is unavailable. Your progress may not be saved.",
          { id: "storage-warning", class: "notice error", role: "status" },
        ),
      );
  }
  if (!data || !Array.isArray(data.lessons) || !data.lessons.length) {
    main.replaceChildren(
      el("h1", "Automata Study Pack"),
      el(
        "p",
        "Study material is not available yet. Please check that content.js is present and loaded.",
      ),
    );
    return;
  }
  const lessons = data.lessons,
    lesson = lessons.find((l) => l.id === params.get("lesson")),
    page = main.dataset.page;
  const time = (s) =>
    `${Math.floor((s || 0) / 60)}:${String(Math.floor((s || 0) % 60)).padStart(2, "0")}`;
  function figure(id) {
    const d = data.diagrams && data.diagrams[id];
    if (!d) return document.createDocumentFragment();
    const f = el("figure");
    if (d.src)
      add(
        f,
        el("img", null, { src: d.src, alt: d.description || d.title || "" }),
      );
    if (d.title) add(f, el("figcaption", d.title));
    if (d.provenance)
      f.append(el("p", d.provenance, { class: "muted figure-source" }));
    if (d.table) {
      const t = d.table,
        wrap = el("div", null, {
          class: "scroll",
          tabindex: "0",
          role: "region",
          "aria-label": "Transition table; scroll horizontally for all columns",
        }),
        table = el("table"),
        head = el("tr");
      ["State", ...(t.alphabet || [])].forEach((x) =>
        head.append(el("th", x, { scope: "col" })),
      );
      table.append(head);
      (t.rows || []).forEach((row) => {
        const tr = el("tr");
        tr.append(el("th", row.state, { scope: "row" }));
        (row.targets || []).forEach((x) => tr.append(el("td", x)));
        table.append(tr);
      });
      f.append(
        el(
          "p",
          "Transition table: → start; * accepting. Scroll sideways for all columns.",
          { class: "muted figure-source" },
        ),
      );
      wrap.append(table);
      f.append(wrap);
    }
    f.append(link("View full-size diagram", d.src));
    f.lastChild.setAttribute("target", "_blank");
    f.lastChild.setAttribute("rel", "noopener");
    f.append(
      link(
        "Download machine (.afjson)",
        `diagrams/${encodeURIComponent(id)}.afjson`,
      ),
    );
    f.lastChild.setAttribute("download", "");
    return f;
  }
  function home() {
    main.replaceChildren(
      el("h1", "Automata Study Pack"),
      el(
        "p",
        "Study each lesson, then practice with a quiz. Your progress stays in this browser on this device.",
      ),
    );
    const progress = el("section", null, { id: "progress" });
    add(
      progress,
      el("h2", "Your progress"),
      el(
        "p",
        `${lessons.filter((l) => state.completed[l.id]).length} of ${lessons.length} lessons marked complete.`,
      ),
    );
    main.append(progress, el("h2", "Lessons"));
    lessons.forEach((l) => {
      const a = link(
        `Lesson ${l.number}: ${l.title}`,
        `lesson.html?lesson=${encodeURIComponent(l.id)}`,
        "card",
      );
      a.append(
        el("span", state.completed[l.id] ? "Completed" : "Not completed"),
      );
      a.append(
        el(
          "span",
          `${time(l.duration)} video · ${l.questions.length} practice questions`,
        ),
      );
      const attempt = state.attempts[l.id];
      if (
        attempt &&
        Array.isArray(attempt.items) &&
        attempt.answers &&
        typeof attempt.answers === "object"
      ) {
        const answered = attempt.items.filter(
          (item) => item && Number.isInteger(attempt.answers[item.questionId]),
        ).length;
        a.append(
          el(
            "span",
            `${attempt.submitted ? "Quiz submitted" : "Quiz in progress"}: ${answered}/${attempt.items.length} answered`,
          ),
        );
      }
      main.append(a);
    });
    main.append(
      el("h2", "Final exam"),
      link("Choose your final exam settings", "quiz.html?lesson=final", "card"),
    );
    main.append(
      el("h2", "Practice with AutomataStudio"),
      el(
        "p",
        "Each figure includes a machine download. Open it in AutomataStudio to simulate strings, inspect transitions, or try minimization.",
      ),
      link(
        "Open AutomataStudio",
        "https://tanjifried.github.io/automata-studio/",
      ),
    );
    if (state.history.length) {
      main.append(el("h2", "Recent attempts"));
      state.history
        .slice(-10)
        .reverse()
        .forEach((h) =>
          main.append(el("p", `${h.title}: ${h.score}/${h.total} · ${h.date}`)),
        );
    }
    warn();
  }
  function lessonPage() {
    if (!lesson) {
      main.replaceChildren(
        el("h1", "Lesson not found"),
        link("Return to Automata", "index.html"),
      );
      return;
    }
    main.replaceChildren(
      el("h1", `Lesson ${lesson.number}: ${lesson.title}`),
      el("p", lesson.overview),
    );
    main.append(el("h2", "Learning objectives"));
    const ul = el("ul");
    (lesson.objectives || []).forEach((x) => ul.append(el("li", x)));
    main.append(
      ul,
      link(
        "Take this lesson’s quiz",
        `quiz.html?lesson=${encodeURIComponent(lesson.id)}`,
        "button",
      ),
    );
    const nav = el("nav", null, { "aria-label": "Lesson sections" });
    (lesson.segments || []).forEach((s) =>
      nav.append(link(s.title, `#${encodeURIComponent(s.id)}`)),
    );
    main.append(nav);
    (lesson.segments || []).forEach((s) => {
      const section = el("section", null, { id: s.id, class: "segment" });
      add(
        section,
        el("h2", s.title),
        link(
          `Watch source at ${time(s.start)}`,
          `https://www.youtube.com/watch?v=${encodeURIComponent(lesson.videoId)}&t=${Math.floor(s.start || 0)}s`,
        ),
      );
      const load = el("button", "Load video here", {
        type: "button",
        class: "secondary",
      });
      load.onclick = () => {
        const frame = el("iframe", null, {
          title: `${s.title} source video`,
          src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(lesson.videoId)}?start=${Math.floor(s.start || 0)}`,
          allow:
            "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
          allowfullscreen: "",
        });
        load.replaceWith(frame);
      };
      section.append(document.createTextNode(" "), load);
      (s.notes || []).forEach((x) => section.append(el("p", x)));
      if (s.diagram) section.append(figure(s.diagram));
      if (s.visualDescription) section.append(el("p", s.visualDescription));
      if (s.workedSteps && s.workedSteps.length) {
        section.append(el("h3", "Worked steps"));
        const list = el("ol");
        s.workedSteps.forEach((x) => list.append(el("li", x)));
        section.append(list);
      }
      if (s.caution) section.append(el("p", s.caution, { class: "notice" }));
      main.append(section);
    });
    main.append(el("h2", "Key terms"));
    (lesson.keyTerms || []).forEach((t) =>
      main.append(el("p", `${t.term}: ${t.definition}`)),
    );
    for (const [heading, items] of [
      ["Recap", lesson.recap],
      ["Common mistakes", lesson.commonMistakes],
    ]) {
      main.append(el("h2", heading));
      const list = el("ul");
      (items || []).forEach((x) => list.append(el("li", x)));
      main.append(list);
    }
    const notes = el("details");
    add(
      notes,
      el("summary", "Search speaker notes (Taglish paraphrases, not verbatim)"),
      el(
        "p",
        "These timestamped notes paraphrase the speaker; they are not a transcript.",
      ),
    );
    const search = el("input", null, {
        type: "search",
        placeholder: "Search speaker notes",
        "aria-label": "Search speaker notes",
      }),
      list = el("div");
    notes.append(search, list);
    const render = () => {
      list.replaceChildren();
      (lesson.segments || [])
        .filter((s) =>
          (s.title + " " + s.speakerNotes)
            .toLowerCase()
            .includes(search.value.toLowerCase()),
        )
        .forEach((s) => {
          const p = el("p");
          add(
            p,
            link(
              `${time(s.start)} · ${s.title}`,
              `https://www.youtube.com/watch?v=${encodeURIComponent(lesson.videoId)}&t=${Math.floor(s.start || 0)}s`,
            ),
            document.createTextNode(` — ${s.speakerNotes || ""}`),
          );
          list.append(p);
        });
    };
    search.oninput = render;
    render();
    main.append(
      notes,
      el(
        "p",
        lesson.provenance ||
          "Source interpretation may be uncertain; consult the linked video for context.",
        { class: "muted" },
      ),
    );
    const done = el(
      "button",
      state.completed[lesson.id] ? "Marked complete" : "Mark lesson complete",
    );
    done.onclick = () => {
      state.completed[lesson.id] = true;
      save();
      done.textContent = "Marked complete";
    };
    main.append(
      done,
      document.createTextNode(" "),
      link(
        "Take lesson quiz",
        `quiz.html?lesson=${encodeURIComponent(lesson.id)}`,
        "button",
      ),
    );
    warn();
  }
  function quiz() {
    const final = params.get("lesson") === "final",
      selected = final ? null : lesson;
    if (!final && !selected) {
      main.replaceChildren(
        el("h1", "Quiz not found"),
        link("Return to Automata", "index.html"),
      );
      return;
    }
    const bank = final
        ? lessons.flatMap((l) => (l.questions || []).map((q) => ({ q, l })))
        : (selected.questions || []).map((q) => ({ q, l: selected })),
      id = final ? "final" : selected.id;
    main.replaceChildren(
      el("h1", final ? "Final exam" : `${selected.title} quiz`),
    );
    if (!bank.length) {
      main.append(el("p", "Questions are not available yet."));
      return;
    }
    let attempt = state.attempts[id];
    let invalidAttempt = false;
    const validAttempt = (a) => {
      if (
        !a ||
        typeof a !== "object" ||
        Array.isArray(a) ||
        !Array.isArray(a.items) ||
        !a.items.length ||
        a.items.length > bank.length ||
        !a.answers ||
        typeof a.answers !== "object" ||
        Array.isArray(a.answers) ||
        typeof a.instant !== "boolean" ||
        typeof a.submitted !== "boolean" ||
        a.version !== data.version
      )
        return false;
      const seen = new Set();
      for (const item of a.items) {
        if (!item || typeof item !== "object") return false;
        const entry = bank.find(
          ({ l, q }) => l.id === item.lessonId && q.id === item.questionId,
        );
        if (!entry || seen.has(item.questionId)) return false;
        seen.add(item.questionId);
        if (
          Object.hasOwn(a.answers, item.questionId) &&
          (!Number.isInteger(a.answers[item.questionId]) ||
            a.answers[item.questionId] < 0 ||
            a.answers[item.questionId] >= entry.q.choices.length)
        )
          return false;
        if (a.submitted && !Object.hasOwn(a.answers, item.questionId))
          return false;
      }
      return Object.keys(a.answers).every((key) => seen.has(key));
    };
    if (attempt && !validAttempt(attempt)) {
      invalidAttempt = true;
      attempt = null;
      delete state.attempts[id];
    }
    const start = () => {
      main.replaceChildren(
        el("h1", final ? "Final exam" : `${selected.title} quiz`),
      );
      if (invalidAttempt)
        main.append(
          el(
            "p",
            "The saved attempt is invalid or no longer matches the question bank. Start a new attempt.",
            { class: "notice", role: "status" },
          ),
        );
      if (attempt) {
        main.append(
          el(
            "p",
            `${Object.keys(attempt.answers).length} of ${attempt.items.length} answered.`,
          ),
        );
        const resume = el(
          "button",
          attempt.submitted ? "Review submitted attempt" : "Resume attempt",
        );
        resume.onclick = render;
        main.append(resume, document.createTextNode(" "));
      }
      const form = el("form");
      if (final) {
        const label = el("label", `Number of questions (1–${bank.length}) `),
          count = el("input", null, {
            type: "number",
            min: "1",
            max: String(bank.length),
            value: String(bank.length),
            required: "",
          });
        label.append(count);
        form.append(label, el("br"));
        const check = el("input", null, {
            type: "checkbox",
            id: "instant",
            checked: "",
          }),
          cl = el("label", " Show feedback immediately", { for: "instant" });
        form.append(check, cl);
        form.onsubmit = (e) => {
          e.preventDefault();
          const value = Number(count.value);
          if (!Number.isInteger(value) || value < 1 || value > bank.length) {
            count.setCustomValidity(
              `Enter a whole number from 1 to ${bank.length}.`,
            );
            count.reportValidity();
            count.setCustomValidity("");
            return;
          }
          begin(value, check.checked);
        };
      } else
        form.onsubmit = (e) => {
          e.preventDefault();
          begin(bank.length, true);
        };
      form.append(
        el("p", "Starting a new attempt replaces any unfinished attempt."),
        el("button", "Start new attempt", { type: "submit" }),
      );
      main.append(form);
      warn();
    };
    function begin(count, instant) {
      count = Math.max(
        1,
        Math.min(bank.length, Number.isInteger(count) ? count : bank.length),
      );
      const shuffled = [...bank];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      shuffled.length = count;
      invalidAttempt = false;
      attempt = {
        items: shuffled.map((x) => ({ lessonId: x.l.id, questionId: x.q.id })),
        answers: {},
        version: data.version,
        instant,
        submitted: false,
      };
      state.attempts[id] = attempt;
      save();
      render();
    }
    function render() {
      main.replaceChildren(
        el("h1", final ? "Final exam" : `${selected.title} quiz`),
      );
      const items = (attempt.items || [])
        .map((x) => {
          const l = lessons.find((y) => y.id === x.lessonId);
          return {
            l,
            q: l && (l.questions || []).find((q) => q.id === x.questionId),
          };
        })
        .filter((x) => x.q);
      if (!items.length) {
        attempt = null;
        start();
        return;
      }
      const form = el("form");
      items.forEach(({ l, q }, i) => {
        const fs = el("fieldset"),
          legend = el("legend", `${i + 1}. ${q.prompt}`);
        fs.append(legend);
        if (q.diagram) fs.append(figure(q.diagram));
        const feedback = el("div", null, { "aria-live": "polite" });
        const updateFeedback = () => {
          feedback.replaceChildren();
          if (
            (!attempt.instant && !attempt.submitted) ||
            !Number.isInteger(attempt.answers[q.id])
          )
            return;
          const correct = attempt.answers[q.id] === q.answer;
          feedback.append(
            el("p", `${correct ? "Correct." : "Incorrect."} ${q.explanation}`, {
              class: "feedback",
            }),
          );
          if (!correct)
            feedback.append(el("p", `Correct answer: ${q.choices[q.answer]}`));
        };
        (q.choices || []).forEach((choice, j) => {
          const label = el("label", null, { class: "choice" }),
            radio = el("input", null, {
              type: "radio",
              name: `q${i}`,
              value: String(j),
            });
          radio.checked = attempt.answers[q.id] === j;
          radio.disabled = !!attempt.submitted;
          radio.onchange = () => {
            attempt.answers[q.id] = j;
            save();
            updateFeedback();
          };
          label.append(radio, document.createTextNode(" " + choice));
          fs.append(label);
        });
        fs.append(
          link(
            `Review source: ${l.title}`,
            `lesson.html?lesson=${encodeURIComponent(l.id)}#${encodeURIComponent(q.segmentId)}`,
          ),
        );
        updateFeedback();
        fs.append(feedback);
        form.append(fs);
      });
      if (!attempt.submitted) {
        const status = el("p", "", { role: "status" });
        form.append(status, el("button", "Submit answers", { type: "submit" }));
        form.onsubmit = (e) => {
          e.preventDefault();
          if (items.some(({ q }) => !Number.isInteger(attempt.answers[q.id]))) {
            status.textContent =
              "Please answer every question before submitting.";
            const first = items.findIndex(
              ({ q }) => !Number.isInteger(attempt.answers[q.id]),
            );
            form
              .querySelectorAll("fieldset")
              [first].querySelector("input")
              .focus();
            return;
          }
          attempt.submitted = true;
          const score = items.filter(
            ({ q }) => attempt.answers[q.id] === q.answer,
          ).length;
          state.history.push({
            title: final ? "Final exam" : selected.title,
            score,
            total: items.length,
            date: new Date().toLocaleDateString(),
          });
          state.history = state.history.slice(-30);
          save();
          render();
          main.querySelector("[data-score]").focus();
        };
      } else {
        const score = items.filter(
          ({ q }) => attempt.answers[q.id] === q.answer,
        ).length;
        main.append(
          el("p", `Score: ${score} / ${items.length}`, {
            class: "notice",
            role: "status",
            tabindex: "-1",
            "data-score": "",
          }),
        );
      }
      main.append(form);
      const restart = el("button", "Restart / settings", {
        type: "button",
        class: "secondary",
      });
      restart.onclick = start;
      main.append(
        restart,
        document.createTextNode(" "),
        link("Back to Automata", "index.html"),
      );
      warn();
    }
    start();
  }
  if (page === "index") home();
  else if (page === "lesson") lessonPage();
  else quiz();
})();
