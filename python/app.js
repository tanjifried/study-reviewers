'use strict';
// Align question reporting with the supplied Pearson objectives, not internal topic labels.
for (const l of LESSONS) {
  for (const [i,q] of l.questions.entries()) {
    const o = q.objective;
    if (l.id === 'a1-1') q.objective = o === '1.1' ? '1.1' : '1.2';
    if (l.id === 'a1-2') q.objective = '1.2';
    if (l.id === 'a1-3') q.objective = i % 2 ? '1.4' : '1.3';
    if (l.area === 2) q.objective = l.id === 'a2-1' ? '2.1' : '2.2';
    if (l.area === 3) q.objective = l.id === 'a3-1' || o === '3.4' ? '3.1' : '3.2';
    if (l.area === 4) q.objective = l.id === 'a4-1' ? '4.1' : '4.2';
    if (l.id === 'a5-1') q.objective = '5.1';
    if (l.id === 'a5-2') q.objective = o === '5.4' ? '5.2' : '5.3';
    if (l.area === 6) q.objective = l.id === 'a6-1' ? '6.1' : '6.2';
  }
  l.objectives = [...new Set(l.questions.map(q => q.objective))].sort();
}
const MOCK = window.MOCK || {questions:[],cheatsheet:[]};
const KEY='python-exam-reviewer-v1';
let saved; try{saved=JSON.parse(localStorage.getItem(KEY))||{}}catch{saved={}}
saved.seen ||= {}; saved.missed ||= {}; saved.history ||= []; let run=null, timer=null;
const savedFinal = saved.finalSettings && typeof saved.finalSettings === 'object' ? saved.finalSettings : {};
const finalDefaults = {count:40, instant:false, timed:false};
const finalSettings = {
 count:Number.isInteger(savedFinal.count)&&savedFinal.count>=1&&savedFinal.count<=302?savedFinal.count:finalDefaults.count,
 instant:typeof savedFinal.instant==='boolean'?savedFinal.instant:finalDefaults.instant,
 timed:typeof savedFinal.timed==='boolean'?savedFinal.timed:finalDefaults.timed
};
const root=document.querySelector('#app');
function save(){try{localStorage.setItem(KEY,JSON.stringify(saved))}catch{}}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
// Question text mixes plain text, entities and <code>. Decode to plain text for code/select contexts.
function choiceText(value){
  const text=String(value).replace(/<\/?code\s*>/gi,'');
  const decoder=document.createElement('textarea');
  decoder.innerHTML=text.replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return decoder.value;
}
function choiceHTML(value){
  return String(value).split(/(<\/?code\s*>)/gi).map(part=>{
    if (/^<code\s*>$/i.test(part)) return '<code>';
    if (/^<\/code\s*>$/i.test(part)) return '</code>';
    return esc(choiceText(part));
  }).join('');
}

/* ---------- scoring helpers (shared by every question kind) ---------- */
function kindOf(q){return q.kind||(q.parts.length===1?'mc':'legacy')}
function answered(p,r){if(p.input)return r!=null&&String(r).trim()!=='';if(p.multi)return Array.isArray(r)&&r.length>0;return r!=null}
function partOK(p,r){
  if(p.input)return answered(p,r)&&[].concat(p.answer).some(a=>String(a).trim().toLowerCase()===String(r).trim().toLowerCase());
  if(p.multi)return Array.isArray(r)&&[...r].sort().join()===[...p.answer].sort().join();
  return r===p.answer;
}
// Multi-line choices (whole code blocks) keep their line breaks and indentation.
function optHTML(o){return String(o).includes('\n')?`<pre class="opt-code"><code>${esc(choiceText(o))}</code></pre>`:choiceHTML(o)}
function correctHTML(p){if(p.input)return esc([].concat(p.answer)[0]);if(p.multi)return p.answer.map(i=>optHTML(p.options[i])).join(' <span class="muted">and</span> ');return optHTML(p.options[p.answer])}
function responseHTML(p,r){if(!answered(p,r))return '<em>Unanswered</em>';if(p.input)return esc(r);if(p.multi)return r.map(i=>choiceHTML(p.options[i])).join(' and ');return choiceHTML(p.options[r])}
function scoreOf(q,r){return q.parts.filter((p,i)=>partOK(p,(r||[])[i])).length}

