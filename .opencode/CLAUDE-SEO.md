# claude-seo plugin: status & enrichment options for this project

A user-global port of [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo)
v2.0.0 is installed under `~/.config/opencode/`. This file documents what is
active for **this project (m-tynki / wroclawtynki.pl)** and what optional MCPs
or API tiers would unlock additional audit fidelity.

This is a **reference document**, not configuration. It does not change
behavior on its own. To actually enable an enrichment, edit
`~/.config/opencode/opencode.json` per the instructions in the orchestrator
skill (`~/.config/opencode/skills/seo/SKILL.md`, "Optional Enrichments"
section).

## What's installed today

| Component | Location | Count |
|---|---|---|
| Skills (orchestrator + sub-skills) | `~/.config/opencode/skills/seo*/` | 25 |
| Sub-agents (callable via `task`) | `~/.config/opencode/agent/seo-*.md` | 18 |
| Reference docs (E-E-A-T, CWV, schema types, 10-principle framework, etc.) | `~/.config/opencode/skills/seo*/references/` | 14 folders |
| Python helper scripts | `~/.config/opencode/skills/claude-seo-shared/scripts/` | 50 |
| Python venv with all deps installed | `~/.config/opencode/skills/claude-seo-shared/.venv/` | — |
| Playwright Chromium (for SPA rendering + screenshots) | `~/.cache/ms-playwright/` | — |
| Schema templates, Google updates JSON, PDF templates | `~/.config/opencode/skills/claude-seo-shared/{schema,data,pdf}/` | — |

## What runs out of the box (zero config, zero cost)

Triggering `/seo audit https://wroclawtynki.pl` (or any other site) will:

- Crawl the site (built-in crawler, up to 500 pages, respects robots.txt)
- SPA-aware fetching via Playwright + Chromium
- Detect business type (Local Service is the expected match for M-TYNK)
- Fan out parallel subagents: `seo-technical`, `seo-content`, `seo-schema`,
  `seo-sitemap`, `seo-performance`, `seo-visual`, `seo-geo`, `seo-sxo`, and
  `seo-local` (Local Service detected)
- Boilerplate-stripped content extraction (trafilatura) + publication date
  detection (htmldate)
- E-E-A-T scoring per Sept 2025 Quality Rater Guidelines
- JSON-LD schema detection, validation, and generation recommendations
- Sitemap analysis, robots.txt audit, security header check
- AI search readiness (GEO) scoring across ChatGPT / Perplexity / AI Overviews
- Lab-data Core Web Vitals estimates from HTML inspection
- Synthesized prioritized action plan (Critical → High → Medium → Low) using
  the 10-principle PERCEIVE → ANALYZE → VALIDATE → ACT framework
- Optional: PDF report generation via WeasyPrint (`scripts/google_report.py`)

This level of audit is already valuable for both wroclawtynki.pl (small local
site) and dw.com (large publisher). For dw.com specifically, expect the
crawler to cap out at the 500-page limit — that's a known limitation noted
in the audit report.

## Free enrichments worth considering

Each of these adds genuine signal at zero cost. Wire them up in
`~/.config/opencode/opencode.json` under `mcp:`, then restart opencode.

### Google APIs (Tier 0–3) — most valuable, free, NOT an MCP

This is a direct API integration via `scripts/google_auth.py`, not an MCP. It
uses Google's first-party APIs and replaces the audit's lab-data CWV
estimates with real Chrome User Experience Report (CrUX) field data — a
substantial fidelity upgrade.

| Tier | Credentials | Unlocks |
|---|---|---|
| 0 | Free API key (no OAuth) | PageSpeed Insights, CrUX (real CWV), CrUX History (25-week trend) |
| 1 | + OAuth or service account | Search Console: queries, URL Inspection, sitemap status; Indexing API |
| 2 | + GA4 property config | GA4 organic traffic, top landing pages, device/country breakdown |
| 3 | + Ads developer token | Keyword Planner: search volume, competition data |

**For this project:** Tier 0 alone gives you real CWV data for any URL — no
ownership required. Tiers 1–3 require ownership/access to the properties
being audited, so they apply to wroclawtynki.pl (if access available) but not
to third-party sites like dw.com.

