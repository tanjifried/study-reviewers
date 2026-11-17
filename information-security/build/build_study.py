from pathlib import Path
import html,json,re,urllib.parse
root=Path(__file__).resolve().parent.parent
bank=json.loads((root/'build/question-bank.json').read_text())
ref=Path('/home/jade/dev/projects/huawei-scraped/materials/study/_src/style.css').read_text()
extra='''
html{scroll-behavior:smooth}body{height:auto}.top{position:sticky}.study-home{max-width:860px;margin:30px auto;padding:0 16px 60px}.study-home a.card{display:block;border:1px solid var(--line);border-radius:6px;padding:14px 18px;margin:0 0 10px;text-decoration:none;color:inherit}.study-home a.card:hover{border-color:var(--blue);background:var(--hl)}.study-home .card b{color:var(--blue-d)}.study-home .card span{display:block;font-size:13px;color:#586777}.lecture{max-width:920px;margin:0 auto;padding:20px 20px 80px}.lecture h1{font-size:26px;line-height:1.25;margin:18px 0 8px}.lecture h2{font-size:21px;margin:30px 0 12px}.lecture .slide{border-bottom:1px solid var(--line);padding:16px 0 26px;scroll-margin-top:70px}.lecture .slide img{display:block;width:100%;height:auto;border:1px solid var(--line);margin:8px 0 14px}.lecture .slide .digest p{margin:6px 0}.lecture .pg{font-size:13px;color:#586777}.lecture .recap table{table-layout:auto}.lecture .recap td:first-child{width:30%;font-weight:bold}.lecture .recap td,.lecture .recap th{overflow-wrap:anywhere}.lecture .jump{line-height:2.4;display:flex;flex-wrap:wrap;gap:5px}.lecture .jump a{display:inline-block;padding:1px 8px;border:1px solid var(--line);border-radius:3px;text-decoration:none}.lecture .jump a:hover{background:var(--hl)}.lecture .foot-actions{display:flex;flex-wrap:wrap;gap:12px;margin:24px 0}.lecture .foot-actions a{display:inline-block;text-decoration:none}.lecture .footer-note{color:#586777;font-size:13px}.lecture .note{margin-top:18px}.top>a{white-space:nowrap}.download{font-size:13px}.slide-source{font-size:12px;color:#586777}.lecture :focus-visible,.study-home :focus-visible,.top :focus-visible{outline:3px solid #a85d00;outline-offset:3px}@media(max-width:760px){.lecture{padding:12px 16px 50px}.lecture .slide{scroll-margin-top:10px}.top{position:static}.lecture .recap td:first-child{width:35%}}

/* Phone and narrow-tablet study layout */
html{overflow-x:hidden}body{min-width:0;overflow-x:hidden}.top{min-width:0}.top h1{min-width:0}.lecture,.study-home{width:100%;min-width:0}.lecture img{max-width:100%;height:auto}.lecture pre,.read pre{max-width:100%;overflow-x:auto;overscroll-behavior-inline:contain}.lecture table,.recap table{display:block;max-width:100%;overflow-x:auto;overscroll-behavior-inline:contain;-webkit-overflow-scrolling:touch}.lecture table{width:max-content;min-width:100%}.lecture th,.lecture td,.recap th,.recap td{overflow-wrap:anywhere}.lecture .jump a{min-width:40px;min-height:40px;display:inline-flex;align-items:center;justify-content:center;padding:4px 10px}.lecture .foot-actions .btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}.top>a{display:inline-flex;align-items:center;min-height:44px}.study-home a.card{min-height:64px}.study-home :focus-visible,.lecture :focus-visible,.top :focus-visible{scroll-margin-top:12px}
@media(max-width:600px){.study-home{margin:18px auto;padding:0 16px 48px}.study-home h1{font-size:clamp(26px,8vw,34px);line-height:1.2;overflow-wrap:anywhere}.lecture{padding:12px 16px 48px}.lecture h1{font-size:clamp(24px,7vw,32px);overflow-wrap:anywhere}.lecture h2{font-size:20px}.lecture .slide{padding:12px 0 20px}.lecture .slide img{width:100%;height:auto}.lecture .recap td:first-child{width:auto;min-width:110px}.lecture .recap td,.lecture .recap th{font-size:13px;padding:7px}.top{gap:4px 10px;padding:8px 12px}.top>a{font-size:14px}.read-wrap{max-width:100%;overflow-x:auto}.bigpic,.fact,.trap,.leftout{padding-left:12px;padding-right:12px}}
@media(min-width:601px) and (max-width:900px){.lecture{padding-left:24px;padding-right:24px}.lecture .recap td:first-child{width:32%}}
'''
(root/'study.css').write_text(ref+'\n'+extra)
esc=html.escape

def rich(s):
 parts=re.split(r'(`[^`]+`)',s)
 return ''.join('<code>'+esc(part[1:-1])+'</code>' if part.startswith('`') and part.endswith('`') and len(part)>1 else esc(part) for part in parts)

def page(title,body):
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(title)+'</title><link rel="stylesheet" href="study.css"></head><body>'+body+'</body></html>'

def practice_count(l):
 return len(l['concepts'])

def linkpdf(l):return 'pdfs/'+urllib.parse.quote(Path(l['file']).stem+'.pdf')

