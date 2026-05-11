#!/usr/bin/env node
/**
 * Post-build: inlines render-blocking <link rel="stylesheet"> tags as <style> blocks.
 * This eliminates extra network round-trips for CSS on the SSG site.
 *
 * Run after `vinxi build`: node scripts/inline-css.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(__dirname, "..", ".output", "public");

function findHtmlFiles(dir) {
  const results = [];
  function walk(d) {
    for (const entry of readdirSync(d)) {
      const full = join(d, entry);
      if (statSync(full).isDirectory()) {
        if (entry === "_build") continue;
        walk(full);
      } else if (entry.endsWith(".html")) {
        results.push(full);
      }
    }
  }
  walk(dir);
  return results;
}

const htmlFiles = findHtmlFiles(outputDir);
let totalInlined = 0;

for (const htmlPath of htmlFiles) {
  let html = readFileSync(htmlPath, "utf-8");
  const linkRegex = /<link[^>]*href="([^"]+\.css)"[^>]*rel="stylesheet"[^>]*\/?>/g;
  let match;
  const replacements = [];

  while ((match = linkRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const href = match[1];

    const cssPath = href.startsWith("/")
      ? resolve(outputDir, href.slice(1))
      : resolve(dirname(htmlPath), href);

    try {
      const css = readFileSync(cssPath, "utf-8");
      replacements.push({ fullTag, css });
    } catch {
      // CSS file not found, skip
    }
  }

  if (replacements.length > 0) {
    for (const { fullTag, css } of replacements) {
      html = html.replace(fullTag, `<style>${css}</style>`);
      totalInlined++;
    }
    writeFileSync(htmlPath, html);
  }
}

console.log(`inline-css: inlined ${totalInlined} stylesheets across ${htmlFiles.length} HTML files`);
