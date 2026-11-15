'use strict';
(function(){
 const box=document.getElementById('study-progress');if(!box)return;
 let saved,history;
 try {saved=JSON.parse(localStorage.getItem('information-assurance-quiz-v1')||'{}');history=JSON.parse(localStorage.getItem('information-assurance-quiz-history-v1')||'{}');}
 catch(e){box.textContent='Progress storage is unavailable in this browser. Keep the quiz tab open to retain your current attempt.';return}
 saved=saved&&typeof saved==='object'?saved:{};history=history&&typeof history==='object'?history:{};
 const cards=[...document.querySelectorAll('a.card[href^="lecture-"]')];
 const completed=cards.filter((card,i)=>{const key='lesson-'+(i+1),s=saved[key],h=history[key];return (Array.isArray(h)&&h.length>0)||(s&&Array.isArray(s.ids)&&s.ids.length&&s.answers&&s.ids.every(id=>Number.isInteger(s.answers[id])))}).length;
 const summary=document.createElement('p');summary.textContent=completed+' of '+cards.length+' lessons completed at least once. Scores and attempts are saved in this browser.';box.replaceChildren(summary);
 const list=document.createElement('ul');
 cards.forEach((card,i)=>{
  const key='lesson-'+(i+1),s=saved[key],h=Array.isArray(history[key])?history[key].filter(x=>x&&Number.isFinite(x.correct)&&Number.isFinite(x.total)&&x.total>0):[];
  const item=document.createElement('li'),a=document.createElement('a');a.href='quiz.html?lesson='+key;a.textContent=card.querySelector('b').textContent;item.append(a,document.createTextNode(' — '));
  const status=[];if(s&&Array.isArray(s.ids)&&s.answers){const answered=s.ids.filter(id=>Number.isInteger(s.answers[id])).length;status.push((answered===s.ids.length?'Current attempt complete':'In progress')+' ('+answered+'/'+s.ids.length+')')}else status.push('Not started');
  if(h.length){const latest=h[h.length-1],best=h.reduce((a,b)=>b.correct/b.total>a.correct/a.total?b:a);status.push(h.length+' completed · Latest '+latest.correct+'/'+latest.total+' ('+Math.round(100*latest.correct/latest.total)+'%) · Best '+Math.round(100*best.correct/best.total)+'%')}
  item.append(document.createTextNode(status.join(' · ')));list.append(item);
 });box.append(list);
 const final=saved.final, finalHistory=Array.isArray(history.final)?history.final:[];if(final||finalHistory.length){const p=document.createElement('p'),a=document.createElement('a');a.href='quiz.html?lesson=final';a.textContent='Final exam';p.append(a);if(final&&Array.isArray(final.ids)&&final.answers){const n=final.ids.filter(id=>Number.isInteger(final.answers[id])).length;p.append(document.createTextNode(' — '+n+'/'+final.ids.length+' answered'))}if(finalHistory.length){const last=finalHistory[finalHistory.length-1];p.append(document.createTextNode(' · Latest completed '+last.correct+'/'+last.total))}box.append(p)}
})();
