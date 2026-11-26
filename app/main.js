// NusantaraStats — boot and controls. Hash router: every page is reached by a
// link, and every control on a page re-renders that page from shared state.
import { ROUTES, NAV } from './views.js';

const app = document.getElementById('app');
const navList = document.getElementById('nav-list');
const state = {
  popYear: 2024,
  gdpUnit: 'trillion',
  provinceQuery: '',
  provinceSort: 'pop',
  provinceDir: 'desc',
};

function currentRoute() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  return ROUTES[hash] ? hash : '/';
}

function render() {
  const route = currentRoute();
  const view = ROUTES[route];
  app.innerHTML = view(state);
  navList.querySelectorAll('a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === `#${route}`);
    if (a.getAttribute('href') === `#${route}`) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
  document.body.dataset.route = route;
  document.body.dataset.ready = 'true';
}

navList.innerHTML = NAV.map(([path, label]) =>
  `<li><a href="#${path}">${label}</a></li>`).join('');

// Controls are delegated: one listener handles every control on every page.
document.addEventListener('change', (event) => {
  const el = event.target.closest('[data-control]');
  if (!el) return;
  if (el.dataset.control === 'pop-year') {
    state.popYear = Number(el.value);
    render();
    const sel = document.getElementById('pop-year');
    if (sel) sel.focus();
  }
});

document.addEventListener('input', (event) => {
  const el = event.target.closest('[data-control="province-search"]');
  if (!el) return;
  state.provinceQuery = el.value;
  render();
  const input = document.getElementById('province-search');
  if (input) {
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }
});

document.addEventListener('click', (event) => {
  const el = event.target.closest('[data-control]');
  if (!el) return;
  if (el.dataset.control === 'gdp-unit') {
    state.gdpUnit = el.dataset.value;
    render();
  }
  if (el.dataset.control === 'province-sort') {
    const key = el.dataset.value;
    if (state.provinceSort === key) {
      state.provinceDir = state.provinceDir === 'asc' ? 'desc' : 'asc';
    } else {
      state.provinceSort = key;
      state.provinceDir = key === 'name' ? 'asc' : 'desc';
    }
    render();
  }
});

window.addEventListener('hashchange', render);
render();
