#!/usr/bin/env node
/**
 * Post-build: copies .output/public/404/index.html to .output/public/404.html
 * so GitHub Pages can serve it on missing paths.
 *
 * Why: SolidStart's static prerenderer outputs every route under {path}/index.html
 * including /404 → /404/index.html. GitHub Pages, however, only serves a
 * top-level 404.html for not-found routes. This shim bridges the two.
 *
 * Run after vinxi build: node scripts/copy-404.mjs
 */

import { copyFileSync, existsSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(__dirname, "..", ".output", "public");

const src = resolve(outputDir, "404", "index.html");
const dst = resolve(outputDir, "404.html");

if (!existsSync(src)) {
  console.warn(`copy-404: source missing at ${src} — did the /404 route prerender?`);
  process.exit(0);
}

copyFileSync(src, dst);
console.log(`copy-404: emitted 404.html (${statSync(dst).size} bytes)`);
