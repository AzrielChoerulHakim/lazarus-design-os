/* Original progressive enhancement: one scroll listener and one scheduled frame.
 * All primary content and navigation are fully usable without this script.
 */
(() => {
  const progress = document.getElementById('progress-fill');
  const stage = document.querySelector('.stage');
  const stageLabel = document.getElementById('stage-label');
  const steps = [...document.querySelectorAll('[data-stage]')];
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const labels = ['01 — Structure', '02 — State', '03 — Fallback'];
  if (!progress || !stage || !stageLabel || steps.length !== labels.length) return;
  let frame = 0;
  let activeStage = -1;
  let activeNav = '';
  const clamp = value => Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));
  const sections = navLinks.map(link => ({link, section: document.querySelector(link.getAttribute('href'))})).filter(x => x.section);
  function render() {
    frame = 0;
    const doc = document.documentElement;
    const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
    const value = maxScroll === 0 ? 1 : clamp((window.scrollY || doc.scrollTop) / maxScroll);
    progress.style.width = `${(value * 100).toFixed(2)}%`;
    const band = Math.min(window.innerHeight * .45, 320);
    let index = 0;
    steps.forEach((step, i) => {if (step.getBoundingClientRect().top <= band) index = i;});
    if (index !== activeStage) {
      activeStage = index;
      stage.dataset.active = String(index);
      stageLabel.textContent = labels[index];
    }
    let selected = sections[0]?.section?.id || '';
    for (const item of sections) if (item.section.getBoundingClientRect().top <= band) selected = item.section.id;
    if (selected !== activeNav) {
      activeNav = selected;
      sections.forEach(({link,section}) => {
        if (section.id === selected) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
    }
  }
  function schedule() {
    if (frame || document.hidden) return;
    frame = requestAnimationFrame(render);
  }
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('hashchange',schedule);
  window.addEventListener('pageshow',schedule);
  document.addEventListener('visibilitychange',schedule);
  schedule();
})();
