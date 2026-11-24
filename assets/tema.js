/* =====================================================================
   TEMA CHIARO / SCURO
   Di base il sito segue l'impostazione del sistema; il pulsante ◐ nella barra
   inverte i colori e la scelta resta memorizzata su questo browser.
   Va caricato nel <head>, così la pagina non lampeggia all'apertura.
   ===================================================================== */
(function(){
const R=document.documentElement,K='corsi-tema';
const rd=()=>{let t=null;try{t=localStorage.getItem(K)}catch(e){}
  if(t!='light'&&t!='dark'){const m=(window.name||'').match(/corsi-tema=(light|dark)/);t=m?m[1]:null}return t};
const wr=n=>{try{localStorage.setItem(K,n)}catch(e){}
  try{window.name=(window.name||'').replace(/corsi-tema=(light|dark);?/,'')+'corsi-tema='+n+';'}catch(e){}};
{const t=rd();if(t=='light'||t=='dark'){R.dataset.theme=t;wr(t)}}
const sys=()=>matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
const cur=()=>R.dataset.theme||sys();
function label(b){const d=cur()=='dark';b.textContent=d?'◐ Chiaro':'◑ Scuro';b.setAttribute('aria-label',d?'Passa al tema chiaro':'Passa al tema scuro');b.title=b.getAttribute('aria-label')}
function init(){const nav=document.querySelector('nav');if(!nav||nav.querySelector('.tema'))return;
  const st=document.createElement('style');st.textContent='.tema{all:unset;cursor:pointer;flex:none;border:1.5px solid var(--ink);border-radius:999px;padding:.35em .9em;font-family:var(--mono);font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ink);white-space:nowrap}.tema:hover,.tema:focus-visible{background:var(--ink);color:var(--bg)}';
  document.head.appendChild(st);
  const b=document.createElement('button');b.className='tema';label(b);
  b.onclick=()=>{const n=cur()=='dark'?'light':'dark';R.dataset.theme=n;wr(n);label(b)};
  const lg=nav.querySelector('.lang');if(lg)nav.insertBefore(b,lg);else nav.appendChild(b);
  matchMedia('(prefers-color-scheme:dark)').addEventListener('change',()=>label(b))}
if(document.readyState=='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
