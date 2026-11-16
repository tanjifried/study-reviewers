"use strict";
const LESSONS = AUTOMATA_DATA.lessons.map((l) => ({
  ...l,
  subtitle: `${l.questions.length} questions · Automata Theory`,
  concepts: l.questions.map((q) => q.prompt),
  questions: l.questions.map((q) => ({
    ...q,
    lesson: l.id,
    kind: q.kind === "identification" ? "identification" : "mc",
    options:
      q.kind === "identification" ? [q.answer, "Unmatched term"] : q.choices,
    answer: q.kind === "identification" ? 0 : q.answer,
    concept: l.segments.find((s) => s.id === q.segmentId)?.title || l.title,
  })),
}));
function questionFigure(id) {
  const d = AUTOMATA_DATA.diagrams[id];
  if (!d) return "";
  const t = d.table;
  const table = t
    ? `<details><summary>Read transition table</summary><div class="diagram-table" tabindex="0"><table><thead><tr><th scope="col">State</th>${t.alphabet.map((x) => `<th scope="col">${esc(x)}</th>`).join("")}</tr></thead><tbody>${t.rows.map((row) => `<tr><th scope="row">${esc(row.state)}</th>${row.targets.map((x) => `<td>${esc(x)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></details>`
    : "";
  return `<figure><img src="${esc(d.src)}" alt="${esc(d.description)}"><figcaption>${esc(d.title)}</figcaption><p class="diagram-links"><a href="${esc(d.src)}" target="_blank" rel="noopener">View full-size diagram</a><a href="diagrams/${encodeURIComponent(id)}.afjson" download>Download machine</a></p>${table}</figure>`;
}

let combined = { completed: {}, attempts: {}, history: [] };
try {
  const old = JSON.parse(localStorage.getItem("automata-progress-v1") || "{}");
  if (old && typeof old === "object" && !Array.isArray(old))
    combined = { ...combined, ...old };
} catch {}
function syncCombined() {
  try {
    combined.attempts =
      combined.attempts && typeof combined.attempts === "object"
        ? combined.attempts
        : {};
    for (const [key, s] of Object.entries(saved)) {
      if (!valid(s)) continue;
      combined.attempts[key] = {
        items: s.ids.map((id) => ({
          lessonId: lookup[id].lesson,
          questionId: id,
        })),
        answers: s.answers,
        instant: s.feedback !== false,
        submitted: !!s.submitted,
        position: s.position || 0,
        attemptId: s.attemptId,
        version: AUTOMATA_DATA.version,
        typedAnswers: s.typedAnswers || {},
      };
    }
    combined.history = Object.entries(history).flatMap(([key, entries]) =>
      (Array.isArray(entries) ? entries : []).map((h) => ({
        title: key === "final" ? "Final exam" : getLesson(key)?.title || key,
        score: h.correct,
        total: h.total,
        date: new Date(h.completedAt).toLocaleDateString(),
      })),
    );
    localStorage.setItem("automata-progress-v1", JSON.stringify(combined));
  } catch {
    storageOK = false;
  }
}
const app = document.getElementById("app");
const KEY = "automata-quiz-v2",
  HISTORY_KEY = "automata-quiz-history-v2";
let history = {};
try {
  history = JSON.parse(localStorage.getItem(HISTORY_KEY) || "{}");
  if (!history || typeof history !== "object" || Array.isArray(history))
    history = {};
} catch (e) {
  history = {};
}
let saved = {},
  storageOK = true,
  active = null,
  index = 0,
  review = false;
try {
  saved = JSON.parse(localStorage.getItem(KEY) || "{}");
  if (!saved || typeof saved !== "object" || Array.isArray(saved)) saved = {};
} catch (e) {
  storageOK = false;
  saved = {};
}
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const all = LESSONS.flatMap((l) => l.questions),
  lookup = Object.fromEntries(all.map((q) => [q.id, q]));
const getLesson = (id) => LESSONS.find((l) => l.id === id);
const lectureSource = (l) => "lesson.html?lesson=" + encodeURIComponent(l.id);
function shuffle(a) {
  a = [...a];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function persist() {
  syncCombined();
  try {
    localStorage.setItem(KEY, JSON.stringify(saved));
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    storageOK = false;
  }
}
function attemptId() {
  return (
    Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 11)
  );
}
function recordCompleted(key) {
  const s = saved[key];
  if (!valid(s)) return;
  const st = stats(s);
  if (key === "final" && s.feedback === false && !s.submitted) return;
  if (
    st.answered !== st.total &&
    !(key === "final" && s.feedback === false && s.submitted)
  )
    return;
  if (!s.attemptId) s.attemptId = attemptId();
  if (!Array.isArray(history[key])) history[key] = [];
  if (!history[key].some((x) => x.id === s.attemptId))
    history[key].push({
      id: s.attemptId,
      correct: st.correct,
      total: st.total,
      completedAt: new Date().toISOString(),
    });
  persist();
}
function selectedQuestions(l) {
  return l.questions;
}
function historyText(key) {
  const h = Array.isArray(history[key]) ? history[key] : [];
  if (!h.length) return "";
  const latest = h[h.length - 1],
    best = h.reduce((a, b) =>
      b.correct / b.total > a.correct / a.total ? b : a,
    );
  return `${h.length} completed attempt${h.length === 1 ? "" : "s"} · Latest ${latest.correct}/${latest.total} (${Math.round((latest.correct / latest.total) * 100)}%) · Best ${Math.round((best.correct / best.total) * 100)}%`;
}
function stats(s) {
  const qs = s.ids.map((id) => lookup[id]);
  const answered = qs.filter((q) => Number.isInteger(s.answers[q.id]));
  return {
    total: qs.length,
    answered: answered.length,
    correct: answered.filter((q) => s.answers[q.id] === q.answer).length,
  };
}
function valid(s) {
  return (
    s &&
    typeof s === "object" &&
    !Array.isArray(s) &&
    Array.isArray(s.ids) &&
    s.ids.length &&
    new Set(s.ids).size === s.ids.length &&
    s.ids.every((id) => lookup[id]) &&
    s.answers &&
    typeof s.answers === "object" &&
    !Array.isArray(s.answers) &&
    Object.entries(s.answers).every(
      ([id, a]) =>
        s.ids.includes(id) &&
        Number.isInteger(a) &&
        a >= 0 &&
        a < lookup[id].options.length,
    ) &&
    (s.version === AUTOMATA_DATA.version ||
      (AUTOMATA_DATA.compatibleVersions || []).includes(s.version))
  );
}

let formatUpdated = false;
for (const [key, old] of Object.entries(combined.attempts || {})) {
  if (saved[key] || !old || !Array.isArray(old.items) || !old.answers) continue;
  const changed = old.version === "fce2731284cbda61";
  if (
    !changed &&
    old.version !== AUTOMATA_DATA.version &&
    !(AUTOMATA_DATA.compatibleVersions || []).includes(old.version)
  )
    continue;
  const ids = old.items
    .map((x) => x && x.questionId)
    .map((id) =>
      lookup[id] ? id : changed && lookup[id + "-id"] ? id + "-id" : null,
    );
  if (!ids.length || ids.some((id) => !id) || new Set(ids).size !== ids.length)
    continue;
  const answers = Object.fromEntries(
    Object.entries(old.answers).filter(
      ([id, a]) =>
        ids.includes(id) &&
        lookup[id] &&
        Number.isInteger(a) &&
        a >= 0 &&
        a < lookup[id].options.length &&
        (!changed || lookup[id].kind === "mc"),
    ),
  );
  saved[key] = {
    ids,
    answers,
    typedAnswers: old.typedAnswers || {},
    position: Math.min(old.position || 0, ids.length - 1),
    attemptId:
      (old.attemptId || attemptId()) + (changed ? "-identification" : ""),
    count: ids.length,
    feedback: old.instant !== false,
    submitted: !!old.submitted && Object.keys(answers).length === ids.length,
    version: AUTOMATA_DATA.version,
  };
  if (changed) formatUpdated = true;
}

const legacyHistory = {};
for (const [i, h] of (Array.isArray(combined.history)
  ? combined.history
  : []
).entries()) {
  const key =
    h?.title === "Final exam"
      ? "final"
      : LESSONS.find((l) => l.title === h?.title)?.id;
  if (!key || !Number.isFinite(h.score) || !h.total) continue;
  (legacyHistory[key] ??= []).push({
    id: "legacy-" + key + "-" + i,
    correct: h.score,
    total: h.total,
    completedAt: Number.isFinite(Date.parse(h.date))
      ? new Date(h.date).toISOString()
      : new Date().toISOString(),
  });
}
for (const [key, entries] of Object.entries(legacyHistory))
  if (!history[key]?.length) history[key] = entries;

for (const key of Object.keys(saved)) {
  if (!valid(saved[key])) delete saved[key];
  else {
    if (!saved[key].attemptId) saved[key].attemptId = attemptId();
    recordCompleted(key);
  }
}
persist();
function courseStats() {
  const total = LESSONS.reduce(
    (n, l) =>
      n +
      (valid(saved[l.id])
        ? stats(saved[l.id]).total
        : selectedQuestions(l).length),
    0,
  );
  let answered = 0;
  LESSONS.forEach((l) => {
    if (valid(saved[l.id])) answered += stats(saved[l.id]).answered;
  });
  return `${answered} / ${total} lesson questions answered`;
}
function label(key) {
  const s = saved[key];
  if (!valid(s)) return "Start quiz";
  return s.feedback === false && !s.submitted
    ? "Continue exam"
    : stats(s).answered === s.ids.length || s.submitted
      ? "View results"
      : "Continue quiz";
}
function dashboard() {
  active = null;
  review = false;
  const concepts = LESSONS.reduce((n, l) => n + l.concepts.length, 0);
  app.innerHTML = `<div class="intro-grid"><section><h1>Learn it. Test it. Understand it.</h1><p class="intro">Work through each lesson at your own pace. Every answer reveals the correct choice, an explanation, and the relevant lesson notes and source frame.</p><p class="quiet">${LESSONS.length} lessons · ${LESSONS.reduce((n, l) => n + selectedQuestions(l).length, 0)} practice questions<br>Multiple choice and typed identification in each lesson.</p></section><section class="exam"><h2>Final exam</h2><p>Choose up to ${concepts} questions across all ${LESSONS.length} lessons. Choose whether feedback appears after each answer or after submission.</p><div class="actions"><button class="btn" data-setup>Set up final exam</button>${valid(saved.final) ? `<button class="btn secondary" data-final-resume>${label("final")}</button>` : ""}</div>${valid(saved.final) ? `<p class="quiet" style="color:#dfebdf;margin:16px 0 0">${stats(saved.final).answered} / ${stats(saved.final).total} answered</p>` : ""}</section></div><div class="section-head"><h2>Your lessons</h2><span class="quiet">${courseStats()}</span></div>${LESSONS.map(
    (l, i) => {
      const s = saved[l.id],
        st = valid(s) ? stats(s) : null;
      return `<article class="lesson-row"><div class="num">${i + 1}</div><div><h3>${esc(l.title)}</h3><p>${esc(l.subtitle)}</p><p>${l.questions.filter((q) => q.kind === "mc").length} multiple choice · ${l.questions.filter((q) => q.kind === "identification").length} identification <a class="source" href="${lectureSource(l)}">Read lesson</a></p>${st ? `<p>${st.answered}/${st.total} answered · ${st.correct} correct${st.answered === st.total ? " · " + Math.round((st.correct / st.total) * 100) + "%" : ""}</p>` : ""}${historyText(l.id) ? `<p>${historyText(l.id)}</p>` : ""}${st && st.total !== selectedQuestions(l).length ? "<p>Earlier attempt: original question count. A new attempt uses fewer true/false questions.</p>" : ""}</div><button class="btn secondary" data-start="${l.id}">${label(l.id)}</button></article>`;
    },
  ).join(
    "",
  )}<p class="save-note">Progress saves in this browser when local storage is available. Completed scores and current attempts stay in this browser, including when you start again. ${storageOK ? "" : "Storage is unavailable; keep this tab open to preserve this session."}</p>`;
  app
    .querySelectorAll("[data-start]")
    .forEach((b) => (b.onclick = () => start(b.dataset.start)));
  app.querySelector("[data-setup]").onclick = setupFinal;
  const resumeFinal = app.querySelector("[data-final-resume]");
  if (resumeFinal) resumeFinal.onclick = () => start("final");
  window.scrollTo(0, 0);
}
function makeIds(key, count) {
  if (key !== "final")
    return shuffle(getLesson(key).questions.map((q) => q.id));
  const groups = shuffle(
    LESSONS.map((l) => shuffle(l.questions.map((q) => q.id))),
  );
  const pool = [];
  while (groups.some((g) => g.length))
    for (const g of groups) if (g.length) pool.push(g.pop());
  return shuffle(pool.slice(0, count || pool.length));
}

function setupFinal() {
  active = null;
  const max = LESSONS.reduce((n, l) => n + l.concepts.length, 0),
    previous = valid(saved.final) ? saved.final : null,
    count = previous && Number.isInteger(previous.count) ? previous.count : max,
    feedback = previous ? previous.feedback !== false : true;
  app.innerHTML = `<div class="quiz-shell"><h1>Final exam setup</h1><p class="intro">Choose the number of questions and when to see feedback. Your existing attempt stays saved until you start a new one.</p><form id="exam-setup" class="summary"><label class="setup-field">Number of questions (1–${max})<input id="final-count" type="number" min="1" max="${max}" step="1" required value="${count}"></label><label class="setup-field"><input id="final-instant" type="checkbox" ${feedback ? "checked" : ""}>Show feedback after each answer</label><div class="actions"><button class="btn" id="final-start" type="submit">Start exam</button>${previous ? '<button class="btn secondary" type="button" id="final-resume">Resume existing attempt</button>' : ""}<button class="home" type="button" id="cancel-setup">All lessons</button></div></form></div>`;
  document.getElementById("exam-setup").onsubmit = (e) => {
    e.preventDefault();
    const count = Number(document.getElementById("final-count").value);
    if (!Number.isInteger(count) || count < 1 || count > max) return;
    const show = document.getElementById("final-instant").checked;
    recordCompleted("final");
    saved.final = {
      ids: makeIds("final", count),
      answers: {},
      position: 0,
      attemptId: attemptId(),
      version: AUTOMATA_DATA.version,
      count,
      feedback: show,
      submitted: false,
    };
    persist();
    start("final");
  };
  const resume = document.getElementById("final-resume");
  if (resume) resume.onclick = () => start("final");
  document.getElementById("cancel-setup").onclick = dashboard;
  window.scrollTo(0, 0);
}
function start(key, fresh = false) {
  active = key;
  review = false;
  if (key === "final" && !valid(saved.final)) {
    setupFinal();
    return;
  }
  if (fresh || !valid(saved[key])) {
    if (fresh) recordCompleted(key);
    saved[key] = {
      ids: makeIds(key),
      answers: {},
      position: 0,
      attemptId: attemptId(),
      version: AUTOMATA_DATA.version,
    };
    persist();
  }
  const s = saved[key];
  index = Number.isInteger(s.position)
    ? Math.min(Math.max(0, s.position), s.ids.length - 1)
    : 0;
  const deferred = key === "final" && s.feedback === false;
  if (s.submitted || (!deferred && stats(s).answered === s.ids.length))
    results();
  else {
    if (!deferred) {
      const first = s.ids.findIndex((id) => !Number.isInteger(s.answers[id]));
      if (Number.isInteger(s.answers[s.ids[index]])) index = first;
    }
    renderQuestion();
  }
  window.scrollTo(0, 0);
}
function renderQuestion() {
  const s = saved[active],
    st = stats(s),
    q = lookup[s.ids[index]],
    l = getLesson(q.lesson),
    chosen = s.answers[q.id],
    answered = Number.isInteger(chosen),
    deferred = active === "final" && s.feedback === false && !s.submitted,
    reveal = !deferred,
    locked = answered && reveal;
  s.position = index;
  persist();
  app.innerHTML = `<div class="quiz-shell"><div class="quiz-head"><div><h1>${active === "final" ? "Final exam" : esc(l.title)}</h1><div class="quiet">${active === "final" ? esc(l.title) + " · " : ""}${esc(l.subtitle)}</div></div><div class="quiet">${deferred ? st.answered + " answered" : st.correct + " correct / " + st.answered + " answered"}</div></div><div class="progress" role="progressbar" aria-label="Answered questions" aria-valuenow="${st.answered}" aria-valuemin="0" aria-valuemax="${st.total}"><span style="width:${(st.answered / st.total) * 100}%"></span></div><div class="status"><span>Question ${index + 1} of ${st.total}</span><span>${st.answered} answered · ${st.total - st.answered} remaining</span></div><section class="question" aria-labelledby="prompt"><div class="type">${q.kind === "identification" ? "Identification · Type the term or name" : "Multiple choice · Choose one answer"}</div><h2 id="prompt">${esc(q.prompt)}</h2>${questionFigure(q.diagram)}${q.kind === "identification" ? identificationForm(q, s, locked || s.submitted, deferred) : `<div class="options">${q.options.map((o, i) => `<button class="option ${deferred ? (i === chosen ? "selected" : "") : answered || s.submitted ? (i === q.answer ? "correct" : i === chosen ? "incorrect" : "") : ""}" data-option="${i}" ${locked || s.submitted ? "disabled" : ""}><span class="letter">${q.kind === "mc" ? String.fromCharCode(65 + i) : i === 0 ? "T" : "F"}</span><span>${esc(o)}${reveal && (answered || s.submitted) && i === q.answer ? '<span class="choice-label">Correct answer' + (chosen === i ? " · Your choice" : "") + "</span>" : reveal && answered && i === chosen ? '<span class="choice-label">Your choice · Incorrect</span>' : ""}</span></button>`).join("")}</div>`}<div id="feedback" aria-live="polite" aria-atomic="true">${reveal && (answered || s.submitted) ? feedback(q, chosen) : ""}</div></section><div class="nav"><button class="btn secondary" id="prev" ${index === 0 ? "disabled" : ""}>Previous</button><button class="home" id="submit-exam">${deferred ? "Submit exam" : st.answered === st.total ? "View results" : "Progress & results"}</button><button class="btn" id="next">${index === st.total - 1 ? (deferred ? "Submit exam" : "View results") : "Next question"}</button></div><details><summary>Jump to a question</summary><p class="quiet">${deferred ? "Blue: answered · white: unanswered" : "Green: correct · peach: incorrect · white: unanswered"}</p><div class="jump">${s.ids.map((id, i) => `<button class="${i === index ? "current " : ""}${Number.isInteger(s.answers[id]) ? (deferred ? "selected" : s.answers[id] === lookup[id].answer ? "done" : "miss") : ""}" aria-label="Question ${i + 1}${Number.isInteger(s.answers[id]) ? (deferred ? ", answered" : s.answers[id] === lookup[id].answer ? ", correct" : ", incorrect") : ", unanswered"}" ${i === index ? 'aria-current="step"' : ""} data-jump="${i}">${i + 1}</button>`).join("")}</div></details><p class="save-note">${deferred ? "You can change answers until you submit the exam." : "Your first submitted answer is scored and locked. Use “Start a new attempt” in results to try again."}${storageOK ? "" : " Progress cannot be saved to this browser."}</p></div>`;
  if (formatUpdated) {
    const note = document.createElement("p");
    note.className = "notice";
    note.setAttribute("role", "status");
    note.textContent =
      "Identification has been added. Your earlier multiple-choice progress and scores are retained; the new typed items need answers.";
    app.prepend(note);
  }
  const identification = document.getElementById("identification-form");
  const typedInput = document.getElementById("typed-answer");
  if (typedInput)
    typedInput.addEventListener("input", () =>
      typedInput.setCustomValidity(""),
    );
  if (identification)
    identification.onsubmit = (e) => {
      e.preventDefault();
      const input = document.getElementById("typed-answer");
      const text = input.value.trim();
      if (!normalizeTerm(text)) {
        input.setCustomValidity("Type the term or name.");
        input.reportValidity();
        return;
      }
      s.typedAnswers ??= {};
      s.typedAnswers[q.id] = text;
      answer(
        q.acceptedAnswers.some((a) => normalizeTerm(a) === normalizeTerm(text))
          ? 0
          : 1,
      );
    };
  app
    .querySelectorAll("[data-option]")
    .forEach((b) => (b.onclick = () => answer(Number(b.dataset.option))));
  app.querySelectorAll("[data-jump]").forEach(
    (b) =>
      (b.onclick = () => {
        index = Number(b.dataset.jump);
        renderQuestion();
        window.scrollTo(0, 0);
      }),
  );
  document.getElementById("prev").onclick = () => {
    if (index > 0) {
      index--;
      renderQuestion();
      window.scrollTo(0, 0);
    }
  };
  document.getElementById("next").onclick = () => {
    if (index < s.ids.length - 1) {
      index++;
      renderQuestion();
      window.scrollTo(0, 0);
    } else if (deferred) submitFinal();
    else results();
  };
  document.getElementById("submit-exam").onclick = deferred
    ? submitFinal
    : results;
}
function normalizeTerm(value) {
  return String(value || "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/ε/g, "epsilon")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}
function identificationForm(q, s, locked, deferred) {
  return `<p class="quiet">${esc(q.definitionLabel || "Preserved source definition")}</p><form id="identification-form"><label for="typed-answer">Term or name</label><input id="typed-answer" type="text" maxlength="200" autocomplete="off" autocapitalize="none" spellcheck="false" required value="${esc(s.typedAnswers?.[q.id] || "")}" ${locked ? "disabled" : ""}><button class="btn" type="submit" ${locked ? "disabled" : ""}>${deferred ? "Save answer" : "Check answer"}</button></form>`;
}
function feedback(q, chosen) {
  const l = getLesson(q.lesson),
    correct = chosen === q.answer;
  return `<div class="feedback ${correct ? "" : "wrong"}"><strong>${Number.isInteger(chosen) ? (correct ? "Correct." : "Incorrect.") : "Unanswered."} Correct answer: ${esc(q.options[q.answer])}</strong>${q.kind === "identification" ? `<p>You typed: ${esc(saved[active].typedAnswers?.[q.id] || "No answer")}</p>` : ""}<p>${esc(q.explanation)}</p>${correct ? '<p class="quiet">Press Enter for the next question.</p>' : ""}<a href="${lectureSource(l)}#${encodeURIComponent(q.segmentId)}">Review ${esc(l.title)} — lesson notes and source frames</a>${q.sourceFrame ? `<details><summary>See the preserved definition in its source frame</summary><img class="definition-frame" src="${esc(q.sourceFrame)}" alt="Source frame containing the definition at ${Math.floor(q.sourceSeconds / 60)}:${String(q.sourceSeconds % 60).padStart(2, "0")}" loading="lazy"></details>` : ""}</div>`;
}

function answer(choice) {
  const s = saved[active],
    q = lookup[s.ids[index]];
  if (
    Number.isInteger(s.answers[q.id]) &&
    !(active === "final" && s.feedback === false && !s.submitted)
  )
    return;
  s.answers[q.id] = choice;
  recordCompleted(active);
  persist();
  renderQuestion();
  if (!(active === "final" && s.feedback === false && !s.submitted)) {
    const box = document.getElementById("feedback");
    box.setAttribute("tabindex", "-1");
    box.focus({ preventScroll: true });
  }
}
function submitFinal() {
  const s = saved.final,
    remaining = stats(s).total - stats(s).answered;
  if (
    remaining &&
    !confirm(
      `You have ${remaining} unanswered question${remaining === 1 ? "" : "s"}. Submit the exam anyway?`,
    )
  )
    return;
  s.submitted = true;
  recordCompleted("final");
  persist();
  results();
}
function results() {
  if (
    active === "final" &&
    saved.final.feedback === false &&
    !saved.final.submitted
  ) {
    submitFinal();
    return;
  }
  recordCompleted(active);
  const s = saved[active],
    st = stats(s),
    complete = st.answered === st.total || !!s.submitted,
    missed = s.ids.filter(
      (id) =>
        Number.isInteger(s.answers[id]) && s.answers[id] !== lookup[id].answer,
    ),
    pct =
      st.answered || s.submitted
        ? Math.round(
            (st.correct / (s.submitted ? st.total : st.answered)) * 100,
          )
        : 0;
  app.innerHTML = `<div class="quiz-shell"><h1>${complete ? "Attempt complete" : "Your progress"}</h1><p class="intro">${active === "final" ? "Final exam" : esc(getLesson(active).title)} · ${st.answered} of ${st.total} answered</p><section class="summary"><div class="score">${st.correct} / ${complete ? st.total : st.answered}</div><p>${s.submitted ? pct + "% correct out of all questions." : st.answered ? pct + "% correct on answered questions." : "No questions answered yet."} ${!complete ? `${st.total - st.answered} questions remain; this is a partial result.` : ""}</p>${historyText(active) ? `<p>${historyText(active)}</p>` : ""}<div class="actions">${!complete ? '<button class="btn" id="resume">Continue unanswered questions</button>' : ""}<button class="btn ${complete ? "" : "secondary"}" id="review">Review answers</button><button class="btn secondary" id="restart">Start a new attempt</button></div></section>${
    active === "final"
      ? `<h2>By lesson</h2><table><thead><tr><th>Lesson</th><th>Correct / answered / total</th></tr></thead><tbody>${LESSONS.map(
          (l) => {
            const ids = s.ids.filter((id) => lookup[id].lesson === l.id),
              a = ids.filter((id) => Number.isInteger(s.answers[id])),
              c = a.filter((id) => s.answers[id] === lookup[id].answer);
            return `<tr><td>${esc(l.title)}</td><td>${c.length} / ${a.length} / ${ids.length}</td></tr>`;
          },
        ).join("")}</tbody></table>`
      : ""
  }<h2>${missed.length ? "Revisit these concepts" : "Review notes"}</h2><p class="quiet">${missed.length ? missed.length + " incorrect answers. Use the lesson references and source screenshots to revise." : complete ? (st.answered < st.total ? "Review your answers, including unanswered questions." : "You answered every question correctly. You can review your answers or begin a new attempt.") : "Your incorrect answers will appear here as you work."}</p>${missed
    .map((id) => {
      const q = lookup[id];
      return `<div class="review-item"><h3>${esc(q.concept)}</h3><p>${esc(q.prompt)}</p><p class="quiet">Your answer: ${esc(q.kind === "identification" ? s.typedAnswers?.[id] || "No answer" : q.options[s.answers[id]])}</p>${feedback(q, s.answers[id])}</div>`;
    })
    .join("")}</div>`;
  if (!complete)
    document.getElementById("resume").onclick = () => {
      index = s.ids.findIndex((id) => !Number.isInteger(s.answers[id]));
      renderQuestion();
      window.scrollTo(0, 0);
    };
  document.getElementById("review").onclick = () => {
    index = 0;
    renderQuestion();
    window.scrollTo(0, 0);
  };
  document.getElementById("restart").onclick = () => {
    if (active === "final") setupFinal();
    else if (
      confirm(
        "Start a new attempt? Your completed scores will remain in your progress history.",
      )
    )
      start(active, true);
  };
  window.scrollTo(0, 0);
}
document.addEventListener("keydown", (e) => {
  if (
    e.key !== "Enter" ||
    e.repeat ||
    !active ||
    !saved[active] ||
    !document.getElementById("next")
  )
    return;
  const target = e.target;
  if (
    target instanceof Element &&
    target.closest(
      'button,a,input,select,textarea,summary,[contenteditable="true"]',
    )
  )
    return;
  const s = saved[active],
    q = lookup[s.ids[index]];
  if (active === "final" && s.feedback === false && !s.submitted) return;
  if (q && s.answers[q.id] === q.answer) {
    e.preventDefault();
    document.getElementById("next").click();
  }
});
document.getElementById("home").onclick = dashboard;
dashboard();
const requested = new URLSearchParams(location.search).get("lesson");
if (requested === "final") setupFinal();
else if (requested && getLesson(requested)) start(requested);