function all(){return LESSONS.flatMap(l=>l.questions.map(q=>({...q,lesson:l.id,area:l.area})))}
let mockSet='all';
function setOf(q){return q.set||'A'}
function mockAll(){return MOCK.questions.filter(q=>mockSet==='all'||setOf(q)===mockSet).map(q=>({...q,lesson:'mock',area:0}))}
function mockLabel(q){return `Set ${setOf(q)} · Q${q.number}`}
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function choose(pool,n){let ranked=shuffle(pool).sort((a,b)=>(saved.seen[a.id]||0)-(saved.seen[b.id]||0));let result=[];let objs=shuffle([...new Set(ranked.map(q=>q.objective))]);for(let obj of objs){let q=ranked.find(x=>x.objective===obj&&!result.includes(x));if(q&&result.length<n)result.push(q)}for(let q of ranked)if(result.length<n&&!result.includes(q))result.push(q);return shuffle(result)}
function reviewLink(q){return q.lesson==='mock'?`#mock-lesson/${q.id}`:`#lesson/${esc(q.lesson)}`}

/* ---------- pages ---------- */
function home(){root.innerHTML=`<div class="hero"><div class="eyebrow">Your self-paced study companion</div><h1>Python, one concept at a time.</h1><p>Study the exam objectives, work through exam-style code questions, and revisit the concepts that need another look.</p><div class="actions"><a class="button" href="#mock">Take the mock exam →</a><a class="button secondary" href="#final">Explore the final exam →</a></div></div>
<div class="tag">Mock exam</div><h2>Practise on the real mock</h2><p class="muted">${MOCK.questions.length} questions recreated from photos of a Pearson-style practice exam, with duplicates removed.</p><div class="grid"><a class="card" href="#mock"><div class="tag">Quiz</div><h3>Mock exam</h3><div class="meta">${MOCK.questions.length} questions in original order · check answers as you go →</div></a><a class="card" href="#mock-lesson"><div class="tag">Lesson</div><h3>Mock-exam lesson</h3><div class="meta">Each photo as a slide with a worked justification →</div></a><a class="card" href="#cheatsheet"><div class="tag">Notes</div><h3>Cheat sheet</h3><div class="meta">Syntax to remember and mistakes to avoid →</div></a></div>
<div class="tag" style="margin-top:36px">Your study path</div><h2>Choose a lesson</h2><p class="muted">Each lesson includes Python documentation sources and a bank of exam-style questions.</p><div class="grid">${LESSONS.map(l=>`<a class="card" href="#lesson/${esc(l.id)}"><div class="tag">Area ${l.area} · ${esc(l.objectives.join(', '))}</div><h3>${esc(l.title)}</h3><div class="meta">${l.questions.length} questions in the bank →</div></a>`).join('')}</div><h2>Put it all together</h2><a class="card" href="#final"><div class="tag">Mixed practice</div><h3>Custom-length final exam</h3><div class="meta">Choose the number of questions · all six areas · optional timer and feedback →</div></a>`}
function lesson(id){let l=LESSONS.find(x=>x.id===id);if(!l)return home();root.innerHTML=`<a href="#home">← All lessons</a><div class="tag">Area ${l.area} · ${esc(l.objectives.join(', '))}</div><h1>${esc(l.title)}</h1><p class="muted">Study the examples, then try a fresh selection of questions.</p>${l.sections.map(s=>`<section class="lesson-section"><h2>${esc(s.heading)}</h2>${s.body}</section>`).join('')}<section class="panel sources"><h3>Sources</h3><ul>${l.sources.map(s=>`<li><a target="_blank" rel="noopener" href="${esc(s.url)}">${esc(s.label)}</a></li>`).join('')}<li><a href="exam-objectives.pdf">Python exam objectives supplied for this reviewer</a></li></ul></section><div class="actions"><button id="start">Start 10-question quiz</button><button class="secondary" id="retry">Practice missed questions</button></div><p class="muted">${l.questions.length} questions in this lesson’s bank. First answers are scored; multi-part questions award partial credit.</p>`;document.querySelector('#start').onclick=()=>start(l.id,false,false);document.querySelector('#retry').onclick=()=>start(l.id,false,true)}
function finalSelection(pool,count){
 const byArea=new Map(Array.from({length:6},(_,i)=>[i+1,pool.filter(q=>q.area===i+1)]));
 let quotas;
 if(count===40) quotas=[7,7,7,7,6,6];
 else {
  quotas=[0,0,0,0,0,0];let left=count;
  // Round-robin allocations keep areas balanced. Shuffling each pass makes
  // small exams draw from a random subset of areas instead of always area 1.
  while(left){let order=shuffle([1,2,3,4,5,6]),added=false;
   for(const area of order){const i=area-1;if(quotas[i]<(byArea.get(area)||[]).length){quotas[i]++;left--;added=true;if(!left)break}}
   if(!added)break;
  }
 }
 const picked=[];
 for(let area=1;area<=6;area++) picked.push(...choose(byArea.get(area)||[],quotas[area-1]));
 return shuffle(picked);
}
function finalCountError(value,poolSize){
 if(value===''||value===null||value===undefined)return 'Enter a number of questions.';
 const n=typeof value==='number'?value:Number(value);
 if(!Number.isInteger(n))return 'Enter a whole number of questions.';
 if(n<1||n>poolSize)return `Enter a number from 1 to ${poolSize}.`;
 return '';
}
function finalPage(){const max=all().length;root.innerHTML=`<a href="#home">← All lessons</a><div class="tag">Mixed practice</div><h1>Final exam</h1><div class="panel"><p>Choose between 1 and ${max} questions across all six areas. The default is 40. Choose when to see feedback. Your personal target is 80%.</p><div class="final-count"><label for="final-count">Number of questions</label><input type="number" id="final-count" min="1" max="${max}" step="1" inputmode="numeric" value="${finalSettings.count}" required><span class="muted">1–${max} · default 40</span></div><p class="field-error" id="count-error" role="alert" aria-live="polite"></p><label><input type="checkbox" id="timed" ${finalSettings.timed?'checked':''}> Enable a 50-minute timer</label><label><input type="checkbox" id="instant" ${finalSettings.instant?'checked':''}> Show feedback after each answer</label><p class="muted">With immediate feedback, answers are locked after checking. Otherwise, feedback appears after submission.</p><div class="actions"><button id="start">Start final exam</button><button class="secondary" id="retry">Practice missed questions</button></div><p class="muted">The timer automatically submits when time runs out. This is a practice setting, not a claim about official exam timing.</p></div>`;document.querySelector('#start').onclick=()=>{const input=document.querySelector('#final-count'),error=finalCountError(input.value,max);document.querySelector('#count-error').textContent=error;if(error){input.setAttribute('aria-invalid','true');input.focus();return}input.removeAttribute('aria-invalid');const timed=document.querySelector('#timed').checked,instant=document.querySelector('#instant').checked;finalSettings.count=Number(input.value);finalSettings.timed=timed;finalSettings.instant=instant;saved.finalSettings={...finalSettings};save();start('final',timed,false,instant,finalSettings.count)};document.querySelector('#retry').onclick=()=>start('final',false,true)}
function mockPage(){const rec=MOCK.questions.filter(q=>q.reconstructed).length;root.innerHTML=`<a href="#home">← Home</a><div class="tag">Mock exam</div><h1>Mock exam</h1><div class="panel"><p>${MOCK.questions.length} unique questions recreated from photos of two Pearson-style mock exams, in their original order. Repeated questions (photographed twice, or appearing in both sets) are included only once.</p><fieldset class="set-pick"><legend>Which questions?</legend>${[['all',`Both sets (${MOCK.questions.length})`],['A',`Set A only (${MOCK.questions.filter(q=>setOf(q)==='A').length})`],['B',`Set B only (${MOCK.questions.filter(q=>setOf(q)==='B').length})`]].map(([v,t])=>`<label><input type="radio" name="mockset" value="${v}" ${mockSet===v?'checked':''}> ${t}</label>`).join('')}</fieldset><label><input type="checkbox" id="instant" checked> Check each answer as I go</label><label><input type="checkbox" id="timed"> Enable a 50-minute timer</label><p class="muted">With checking on, press <b>Check answer</b> to see the correct answer and why. With it off, everything is revealed after you submit.</p><div class="actions"><button id="start">Start mock exam</button><button class="secondary" id="retry">Practice missed questions</button></div><p class="muted">${rec} questions had drop-down lists or lines that were never visible in any photo. Those options were filled in with exam-style choices; the slide for each question says exactly what was reconstructed.</p></div><div class="grid" style="margin-top:20px"><a class="card" href="#mock-lesson"><div class="tag">Lesson</div><h3>Mock-exam lesson</h3><div class="meta">Walk through every answer, slide by slide →</div></a><a class="card" href="#cheatsheet"><div class="tag">Notes</div><h3>Cheat sheet</h3><div class="meta">Syntax and traps to remember →</div></a></div>`;root.querySelectorAll('[name=mockset]').forEach(r=>r.onchange=()=>{mockSet=r.value});document.querySelector('#start').onclick=()=>start('mock',document.querySelector('#timed').checked,false,document.querySelector('#instant').checked);document.querySelector('#retry').onclick=()=>start('mock',false,true,true)}

