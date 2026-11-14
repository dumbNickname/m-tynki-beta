# Notes — open questions and ideas to discuss

Branch `experiment/cook-redesign`, previewed on beta only. Nothing here is on production.

## Needs the owner's OK (copy and facts)

- **/o-nas passport stamps**: Litwa "za granicą", Wrocław "tu zostałem", M-TYNK "IX 2019". Check that the places and dates are right.
- **Flagship wall cross-section** (`WallSection.tsx`): five layer descriptions. Check that he is happy with:
  - "grunt z kruszywem na gładkim betonie"
  - "tynk zwykle ok. 10–15 mm"
  - "szlichta = cienka warstwa z gładziolitu, ostatnia warstwa tynku"
  - "możemy malować natryskowo"
  - the intro line "My odpowiadamy za warstwy od gruntu do szlichty".
- **Szlichta slider caption** on the homepage: keep it "poglądowa", subtle relief (his words: the real difference is subtle).
- **404 copy**: "Tej ściany jeszcze nie otynkowaliśmy" plus the plastering toy. Is it playful enough without being silly?
- **Redrawn mascot in the photo placeholder**: a new drawing in the logo's style (green cap, big eyes, nose), winking with a thumbs up. The original logo artwork is unchanged. Is he OK with this version of his mascot?
- **Realizacje durations**: shown as a calendar with that many days crossed off ("14 dni" → 14 squares). Are these calendar days or working days? The label just says "dni".

## Waiting for material

- **Real portrait of the owner**: the "ZDJĘCIE WKRÓTCE" card (`PhotoPending`) is a placeholder on /o-nas and the homepage `#o-nas`. Swap it in `o-nas.tsx` and `index.tsx`.
- **Site photos**: see `PHOTOS-NEEDED.md`.
- **Gallery photo grouping**: 65 of the 71 gallery photos are WhatsApp exports from one date (2023-09-04) and aren't linked to a job, so the gallery can't be grouped by job yet.
  - If the owner can say which photos belong to which job, we could group them, with a link from each group to its realizacja.

## Decisions to confirm

- **Reviews autoplay**: now one card every 4 s, starting when the reviews come into view.
  - Pauses while the mouse rests on a card.
  - Stops for good when the visitor swipes or scrolls the rail sideways.
  - The play button resumes it straight away.
  - Is 4 s right?
- **Handover checklist** on the painting guide: ticks are not saved (no localStorage), so the privacy policy needs no change. Saving them would mean a one-line policy update. Worth it?
- **The `cook/` folder** stays out of the production merge.
- **Paint roller**: now on the painting guide and the gallery. Enough, or also on long realizacje?
- **Google Maps on /kontakt**: the embedded map is loaded from Google, which may set its own cookies. The privacy policy doesn't mention it, and the "W skrócie" cards are worded around that ("strona nie zapisuje cookies").
  - Option A: one sentence in the policy about the Google map.
  - Option B: a "Pokaż mapę" click-to-load placeholder (also faster).
  - Owner's choice; B would still need a short line in the policy covering what happens after the click.

## Ideas not done yet

- **Wall cross-section on mobile**: tap a layer to scroll to its description. Hover only works on desktop today.
- **Realizacja pages**: when the owner sends real before/after pairs, reuse the slider with real photos instead of the illustration.
- **Homepage**: a tiny "Dziś na budowie" line (town + stage), edited by hand in `site.json`. It only works if someone keeps it updated.
