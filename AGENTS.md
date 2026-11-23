# AGENTS.md — M-TYNK Wrocław Website

## Project Overview

This project is the M-TYNK website (a plastering company in Wrocław, Poland):

- **SolidJS SSG site** (`solid-site/`) — SolidJS with static site generation. This is the only site (the original WordPress export previously kept in `legacy-wordpress/` has been removed).

Live domain: `wroclawtynki.pl`
All user-facing content is in **Polish (pl-PL)**.

---

## SolidJS Site (`solid-site/`)

### Tech Stack

- **Package manager:** pnpm (workspace root: `pnpm-workspace.yaml`)
- **Framework:** Solid 2 (`solid-js` + `@solidjs/web`) on plain Vite 8 — no SolidStart / Vinxi / Nitro. `@solidjs/vite-plugin` in start mode generates the client/server entries from `src/App.tsx` + `src/Document.tsx` (don't add `src/entry-*.tsx` — they would override the generated ones).
- **Routing:** @solidjs/router 2 (`createRouter` in `src/router.ts`) fed by `filesystem-routing` (file-based routes from `src/routes/`, served as `virtual:file-routes`; it writes `file-routes.d.ts`, which is committed)
- **SEO:** @solidjs/meta 2 (Title, Meta, Link — no provider; same-identity tags dedupe last-wins, so two tags that share e.g. an `href` need distinct `key` props)
- **Build output:** Static site generation via `prerender-crawler` (Vite plugin in `vite.config.ts`) → `dist/client/`. The page list is derived in `vite.config.ts`: every non-dynamic file in `src/routes/`, one page per post (`posts.json`) and per category (`navigation.json`), plus the 404 page written as `404.html`. The crawler also follows every rendered link and **fails the build** on a link to a page that isn't in that list, or on any page answering ≥ 400 (so the 404 route must not set a 404 status).
- **Styling:** CSS Modules (`.module.css` co-located with components) + global.css for variables/reset/utilities
- **Fonts:** Modern system font stack (`ui-sans-serif`, `system-ui`, `-apple-system`, `Segoe UI Variable Display`, fallbacks). No web fonts loaded — performance is prioritised over typographic uniformity. The `public/fonts/` directory still contains historical Inter + Plus Jakarta Sans woff2 files but they are **not referenced anywhere** (no `@font-face` declaration). Safe to delete the dir if not needed for future use.
- **Data:** JSON files in `src/data/` (no CMS, no API calls)
- **TypeScript:** Strict mode enabled

### Build / Dev / Test Commands

```bash
cd solid-site
pnpm install       # Install dependencies (run from repo root or solid-site/)
pnpm dev           # Development server (vite, port 3000)
pnpm build         # Static site generation (vite build + prerender) → dist/client/ (also inlines CSS, writes redirect stubs)
pnpm preview       # Preview built site (vite preview)
pnpm typecheck     # TypeScript check (tsc --noEmit)
```

There are **no lint or test commands** configured yet.

### Directory Structure

```
solid-site/
├── vite.config.ts             # Vite + Solid plugin + file routes + prerender page list, BASE_PATH
├── file-routes.d.ts           # Generated route types (filesystem-routing) — committed, don't edit
├── package.json
├── tsconfig.json
├── scripts/
│   ├── generate-thumbs.py     # Generates thumbnail images (requires Pillow)
│   ├── generate-seo.mjs       # Generates sitemap.xml, robots.txt, llms.txt (runs before each build)
│   ├── check-internal-links.mjs  # Pre-build guard: fails build if raw <a href="/..."> is used instead of NavLink
│   ├── inline-css.mjs         # Post-build: inlines CSS to eliminate render-blocking <link> tags
│   └── generate-redirects.mjs # Post-build: emits meta-refresh redirect stubs for legacy URLs and removed /uslugi/* paths
├── public/
│   ├── sitemap.xml            # Auto-generated XML sitemap (16 routes)
│   ├── robots.txt             # Auto-generated robots.txt with sitemap reference
│   ├── llms.txt               # Auto-generated LLM-friendly site summary
│   └── images/                # All site images (logos, uploads, gallery)
│       ├── mtynk-logo-gladziolit.png
│       ├── m-tynk_logo_greenw-300x81-1.png
│       ├── mtynk-ludzik-gladziolit-300x300-1.png
│       ├── ocena-google-300x300-1-150x150-1.png
│       ├── thumbs/            # Auto-generated thumbnails (400px wide, JPEG q70)
│       └── uploads/           # Post/gallery images (2023/, 2024/, elementor/)
└── src/
    ├── App.tsx                # Root app (Router + <Loading>, global.css, motion init)
    ├── Document.tsx           # HTML document shell (lang, favicons, <base href>, theme init script)
    ├── router.ts              # createRouter over the file routes (base = BASE_PATH)
    ├── client-setup.ts        # Browser-only setup run before hydration (full-reload link handling)
    ├── styles/
    │   └── global.css         # All styles (variables, dark theme overrides, layout, components, responsive)
    ├── data/
    │   ├── site.json          # Site metadata (name, phone, email, URLs, logos)
    │   ├── navigation.json    # Nav links (main, footer, categories)
    │   ├── posts.json         # Blog posts (slug, title, date, categories, gallery, etc.)
    │   ├── gallery.json       # Gallery page image paths
    │   └── reviews.json       # Selected Google reviews (static copy, names shortened to first name + initial)
    ├── utils/
    │   └── images.ts          # Shared image utilities (toThumb path converter)
    ├── components/
    │   ├── Layout.tsx         # Page wrapper (Header + main + Footer + ScrollToTop + CookieBanner)
    │   ├── Header.tsx         # Sticky header (desktop nav + mobile flyout menu + theme toggle)
    │   ├── Footer.tsx         # Site footer (brand, links, social, copyright)
    │   ├── SeoHead.tsx        # SEO meta tags (title, OG, canonical, twitter)
    │   ├── PageHeader.tsx     # Page title banner with breadcrumbs
    │   ├── PostCard.tsx       # Blog post card for listing pages (uses thumbnails)
    │   ├── Gallery.tsx        # Image grid with lightbox (thumbnails in grid, full-res in lightbox)
    │   ├── Reviews.tsx        # Google reviews grid (static data, no third-party scripts)
    │   ├── ThemeToggle.tsx    # Dark/light mode toggle button (sun/moon icons)
    │   ├── CookieBanner.tsx   # Lightweight self-hosted cookie consent banner
    │   └── ScrollToTop.tsx    # Scroll-to-top floating button
    └── routes/
        ├── index.tsx                          # Homepage (/)
        ├── kontakt.tsx                        # Contact page (/kontakt)
        ├── galeria.tsx                        # Gallery page (/galeria)
        ├── tynki-ze-szlichta-pod-malowanie.tsx # THE flagship service page (all service content consolidated here)
        ├── o-nas.tsx                          # About page — owner's career timeline (/o-nas), Person schema
        ├── polityka-prywatnosci.tsx           # Privacy policy
        ├── realizacje/
        │   ├── index.tsx                      # All posts listing (/realizacje)
        │   ├── [slug].tsx                     # Single post page (/realizacje/:slug)
        │   └── kategoria/
        │       └── [slug].tsx                 # Category filtered listing (/realizacje/kategoria/:slug)
        └── [...404].tsx                       # Catch-all 404 page
```

### Prerendered Routes (19 total)

Derived automatically in `vite.config.ts` (no manual list):
- `/`, `/kontakt`, `/realizacje`, `/galeria`, `/tynki-ze-szlichta-pod-malowanie`, `/malowanie-tynku-gipsowego`, `/o-nas`, `/polityka-prywatnosci`, and the 404 page → `404.html`
- 7 post detail pages: `/realizacje/{slug}` (from `posts.json`)
- 3 category pages: `/realizacje/kategoria/{slug}` (from `navigation.json`, except `wszystkie`)

### CSS Architecture

- CSS Modules (`.module.css` files co-located with components and routes)
- Global file `src/styles/global.css` contains only CSS custom properties, reset/normalize, typography, and shared utility classes (`container`, `section`, `grid-2`, `grid-3`, `btn-*`, `text-center`, `divider`)
- CSS custom properties on `:root` for colors, fonts, spacing, shadows
- Dark theme via `[data-theme="dark"]` selector in `global.css` overriding `:root` color variables
- Responsive breakpoints: 1024px (tablet), 768px (mobile) — each module contains its own media queries
- Fonts: system font stack only — see "Tech Stack" above. The `--font-body` and `--font-heading` CSS variables both resolve to the same modern system stack defined in `global.css`.
- TypeScript declarations for CSS modules come from `vite/client` (referenced in `src/vite-env.d.ts`)

### Data Model

**site.json**: Company info (name, phone, email, address, social URLs, logo paths) + registry data (`legalName`, `nip`, `regon`, `foundingDate` — verified against the MF VAT white list / CEIDG; business registered 2019-09-16, so site copy says "doświadczenie od 1999", never "firma od 1999") + `owner` (name, jobTitle, careerStart, knowsAbout) — feeds the sitewide `Person` JSON-LD (`#owner`, linked as `Organization.employee`), `/o-nas`, and llms.txt. The owner's bio text on `/o-nas` is his own story, lightly edited — get his approval before changing facts.
**navigation.json**: Main nav links (6 items), footer links (anchor links to flagship page sections), category definitions (slug + label)
**posts.json**: Array of post objects with: slug, title, date, categories[], thumbnail, excerpt, metaDescription (optional, ≤155 chars, used for the meta description instead of excerpt), description (HTML), executor, duration, area, location, gallery[]
**gallery.json**: Array of image paths for the gallery page
**reviews.json**: Array of review objects with: name (first name + surname initial, or the reviewer's nickname), year, text (verbatim), stars. Hand-picked from the Google Business Profile — copy text verbatim, never edit wording.
**site.json → googleRating / googleRatingValue / googleReviewCount / googleRatingCheckedAt**: Overall Google rating shown on the site (homepage stats, reviews badge, flagship page, contact page, llms.txt). Update manually when the Google profile changes; bump `googleRatingCheckedAt`. `site.description` quotes the rating, review count and phone as plain text — `generate-seo.mjs` fails the build if those quotes drift, so update the description in the same edit. `googleReviewsListUrl` opens the real Google listing — every review block must link there.

### Adding New Content

**New blog post (realizacja):**
1. Add entry to `src/data/posts.json`
2. Add images to `public/images/uploads/`
3. Run `python3 scripts/generate-thumbs.py` to create thumbnails
(The page is prerendered automatically — `vite.config.ts` reads `posts.json`.)

**New page:**
1. Create route file in `src/routes/`
2. Use `Layout`, `SeoHead`, `PageHeader` components
3. Static routes are prerendered automatically; a new dynamic (`[param]`) route needs its pages added in `vite.config.ts`
4. Add navigation entry to `src/data/navigation.json` if needed

### Important Notes for Agents

1. Run `pnpm typecheck` after any TypeScript changes
2. Run `pnpm build` to verify all routes prerender successfully — this also auto-regenerates `sitemap.xml`, `robots.txt`, and `llms.txt` via `scripts/generate-seo.mjs` (no manual step needed)
3. Images are served from `public/images/` — paths in JSON data start with `/images/`
4. `src/Document.tsx` defines the HTML document shell (lang, favicons, `<base href>`, theme init script)
6. All components import data directly from JSON files (static imports, no dynamic fetching)
7. The Gallery component manages its own lightbox state. Opening/closing morphs thumbnail ↔ full photo via the View Transitions API (`view-transition-name: gallery-photo`); it falls back to the plain lightbox when unsupported, under `prefers-reduced-motion`, or if the full image doesn't decode within 250 ms. Both the lightbox and the mobile flyout menu (`Header.tsx`) are native modal `<dialog>`s opened with `showModal()` — the browser provides focus trapping, background inertness, Esc/back-gesture dismissal and focus return. Don't add `role="dialog"`, `aria-modal`, JS focus traps or `body { overflow: hidden }` scroll locks; scroll chaining is stopped with `overscroll-behavior: contain` on the dialog and its `::backdrop`. A closed dialog is `display: none`, so its links never become invisible tab stops.
8. Category `"wszystkie"` means "all" — shows all posts without filtering
9. The Reviews component renders static review data from `reviews.json` — no TrustIndex or third-party widget scripts. It always links to the real Google listing (`site.googleReviewsListUrl`) and to the "write a review" link (`site.googleReviewUrl`). There is intentionally **no `aggregateRating` / `review` JSON-LD**: Google ignores self-serving review markup for LocalBusiness/Organization, and a hand-picked subset would misrepresent the real rating. Reviews render as a horizontal scroll-snap rail (prev/next buttons, `aria-disabled` at the ends so focus isn't dropped). Autoplay advances one card every 4 s, never starts under `prefers-reduced-motion`, stops for good when the visitor scrolls/focuses the rail, and has a pause/play button (WCAG 2.2.2) — keep it; reviews longer than 380 chars are line-clamped with a "Pokaż całą opinię" toggle — the full text is always in the HTML.
10. Homepage order: photo hero (left-aligned H1, Ken Burns + text rise), intro with stats, "Co daje szlichta wygładzająca?" before/after slider (`PlasterCompare`), latest 3 realizacje, reviews rail, "Śledź nas" (`SocialFollow`: big brand-coloured Facebook / Instagram / Galeria cards — the owner wants social links big and easy to reach; FB/IG buttons are also in the mobile flyout), services ("Co robimy na budowie": full-width featured card + 3×2 icon cards + call strip), numbered timeline, `#o-nas` section (owner photo slot (`PhotoPending` placeholder until the owner sends a real portrait) on a plaster panel + "Jak podchodzimy do pracy" with `MascotBadge`), CTA band. All service cards link to the ONE flagship page (`/tynki-ze-szlichta-pod-malowanie`) with section anchors — there are NO separate /uslugi/* pages anymore.
11. **Dark theme**: Controlled via `data-theme="light|dark"` on `<html>` plus `<meta name="color-scheme">` (`light dark` = follow the OS, `light`/`dark` = user override). An inline script in `Document.tsx` reads `localStorage("mtynk_theme")` before paint to prevent flash; CSS `color-scheme` follows `data-theme` so native UI matches. `localStorage` only holds an explicit override: ThemeToggle stores the opposite of the OS scheme and **removes** the key when the user toggles back to what the OS uses (never store a value just because it's the current state). Both toggle instances share one signal and follow OS changes / other tabs (`storage` event).
12. **Cookie banner**: Self-hosted (`CookieBanner.tsx`), stores consent in `localStorage("mtynk_cookies_accepted")`. No third-party cookie scripts (CookieYes was removed). The site sets no cookies — only uses localStorage for theme preference and cookie consent.
13. **Image thumbnails**: Gallery grid and PostCard listings use 400px-wide JPEG thumbnails from `public/images/thumbs/`. Full-res images load only in the lightbox. Run `python3 scripts/generate-thumbs.py` after adding new images. The `toThumb()` utility in `src/utils/images.ts` converts image paths to their thumbnail equivalents. Post card images (`posts.json → thumbnail`) also get an 800px variant in `public/images/medium/` (`toMedium()`), used by `PostCard`'s srcset — never put the full-size original in a card srcset. Variant names: `.jpg` sources keep their name; any other extension is folded into the name (`wyr.png` → `wyr-png.jpg`) so `wyr.png` and `wyr.jpg` can't overwrite each other's thumbnail. `toVariant()` (TS) and `to_variant_path()` (Python) must stay identical. Do not add a sitewide `<link rel="preload">` for page-specific images in `Document.tsx` — the shell is shared by every page.
14. **Lazy loading**: All below-the-fold `<img>` tags use native `loading="lazy"`. Header logos and hero image are intentionally eager (above the fold, hero uses `fetchpriority="high"`).
15. **No analytics/tracking**: The site has no Google Analytics, Facebook Pixel, or any third-party tracking scripts. The privacy policy (`polityka-prywatnosci.tsx`) reflects this — update it if analytics are added.
16. **Full-reload navigation (intentional)**: The site intentionally uses full page reloads instead of SolidJS client-side routing. `src/client-setup.ts` (wired via `start.clientSetup`) contains a global click handler that intercepts internal `<a>` clicks and forces `window.location.href` navigation, plus a `popstate` handler that reloads on back/forward. `NavLink` uses plain `<a>` tags (not `<A>` from `@solidjs/router`) for the same reason. This is by design for SSG — each page is a fully pre-rendered HTML document. The router is created with `explicitLinks: true`, so it never claims plain links. Do NOT remove these handlers or switch link handling on in the router.
17. **404 page**: Defined as a catch-all route at `src/routes/[...404].tsx` (with `[...404].module.css`). Seeded in `vite.config.ts` as `/404` with the output filename `404.html`, because **GitHub Pages only serves a top-level `404.html`**. It must render with status 200 (no `httpStatus(404)`), otherwise the prerender crawl fails. If you change hosts, verify the new host serves `404.html` from the root on missing paths (Netlify, Cloudflare Pages, Vercel all do; raw S3 / Nginx need explicit config).
18. **Dark theme color tokens invert** (`--color-dark`, `--color-white`, `--color-text`, etc.) — they swap meaning between light and dark mode. **This is a footgun for hardcoded "always dark" UI**: using `var(--color-dark)` as a background for an always-dark element will make it go *white* in dark mode. If you do need an always-dark surface, hardcode the hex (e.g. `#14171c`) and provide an explicit `[data-theme="dark"]` override. We tried this once for the homepage's "Tynki Gipsowe ze szlichtą wygładzającą" featured card and reverted — it read as a forgotten dark accident on the light page rather than intentional emphasis. The homepage featured service card is now solid brand green (`#2e6b3b`, `#1f3d28` in dark mode) with white text — a deliberate brand surface, not a theme token, so it reads correctly in both modes.
19. **Motion**: below-the-fold reveals run in `src/utils/motion.ts` (called from `onSettled` in `App.tsx`): an IntersectionObserver adds `.is-in` to `.reveal` (fade-up, staggered per parent) and `.reveal-wipe` (photo wiped left→right over the wrapper background) elements, counts up `[data-count]` numbers, and drives hero parallax (`[data-parallax]`, via the `translate` property so it composes with the Ken Burns `transform`). The hidden starting state exists only under `html.motion`, which the script sets after marking on-screen items as revealed — no-JS, crawlers and `prefers-reduced-motion` always get the finished page. `[data-count]` spans must contain the final value in the HTML. The timeline rail fill is still CSS scroll-driven (Chromium/Safari only, static elsewhere). The hero H1 animates transform only (no opacity) to stay an LCP candidate. `PlasterCompare` uses procedural SVG textures (`plaster-rough.svg`, `plaster-smooth.svg`, shown 1:1 with `object-fit: none`) as `<img>` and is labelled as an illustrative close-up — keep that caption, keep both halves at the same base colour, and keep the relief subtle (the owner: the real difference is subtle). Decorative loops (MascotBadge ring, PlasterCompare raking light, PhotoPending wink, 404 hint nudge) must not run endlessly on their own — WCAG 2.2.2 would then require a pause button: they play once (≤ ~5 s) or only while hovered. The mascot artwork (`mtynk-mascot-figure.*`) is cut unchanged from the owner's logo; do not redraw or alter it.
20. **Timeline**: the "Co się dzieje na budowie" section is an `<ol>` with numbered dots on a vertical rail (`.timeline::before` track + `::after` fill). The rail relies on consistent spacing — don't add `margin` between timeline items (use `padding`).
21. **Legacy URL redirects**: The old WordPress site exposed portfolio posts at top-level slugs (e.g. `/tynkowanie-scian-we-wroclawiu`); the rewrite moved them under `/realizacje/{slug}/`. Google still has the old URLs indexed, and on a static host they would 404 (showing as "Crawled, not indexed" / soft-404 in Search Console). `scripts/generate-redirects.mjs` runs post-build and emits a meta-refresh + `<link rel=canonical>` stub (intentionally **no** `noindex` — it would make Google drop the old URL's signals instead of consolidating them) at `dist/client/{old-slug}/index.html` for each — the static-host equivalent of a 301. The map is auto-derived from `posts.json` (`/{slug}` → `/realizacje/{slug}/`); add any old URL whose slug differs from the new one to the `LEGACY_REDIRECTS` object in that script. The script **skips** any path where a real prerendered page already exists, so it can't clobber routes like `/tynki-ze-szlichta-pod-malowanie/`. These stubs are intentionally **not** in `sitemap.xml` (you don't advertise redirected URLs). The `LEGACY_REDIRECTS` map also includes the removed `/uslugi/*` paths that now redirect to the flagship page — except `/uslugi` and `/uslugi/firma-tynkarska-wroclaw`, which redirect to `/` (the homepage owns the "firma tynkarska" query).
22. **Page images / `primaryImageOfPage`**: `SeoHead`'s `ogImage` prop means "this page's own main image" (a real photo shown on or cropped from the page, never a logo or mascot). When set, the JSON-LD gets one full `ImageObject` (`@id: {canonical}#primaryimage`, `url`, numeric `width`/`height`) in the page node's `image` list, and `primaryImageOfPage` is just `{"@id": …}`. Pages without `ogImage` still share `og-default.jpg` on social media but output **no** `primaryImageOfPage`. Dimensions come from `src/data/image-sizes.json`, generated by `scripts/generate-image-sizes.mjs` (runs in `pnpm build`; scans `ogImage="..."` literals in routes + post hero images (the JPEG original, or the `images/medium/` JPEG for PNG posts — mirrors `heroSrc()` in `realizacje/[slug].tsx`), fails under 50,000 px). Run it manually after changing a page image if you want dev to pick it up.
23. **Content-Security-Policy — considered and rejected for now (Nov 2026)**. Don't re-propose it unless the trigger below applies.
    - *Idea:* GitHub Pages can't set response headers, so the only option is a `<meta http-equiv="Content-Security-Policy">` as the first `<head>` element, written by a post-build script with per-page SHA-256 hashes for the inline scripts (theme init + Solid hydration; `application/ld+json` isn't affected). Sketch: `default-src 'self'; script-src 'self' 'sha256-…'; style-src 'self' 'unsafe-inline'` (inlined CSS + Solid `style=""` attributes) `; img-src 'self' data:; frame-src https://www.google.com https://maps.google.com` (Maps iframe on `/kontakt`) `; object-src 'none'; base-uri 'self'` (we use `<base href>`) `; form-action 'self'; upgrade-insecure-requests`. Plus a build check that fails on any unhashed inline script.
    - *Why rejected:* **zero SEO/ranking effect** (not a Google signal; Lighthouse's CSP audit is unscored Best Practices). Security gain is small: static site, no stored/reflected user input, no third-party scripts, content only from repo JSON. Hashes computed post-build would also whitelist anything injected at build time, so it doesn't protect against a compromised dependency. A meta CSP can't do `frame-ancestors` (clickjacking), `report-to`, or other security headers — those need a header-capable host/proxy (e.g. Cloudflare in front of Pages), which is too much infrastructure for this site. Cost: ~60-line script + check + testing every page type, and a silent-breakage risk (blocked scripts, no reporting) whenever an inline script changes.
    - *Revisit when:* a third-party script/widget/analytics is added (then the allowlist and the privacy-policy update go together), user input starts being stored and rendered, or the site moves to a host/proxy that can send real headers (then use a header CSP and add `frame-ancestors 'none'`, HSTS, `X-Content-Type-Options`).
24. **Solid 2 gotchas hit during the migration** (Nov 2026):
    - `false` on an attribute *removes* it. ARIA state attributes need the string values: `aria-expanded={open() ? "true" : "false"}`, same for `aria-pressed` / `aria-disabled` (CSS and screen readers rely on `="false"`).
    - JSX must be created inside a component (an owner). Module-level JSX — e.g. a data array with `content: <p>…</p>` — fails SSR with "getNextContextId cannot be used under non-hydrating context"; store a function (`content: () => <p>…</p>`) and call it in render.
    - `onMount` → `onSettled`, and its cleanup is the returned function (no `onCleanup` inside it). `classList` → object/array `class`. `JSX` types come from `@solidjs/web`.
    - Production SSR errors are sanitized to "Internal Server Error"; run `pnpm dev` and open the page to see the real message.

---

## Git Remotes & Deployment Workflow

This project has **two remote repositories**:

| Remote   | URL                                                  | Purpose              |
|----------|------------------------------------------------------|----------------------|
| `beta`   | `https://github.com/dumbNickname/m-tynki-beta.git`  | Preview / staging    |
| `origin` | `https://github.com/dumbNickname/m-tynki.git`       | Production           |

**`beta` is the default push target** (`remote.pushDefault = beta`). This means:

- `git push` → pushes to **beta** (preview site on GitHub Pages at `dumbNickname.github.io/m-tynki-beta`)
- `git push origin` → pushes to **production** (served at `wroclawtynki.pl`)

### Base Path Handling

The GitHub Actions workflow (`.github/workflows/deploy.yml`) detects which repo it's running in:
- **Beta repo** (`dumbNickname/m-tynki-beta`): builds with `BASE_PATH=/m-tynki-beta` so the site works under a subpath on GitHub Pages
- **Production repo** (`dumbNickname/m-tynki`): builds with `BASE_PATH=/` for the custom domain

The `BASE_PATH` env var flows into:
- `vite.config.ts` → Vite `base` (`BASE_PATH/`) and the prerendered page paths; app code reads it back as `basePath` (`src/utils/base.ts`, from `import.meta.env.BASE_URL`)
- `router.ts` → router `base`
- `Document.tsx` → `<base href>` tag (resolves all relative image/link paths)
- `SeoHead.tsx` → `robots` meta becomes `noindex, nofollow` on beta. It must live there, not in `Document.tsx`: Meta 2 dedupes `name="robots"` and the page's tag would silently win.
- `NavLink` component → prepends base to internal `href`s

### Typical Workflow

1. Make changes on `master`
2. `git push` — deploys to beta for preview
3. Verify on beta GitHub Pages URL
4. `git push origin` — deploys to production

---

## Git Conventions

- Commit messages in English
- Descriptive commit messages explaining the change purpose
