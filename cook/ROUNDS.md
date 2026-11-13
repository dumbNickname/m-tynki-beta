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
