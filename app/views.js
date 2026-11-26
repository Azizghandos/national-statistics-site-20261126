// NusantaraStats — page views. Each view is a function that returns HTML for
// one hash route. Every figure carries its source (BPS) and year next to it.
import {
  SOURCE, HEADLINE, POPULATION_SERIES, AGE_STRUCTURE, TOP_PROVINCES,
  GDP_SERIES, GROWTH_SERIES, SECTOR_SHARES, INFLATION_SERIES,
  UNEMPLOYMENT_SERIES, EMPLOYMENT_SECTORS, LABOUR, EDUCATION_HEALTH,
  PROVINCES, density, formatNumber,
} from './data.js';
import { lineChart, barChart, donutChart, miniBars } from './charts.js';

function sourceTag(year, note) {
  return `<span class="src">Source: ${SOURCE}, ${year}${note ? ` — ${note}` : ''}</span>`;
}

function statCard(item) {
  return `<article class="stat-card"><div class="stat-label">${item.label}</div>` +
    `<div class="stat-value">${formatNumber(item.value, item.value % 1 ? 2 : 0)} <span class="stat-unit">${item.unit}</span></div>` +
    `<div class="stat-meta">${item.year} · ${item.note}</div></article>`;
}

function sectionHead(title, intro, sourceLine) {
  return `<header class="page-head"><h1>${title}</h1><p class="lede">${intro}</p>${sourceLine || ''}</header>`;
}

export function overviewView(state) {
  const cards = HEADLINE.map(statCard).join('');
  const pop = lineChart(POPULATION_SERIES, { label: 'Population of Indonesia, 2015–2024', unit: 'm' });
  const growth = miniBars(GROWTH_SERIES, { unit: '%' });
  return `${sectionHead('Indonesia in numbers',
    'The headline indicators for the world’s fourth most populous country, ' +
    'from the latest publications of BPS — Statistics Indonesia.',
    sourceTag(2024, 'headline indicators'))}
  <section class="card-grid">${cards}</section>
  <div class="panel-row">
    <section class="panel"><h2>Population, 2015–2024</h2>
      <p class="panel-note">Millions of people, mid-year estimates; 2020 is the census count.</p>
      ${pop}${sourceTag(2024, 'population series 2015–2024')}</section>
    <section class="panel"><h2>Growth at a glance</h2>
      <p class="panel-note">Real GDP growth, % year on year. The 2020 bar is negative: the pandemic year.</p>
      ${growth}${sourceTag(2024, 'growth 2020–2024')}
      <p class="callout">Growth has held above 5% for three straight years — 5.31% in 2022, 5.05% in 2023 and 5.03% in 2024.</p></section>
  </div>
  <section class="panel"><h2>Explore the data</h2>
    <ul class="explore-links">
      <li><a href="#/population">Population &rarr;</a> who lives where, and how the age structure is shifting.</li>
      <li><a href="#/economy">Economy &rarr;</a> GDP, growth, sectors and inflation.</li>
      <li><a href="#/employment">Employment &rarr;</a> jobs, unemployment and the informal economy.</li>
      <li><a href="#/education-health">Education &amp; health &rarr;</a> literacy, schooling and life expectancy.</li>
      <li><a href="#/provinces">Provinces &rarr;</a> all 38 provinces, searchable and sortable.</li>
    </ul></section>`;
}