Setup wizard:

```bash
~/.config/opencode/skills/claude-seo-shared/.venv/bin/python \
  ~/.config/opencode/skills/claude-seo-shared/scripts/google_auth.py --setup
```

Credentials are stored at `~/.config/claude-seo/` with `0o600` perms.

### Unlighthouse MCP — multi-page real Lighthouse runs

MIT licensed, free. Replaces single-page lab estimates with parallel
Lighthouse runs across many URLs. Useful for both wroclawtynki.pl (audit all
~10 pages with real measurements) and dw.com (sample many article pages).
Enriches the `seo-performance` subagent.

### Bing Webmaster MCP — free Bing/IndexNow integration

Free Microsoft account + verified property. Adds Bing indexation status,
Bing search performance, and unified IndexNow submission for Bing / Yandex /
Naver / Seznam. Most useful for wroclawtynki.pl since you control the
property and can verify ownership.

### Firecrawl MCP — better crawling on large sites

Free tier: 500 pages/month. The built-in crawler caps at 500 pages and is
single-threaded; Firecrawl is faster, handles JS-heavy sites better, and has
deeper redirect handling. Mostly relevant for dw.com (10k+ pages) — overkill
for wroclawtynki.pl.

## Paid enrichments — context-dependent

| MCP | Cost | When to consider |
|---|---|---|
| **DataForSEO** | Pay-as-you-go, ~$0.50–$3 per enriched audit | The most cost-effective paid option. Adds live SERP positions, real keyword volumes, backlink profiles, on-page Lighthouse, AI visibility scrapers (ChatGPT, LLM mentions), local geo-grid rank tracking. For wroclawtynki.pl, the geo-grid local rank tracking would be the most valuable signal — it visualizes how the business ranks across a grid of physical locations in Wrocław for queries like "tynki wrocław". |
| **Ahrefs** | $129+/mo subscription | Only if already a customer. Enriches `seo-backlinks`. |
| **SE Ranking** | $65+/mo subscription | Only if AI Share-of-Voice across ChatGPT/Gemini/Perplexity is a primary KPI. |
| **Profound** | Enterprise | Time-series LLM citation tracking. Enterprise scale only. |
| **Banana** | Free trial → paid (via Gemini) | AI image generation for SEO assets (OG images, blog heroes). Adds IPTC `TrainedAlgorithmicMedia` labeling. |

## Recommended path for this project

**Phase 1 (free, high value):**
1. Run `/seo audit https://wroclawtynki.pl` as-is to see the baseline report
2. Set up Google API Tier 0 (just an API key, ~5 minutes) for real CWV field data
3. If you want Bing/IndexNow integration, verify wroclawtynki.pl in Bing Webmaster Tools and wire up the Bing Webmaster MCP

**Phase 2 (only if needed):**
4. If the Phase 1 audit surfaces meaningful local-SEO opportunities, consider
   DataForSEO for one or two enriched audits ($0.50–$3 each) to get real
   geo-grid rank data for "tynki wrocław" and similar queries

**Phase 3 (probably skip):**
5. Ahrefs / SE Ranking / Profound are agency-scale tools. M-TYNK is a single
   local business — these have poor cost-to-value at this scale.

## Re-running the port

The port script lives at `/tmp/opencode/port_claude_seo.py` and the source
clone at `/tmp/opencode/claude-seo/`. Both are temporary (in `/tmp`) and will
be lost on reboot. To re-run after an upstream update:

```bash
git clone --depth 1 https://github.com/AgriciDaniel/claude-seo.git /tmp/opencode/claude-seo
python3 /tmp/opencode/port_claude_seo.py
```

Path-rewrite cleanup commands are documented in the conversation history that
produced the initial port. If the port script is lost, ask opencode to
reproduce it from this file's installed-state list.

## Uninstall

```bash
rm -rf ~/.config/opencode/skills/seo* ~/.config/opencode/skills/claude-seo-shared
rm -f ~/.config/opencode/agent/seo-*.md
rm -rf ~/.cache/ms-playwright   # only if not used by another tool
```
