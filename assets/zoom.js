/* =====================================================================
   IMMAGINI A SCHERMO INTERO
   Ogni immagine dentro una <figure> si apre a tutto schermo con un clic,
   intera e non ritagliata, con la sua didascalia. Pensato per la proiezione.
   Tasti: ← → per scorrere le immagini della pagina, Esc per chiudere, F per lo schermo intero del browser.
   ===================================================================== */
(function(){
const css=`
main figure{position:relative}
main figure:not(.missing) img{cursor:zoom-in}
main figure:not(.missing):hover::after{content:"⤢";position:absolute;top:.45em;right:.45em;width:1.9em;height:1.9em;display:grid;place-items:center;
  background:var(--ink);color:var(--bg);font-size:.8em;pointer-events:none;opacity:.85}
.lb{position:fixed;inset:0;z-index:300;background:#0b0b0b;color:#f2f2f0;display:none;grid-template-rows:1fr auto;padding:clamp(.6rem,2vw,1.6rem)}
.lb.open{display:grid}
.lb .stage{display:grid;place-items:center;min-height:0;position:relative}
.lb img{max-width:calc(100vw - 7rem);max-height:calc(100vh - 7.5rem);object-fit:contain;display:block;background:#fff;box-shadow:0 0 0 1px rgba(255,255,255,.12)}
.lb .cap{display:flex;gap:1.2em;align-items:baseline;justify-content:space-between;padding-top:.8em;font-family:var(--mono);font-size:clamp(.72rem,1.1vw,.95rem);line-height:1.45;color:#d8d8d4}
.lb .cap span:first-child{max-width:80ch}
.lb .n{color:#9a9a96;white-space:nowrap}
.lb button{all:unset;cursor:pointer;position:absolute;color:#f2f2f0;font-family:var(--mono);font-size:1.1rem;padding:.5em .8em;background:rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.25)}
.lb button:hover,.lb button:focus-visible{background:#f2f2f0;color:#111}
.lb .x{top:0;right:0}.lb .pv{left:0;top:50%;transform:translateY(-50%)}.lb .nx{right:0;top:50%;transform:translateY(-50%)}
.lb .fs{top:0;left:0}
.lb.one .pv,.lb.one .nx{display:none}
body.lb-on{overflow:hidden}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Immagine a schermo intero');
lb.innerHTML='<div class="stage"><img alt=""><button class="pv" aria-label="Immagine precedente">←</button><button class="nx" aria-label="Immagine successiva">→</button><button class="fs" aria-label="Schermo intero">⛶</button><button class="x" aria-label="Chiudi">✕</button></div><div class="cap"><span></span><span class="n"></span></div>';
document.body.appendChild(lb);
const im=lb.querySelector('img'),cap=lb.querySelector('.cap span'),num=lb.querySelector('.n');
let list=[],i=0,back=null;
function pool(){return [...document.querySelectorAll('main figure img')].filter(x=>x.getAttribute("src")&&!x.closest('figure.missing')&&x.offsetParent!==null)}
function show(){const x=list[i];im.src=x.dataset.full||x.currentSrc||x.src;im.alt=x.alt||'';const fc=x.closest('figure').querySelector('figcaption');
  cap.innerHTML=fc?fc.innerHTML:(x.alt||'');num.textContent=list.length>1?`${i+1} / ${list.length}`:'';lb.classList.toggle('one',list.length<2)}
function open(x){list=pool();i=Math.max(0,list.indexOf(x));if(!list.length)return;back=x;show();lb.classList.add('open');document.body.classList.add('lb-on');lb.querySelector('.x').focus()}
function close(){lb.classList.remove('open');document.body.classList.remove('lb-on');if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});if(back&&back.focus)back.focus()}
function go(d){i=(i+d+list.length)%list.length;show()}
document.addEventListener('click',e=>{const x=e.target.closest('main figure img');if(x&&!x.closest('figure.missing')){e.preventDefault();open(x)}});
lb.querySelector('.x').onclick=close;lb.querySelector('.pv').onclick=()=>go(-1);lb.querySelector('.nx').onclick=()=>go(1);
lb.querySelector('.fs').onclick=()=>{if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});else if(lb.requestFullscreen)lb.requestFullscreen().catch(()=>{})};
lb.addEventListener('click',e=>{if(e.target===lb||e.target.classList.contains('stage'))close()});
addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;
  if(e.key=='Escape'){if(!document.fullscreenElement)close()}
  else if(e.key=='ArrowRight'){go(1)}else if(e.key=='ArrowLeft'){go(-1)}
  else if(e.key=='f'||e.key=='F'){lb.querySelector('.fs').click()}else return;
  e.preventDefault();e.stopImmediatePropagation()},true);
document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&!lb.classList.contains('open'))return});
window.SITE=window.SITE||{};window.SITE.zoom=open;
})();
