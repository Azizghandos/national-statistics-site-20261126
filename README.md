# NusantaraStats — National Statistics of Indonesia

A working national statistics site: headline indicators, population, economy,
employment, education & health, and a searchable, sortable table of all
38 provinces. Every figure is from **BPS — Statistics Indonesia**, with the
source and year shown next to it.

## Run it

```sh
node serve.ts        # serves app/ on http://localhost:8080
```

Open http://localhost:8080 in a browser, desktop or phone. No build step,
no network requests — the site is plain static files under `app/`.

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and
writes `dossier.json` with the vendored make.fun library.

## Structure

- `app/index.html` — page shell, header, nav, footer
- `app/style.css` — the whole visual identity (deep teal + warm amber)
- `app/data.js` — every figure, with source and year
- `app/charts.js` — hand-drawn inline SVG charts (line, bar, donut, mini bars)
- `app/views.js` — hash-router pages, one function per section
- `app/main.js` — boot, routing and controls (year selector, unit toggle, search, sort)
- `app/shots.js` — deterministic screenshot scenes via `?shot=`
- `vendor/makefun-frontend.ts` — the kit's vendored library, unchanged
- `shots.json` — the four screenshots and the view each one shows

## Data sources

All figures: BPS — Statistics Indonesia, publications 2023–2025. See the
site's own “Sources & Methods” page for the full list and notes.
