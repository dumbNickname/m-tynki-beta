# AGENTS.md — M-TYNK Wrocław Website

## Project Overview

This project contains **two versions** of the M-TYNK website (a plastering company in Wrocław, Poland):

1. **Legacy static HTML** (root `/`) — Original WordPress + Elementor export. Static HTML files, no build system.
2. **SolidJS SSG site** (`solid-site/`) — Modern rewrite using SolidJS with static site generation.

Live domain: `wroclawtynki.pl`
All user-facing content is in **Polish (pl-PL)**.

---

## SolidJS Site (`solid-site/`)

### Tech Stack

- **Framework:** SolidJS 1.9 + SolidStart 1.1 + Vinxi 0.5
- **Routing:** @solidjs/router (file-based routes)
- **SEO:** @solidjs/meta (Title, Meta, Link tags)
- **Build output:** Static site generation (SSG) via `preset: "static"` in `app.config.ts`
- **Styling:** Single global CSS file (`src/styles/global.css`), no CSS modules
- **Data:** JSON files in `src/data/` (no CMS, no API calls)
- **TypeScript:** Strict mode enabled

### Build / Dev / Test Commands

```bash
cd solid-site
npm install        # Install dependencies
npm run dev        # Development server (vinxi dev)
npm run build      # Static site generation (vinxi build) → .output/public/
npm run preview    # Preview built site (vinxi start)
npm run typecheck  # TypeScript check (tsc --noEmit)
```

There are **no lint or test commands** configured yet.

### Directory Structure

```
solid-site/
├── app.config.ts              # SolidStart config (static preset, prerender routes)
├── package.json
├── tsconfig.json
├── public/
│   └── images/                # All site images (logos, uploads, gallery)
│       ├── mtynk-logo-gladziolit.png
│       ├── m-tynk_logo_greenw-300x81-1.png
│       ├── mtynk-ludzik-gladziolit-300x300-1.png
│       ├── ocena-google-300x300-1-150x150-1.png
│       └── uploads/           # Post/gallery images (2023/, 2024/, elementor/)
└── src/
    ├── app.tsx                # Root app (Router + MetaProvider)
    ├── entry-client.tsx       # Client entry (hydration)
    ├── entry-server.tsx       # Server entry (HTML document shell)
    ├── styles/
    │   └── global.css         # All styles (variables, layout, components, responsive)
    ├── data/
    │   ├── site.json          # Site metadata (name, phone, email, URLs, logos)
    │   ├── navigation.json    # Nav links (main, footer, categories)
    │   ├── posts.json         # Blog posts (slug, title, date, categories, gallery, etc.)
    │   └── gallery.json       # Gallery page image paths
    ├── components/
    │   ├── Layout.tsx         # Page wrapper (Header + main + Footer)
    │   ├── Header.tsx         # Sticky header (desktop nav + mobile flyout menu)
    │   ├── Footer.tsx         # Site footer (brand, links, social, copyright)
    │   ├── SeoHead.tsx        # SEO meta tags (title, OG, canonical, twitter)
    │   ├── PageHeader.tsx     # Page title banner with breadcrumbs
    │   ├── PostCard.tsx       # Blog post card for listing pages
    │   └── Gallery.tsx        # Image grid with lightbox
    └── routes/
        ├── index.tsx                          # Homepage (/)
        ├── kontakt.tsx                        # Contact page (/kontakt)
        ├── galeria.tsx                        # Gallery page (/galeria)
        ├── tynki-ze-szlichta-pod-malowanie.tsx # Service page
        ├── polityka-prywatnosci.tsx           # Privacy policy
        ├── realizacje/
        │   ├── index.tsx                      # All posts listing (/realizacje)
        │   └── [slug].tsx                     # Single post page (/realizacje/:slug)
        └── category/
            └── [slug].tsx                     # Category filtered listing (/category/:slug)
```

### Prerendered Routes (16 total)

Defined in `app.config.ts`:
- `/`, `/kontakt`, `/realizacje`, `/galeria`, `/tynki-ze-szlichta-pod-malowanie`, `/polityka-prywatnosci`
- 6 post detail pages: `/realizacje/{slug}`
- 4 category pages: `/category/{slug}`

### CSS Architecture

- Single file: `src/styles/global.css`
- CSS custom properties on `:root` for colors, fonts, spacing, shadows
- Class naming: flat descriptive names matching component usage (e.g., `post-card`, `post-card-title`, `hero-bg`, `footer-grid`)
- Responsive breakpoints: 1024px (tablet), 768px (mobile)
- Desktop/mobile header swap via `.header-desktop` / `.header-mobile` display toggle
- Fonts: Inter (body), Plus Jakarta Sans (headings) from Google Fonts

### Data Model

**site.json**: Company info (name, phone, email, address, social URLs, logo paths)
**navigation.json**: Main nav links, footer links, category definitions (slug + label)
**posts.json**: Array of post objects with: slug, title, date, categories[], thumbnail, excerpt, description (HTML), executor, duration, area, location, gallery[]
**gallery.json**: Array of image paths for the gallery page

### Adding New Content

**New blog post:**
1. Add entry to `src/data/posts.json`
2. Add images to `public/images/uploads/`
3. Add prerender route to `app.config.ts`

**New page:**
1. Create route file in `src/routes/`
2. Use `Layout`, `SeoHead`, `PageHeader` components
3. Add prerender route to `app.config.ts`
4. Add navigation entry to `src/data/navigation.json` if needed

### Important Notes for Agents

1. Run `npm run typecheck` after any TypeScript changes
2. Run `npm run build` to verify all routes prerender successfully
3. Images are served from `public/images/` — paths in JSON data start with `/images/`
4. Do NOT edit legacy WordPress files in the root (those are the old site)
5. The `entry-server.tsx` defines the HTML document shell (lang, favicons, fonts, CookieYes script)
6. All components import data directly from JSON files (static imports, no dynamic fetching)
7. The Gallery component manages its own lightbox state
8. Category `"wszystkie"` means "all" — shows all posts without filtering

---

## Legacy Static HTML Site (root `/`)

The original WordPress export. Kept for reference. See below for structure.

### Key Files

- `index.html` — Homepage
- `kontakt.html` — Contact page
- `realizacje.html` — Portfolio page
- `galeria.html` — Gallery page
- `tynki-ze-szlichta-pod-malowanie.html` — Service page
- `polityka-prywatnosci.html` — Privacy policy
- `wp-content/` — Static assets (CSS, images)
- `wp-includes/` — WordPress core JS/CSS

### Notes

- No build system, no package manager
- Do not edit vendor files in `wp-content/plugins/`, `wp-content/themes/astra/`, or `wp-includes/`
- These files are reference only for the migration

---

## Git Conventions

- Commit messages in English
- Descriptive commit messages explaining the change purpose
