#!/usr/bin/env node

import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const src = join(root, "src");
const patterns = [
  /<a\b[^>]*\bhref\s*=\s*["']\/(?!\/)/gms,
  /<a\b[^>]*\bhref\s*=\s*\{\s*["'`]\/(?!\/)/gms,
];
const failures = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(path);
      continue;
    }
    if (!entry.isFile() || !path.endsWith(".tsx")) continue;

    const content = readFileSync(path, "utf8");
    for (const pattern of patterns) {
      for (const match of content.matchAll(pattern)) {
        const before = content.slice(0, match.index);
        const line = before.split("\n").length;
        const snippet = match[0].replace(/\s+/g, " ").slice(0, 120);
        failures.push(`${relative(root, path)}:${line} ${snippet}`);
      }
    }
  }
}

walk(src);

if (failures.length > 0) {
  console.error("Root-relative plain <a> links found. Use NavLink for internal links so BASE_PATH is respected.");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("internal links: ok");