/* ---------- running a quiz ---------- */
function start(id,timed,missed,instant=false,count=40){
 let pool=id==='mock'?mockAll():all().filter(q=>id==='final'||q.lesson===id);
 if(missed)pool=pool.filter(q=>saved.missed[q.id]);
 if(!pool.length){alert('No missed questions to practice yet.');return}
 let picked;
 if(id==='mock')picked=pool;
 else if(id==='final'&&!missed){const error=finalCountError(count,pool.length);if(error){alert(error);return}picked=finalSelection(pool,Number(count));if(picked.length!==Number(count)||new Set(picked.map(q=>q.id)).size!==Number(count)){alert('Could not build a unique question set.');return}}
 else picked=choose(pool,missed?Math.min(10,pool.length):10);
 run={id,questions:picked,index:0,responses:{},checked:{},deadline:timed?Date.now()+50*60*1000:null,timed,missed,instant,count:Number(count)};
 for(let q of picked)saved.seen[q.id]=(saved.seen[q.id]||0)+1;save();
 if(timer)clearInterval(timer);
 if(timed)timer=setInterval(()=>{if(!run)return;if(Date.now()>=run.deadline){clearInterval(timer);finish();return}let t=document.querySelector('#clock');if(t)t.textContent=timeleft()},1000);
 question();
}
function delayed(){return (run.id==='final'||run.id==='mock')&&!run.missed&&!run.instant}
function timeleft(){let sec=Math.max(0,Math.ceil((run.deadline-Date.now())/1000));return `${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`}