def lecture(l,n):
 c=json.loads((root/'build/lesson-content'/f'lesson-{n}.json').read_text())
 imgs=sorted((root/'slide-images'/l['id']).glob('slide-*.jpg'))
 assert len(c['slides'])==len(imgs) and set(c['slides'])==set(map(str,range(1,len(imgs)+1)))
 pdf=linkpdf(l)
 sections=[]
 for i,img in enumerate(imgs,1):
  x=c['slides'][str(i)];assert x['explanation']
  concepts=[item for item in l['concepts'] if item['slide']==i]
  facts=''
  if concepts:
   facts='<div class="fact"><b>Key terms to remember</b><ul>'+''.join('<li><strong>'+esc(q['term'])+':</strong> '+rich(q['definition'])+'</li>' for q in concepts)+'</ul></div>'
  example=('<p><strong>Example:</strong> '+rich(x['example'])+'</p>') if x.get('example') else ''
  sections.append(f'<section class="slide" id="slide-{i}"><span class="pg">Slide {i} of {len(imgs)} · <a href="{pdf}#page={i}">Open in PDF</a></span><img src="slide-images/{l["id"]}/{img.name}" alt="Slide {i} from {esc(l["title"],quote=True)}" loading="lazy" decoding="async" width="2200" height="1238"><div class="digest"><b>Easy explanation</b><p>{rich(x["explanation"])}</p>{example}</div>{facts}</section>')
 cheat=''.join('<tr><td>'+rich(q['term'])+'</td><td>'+rich(q['summary'])+'</td></tr>' for q in c['cheatsheet'])
 navigation=''.join(f'<a href="#slide-{i}">{i}</a>' for i in range(1,len(imgs)+1))
 quiz='quiz.html?lesson='+l['id']
 references=('<h2>References for corrections</h2><p><a href="https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf">NIST Secure Hash Standard (FIPS 180-4)</a> · <a href="https://csrc.nist.gov/projects/hash-functions/nist-policy-on-hash-functions">NIST policy on hash functions</a></p>' if n==1 else '<h2>Calculation note</h2><p>The output-bit counts are calculated directly from the two hexadecimal strings shown on slide 4. Their encryption parameters are not provided in the slides.</p>')
 body=f'''<header class="top"><h1>{esc(l['title'])}</h1><a href="index.html">All lessons</a><a href="../index.html">All subjects</a><a href="{quiz}">Lesson quiz</a></header><main class="lecture read"><h1>{esc(l['title'])}</h1><p>{esc(l['subtitle'])} · {len(imgs)} slides · {practice_count(l)} practice questions</p><div class="bigpic"><b>How to study this lesson</b><p>Read each original slide, then use the explanation and example to make the idea easier to remember. Review the cheat sheet at the end, then take the quiz.</p></div><p class="download"><a href="{pdf}">Open or download the complete lesson PDF</a></p><details><summary>Jump to a slide</summary><nav class="jump" aria-label="Jump to slide">{navigation}<a href="#cheat-sheet">Cheat sheet</a></nav></details>{''.join(sections)}<section class="recap" id="cheat-sheet"><h2>Lesson cheat sheet</h2><p>Use this as a quick review before your quiz.</p><table><thead><tr><th scope="col">Term or idea</th><th scope="col">Remember it this way</th></tr></thead><tbody>{cheat}</tbody></table></section>{references}<div class="fact"><b>Ready to practice?</b><p>The quiz has {len(l['concepts'])} multiple-choice questions and {practice_count(l)-len(l['concepts'])} true-or-false questions. You’ll see the answer and explanation as soon as you choose.</p></div><div class="foot-actions"><a class="btn pri" href="{quiz}">Start the lesson quiz</a><a class="btn" href="index.html">Back to all lessons</a></div><p class="footer-note">Explanations are study aids based on the provided presentation. Examples are illustrative.</p></main>'''
 (root/f'lecture-{n}.html').write_text(page(l['title']+' — Study notes',body))

for i,l in enumerate(bank,1):lecture(l,i)
cards=''.join(f'<a class="card" href="lecture-{i}.html"><b>{esc(l["title"])}</b><span>{esc(l["subtitle"])} · {len(l["concepts"])} concepts · {practice_count(l)} quiz questions</span></a>' for i,l in enumerate(bank,1))
body=f'''<main class="study-home"><p class="subject-return"><a href="../index.html">← All subjects</a></p><h1>Information Assurance and Security Study Pack</h1><p>Choose a lesson to study the original slides with simple explanations, examples, a cheat sheet, and a practice quiz.</p><div class="bigpic"><b>Study at your own pace</b><p>Start with a lesson below. At the end of each lecture, take its quiz and get immediate feedback. When you are ready, try the combined final exam.</p></div><h2>Your progress</h2><div id="study-progress" aria-live="polite"><p>Open a quiz to begin tracking your progress in this browser.</p></div><h2>Lessons</h2>{cards}<h2>Final exam</h2><a class="card" href="quiz.html?lesson=final"><b>Combined final exam</b><span>{sum(len(l['concepts']) for l in bank)} questions covering the concepts from both lessons. Feedback appears after every answer.</span></a><h2>More practice</h2><a class="card" href="quiz.html"><b>All quizzes and your progress</b><span>Continue an attempt, review answers, or start again.</span></a><p>These materials work offline once the entire folder is on your device. Quiz progress is stored by your browser when available.</p></main>'''
(root/'index.html').write_text(page('Information Assurance and Security Study Pack',body).replace('</body>', '<script src="progress.js"></script></body>'))
print('Generated index and',len(bank),'lecture HTML files')