export function populationView(state) {
  const endYear = state.popYear || 2024;
  const series = POPULATION_SERIES.filter((d) => d.year <= endYear);
  const ageRows = AGE_STRUCTURE.map((a) =>
    `<div class="age-row"><span>${a.group}</span><div class="age-track"><div class="age-fill" style="width:${a.share}%"></div></div><strong>${a.share}%</strong></div>`).join('');
  const bars = barChart(TOP_PROVINCES, { label: 'Largest provinces by population, 2024', unit: 'm' });
  return `${sectionHead('Population',
    'Indonesia’s population passed 281 million in 2024. Growth has slowed to ' +
    'under 1% a year, and the working-age share is near its peak.',
    sourceTag(2024, 'mid-year estimates'))}
  <section class="panel"><h2>Population by year</h2>
    <div class="controls"><label for="pop-year">Show up to year</label>
      <select id="pop-year" data-control="pop-year">
        ${POPULATION_SERIES.map((d) => `<option value="${d.year}" ${d.year === endYear ? 'selected' : ''}>${d.year}</option>`).join('')}
      </select>
      <span class="control-note">The chart redraws to the year you pick.</span></div>
    ${lineChart(series, { label: `Population to ${endYear}`, unit: 'm' })}
    <p class="panel-note">Population in ${endYear}: <strong>${series[series.length - 1].value} million</strong>. ${sourceTag(endYear, 'BPS mid-year estimate; 2020 is the census count')}</p></section>
  <div class="panel-row">
    <section class="panel"><h2>Age structure, 2024</h2>
      <p class="panel-note">Share of the population in each broad age group.</p>
      ${ageRows}${sourceTag(2024, 'BPS estimate')}
      <p class="callout">About two in three Indonesians are of working age (15–64) — the demographic dividend window.</p></section>
    <section class="panel"><h2>Largest provinces, 2024</h2>
      <p class="panel-note">Millions of people, 2024 mid-year estimates.</p>
      ${bars}${sourceTag(2024, 'top 10 provinces')}</section>
  </div>`;
}

export function economyView(state) {
  const unit = state.gdpUnit || 'trillion';
  const factor = unit === 'billion' ? 1000 : 1;
  const gdpSeries = GDP_SERIES.map((d) => ({ year: d.year, value: d.value * factor }));
  const gdpLabel = unit === 'billion' ? 'Rp billion' : 'Rp trillion';
  return `${sectionHead('Economy',
    'The largest economy in Southeast Asia: GDP of about Rp 22,139 trillion in 2024, ' +
    'growing just over 5% a year.',
    sourceTag(2024, 'current prices'))}
  <div class="panel-row">
    <section class="panel"><h2>GDP, 2020–2024</h2>
      <div class="controls"><label>Units</label>
        <button type="button" data-control="gdp-unit" data-value="trillion" class="${unit === 'trillion' ? 'toggle-on' : ''}">Rp trillion</button>
        <button type="button" data-control="gdp-unit" data-value="billion" class="${unit === 'billion' ? 'toggle-on' : ''}">Rp billion</button></div>
      ${lineChart(gdpSeries, { label: 'GDP at current prices', unit: unit === 'billion' ? ' bn' : ' tn' })}
      <p class="panel-note">GDP 2024: <strong>Rp 22,139 trillion</strong> (${gdpLabel === 'Rp billion' ? 'Rp 22,139,000 billion' : 'about US$ 1,396 billion'}). GDP per capita: <strong>US$ 4,925</strong>. ${sourceTag(2024, 'BPS')}</p></section>
    <section class="panel"><h2>What makes up GDP, 2024</h2>
      <p class="panel-note">Share of GDP at current prices, by sector.</p>
      ${donutChart(SECTOR_SHARES, { label: 'GDP by sector, 2024' })}
      ${sourceTag(2024, 'sector shares, rounded')}</section>
  </div>
  <div class="panel-row">
    <section class="panel"><h2>Real growth, 2020–2024</h2>
      <p class="panel-note">% year on year.</p>
      ${miniBars(GROWTH_SERIES, { width: 560, height: 140, unit: '%' })}
      <p class="panel-note">2020: <strong>−2.07%</strong> · 2021: <strong>3.70%</strong> · 2022: <strong>5.31%</strong> · 2023: <strong>5.05%</strong> · 2024: <strong>5.03%</strong>. ${sourceTag(2024, 'BPS')}</p></section>
    <section class="panel"><h2>Inflation, 2020–2024</h2>
      <p class="panel-note">% year on year, December.</p>
      ${lineChart(INFLATION_SERIES, { label: 'Inflation, 2020–2024', unit: '%' })}
      <p class="panel-note">Inflation fell to <strong>1.57%</strong> in 2024, the lowest in the series, after 5.51% in 2022. ${sourceTag(2024, 'BPS')}</p></section>
  </div>`;
}

