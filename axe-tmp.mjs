import { chromium } from '@playwright/test';
import fs from 'fs';
const axe = fs.readFileSync('node_modules/axe-core/axe.min.js','utf8');
const rotas=['/','/problemas/computador-lento','/empresas','/como-funciona'];
const b=await chromium.launch();const c=await b.newContext({viewport:{width:1280,height:1800}});
for(const r of rotas){const p=await c.newPage();await p.goto('http://localhost:4399'+r,{waitUntil:'networkidle'});await p.addScriptTag({content:axe});
const res=await p.evaluate(()=>axe.run(document,{runOnly:['wcag2a','wcag2aa','wcag21aa']}));
for(const v of res.violations.filter(v=>['serious','critical'].includes(v.impact))){console.log('==',r,v.id);for(const n of v.nodes.slice(0,6)){console.log('   ',n.target.join(' '),'|',(n.failureSummary||'').replace(/\n/g,' ').slice(0,220));}}
await p.close();}
await b.close();
