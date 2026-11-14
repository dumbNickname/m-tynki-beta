# Changelog — `experiment/cook-redesign`

Beta only (https://dumbnickname.github.io/m-tynki-beta/). Production is untouched.
Homepage rounds r00–r07 with critic scores are in `ROUNDS.md`; this file lists what changed per step after that.

## Homepage (r01–r07, summary)
- Photo hero with left-aligned H1, Ken Burns and text rise; single-row header.
- "Co daje szlichta wygładzająca?" before/after slider (illustrative textures, subtle relief, mascot on the seam).
- Services: featured card, 3×2 icon cards and a call strip. Numbered timeline with a filling rail.
- Motion system (`src/utils/motion.ts`): fade-up reveals, photo wipes, count-up stats, hero parallax. Hidden states only exist under `html.motion`, so crawlers, no-JS and reduced-motion visitors get the finished page.
- Big Facebook / Instagram / Galeria cards (owner requirement); FB/IG also in the mobile menu.

## Shared pieces
- **Header**: roomier desktop bar, the logo links home, the phone is merged into the call button, compact below 1180 px.
- **PageHeader**: plaster-wall title banner with a drawn trowel stroke; optional lead text and side media.
- **Reviews rail**: autoplay, one card every 4 s, starting when the rail comes into view.
  - Pauses while hovering a card; stops for good on a sideways swipe, wheel or keyboard.
  - The play button resumes it immediately.
  - Fixed after the first beta: the play button sat inside the hover-pause area, a vertical wheel stopped autoplay, and the first step was slow.
- **Photo placeholder** (`PhotoPending`): CV-style photo slot with corner mounts and a "ZDJĘCIE WKRÓTCE" stamp.
  - The grey silhouette is now a redrawn logo mascot peeking up, winking with a thumbs up.
  - The open eye blinks now and then; it's static under reduced motion.
  - The original mascot artwork is untouched.
- **Deploy guard**: experiment branches deploy only from the beta repo.

## Subpages
- **Flagship** (`/tynki-ze-szlichta-pod-malowanie`):
  - balanced text and photos (capped crops, sticky site photos beside long text, FAQ side intro, SVG benefit icons);
  - **wall cross-section**: brick, primer, plaster, szlichta and paint slide apart on scroll; hovering a layer highlights its description and the other way round.
- **Contact**: big call card, SVG icons, service area beside the map.
- **About** (`/o-nas`):
  - owner card in the header;
  - a "worker's passport" that collects a stamp per career stage;
  - flag markers and a filling rail.
- **Realizacje**:
  - the newest job shows on a construction-site information board;
  - masking-tape category filters with counts; no lone last card.
- **Realizacja page**:
  - the work duration is a wall calendar with the days crossed off, and the area counts up to "ok. 700 m²";
  - the call card sits under short descriptions (no gap beside the details card) and stays in the sticky side column for long ones.
- **Category pages**: own header illustration with the job count:
  - roller painting a stripe;
  - trowel smoothing rough plaster;
  - plasterboard on profiles with screws.
- **Painting guide** (`/malowanie-tynku-gipsowego`):
  - a paint roller under the header paints a plaster strip white as you read;
  - side photos beside the text;
  - a handover checklist you can tick (not saved).
- **Gallery**:
  - tried a bento grid with a spirit-level scroll indicator, then **reverted** at the user's request: plain square tiles, native scrolling, the paint roller strip instead;
  - hover (mouse only, not under reduced motion): the tile turns slightly on its side with a zoom and shadow.
- **404**: brick wall with "404" in chalk; drag (or use the keyboard) and the mascot plasters over it.
- **Privacy policy**:
  - "W skrócie" cards: no cookies, no analytics or ads, no forms;
  - real headings and numbered lists, sticky table of contents;
  - the legal text itself is unchanged.

## Fixes
- **Mobile scroll shake** when changing scroll direction. Two causes:
  - the hero height used `dvh`, which changes every time the mobile address bar slides in or out, so the hero resized and the page jumped. It now uses `svh` (`vh` fallback);
  - the JS hero parallax lagged the compositor scroll on touch. It's now desktop-only.
