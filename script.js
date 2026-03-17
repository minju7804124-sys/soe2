
const config = window.SOE_CONFIG || { globalYoutube: 'https://www.youtube.com/', links: {} };
const managedVideos = document.querySelectorAll('.managed-video');
const fadeItems = document.querySelectorAll('.fade-up');
const sectionAnchors = document.querySelectorAll('.main-nav a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');
const keyToPage = { home:'01', about:'02', film:'03', animation:'04', commercial:'06', works:'09', contact:'13' };

document.querySelectorAll('[data-link-key]').forEach((link) => {
  const key = link.dataset.linkKey;
  link.href = config.links[key] || config.globalYoutube || 'https://www.youtube.com/';
});

new IntersectionObserver((entries)=>{entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible');});},{threshold:.2}).observe ? fadeItems.forEach(el=>new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:.2}).observe(el)) : null;

managedVideos.forEach((video)=>{
  const shell = video.closest('.page-shell');
  video.muted = true; video.playsInline = true; video.loop = false; video.preload = 'auto';
  video.addEventListener('ended', ()=>{ shell?.classList.add('ended'); video.pause(); });
});
const videoObserver = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    const video = entry.target; const shell = video.closest('.page-shell');
    if(entry.isIntersecting){ if(shell?.classList.contains('ended')) return; video.play().catch(()=>{}); }
    else { if(!shell?.classList.contains('ended')) video.pause(); }
  });
},{threshold:.7});
managedVideos.forEach(v=>videoObserver.observe(v));
const sectionObserver = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{ if(!entry.isIntersecting) return; const id=entry.target.id; const navKey=entry.target.dataset.nav; sectionAnchors.forEach((a)=>{ const hrefId=a.getAttribute('href')?.replace('#',''); const should= hrefId===id || (navKey && hrefId===`page-${keyToPage[navKey]}`); a.classList.toggle('active', should); }); });
},{threshold:.55});
sections.forEach(s=>sectionObserver.observe(s));