export function employmentView(state) {
  const bars = barChart(EMPLOYMENT_SECTORS.map((s) => ({ name: s.sector, value: s.share })),
    { label: 'Employment by sector, August 2024', unit: '%' });
  return `${sectionHead('Employment',
    'A labour force of about 152 million people in August 2024, with unemployment ' +
    'at 4.76% — the lowest in the five-year series.',
    sourceTag(2024, 'BPS, Sakernas August 2024'))}
  <section class="card-grid small">
    <article class="stat-card"><div class="stat-label">Labour force</div><div class="stat-value">152.1 <span class="stat-unit">million</span></div><div class="stat-meta">August 2024 · BPS (Sakernas)</div></article>
    <article class="stat-card"><div class="stat-label">Employed persons</div><div class="stat-value">144.9 <span class="stat-unit">million</span></div><div class="stat-meta">August 2024 · BPS (Sakernas)</div></article>
    <article class="stat-card"><div class="stat-label">Participation rate</div><div class="stat-value">70.6 <span class="stat-unit">%</span></div><div class="stat-meta">August 2024 · BPS (Sakernas)</div></article>
    <article class="stat-card"><div class="stat-label">Informal employment</div><div class="stat-value">59.2 <span class="stat-unit">%</span></div><div class="stat-meta">August 2024 · BPS (Sakernas)</div></article>
  </section>
  <div class="panel-row">
    <section class="panel"><h2>Unemployment rate by year</h2>
      <p class="panel-note">% of the labour force, August each year.</p>
      ${lineChart(UNEMPLOYMENT_SERIES, { label: 'Unemployment rate, 2020–2024', unit: '%' })}
      <p class="panel-note">From 7.07% in August 2020 to <strong>4.76%</strong> in August 2024. ${sourceTag(2024, 'BPS, Sakernas')}</p></section>
    <section class="panel"><h2>Where people work</h2>
      <p class="panel-note">Share of employed persons by sector, August 2024.</p>
      ${bars}${sourceTag(2024, 'BPS, Sakernas')}
      <p class="callout">Agriculture still employs more than one in four workers, even as its share of GDP is about one in eight.</p></section>
  </div>`;
}

export function educationHealthView(state) {
  const cards = EDUCATION_HEALTH.map(statCard).join('');
  return `${sectionHead('Education & health',
    'Schooling is near-universal at primary level, literacy is above 96%, and ' +
    'life expectancy reached 74 years in 2024.',
    sourceTag(2024, 'BPS'))}
  <section class="card-grid">${cards}</section>
  <div class="panel-row">
    <section class="panel"><h2>Reading the numbers</h2>
      <p>Literacy (age 15+) was <strong>96.4%</strong> in 2023 (BPS). Mean years of schooling reached <strong>9.1 years</strong> in 2024, and children entering school today can expect <strong>13.2 years</strong> of schooling.</p>
      <p>Life expectancy at birth was <strong>74.0 years</strong> in 2024 (BPS), up from about 71 years a decade earlier. Infant mortality was about <strong>16 per 1,000 live births</strong> in 2023 (BPS estimate).</p>
      <p>The Human Development Index stood at <strong>75.02</strong> in 2024 (BPS) — in the “high human development” band.</p>
      ${sourceTag(2024, 'BPS')}</section>
    <section class="panel"><h2>Why it matters</h2>
      <p>Education and health are the two slowest-moving, most consequential indicators in this site: they change a few tenths of a point a year, and they shape the workforce of the next twenty years more than any single year’s GDP print.</p>
      <p class="callout">Every figure on this page is from BPS publications for the year shown; rounded values are labelled as estimates where BPS publishes them that way.</p></section>
  </div>`;
}