// Renders the answer area for any question kind. `cur` is the live response array, mutated by the controls.
function answerArea(q,cur,locked){
 const k=kindOf(q),dis=locked?'disabled':'';
 if(k==='mc'){const p=q.parts[0];return `<fieldset class="exam-options"><legend>${choiceHTML(p.label||'Select one answer')}</legend>${p.options.map((o,j)=>`<label class="exam-option"><input type="radio" name="answer0" data-part="0" value="${j}" ${cur[0]===j?'checked':''} ${dis}><span><b class="letter">${'ABCDEFGH'[j]}.</b> ${optHTML(o)}</span></label>`).join('')}</fieldset>`}
 if(k==='multi'){const p=q.parts[0];return `<fieldset class="exam-options"><legend>${choiceHTML(p.label||'Choose all that apply.')}</legend>${p.options.map((o,j)=>`<label class="exam-option"><input type="checkbox" data-part="0" data-multi value="${j}" ${(cur[0]||[]).includes(j)?'checked':''} ${dis}><span><b class="letter">${'ABCDEFGH'[j]}.</b> ${optHTML(o)}</span></label>`).join('')}</fieldset>`}
 if(k==='tf'||k==='yesno'){const cols=q.parts[0].options;return `<table class="tf-grid"><thead><tr><th></th>${cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${q.parts.map((p,i)=>`<tr><td>${choiceHTML(p.label)}</td>${p.options.map((o,j)=>`<td><input type="radio" aria-label="${esc(choiceText(p.label))}: ${esc(o)}" name="answer${i}" data-part="${i}" value="${j}" ${cur[i]===j?'checked':''} ${dis}></td>`).join('')}</tr>`).join('')}</tbody></table>`}
 if(k==='input'){return q.parts.map((p,i)=>`<label class="exam-input">${choiceHTML(p.label||'Enter your answer')}<input type="text" inputmode="numeric" autocomplete="off" data-part="${i}" data-input value="${esc(cur[i]??'')}" ${dis}></label>`).join('')}
 if(k==='drag'){return `<div class="drag-wrap"><div class="drag-bank"><h3>${esc(q.bankTitle||'Code Segments')}</h3><div class="chips">${q.bank.map((b,j)=>`<button type="button" class="chip" draggable="${!locked}" data-chip="${j}" ${dis}>${choiceHTML(b)}</button>`).join('')}</div><p class="muted small">Drag an item onto a box, or click an item and then a box. Click a filled box to clear it.</p></div><div class="drag-targets">${q.parts.map((p,i)=>`<div class="drag-row"><span class="drag-label">${choiceHTML(p.label)}</span><button type="button" class="slot ${cur[i]!=null?'filled':''}" data-slot="${i}" ${dis}>${cur[i]!=null?choiceHTML(q.bank[cur[i]]):'<span class="muted">Drop here</span>'}</button></div>`).join('')}</div></div>`}
 if(k==='dropdown'){const code=choiceText(q.template).split(/(\{\{\d+\}\})/).map(seg=>{const m=seg.match(/^\{\{(\d+)\}\}$/);if(!m)return esc(seg);const i=+m[1],p=q.parts[i];return `<select class="inline-select" data-part="${i}" aria-label="${esc(p.label||'Drop-down '+(i+1))}" ${dis}><option value=""></option>${p.options.map((o,j)=>`<option value="${j}" ${cur[i]===j?'selected':''}>${esc(choiceText(o))}</option>`).join('')}</select>`}).join('');return `<pre class="code-fill"><code>${code}</code></pre>`}
 if(k==='fill'){const code=choiceText(q.template).split(/(\{\{\d+\}\})/).map(seg=>{const m=seg.match(/^\{\{(\d+)\}\}$/);if(!m)return esc(seg);const i=+m[1];return `<input class="inline-input" type="text" autocomplete="off" aria-label="${esc(q.parts[i].label||'Box '+(i+1))}" data-part="${i}" data-input value="${esc(cur[i]??'')}" ${dis}>`}).join('');return `<pre class="code-fill"><code>${code}</code></pre>`}
 return q.parts.map((p,i)=>`<div class="exam-part"><label for="p${i}">${choiceHTML(p.label||`Answer ${i+1}`)}</label><select id="p${i}" data-part="${i}" ${dis}><option value="">Choose an answer</option>${p.options.map((o,j)=>`<option value="${j}" ${cur[i]===j?'selected':''}>${esc(choiceText(o))}</option>`).join('')}</select></div>`).join('');
}
function wireAnswers(q,cur,onChange){
 root.querySelectorAll('[data-part]').forEach(el=>{
  const i=+el.dataset.part;
  el.addEventListener(el.matches('[data-input]')?'input':'change',()=>{
   if(el.matches('[data-input]'))cur[i]=el.value;
   else if(el.matches('[data-multi]'))cur[i]=[...root.querySelectorAll(`[data-part="${i}"][data-multi]:checked`)].map(x=>+x.value);
   else cur[i]=el.value===''?null:+el.value;
   onChange();
  });
 });
 if(kindOf(q)!=='drag')return;
 let picked=null;
 const place=(i,j)=>{cur[i]=j;onChange(true)};
 root.querySelectorAll('[data-chip]').forEach(c=>{
  c.addEventListener('dragstart',e=>{e.dataTransfer.setData('text/plain',c.dataset.chip);c.classList.add('dragging')});
  c.addEventListener('dragend',()=>c.classList.remove('dragging'));
  c.onclick=()=>{picked=+c.dataset.chip;root.querySelectorAll('.chip').forEach(x=>x.classList.toggle('picked',x===c))};
 });
 root.querySelectorAll('[data-slot]').forEach(s=>{
  const i=+s.dataset.slot;
  s.addEventListener('dragover',e=>{e.preventDefault();s.classList.add('over')});
  s.addEventListener('dragleave',()=>s.classList.remove('over'));
  s.addEventListener('drop',e=>{e.preventDefault();place(i,+e.dataTransfer.getData('text/plain'))});
  s.onclick=()=>{if(picked!=null)place(i,picked);else if(cur[i]!=null){cur[i]=null;onChange(true)}};
 });
}
function question(){
 if(!run)return;
 document.body.classList.add('exam-mode');
 const q=run.questions[run.index],checked=!!run.checked[q.id],late=delayed();
 const cur=run.responses[q.id] ||= q.parts.map(()=>null);
 const many=q.parts.length>1&&kindOf(q)!=='legacy';
 root.innerHTML=`<div class="exam-shell"><div class="exam-heading"><h1>Question ${run.index+1} of ${run.questions.length}</h1><span class="exam-clock">${run.deadline?'Time Remaining <span id="clock">'+timeleft()+'</span>':'Untimed practice'}</span></div><div class="exam-progress"><span style="width:${(run.index+1)/run.questions.length*100}%"></span></div><div class="exam-content"><div class="exam-prompt">${q.lesson==='mock'?`<div class="tag">Mock exam · ${mockLabel(q)}</div>`:''}${q.prompt}${(many||kindOf(q)==='legacy')&&!/partial credit/i.test(q.prompt)?'<p class="muted">Note: You will receive partial credit for each correct response.</p>':''}</div><section class="exam-answer"><h2>Answer Area</h2>${answerArea(q,cur,checked)}${checked?feedback(q,cur):''}</section></div><div class="exam-toolbar"><div class="exam-tools"><button class="exam-text" id="summary">Go To Summary</button><button class="exam-text" id="mark">${run.marked?.[q.id]?'Unmark Review':'Mark for Review'}</button>${q.lesson==='mock'&&!late?`<a class="exam-text" target="_blank" href="#mock-lesson/${q.id}">Open slide</a>`:''}</div><div class="exam-controls"><button class="exam-button" id="back" ${run.index===0?'disabled':''}>Back</button>${!late&&!checked?'<button class="exam-button" id="check">Check answer</button>':''}${late||checked?`<button class="exam-button" id="next">${run.index===run.questions.length-1?'Finish':'Next'}</button>`:''}</div></div></div>`;
 wireAnswers(q,cur,rerender=>{if(rerender)question()});
 document.querySelector('#summary').onclick=summary;
 document.querySelector('#mark').onclick=()=>{run.marked ||= {};run.marked[q.id]=!run.marked[q.id];question()};
 document.querySelector('#back').onclick=()=>{run.index--;question()};
 const check=document.querySelector('#check');if(check)check.onclick=()=>{if(q.parts.some((p,i)=>!answered(p,cur[i]))){alert('Answer every part first.');return}run.checked[q.id]=true;question()};
 const next=document.querySelector('#next');if(next)next.onclick=()=>{if(++run.index>=run.questions.length)finish();else question()};
}
function summary(){
 const late=delayed();
 root.innerHTML=`<div class="exam-shell"><div class="exam-heading"><h1>Question Summary</h1><span class="exam-clock">${run.deadline?'Time Remaining <span id="clock">'+timeleft()+'</span>':'Untimed practice'}</span></div><div class="exam-progress"><span style="width:100%"></span></div><div class="exam-summary"><p>Select a question to return to it. ${late?'Unanswered parts receive no credit when you submit.':'Check your answers before finishing.'}</p><div class="summary-list">${run.questions.map((q,i)=>{let r=run.responses[q.id]||[];let state=q.parts.every((p,j)=>answered(p,r[j]))?'Answered':'Not answered';return `<button class="summary-row" data-index="${i}"><strong>Question ${i+1}</strong><span>${state}${run.checked[q.id]?' · Checked':''}${run.marked?.[q.id]?' · Marked for review':''}</span></button>`}).join('')}</div></div><div class="exam-toolbar"><button class="exam-text" id="return">Return to question</button><button class="exam-button" id="submit">Submit ${late?'exam':'quiz'}</button></div></div>`;
 root.querySelectorAll('.summary-row').forEach(el=>el.onclick=()=>{run.index=Number(el.dataset.index);question()});document.querySelector('#return').onclick=question;document.querySelector('#submit').onclick=()=>{if(confirm('Submit now? Unanswered parts score zero.'))finish()};
}
function feedback(q,r){
 const count=scoreOf(q,r),n=q.parts.length;
 const rows=q.parts.map((p,i)=>`<li class="${partOK(p,r[i])?'ok':'bad'}">${n>1||kindOf(q)==='input'?`${choiceHTML(p.label||`Part ${i+1}`)} → `:''}<b>${correctHTML(p)}</b>${partOK(p,r[i])?' ✓':` <span class="muted">(you chose ${responseHTML(p,r[i])})</span>`}</li>`).join('');
 return `<div class="feedback ${count<n?'wrong':''}"><strong>${count===n?'Correct':n>1?`${count} of ${n} parts correct`:'Not quite'}</strong><p class="muted small">Correct answer${n>1?'s':''}:</p><ul class="answer-list">${rows}</ul><div>${q.explanation}</div><p><a href="${reviewLink(q)}">${q.lesson==='mock'?'Open this question’s slide →':'Review the lesson →'}</a></p></div>`;
}
function finish(){
 if(!run)return;document.body.classList.remove('exam-mode');if(timer)clearInterval(timer);
 let earned=0,total=0,by={};
 for(let q of run.questions){let r=run.responses[q.id]||[];let score=scoreOf(q,r);earned+=score;total+=q.parts.length;(by[q.objective]||=({earned:0,total:0})).earned+=score;by[q.objective].total+=q.parts.length;if(score<q.parts.length)saved.missed[q.id]=true;else delete saved.missed[q.id]}
 const pct=Math.round(100*earned/total);
 const name=run.id==='final'?'Final exam':run.id==='mock'?'Mock exam':LESSONS.find(l=>l.id===run.id)?.title||'Practice';
 saved.history.unshift({date:new Date().toLocaleString(),name,score:pct});saved.history=saved.history.slice(0,30);save();
 root.innerHTML=`<div class="tag">Attempt complete</div><h1>Results</h1><div class="panel"><div class="score">${pct}%</div><p>${earned} of ${total} parts correct · ${pct>=80?'Practice target reached':'Keep practicing toward your 80% target'}</p><h3>By objective</h3><p>${Object.entries(by).sort().map(([o,s])=>`${esc(o)}: ${s.earned}/${s.total}`).join(' · ')}</p><div class="actions"><button id="again">Try again</button><button id="mistakes" class="secondary">Practice missed questions</button>${run.id==='mock'?'<a class="button secondary" href="#mock-lesson">Mock-exam lesson</a><a class="button secondary" href="#cheatsheet">Cheat sheet</a>':''}<a class="button secondary" href="#home">Home</a></div></div><h2>Review your answers</h2>${run.questions.map((q,i)=>{const r=run.responses[q.id]||[];return `<section class="panel question"><div class="tag">Question ${i+1}${q.number?` · ${mockLabel(q)}`:''} · ${esc(q.objective)}</div>${q.prompt}${kindOf(q)==='dropdown'||kindOf(q)==='fill'?`<pre><code>${esc(choiceText(q.template))}</code></pre>`:''}<p>Your answer: ${q.parts.map((p,j)=>responseHTML(p,r[j])).join(' / ')}</p>${feedback(q,r)}</section>`}).join('')}`;
 const again=run.id,dl=run.timed,inst=run.instant,cnt=run.count;
 document.querySelector('#again').onclick=()=>start(again,dl,false,inst,cnt);document.querySelector('#mistakes').onclick=()=>start(again,false,true,true);
}
function progress(){root.innerHTML=`<a href="#home">← Home</a><h1>Your progress</h1><div class="panel"><p>${Object.keys(saved.seen).length} unique questions seen · ${Object.keys(saved.missed).length} questions to revisit</p><h3>Recent attempts</h3>${saved.history.length?'<ul>'+saved.history.map(h=>`<li>${esc(h.name)}: <strong>${h.score}%</strong> <span class="muted">${esc(h.date)}</span></li>`).join('')+'</ul>':'<p>No completed attempts yet.</p>'}<p class="muted">Progress is stored in this browser on this device.</p></div>`}

