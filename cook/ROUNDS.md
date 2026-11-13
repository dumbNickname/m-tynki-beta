# Rounds

Bar: critic median ≥ 8/10 on layout, typography, color, imagery, trust (2 fresh-context critics per round).
Stills: `cook/stills/rNN/` · Side by side (left = production, right = round): `cook/compare/rNN/`

## r00 — baseline (production wroclawtynki.pl)
Centered hero on grey, uppercase two-row nav, eyebrow labels, social tiles, 01/02/03 numbered timeline.

## r01 — "światło boczne" first pass
Changed: left-aligned photo hero with Ken Burns + text rise; single-row header; before/after plaster slider
(procedural SVG textures, mascot riding the seam, auto sweep); realizacje grid; services = featured card + list;
scroll-driven reveals and timeline rail; mascot badge with rotating GŁADZIOLIT ring.
Scores (median): layout 7, typography 6, color 6, imagery 6, trust 7. Both critics: B better than A.
Gaps: services list reads like a sitemap; low-contrast small body text; three overlapping "about" blocks;
owner cut-out on a grey box; timeline lost its numbers.

## r02 — critic fixes
Changed: services → full-width featured card + 3×2 icon cards + call strip; bigger H2 scale, body copy
darkened to --color-text at 17px; timeline numbers back inside the dots; owner photo cut out (flood fill)
and placed in front of a plaster wall panel (also fixes the white box in dark mode); "Jak podchodzimy do
pracy" merged into the #o-nas section (h3, mascot badge); hero trust line now lists towns instead of
repeating "od 1999"; comparison mascot fully inside the panel.
Scores (median): layout 7, typography 6, color 7, imagery 6, trust 7.
Gaps: reviews marquee looks clipped mid-sentence; hero rating line tiny; mobile hero wastes top on ceiling beams.

## r03 — reviews + hero polish (final round)
Changed: reviews marquee → scroll-snap rail of complete cards (8-line clamp + "Pokaż całą opinię", full text in
HTML), big 4,9 summary block, SVG stars everywhere; hero rating line 16px white, stronger text gradient; mobile hero
image anchored low so the ceiling is cropped; larger service icon tiles.
Scores (median): layout 7, typography 6.25, color 7, imagery 5.5, trust 7. Both critics: B clearly better than A.
Plateau — remaining gaps need content, not code:
- real raking-light photos of finished walls (to replace/sit next to the illustrative slider)
- an on-site photo of the owner at work (critic: the cut-out looks posed, and young for "od 1999")
- larger/more realizacje photos of finished rooms rather than workers' backs
Stopped here (experiment scope).

## r04 — social restored (owner requirement)
Big brand-coloured FB / IG / Galeria cards back on the homepage; FB/IG buttons in the mobile flyout.

## r05 — motion everywhere + honest comparison
User feedback: "where is the motion?" (scroll-driven CSS only runs in Chromium) and "the szlichta comparison is
overdone — the real difference is subtle". Changed: IntersectionObserver reveals (`src/utils/motion.ts`, hidden state only
under `html.motion`), staggered fade-ups, trowel-stroke clip-path wipe on photos, count-up stats, hero parallax;
texture relief cut to roughly a third, caption now says "duże zbliżenie".
Scores (median): layout 7, typography 7, color 7, imagery 6, trust 8, motion 6.5. Both critics: B better.
Gaps: reveals too slow (blank frames mid-scroll); wipe shows white; halves differ in tint; stats row uneven.

## r06 — critic fixes
Faster reveals (0.55s, stagger cap 3); wipe now clips the photo over a plaster-tone wrapper; identical base colour and
lighting on both halves (measured: same mean RGB); smaller slider mascot; third stat "4 kraje"; star no longer
shifts the baseline; stronger mobile hero shade.
Scores (median): layout 7.25, typography 7.75, color 8, imagery 6.75, trust 8, motion 7.25. Both critics: B better.

## r07 — final polish (no critic round)
Reviews moved before "Śledź nas"; texture shown 1:1 (`object-fit: none`) so the grain stays visible on mobile;
smooth half without streaks; review cards equal height; inline arrows on wrapped links.
Kept on purpose: brand-coloured social tiles (owner wants them loud), mascot on the seam (concept).
Video of the motion: cook/stills/r07/motion-scroll.webm.
