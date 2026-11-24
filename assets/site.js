/* =====================================================================
   COMPORTAMENTI COMUNI DEI MODULI
   lingua, navigazione, frecce da tastiera, immagini mancanti
   ===================================================================== */
(function(){
const $$=s=>[...document.querySelectorAll(s)];
const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
window.SITE={still};

/* Lingua. Il selettore compare solo se la pagina contiene già testo inglese.
   Per tradurre un modulo basta affiancare a ogni elemento lang="it" il suo gemello lang="en". */
const hasEN=!!document.querySelector('main [lang="en"]');
let lang='it';
try{if('scrollRestoration' in history)history.scrollRestoration='manual'}catch(e){}
if(!location.hash){const su=()=>scrollTo(0,0);su();
  addEventListener('DOMContentLoaded',su);
  addEventListener('pageshow',su);
  addEventListener('load',()=>{su();requestAnimationFrame(su);setTimeout(su,120);setTimeout(su,400)});}
try{const h=location.hash.slice(1);if(h=='en'||h=='it')lang=h;else lang=localStorage.getItem('corsi-lang')||'it'}catch(e){}
if(!hasEN)lang='it';
function setLang(l){lang=l;document.body.classList.toggle('en',l=='en');document.documentElement.lang=l;
  $$('.lang button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.l==l));
  try{localStorage.setItem('corsi-lang',l)}catch(e){}
  document.dispatchEvent(new CustomEvent('langchange',{detail:l}))}
window.SITE.lang=()=>lang;
const lg=document.querySelector('.lang');
if(lg){if(hasEN){lg.innerHTML='<button data-l="it">IT</button><button data-l="en">EN</button>';lg.onclick=e=>{if(e.target.dataset.l)setLang(e.target.dataset.l)}}else lg.remove()}
setLang(lang);


/* sezione corrente nella barra */
const links=$$('nav .links a');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');
  links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')=='#'+e.target.id))}}),{rootMargin:'-45% 0px -50% 0px'});
$$('main section[id]').forEach(s=>io.observe(s));

/* frecce ← → tra le sezioni */
addEventListener('keydown',e=>{if(e.target.closest('input,textarea,[contenteditable]')||e.metaKey||e.ctrlKey||e.altKey)return;
  if(e.key!='ArrowRight'&&e.key!='ArrowLeft')return;if(document.querySelector('.scheda.open'))return;
  const ss=$$('main section'),y=scrollY+innerHeight*.3;let i=ss.findIndex(s=>s.offsetTop+s.offsetHeight>y);if(i<0)i=ss.length-1;
  const t=ss[Math.max(0,Math.min(ss.length-1,i+(e.key=='ArrowRight'?1:-1)))];t.scrollIntoView({behavior:still?'auto':'smooth'});e.preventDefault()});

/* un'immagine non ancora scaricata mostra un riquadro tratteggiato al suo posto */
$$('figure img').forEach(img=>{const f=()=>img.closest('figure').classList.add('missing');img.addEventListener('error',f);if(img.complete&&!img.naturalWidth)f()});
})();
