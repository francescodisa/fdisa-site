(function(){
const $$=s=>[...document.querySelectorAll(s)];
const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
const yr=document.getElementById('yr');if(yr)yr.textContent=new Date().getFullYear();

/* comparse allo scorrimento: controllo a ogni fotogramma di scorrimento, robusto anche nelle colonne */
let pend=$$('.r,.ri');
function reveal(){if(!pend.length)return;const lim=innerHeight*.94;
  pend=pend.filter(e=>{const b=e.getBoundingClientRect();if(b.top<lim&&b.bottom>-50&&(b.width||b.height)){e.classList.add('vis');return false}return true})}
if(still)pend.forEach(e=>e.classList.add('vis')),pend=[];
requestAnimationFrame(()=>requestAnimationFrame(()=>document.body.classList.add('ready')));

/* barra di avanzamento, barra che si nasconde scendendo, lieve parallasse */
const nav=document.querySelector('nav'),prog=document.querySelector('.prog'),par=$$('[data-par]');
let last=scrollY,tick=false;
function frame(){
  const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
  if(prog)prog.style.transform=`scaleX(${h>0?y/h:0})`;
  if(nav&&!document.body.classList.contains('lb-on')){nav.classList.toggle('up',y>last&&y>200);}
  last=y;
  if(!still)par.forEach(p=>{const b=p.getBoundingClientRect();if(b.bottom<0||b.top>innerHeight)return;
    const k=(b.top+b.height/2-innerHeight/2)/innerHeight;const im=p.querySelector('img');if(im&&p.classList.contains('vis'))im.style.translate=`0 ${(-k*5).toFixed(2)}%`});
  reveal();tick=false}
addEventListener('resize',()=>requestAnimationFrame(frame));
addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(frame)}},{passive:true});frame();

/* scaffale dei libri */
const sh=document.querySelector('.shelf');
$$('.arrows button').forEach(b=>b.onclick=()=>{const c=sh.querySelector('.bk');sh.scrollBy({left:(+b.dataset.dir)*(c?c.offsetWidth+24:300)*2,behavior:still?'auto':'smooth'})});

/* filtro degli articoli */
$$('.filt button').forEach(b=>b.onclick=()=>{const f=b.dataset.f;
  $$('.filt button').forEach(x=>x.classList.toggle('full',x===b));
  $$('[data-lang]').forEach(s=>s.classList.toggle('hide',f!=='all'&&s.dataset.lang!==f))});
/* un link a una testata la apre */
function openHash(){const d=location.hash&&document.querySelector(location.hash);if(d&&d.tagName==='DETAILS')d.open=true}
addEventListener('hashchange',openHash);openHash();
$$('.oi a').forEach(a=>a.addEventListener('click',()=>setTimeout(openHash,0)));

$$('figure img').forEach(i=>i.addEventListener('error',()=>i.closest('figure').classList.add('missing')));
})();

;(function(){document.querySelectorAll('.mail').forEach(function(a){var go=function(){a.href='mailto:'+a.dataset.u+'@'+a.dataset.d};['focus','mouseenter','touchstart','click'].forEach(function(e){a.addEventListener(e,go,{passive:true})})})})();
