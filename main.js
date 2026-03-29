(function(){
const isMob=window.innerWidth<=768;
const noMotion=window.matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ═══ CONSOLIDATED SCROLL LISTENER (RAF-batched) ═══ */
const prog=document.getElementById('prog');
const nv=document.getElementById('nav'),tb=document.getElementById('topbar');
const ticker=(!isMob&&!noMotion)?document.querySelector('.ticker-track'):null;
let ticking=false;

window.addEventListener('scroll',()=>{
  if(!ticking){
    requestAnimationFrame(()=>{
      const h=document.documentElement;
      // Progress bar
      prog.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight))*100+'%';
      // Nav scroll state
      const s=scrollY>50;
      nv.classList.toggle('scrolled',s);
      if(tb&&!isMob){tb.style.transform=s?'translateY(-100%)':'';tb.style.transition='transform .35s'}
      // Ticker parallax
      if(ticker){ticker.style.transform=`translateX(${-scrollY*.03}px)`}
      ticking=false;
    });
    ticking=true;
  }
},{passive:true});

/* ═══ HERO ORCHESTRATION ═══ */
const h1=document.querySelector('h1');
if(h1&&!noMotion){
  const html=h1.innerHTML;
  const parts=html.split(/(<br\s*\/?>|<span[^>]*>|<\/span>)/g);
  let wordIdx=0;
  const rebuilt=parts.map(p=>{
    if(p.match(/^</)|| p.match(/^$/)) return p;
    return p.split(/(\s+)/g).map(w=>{
      if(w.match(/^\s*$/)) return w;
      return `<span class="word" style="transition-delay:${.25+wordIdx++*.04}s">${w}</span>`;
    }).join('');
  }).join('');
  h1.innerHTML=rebuilt;
}

window.addEventListener('load',()=>{
  setTimeout(()=>{
    document.querySelectorAll('.hero-badge,.hero-sub,.hero-ctas,.hero-stats,.hero-vis,.hero-fl').forEach(el=>el.classList.add('vis'));
    document.querySelectorAll('h1 .word').forEach(w=>w.classList.add('vis'));
  },100);
});

/* ═══ CONSOLIDATED REVEAL OBSERVER ═══ */
const revealOb=new IntersectionObserver(es=>{es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('vis');revealOb.unobserve(e.target)}
})},{threshold:isMob?.02:.05});

// Observe all reveal elements + phi-img + stpWrap
document.querySelectorAll('.rv,.phi-img,#stpWrap').forEach(el=>{
  const r=el.getBoundingClientRect();
  if(r.top<window.innerHeight&&r.bottom>0){el.classList.add('vis')}
  else{revealOb.observe(el)}
});

/* ═══ CONSOLIDATED COUNT-UP OBSERVER ═══ */
function countUp(el,target,duration){
  const start=performance.now();
  const isFloat=String(target).includes('.');
  function tick(now){
    const p=Math.min((now-start)/duration,1);
    const ease=1-Math.pow(1-p,3);
    const val=ease*target;
    el.textContent=isFloat?val.toFixed(1):Math.floor(val);
    if(p<1)requestAnimationFrame(tick);
    else el.textContent=isFloat?target.toFixed(1):target;
  }
  requestAnimationFrame(tick);
}

const countOb=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){
  // Hero stats
  const v=e.target.querySelector('.hs-v');
  if(v&&!v.dataset.counted){
    v.dataset.counted='1';
    const txt=v.textContent;
    const num=parseFloat(txt.replace(/[^0-9.]/g,''));
    const prefix=txt.match(/^[^0-9]*/)[0];
    const suffix=txt.match(/[^0-9.]*$/)[0];
    countUp({set textContent(val){v.textContent=prefix+val+suffix}},num,1200);
  }
  // Philosophy stats
  const n=e.target.querySelector('.phi-st-n');
  if(n&&!n.dataset.counted){
    n.dataset.counted='1';
    const target=parseInt(n.textContent);
    countUp({set textContent(val){n.textContent=val}},target,1000);
  }
  countOb.unobserve(e.target);
}})},{threshold:.5});

document.querySelectorAll('.hero-stats > div,.phi-st').forEach(el=>countOb.observe(el));

/* ═══ KEN BURNS — PROGRAM CARDS (DESKTOP ONLY) ═══ */
if(!isMob&&!noMotion){
  const kbOb=new IntersectionObserver(es=>{es.forEach(e=>{e.target.classList.toggle('in-vp',e.isIntersecting)})},{threshold:.1});
  document.querySelectorAll('.prg-c').forEach(el=>kbOb.observe(el));
}

/* ═══ CUSTOM CURSOR (DESKTOP + FINE POINTER ONLY) ═══ */
if(!isMob&&!noMotion&&window.matchMedia('(pointer:fine)').matches){
  const cur=document.createElement('div');
  cur.className='cursor';
  document.body.appendChild(cur);
  cur.style.display='block';
  let cx=0,cy=0,tx=0,ty=0;
  document.addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY});
  (function loop(){cx+=(tx-cx)*.15;cy+=(ty-cy)*.15;cur.style.left=cx+'px';cur.style.top=cy+'px';requestAnimationFrame(loop)})();
  document.querySelectorAll('a,button,.ham,.faq-q,.btn-r,.btn-o,.btn-w,.n-cta,.prg-cta,.sed-cta').forEach(el=>{
    el.addEventListener('mouseenter',()=>cur.classList.add('active'));
    el.addEventListener('mouseleave',()=>cur.classList.remove('active'));
  });
}

/* ═══ EVENT DELEGATION (FAQ, Menu, Smooth Scroll) ═══ */
document.addEventListener('click',e=>{
  // FAQ toggle
  const faqQ=e.target.closest('[data-action="faq"]');
  if(faqQ){
    const it=faqQ.closest('.faq-item');
    const wasOpen=it.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
    if(!wasOpen)it.classList.add('open');
    return;
  }
  // Mobile menu toggle
  if(e.target.closest('[data-action="menu"]')){
    document.getElementById('mob').classList.toggle('open');
    document.getElementById('ham').classList.toggle('open');
    return;
  }
  // Smooth scroll
  const anchor=e.target.closest('a[href^="#"]');
  if(anchor){
    const t=document.querySelector(anchor.getAttribute('href'));
    if(t){
      e.preventDefault();
      // Close mobile menu if open
      const mob=document.getElementById('mob');
      if(mob.classList.contains('open')){
        mob.classList.remove('open');
        document.getElementById('ham').classList.remove('open');
      }
      t.scrollIntoView({behavior:'smooth',block:'start'});
    }
  }
});

/* ═══ CLONE TESTIMONIALS FOR MARQUEE ═══ */
const testTrack=document.querySelector('.test-track');
if(testTrack&&!isMob){
  const cards=testTrack.querySelectorAll('.test-c');
  cards.forEach(c=>{
    const clone=c.cloneNode(true);
    clone.setAttribute('aria-hidden','true');
    clone.classList.remove('rv','d1','d2');
    testTrack.appendChild(clone);
  });
}

/* ═══ VIDEO AUTOPLAY ═══ */
const hv=document.querySelector('.hero-vid');
if(hv){hv.muted=true;hv.play().catch(()=>{document.addEventListener('touchstart',()=>{hv.muted=true;hv.play()},{once:true});document.addEventListener('click',()=>{hv.muted=true;hv.play()},{once:true})})}

})();
