// NusantaraStats — hand-in program (Node 22, standard library only).
//
// The site is plain static files under app/ (index.html plus its CSS and JS
// modules, no build step, nothing fetched from the network). This program
// copies app/ and screenshots/ from beside this file into the output
// directory and writes /output/dossier.json with buildDossier from the
// vendored make.fun library, exactly as the kit requires. The vendor file
// vendor/makefun-frontend.ts is the kit's copy, unchanged: the scorer
// rebuilds the dossier with its own copy and compares byte for byte.
//
// Run it outside the grader with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function countFiles(dir) {
  let files = 0;
  let bytes = 0;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stats = statSync(path);
    if (stats.isDirectory()) {
      const sub = countFiles(path);
      files += sub.files;
      bytes += sub.bytes;
    } else if (stats.isFile()) {
      files += 1;
      bytes += stats.size;
    }
  }
  return { files, bytes };
}

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The scorer's own caps (from the kit's RULES.txt): at most 4 screenshots,
// each at most 256 KiB; at most 993 files and directories in app/ and
// 16 MiB of app files in all. buildDossier refuses anything past them.
const appStats = countFiles(join(out, 'app'));
const shotStats = countFiles(join(out, 'screenshots'));
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);

console.log(
  `NusantaraStats handed in: app/ ${appStats.files} files, ${appStats.bytes} bytes; ` +
  `screenshots/ ${shotStats.files} files, ${shotStats.bytes} bytes; dossier.json written to ${out}`,
);

// A hand-in is only useful if the dossier actually landed: confirm it is a
// real file and report its size, so a silent write failure is never missed.
const dossierStats = statSync(join(out, 'dossier.json'));
if (!dossierStats.isFile() || dossierStats.size === 0) {
  throw new Error('dossier.json was not written');
}
console.log(`dossier.json: ${dossierStats.size} bytes`);
