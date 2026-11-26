// NusantaraStats — small hand-rolled SVG chart builders. Every chart is drawn
// from the data in data.js at render time; nothing is a pre-baked image.

const TEAL = '#0f5f5a';
const TEAL_LIGHT = '#2a8a82';
const AMBER = '#e8a33d';
const AMBER_DARK = '#c47f1a';
const INK = '#22302e';
const GRID = '#d9d4c5';
const MUTED = '#6b726f';

function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function niceMax(max) {
  const step = 10 ** Math.floor(Math.log10(max));
  return Math.ceil(max / step) * step;
}

// A line chart with points, axis labels and a value on hover (title element).
export function lineChart(series, { width = 640, height = 300, unit = '', label = '' } = {}) {
  const padL = 56, padR = 16, padT = 18, padB = 34;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const values = series.map((d) => d.value);
  const max = niceMax(Math.max(...values) * 1.08);
  const min = Math.min(0, Math.min(...values) * 1.08);
  const x = (i) => padL + (i / (series.length - 1)) * innerW;
  const y = (v) => padT + innerH - ((v - min) / (max - min)) * innerH;
  const points = series.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ');
  const gridLines = [0, 0.5, 1].map((f) => {
    const v = min + (max - min) * f;
    return `<line x1="${padL}" y1="${y(v)}" x2="${width - padR}" y2="${y(v)}" stroke="${GRID}" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${v.toFixed(1)}${unit}</text>`;
  }).join('');
  const labels = series.map((d, i) =>
    `<text x="${x(i)}" y="${height - 10}" text-anchor="middle" font-size="11" fill="${MUTED}">${d.year}</text>`).join('');
  const dots = series.map((d, i) =>
    `<circle cx="${x(i)}" cy="${y(d.value)}" r="4.5" fill="${AMBER}" stroke="#fff" stroke-width="1.5">` +
    `<title>${d.year}: ${d.value}${unit}</title></circle>`).join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(label)} line chart" class="chart-svg">` +
    `${gridLines}<polyline points="${points}" fill="none" stroke="${TEAL}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>` +
    `${dots}${labels}</svg>`;
}

// A horizontal bar chart, longest bar first unless the caller keeps order.
export function barChart(items, { width = 640, barHeight = 30, unit = '', label = '' } = {}) {
  const padL = 170, padR = 70;
  const height = items.length * barHeight + 16;
  const max = Math.max(...items.map((d) => d.value));
  const rows = items.map((d, i) => {
    const y = 8 + i * barHeight;
    const w = (d.value / max) * (width - padL - padR);
    return `<text x="${padL - 10}" y="${y + 19}" text-anchor="end" font-size="12" fill="${INK}">${esc(d.name)}</text>` +
      `<rect x="${padL}" y="${y + 4}" width="${w.toFixed(1)}" height="20" rx="4" fill="${i % 2 ? TEAL_LIGHT : TEAL}">` +
      `<title>${esc(d.name)}: ${d.value}${unit}</title></rect>` +
      `<text x="${padL + w + 8}" y="${y + 19}" font-size="12" fill="${INK}">${d.value}${unit}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(label)} bar chart" class="chart-svg">${rows}</svg>`;
}

// A donut chart with a legend underneath.
export function donutChart(items, { size = 260, label = '' } = {}) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 14, inner = r * 0.58;
  const total = items.reduce((sum, d) => sum + d.share, 0);
  const colors = [TEAL, AMBER, TEAL_LIGHT, AMBER_DARK, '#7fb5ad', '#8a9a94'];
  let angle = -90;
  const slices = items.map((d, i) => {
    const sweep = (d.share / total) * 360;
    const a0 = (angle * Math.PI) / 180;
    const a1 = ((angle + sweep) * Math.PI) / 180;
    angle += sweep;
    const large = sweep > 180 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const ix0 = cx + inner * Math.cos(a0), iy0 = cy + inner * Math.sin(a0);
    const ix1 = cx + inner * Math.cos(a1), iy1 = cy + inner * Math.sin(a1);
    return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} ` +
      `L ${ix1.toFixed(1)} ${iy1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${ix0.toFixed(1)} ${iy0.toFixed(1)} Z" ` +
      `fill="${colors[i % colors.length]}"><title>${esc(d.sector)}: ${d.share}%</title></path>`;
  }).join('');
  const legend = items.map((d, i) =>
    `<div class="legend-item"><span class="legend-swatch" style="background:${colors[i % colors.length]}"></span>` +
    `<span>${esc(d.sector)}</span><strong>${d.share}%</strong></div>`).join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(label)} donut chart" class="chart-svg donut-svg">` +
    `${slices}<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="15" font-weight="700" fill="${INK}">100%</text>` +
    `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="${MUTED}">of GDP</text></svg>` +
    `<div class="legend">${legend}</div></div>`;
}

// Small multiples: one mini bar per year, for quick comparison panels.
export function miniBars(series, { width = 300, height = 110, unit = '' } = {}) {
  const max = Math.max(...series.map((d) => Math.abs(d.value)));
  const gap = 4;
  const bw = (width - gap * (series.length - 1)) / series.length;
  const bars = series.map((d, i) => {
    const h = Math.max(2, (Math.abs(d.value) / max) * (height - 24));
    const x = i * (bw + gap);
    const fill = d.value < 0 ? AMBER_DARK : TEAL;
    return `<rect x="${x.toFixed(1)}" y="${(height - 20 - h).toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${fill}">` +
      `<title>${d.year}: ${d.value}${unit}</title></rect>` +
      `<text x="${(x + bw / 2).toFixed(1)}" y="${height - 6}" text-anchor="middle" font-size="10" fill="${MUTED}">${String(d.year).slice(2)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" class="chart-svg">${bars}</svg>`;
}
