import {chromium} from 'playwright';
const routes=['/','/servicos','/tecnico-informatica-curitiba','/assistencia-tecnica-curitiba','/atendimento-domicilio','/contato'];
const b=await chromium.launch();const p=await b.newPage();
for(const r of routes){await p.goto('http://localhost:8080'+r,{waitUntil:'networkidle'});
const hrefs=await p.$$eval('a[href*="wa.me"]',as=>as.map(a=>a.getAttribute('href')));
const bad=hrefs.filter(h=>{try{const u=new URL(h);return !(u.searchParams.get('text')||'').trim();}catch{return true}});
console.log(r,'links',hrefs.length,'sem texto',bad.length, bad.slice(0,2));}
await b.close();
