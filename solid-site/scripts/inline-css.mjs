#!/usr/bin/env node
/**
 * Post-build: inlines render-blocking <link rel="stylesheet"> tags as <style> blocks
 * and removes CSS entries from window.manifest to prevent client re-fetching.
 *
 * Run after `vinxi build`: node scripts/inline-css.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(__dirname, "..", ".output", "public");
const basePath = (process.env.BASE_PATH || "").replace(/^\/|\/$/g, "");

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
  let modified = false;

  // 1. Inline <link rel="stylesheet"> tags (handles href before or after rel)
  const linkRegex = /<link[^>]*href="([^"]+\.css)"[^>]*\/?>/g;
  const replacements = [];
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    if (!match[0].includes('rel="stylesheet"')) continue;
    const fullTag = match[0];
    const href = match[1];

    let resolvedHref = href;
    if (basePath && resolvedHref.startsWith(`/${basePath}/`)) {
      resolvedHref = resolvedHref.slice(basePath.length + 1);
    }
    const cssPath = resolvedHref.startsWith("/")
      ? resolve(outputDir, resolvedHref.slice(1))
      : resolve(dirname(htmlPath), resolvedHref);

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
    modified = true;
  }

  if (modified) {
    writeFileSync(htmlPath, html);
  }
}

console.log(`inline-css: inlined ${totalInlined} stylesheets across ${htmlFiles.length} HTML files`);
