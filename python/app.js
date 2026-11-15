'use strict';
// Align question reporting with the supplied Pearson objectives, not internal topic labels.
for (const l of LESSONS) {
  const original = [...l.objectives];
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
// Question choices contain a mixture of plain text and lightweight HTML.
// Decode entities for text controls while keeping code formatting in normal HTML.
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
function all(){return LESSONS.flatMap(l=>l.questions.map(q=>({...q,lesson:l.id,area:l.area})))}
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function choose(pool,n){let ranked=shuffle(pool).sort((a,b)=>(saved.seen[a.id]||0)-(saved.seen[b.id]||0));let result=[];let objs=shuffle([...new Set(ranked.map(q=>q.objective))]);for(let obj of objs){let q=ranked.find(x=>x.objective===obj&&!result.includes(x));if(q&&result.length<n)result.push(q)}for(let q of ranked)if(result.length<n&&!result.includes(q))result.push(q);return shuffle(result)}
function home(){root.innerHTML=`<div class="hero"><div class="eyebrow">Your self-paced study companion</div><h1>Python, one concept at a time.</h1><p>Study the exam objectives, work through realistic code questions, and revisit the concepts that need another look.</p><a class="button secondary" href="#final">Explore the final exam →</a></div><div class="tag">Your study path</div><h2>Choose a lesson</h2><p class="muted">Each lesson includes Python documentation sources and a bank of practice questions.</p><div class="grid">${LESSONS.map(l=>`<a class="card" href="#lesson/${esc(l.id)}"><div class="tag">Area ${l.area} · ${esc(l.objectives.join(', '))}</div><h3>${esc(l.title)}</h3><div class="meta">${l.questions.length} questions in the bank →</div></a>`).join('')}</div><h2>Put it all together</h2><a class="card" href="#final"><div class="tag">Mixed practice</div><h3>Custom-length final exam</h3><div class="meta">Choose the number of questions · all six areas · optional timer and feedback →</div></a>`}
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
function start(id,timed,missed,instant=false,count=40){let pool=all().filter(q=>id==='final'||q.lesson===id);if(missed)pool=pool.filter(q=>saved.missed[q.id]);if(!pool.length){alert('No missed questions to practice yet.');return}let picked;if(id==='final'&&!missed){const error=finalCountError(count,pool.length);if(error){alert(error);return}picked=finalSelection(pool,Number(count));if(picked.length!==Number(count)||new Set(picked.map(q=>q.id)).size!==Number(count)){alert('Could not build a unique question set.');return}}else picked=choose(pool,missed?Math.min(10,pool.length):10);run={id,questions:picked,index:0,responses:{},checked:{},deadline:timed?Date.now()+50*60*1000:null,timed,missed,instant,count:Number(count)};for(let q of picked)saved.seen[q.id]=(saved.seen[q.id]||0)+1;save();if(timer)clearInterval(timer);if(timed)timer=setInterval(()=>{if(!run)return;if(Date.now()>=run.deadline){clearInterval(timer);finish();return}let t=document.querySelector('#clock');if(t)t.textContent=timeleft()},1000);question()}
function timeleft(){let sec=Math.max(0,Math.ceil((run.deadline-Date.now())/1000));return `${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`}
function question(){
 if(!run)return;
 document.body.classList.add('exam-mode');
 let q=run.questions[run.index],response=run.responses[q.id]||[],checked=!!run.checked[q.id],isFinal=run.id==='final'&&!run.missed&&!run.instant;
 const single=q.parts.length===1;
 const answers=single?`<fieldset class="exam-options"><legend>${esc(q.parts[0].label||'Select one answer')}</legend>${q.parts[0].options.map((o,j)=>`<label class="exam-option"><input type="radio" name="answer0" value="${j}" ${response[0]===j?'checked':''} ${checked?'disabled':''}><span>${choiceHTML(o)}</span></label>`).join('')}</fieldset>`:q.parts.map((p,i)=>`<div class="exam-part"><label for="p${i}">${esc(p.label||`Answer ${i+1}`)}</label><select id="p${i}" ${checked?'disabled':''}><option value="">Choose an answer</option>${p.options.map((o,j)=>`<option value="${j}" ${response[i]===j?'selected':''}>${esc(choiceText(o))}</option>`).join('')}</select></div>`).join('');
 root.innerHTML=`<div class="exam-shell"><div class="exam-heading"><h1>Question ${run.index+1} of ${run.questions.length}</h1><span class="exam-clock">${run.deadline?'Time Remaining <span id="clock">'+timeleft()+'</span>':'Untimed practice'}</span></div><div class="exam-progress"><span style="width:${(run.index+1)/run.questions.length*100}%"></span></div><div class="exam-content"><div class="exam-prompt">${q.prompt}${!single?'<p>Note: You will receive partial credit for each correct response.</p>':''}</div><section class="exam-answer"><h2>Answer Area</h2>${answers}${checked?feedback(q,response):''}</section></div><div class="exam-toolbar"><div class="exam-tools"><button class="exam-text" id="summary">Go To Summary</button><button class="exam-text" id="mark">${run.marked?.[q.id]?'Unmark Review':'Mark for Review'}</button></div><div class="exam-controls"><button class="exam-button" id="back" ${run.index===0?'disabled':''}>Back</button>${!isFinal&&!checked?'<button class="exam-button" id="check">Check answer</button>':`<button class="exam-button" id="next">${run.index===run.questions.length-1?'Finish':'Next'}</button>`}</div></div></div>`;
 function capture(){run.responses[q.id]=q.parts.map((_,i)=>{let el=single?document.querySelector('input[name="answer0"]:checked'):document.querySelector('#p'+i);let v=el?.value;return v===undefined||v===''?null:Number(v)})}
 root.querySelectorAll('input, select').forEach(el=>el.addEventListener('change',capture));
 document.querySelector('#summary').onclick=()=>{capture();summary()};
 document.querySelector('#mark').onclick=()=>{capture();run.marked ||= {};run.marked[q.id]=!run.marked[q.id];question()};
 document.querySelector('#back').onclick=()=>{capture();run.index--;question()};
 let check=document.querySelector('#check');if(check)check.onclick=()=>{capture();if(run.responses[q.id].some(v=>v===null)){alert('Choose an answer for each part.');return}run.checked[q.id]=true;question()};
 let next=document.querySelector('#next');if(next)next.onclick=()=>{capture();if(++run.index>=run.questions.length)finish();else question()};
}
function summary(){
 const isFinal=run.id==='final'&&!run.missed;
 root.innerHTML=`<div class="exam-shell"><div class="exam-heading"><h1>Question Summary</h1><span class="exam-clock">${run.deadline?'Time Remaining <span id="clock">'+timeleft()+'</span>':'Untimed practice'}</span></div><div class="exam-progress"><span style="width:100%"></span></div><div class="exam-summary"><p>Select a question to return to it. ${isFinal?'Unanswered parts receive no credit when you submit.':'Check your answers before finishing.'}</p><div class="summary-list">${run.questions.map((q,i)=>{let r=run.responses[q.id]||[];let state=r.length&&r.every(v=>v!==null)?'Answered':'Not answered';return `<button class="summary-row" data-index="${i}"><strong>Question ${i+1}</strong><span>${state}${run.marked?.[q.id]?' · Marked for review':''}</span></button>`}).join('')}</div></div><div class="exam-toolbar"><button class="exam-text" id="return">Return to question</button><button class="exam-button" id="submit">Submit ${isFinal?'exam':'quiz'}</button></div></div>`;
 root.querySelectorAll('.summary-row').forEach(el=>el.onclick=()=>{run.index=Number(el.dataset.index);question()});document.querySelector('#return').onclick=question;document.querySelector('#submit').onclick=()=>{if(confirm('Submit now? Unanswered parts score zero.'))finish()};
}
function feedback(q,r){let count=q.parts.filter((p,i)=>r[i]===p.answer).length;return `<div class="feedback ${count<q.parts.length?'wrong':''}"><strong>${count===q.parts.length?'Correct':`${count} of ${q.parts.length} parts correct`}</strong><p>${q.parts.map((p,i)=>`${esc(p.label||`Part ${i+1}`)}: <b>${choiceHTML(p.options[p.answer])}</b>`).join('<br>')}</p><div>${q.explanation}</div><p><a href="#lesson/${esc(q.lesson)}">Review the lesson →</a></p></div>`}
function finish(){if(!run)return;document.body.classList.remove('exam-mode');if(timer)clearInterval(timer);let earned=0,total=0,by={};for(let q of run.questions){let r=run.responses[q.id]||[];let score=q.parts.filter((p,i)=>r[i]===p.answer).length;earned+=score;total+=q.parts.length;(by[q.objective]||=( {earned:0,total:0} )).earned+=score;by[q.objective].total+=q.parts.length;if(score<q.parts.length)saved.missed[q.id]=true;else delete saved.missed[q.id]}let pct=Math.round(100*earned/total);saved.history.unshift({date:new Date().toLocaleString(),name:run.id==='final'?'Final exam':LESSONS.find(l=>l.id===run.id)?.title||'Practice',score:pct});saved.history=saved.history.slice(0,30);save();root.innerHTML=`<div class="tag">Attempt complete</div><h1>Results</h1><div class="panel"><div class="score">${pct}%</div><p>${earned} of ${total} parts correct · ${pct>=80?'Practice target reached':'Keep practicing toward your 80% target'}</p><h3>By objective</h3><p>${Object.entries(by).sort().map(([o,s])=>`${esc(o)}: ${s.earned}/${s.total}`).join(' · ')}</p><div class="actions"><button id="again">Try another set</button><button id="mistakes" class="secondary">Practice missed questions</button><a class="button secondary" href="#home">All lessons</a></div></div><h2>Review your answers</h2>${run.questions.map((q,i)=>`<section class="panel question"><div class="tag">Question ${i+1} · ${esc(q.objective)}</div>${q.prompt}<p>Your answer: ${q.parts.map((p,j)=>choiceHTML(p.options[(run.responses[q.id]||[])[j]]??'Unanswered')).join(' / ')}</p>${feedback(q,run.responses[q.id]||[])}</section>`).join('')}`;document.querySelector('#again').onclick=()=>start(run.id,run.timed,false,run.instant,run.count);document.querySelector('#mistakes').onclick=()=>start(run.id,false,true)}
function progress(){root.innerHTML=`<a href="#home">← All lessons</a><h1>Your progress</h1><div class="panel"><p>${Object.keys(saved.seen).length} unique questions seen · ${Object.keys(saved.missed).length} questions to revisit</p><h3>Recent attempts</h3>${saved.history.length?'<ul>'+saved.history.map(h=>`<li>${esc(h.name)}: <strong>${h.score}%</strong> <span class="muted">${esc(h.date)}</span></li>`).join('')+'</ul>':'<p>No completed attempts yet.</p>'}<p class="muted">Progress is stored in this browser on this device.</p></div>`}
function route(){document.body.classList.remove('exam-mode');if(timer)clearInterval(timer);run=null;let [page,id]=location.hash.slice(1).split('/');if(page==='lesson')lesson(id);else if(page==='final')finalPage();else if(page==='progress')progress();else home();window.scrollTo(0,0)}window.addEventListener('hashchange',route);route();
