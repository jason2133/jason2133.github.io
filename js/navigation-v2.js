/* Dependency-free navigation: works when index.html is opened directly. */
window.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.profile-sidebar');
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.section-navigation');
  const links = Array.from(document.querySelectorAll('.section-link'));
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if (!sidebar || !toggle || !navigation) return;
  const mobile = window.matchMedia('(max-width: 63.999rem)');
  sidebar.classList.add('is-enhanced');
  toggle.hidden = false;
  const setOpen = open => {
    sidebar.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  links.forEach(link => link.addEventListener('click', () => setOpen(false)));
  sidebar.querySelector('.profile-brand').addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && sidebar.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (mobile.matches && !sidebar.contains(event.target)) setOpen(false);
  });
  const updateHeaderHeight = () => {
    const height = sidebar.querySelector('.profile-heading').getBoundingClientRect().height;
    const style = getComputedStyle(sidebar);
    const total = height + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    document.documentElement.style.setProperty('--mobile-nav-height', `${Math.ceil(total)}px`);
  };
  const setActive = id => links.forEach(link => {
    const active = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  const updateActive = () => {
    const offset = mobile.matches ? sidebar.querySelector('.profile-heading').getBoundingClientRect().height + 70 : 100;
    let active = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= offset) active = section;
    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) active = sections[sections.length - 1];
    if (active) setActive(active.id);
  };
  let scheduled = false;
  window.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { updateActive(); scheduled = false; });
  }, { passive: true });
  window.addEventListener('resize', () => { updateHeaderHeight(); updateActive(); });
  mobile.addEventListener('change', () => { setOpen(false); updateHeaderHeight(); updateActive(); });
  window.addEventListener('hashchange', updateActive);
  updateHeaderHeight();
  updateActive();
});
