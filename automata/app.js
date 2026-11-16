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
    nav.append(link("Speaker notes", "#speaker-notes"));
    main.append(nav);
    (lesson.segments || []).forEach((s) => {
      const section = el("section", null, { id: s.id, class: "segment" });
      add(
        section,
        el("h2", s.title),
        el("p", `${time(s.start)}–${time(s.end)} · Lesson notes`, {
          class: "muted",
        }),
      );
      (s.frames || []).forEach((frame) => {
        const capture = el("figure", null, { class: "source-frame" });
        const full = link(null, frame.src);
        full.setAttribute("target", "_blank");
        full.setAttribute("rel", "noopener");
        full.append(
          el("img", null, {
            src: frame.src,
            alt: frame.alt,
            width: String(frame.width),
            height: String(frame.height),
            loading: "lazy",
            decoding: "async",
          }),
        );
        capture.append(
          full,
          el("figcaption", "Source frame · TeacherCat 4U · " + frame.caption),
        );
        section.append(capture);
      });
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
    const notes = el("details", null, { id: "speaker-notes" });
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
              `#${encodeURIComponent(s.id)}`,
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
      link(
        "Original video (optional reference)",
        `https://www.youtube.com/watch?v=${encodeURIComponent(lesson.videoId)}`,
      ),
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
  if (page === "index") home();
  else if (page === "lesson") lessonPage();
})();
