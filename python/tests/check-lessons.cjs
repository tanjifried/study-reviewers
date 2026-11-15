const assert=require('assert');const crypto=require('crypto');const root=require('path').resolve(__dirname,'..');
global.window={LESSONS:[]};for(let i=1;i<=6;i++)require(`${root}/data/area${i}.js`);
const lessons=window.LESSONS;
const digest=()=>crypto.createHash('sha256').update(JSON.stringify(lessons.map(l=>l.questions))).digest('hex');
const before=digest();
for(const file of ['deep1-2','deep3-4','deep5-6'])require(`${root}/data/${file}.js`);
assert.equal(digest(),before,'Question banks must not change');
for(const l of lessons){assert(l.sections.length>=2,`${l.id} needs focused teaching sections`);let text=l.sections.map(s=>s.body).join(' ');assert(text.length>3000,`${l.id} lesson is too short`);assert(/<pre/i.test(text),`${l.id} needs worked code`);assert(l.sources.some(s=>/w3schools\.com|geeksforgeeks\.org/i.test(s.url)),`${l.id} needs an instructional tutorial source`);assert(l.sources.some(s=>/docs\.python\.org/i.test(s.url)),`${l.id} needs Python documentation`);console.log(`${l.id}: ${l.sections.length} sections, ${text.replace(/<[^>]*>/g,' ').trim().split(/\s+/).length} words, ${l.sources.length} sources`)}
console.log(`All ${lessons.length} lessons loaded; question content unchanged.`);