/* ---------- Mock-exam lesson (slides) and cheat sheet ---------- */
// A read-only "solved" view of a question: dropdown code with answers filled in, grids with answers marked.
function solvedView(q){
 const k=kindOf(q);
 if(k==='dropdown'||k==='fill'){const code=choiceText(q.template).split(/(\{\{\d+\}\})/).map(seg=>{const m=seg.match(/^\{\{(\d+)\}\}$/);if(!m)return esc(seg);const p=q.parts[+m[1]];return `<mark>${esc(p.input?[].concat(p.answer)[0]:choiceText(p.options[p.answer]))}</mark>`}).join('');return `<pre class="solved"><code>${code}</code></pre>`}
 if(k==='tf'||k==='yesno'||k==='drag'||q.parts.length>1)return `<table class="solved-table"><tbody>${q.parts.map(p=>`<tr><td>${choiceHTML(p.label)}</td><td><b>${correctHTML(p)}</b></td></tr>`).join('')}</tbody></table>`;
 const p=q.parts[0];
 if(p.input)return `<p class="answer-pill">Answer: <b>${correctHTML(p)}</b></p>`;
 return `<ul class="option-review">${p.options.map((o,j)=>{const ok=p.multi?p.answer.includes(j):p.answer===j;return `<li class="${ok?'ok':''}"><b>${'ABCDEFGH'[j]}.</b> ${optHTML(o)}${ok?' <span class="pill">Correct</span>':''}</li>`}).join('')}</ul>`;
}
function mockLessonIndex(){root.innerHTML=`<a href="#home">← Home</a><div class="tag">Lesson</div><h1>Mock-exam lesson</h1><p class="muted">One slide per mock-exam question. Each slide shows the original photo, the recreated question with the answer filled in, and a step-by-step justification. Use ← and → to move between slides.</p><div class="actions"><a class="button" href="#mock-lesson/${MOCK.questions[0]?.id}">Start the slides →</a><a class="button secondary" href="#cheatsheet">Cheat sheet</a><a class="button secondary" href="#mock">Take the mock exam</a></div>${['A','B'].map(set=>{const qs=MOCK.questions.filter(q=>setOf(q)===set);return qs.length?`<h2>Set ${set}</h2><div class="thumb-grid">${qs.map(q=>`<a class="thumb" href="#mock-lesson/${q.id}"><img loading="lazy" src="${esc(q.images[0])}" alt="Photo of ${mockLabel(q)}"><span><b>${mockLabel(q)}</b> · ${esc(q.topic||'')}</span></a>`).join('')}</div>`:''}).join('')}`}
function slide(num){
 const list=MOCK.questions;let i=list.findIndex(q=>q.id===num);if(i<0)i=list.findIndex(q=>setOf(q)==='A'&&String(q.number)===String(num));if(i<0)return mockLessonIndex();
 const q=list[i],prev=list[i-1],next=list[i+1];
 root.innerHTML=`<div class="slide-top"><a href="#mock-lesson">← All slides</a><span class="muted">Slide ${i+1} of ${list.length}</span></div><div class="progressbar"><span style="width:${(i+1)/list.length*100}%"></span></div>
<article class="slide"><div class="slide-photos">${q.images.map((src,j)=>`<a href="${esc(src)}" target="_blank" rel="noopener" title="Open full-size photo"><img src="${esc(src)}" alt="Photo ${j+1} of ${mockLabel(q)}"></a>`).join('')}<p class="muted small">Click a photo to open it at full size.</p></div>
<div class="slide-body"><div class="tag">${mockLabel(q)} · Objective ${esc(q.objective)} · ${esc(q.topic||'')}</div><h1 class="slide-title">Set ${setOf(q)} · Question ${q.number}</h1>${q.alsoIn?`<p class="muted">Also appears as ${esc(q.alsoIn)}.</p>`:''}<div class="slide-prompt">${q.prompt}</div><h3>Correct answer</h3>${solvedView(q)}<div class="slide-why">${q.lesson}</div>${q.reconstructed?`<p class="notice"><b>Reconstructed:</b> ${esc(q.reconstructed)}</p>`:''}${q.caution?`<p class="notice"><b>Note:</b> ${esc(q.caution)}</p>`:''}</div></article>
<div class="slide-nav">${prev?`<a class="button secondary" href="#mock-lesson/${prev.id}">← ${mockLabel(prev)}</a>`:'<span></span>'}${next?`<a class="button" href="#mock-lesson/${next.id}">${mockLabel(next)} →</a>`:'<a class="button" href="#cheatsheet">Cheat sheet →</a>'}</div>`;
}
function cheatsheet(){root.innerHTML=`<div class="no-print"><a href="#home">← Home</a></div><div class="tag">Notes to remember</div><h1>Python cheat sheet</h1><p class="muted">Built from what the mock exam actually tests. Print it or save it as a PDF to keep it handy.</p><div class="actions no-print"><button id="print">Print / save as PDF</button><a class="button secondary" href="#mock-lesson">Mock-exam lesson</a><a class="button secondary" href="#mock">Take the mock exam</a></div><nav class="toc no-print">${MOCK.cheatsheet.map((s,i)=>`<a href="#cheatsheet" data-jump="cs${i}">${esc(s.heading)}</a>`).join('')}</nav>${MOCK.cheatsheet.map((s,i)=>`<section class="lesson-section cheat ${/mistake/i.test(s.heading)?'mistakes':''}" id="cs${i}"><h2>${esc(s.heading)}</h2>${s.html}</section>`).join('')}`;document.querySelector('#print').onclick=()=>window.print();root.querySelectorAll('[data-jump]').forEach(a=>a.onclick=e=>{e.preventDefault();document.getElementById(a.dataset.jump)?.scrollIntoView({behavior:'smooth'})})}

function route(){document.body.classList.remove('exam-mode');if(timer)clearInterval(timer);run=null;let [page,id]=location.hash.slice(1).split('/');
 if(page==='lesson')lesson(id);else if(page==='final')finalPage();else if(page==='progress')progress();else if(page==='mock')mockPage();else if(page==='mock-lesson')id?slide(id):mockLessonIndex();else if(page==='cheatsheet')cheatsheet();else home();window.scrollTo(0,0)}
window.addEventListener('hashchange',route);
window.addEventListener('keydown',e=>{if(!location.hash.startsWith('#mock-lesson/')||/INPUT|SELECT|TEXTAREA/.test(document.activeElement?.tagName||''))return;const a=[...root.querySelectorAll('.slide-nav a')];if(e.key==='ArrowRight'&&a.at(-1))location.hash=a.at(-1).getAttribute('href');if(e.key==='ArrowLeft'&&a[0]?.textContent.includes('←'))location.hash=a[0].getAttribute('href')});
route();
