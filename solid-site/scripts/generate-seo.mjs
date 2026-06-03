#!/usr/bin/env node
/**
 * Generates sitemap.xml, robots.txt, and llms.txt into public/
 * Run after adding new routes/posts: node scripts/generate-seo.mjs
 * Also runs automatically as part of `npm run build`.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const read = (rel) => JSON.parse(readFileSync(resolve(root, rel), "utf-8"));

const site = read("src/data/site.json");
const posts = read("src/data/posts.json");
const navigation = read("src/data/navigation.json");
const servicePages = [
  "tynki-maszynowe-wroclaw",
  "tynki-gipsowe-wroclaw",
  "firma-tynkarska-wroclaw",
];

const SITE_URL = site.url;
const TODAY = new Date().toISOString().slice(0, 10);

// Mirror of solid-site/src/utils/url.ts withTrailingSlash() — kept as a
// duplicate because this is a Node ESM build script and importing the .ts
// utility through tsx is overkill. If the rule changes, update both.
const withTrailingSlash = (path) => {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("mailto:") || path.startsWith("tel:")) return path;
  if (path.includes("#") || path.includes("?")) return path;
  if (path === "/" || path.endsWith("/")) return path;
  return path + "/";
};

const pages = [
  { loc: "/", priority: "1.0" },
  { loc: "/kontakt", priority: "0.8" },
  { loc: "/realizacje", priority: "0.8" },
  { loc: "/galeria", priority: "0.7" },
  { loc: "/tynki-ze-szlichta-pod-malowanie", priority: "0.9" },
  { loc: "/polityka-prywatnosci", priority: "0.3" },
];

const serviceEntries = servicePages.map((slug) => ({
  loc: `/uslugi/${slug}`,
  priority: "0.85",
}));

const postEntries = posts.map((p) => ({
  loc: `/realizacje/${p.slug}`,
  lastmod: p.date,
  priority: "0.6",
}));

const categoryEntries = navigation.categories
  .filter((c) => c.slug !== "wszystkie")
  .map((c) => ({
    loc: c.href,
    priority: "0.5",
  }));

const allEntries = [...pages, ...serviceEntries, ...postEntries, ...categoryEntries];

// --- sitemap.xml ---
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries
  .map(
    (e) => `  <url>
    <loc>${SITE_URL}${withTrailingSlash(e.loc)}</loc>
    <lastmod>${e.lastmod || TODAY}</lastmod>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

writeFileSync(resolve(root, "public/sitemap.xml"), sitemapXml);
console.log(`sitemap.xml: ${allEntries.length} URLs`);

// --- robots.txt ---
const robotsTxt = `User-agent: *
Disallow:

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync(resolve(root, "public/robots.txt"), robotsTxt);
console.log("robots.txt: generated");

// --- llms.txt ---
const servicesList = [
  "Tynki maszynowe gipsowe",
  "Tynki gipsowe ze szlichtą wygładzającą pod malowanie",
  "Tynki gipsowe utwardzane",
  "Gładź natryskowa",
  "Zabudowy z płyt gipsowo-kartonowych (G-K)",
  "Natryskowe malowanie ścian",
];

const postsSummary = posts
  .map((p) => `- ${p.title} (${p.location}, ${p.date})`)
  .join("\n");

const llmsTxt = `# ${site.name}

> ${site.description}

## Informacje o firmie

- Nazwa: M-TYNK
- Branża: Usługi tynkarskie i wykończeniowe
- Lokalizacja: ${site.address}
- Obszar działania: Wrocław i okolice
- Działalność od: 1999 roku
- Telefon: ${site.phone}
- E-mail: ${site.email}
- Strona: ${site.url}

## Usługi

${servicesList.map((s) => `- ${s}`).join("\n")}

## Realizacje

${postsSummary}

## Linki

${allEntries.map((e) => `- ${SITE_URL}${withTrailingSlash(e.loc)}`).join("\n")}

## Media społecznościowe

- Facebook: ${site.facebookUrl}
- Instagram: ${site.instagramUrl}
- Opinie Google: ${site.googleReviewUrl}
`;

writeFileSync(resolve(root, "public/llms.txt"), llmsTxt);
console.log("llms.txt: generated");
