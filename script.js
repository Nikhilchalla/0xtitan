"use strict";
/* CURSOR */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx=0, my=0, rx=0, ry=0;
document.addEventListener('mousemove', e => {
  mx=e.clientX; my=e.clientY;
  cursor.style.left=mx+'px'; cursor.style.top=my+'px';
});
(function animRing(){
  rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a,button,.project-card,.skill-cell,.wallet-addr').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ cursor.classList.add('hovering'); ring.classList.add('hovering'); });
  el.addEventListener('mouseleave',()=>{ cursor.classList.remove('hovering'); ring.classList.remove('hovering'); });
});

/* MOBILE NAV */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.textContent = isOpen ? 'Close' : 'Menu';
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.textContent = 'Menu';
}));

/* SCROLL PROGRESS */
window.addEventListener('scroll',()=>{
  const s=window.scrollY/(document.documentElement.scrollHeight-window.innerHeight);
  document.getElementById('scrollProgress').style.width=(s*100)+'%';
});

/* SCROLL REVEAL */
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      const bar=e.target.querySelector('.skill-bar-fill');
      if(bar) bar.style.animationPlayState='running';
    }
  });
},{threshold:0.15});
document.querySelectorAll('.reveal,.exp-item,.project-card,.skill-cell').forEach(el=>observer.observe(el));