export function provincesView(state) {
  const query = (state.provinceQuery || '').toLowerCase();
  const sortKey = state.provinceSort || 'pop';
  const sortDir = state.provinceDir || 'desc';
  let rows = PROVINCES.filter((p) => p.name.toLowerCase().includes(query));
  const keyFn = { name: (p) => p.name, pop: (p) => p.pop, area: (p) => p.area, density: (p) => density(p) };
  rows = rows.slice().sort((a, b) => {
    const va = keyFn[sortKey](a), vb = keyFn[sortKey](b);
    const cmp = typeof va === 'string' ? va.localeCompare(vb) : va - vb;
    return sortDir === 'asc' ? cmp : -cmp;
  });
  const arrow = (key) => (sortKey === key ? (sortDir === 'asc' ? ' ▲' : ' ▼') : '');
  const body = rows.map((p) =>
    `<tr><td>${p.name}</td><td class="num">${formatNumber(p.pop, 2)}</td><td class="num">${formatNumber(p.area, 0)}</td><td class="num">${formatNumber(density(p), 0)}</td></tr>`).join('');
  return `${sectionHead('Provinces',
    'All 38 provinces, including the four new Papuan provinces created in 2022. ' +
    'Search by name or sort by any column.',
    sourceTag(2024, 'population: 2024 mid-year estimates; area: official provincial areas'))}
  <section class="panel"><div class="controls">
      <label for="province-search">Search provinces</label>
      <input id="province-search" data-control="province-search" type="search" placeholder="Type a province name…" value="${(state.provinceQuery || '').replace(/"/g, '&quot;')}">
      <span class="control-note" id="province-count">${rows.length} of 38 provinces shown</span></div>
    <div class="table-wrap"><table class="data-table"><thead><tr>
      <th><button type="button" data-control="province-sort" data-value="name">Province${arrow('name')}</button></th>
      <th><button type="button" data-control="province-sort" data-value="pop">Population (million)${arrow('pop')}</button></th>
      <th><button type="button" data-control="province-sort" data-value="area">Area (km²)${arrow('area')}</button></th>
      <th><button type="button" data-control="province-sort" data-value="density">Density (per km²)${arrow('density')}</button></th>
    </tr></thead><tbody>${body || '<tr><td colspan="4">No province matches that search.</td></tr>'}</tbody></table></div>
    <p class="panel-note">Population figures are rounded 2024 mid-year estimates (BPS); density is computed from the rounded population and area. Jakarta is by far the densest province at about 16,000 people per km²; the Papuan provinces are the least dense, under 30 per km².</p></section>`;
}

export function sourcesView() {
  return `${sectionHead('Sources & methods',
    'Every figure on this site comes from BPS — Statistics Indonesia. ' +
    'This page lists what was used, for which year, and how it was handled.',
    '')}
  <section class="panel"><h2>Sources</h2>
    <ul class="source-list">
      <li><strong>Population</strong> — BPS mid-year population estimates 2015–2024; 2020 Population Census count (270.2 million). Provincial populations: BPS 2024 mid-year estimates, rounded to one decimal.</li>
      <li><strong>Economy</strong> — BPS national accounts: GDP at current prices, real GDP growth and sector shares, 2020–2024; consumer price index / inflation, December year-on-year, 2020–2024; GDP per capita 2024.</li>
      <li><strong>Employment</strong> — BPS National Labour Force Survey (Sakernas), August rounds 2020–2024: unemployment rate, labour force, participation rate, informal share, employment by sector.</li>
      <li><strong>Education &amp; health</strong> — BPS: literacy rate 2023, mean and expected years of schooling 2024, life expectancy 2024, infant mortality estimate 2023, Human Development Index 2024.</li>
    </ul></section>
  <section class="panel"><h2>Methods &amp; notes</h2>
    <ul class="source-list">
      <li>Figures are rounded to the precision BPS publishes them at; where a value is an estimate, the page says so. No figure is interpolated or invented.</li>
      <li>Provincial density is computed from the rounded 2024 population estimate and the official provincial area, so it is approximate.</li>
      <li>Indonesia has 38 provinces since the creation of South Papua, Central Papua, Highland Papua and Southwest Papua in 2022.</li>
      <li>Charts are drawn in the browser from the data file (app/data.js) with hand-written SVG code (app/charts.js). No data is fetched from the network; the site works fully offline.</li>
      <li>All figures are in English units and labels for an international reader; the underlying BPS publications are in Indonesian and English.</li>
    </ul></section>`;
}

export const ROUTES = {
  '/': overviewView,
  '/population': populationView,
  '/economy': economyView,
  '/employment': employmentView,
  '/education-health': educationHealthView,
  '/provinces': provincesView,
  '/sources': sourcesView,
};

export const NAV = [
  ['/', 'Overview'],
  ['/population', 'Population'],
  ['/economy', 'Economy'],
  ['/employment', 'Employment'],
  ['/education-health', 'Education & Health'],
  ['/provinces', 'Provinces'],
  ['/sources', 'Sources & Methods'],
];
