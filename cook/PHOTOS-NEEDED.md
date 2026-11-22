# Photos needed for the homepage

I tried to download these from the social profiles. Instagram (`@firmamtynk`) only shows a login wall, and the Facebook page returns just its title, so nothing can be fetched without logging in. Ask the owner to send the **original files** (from his phone or by exporting from FB/IG). Originals are much sharper than social-media recompressions.

Format for all photos: JPG or HEIC straight from the phone, no filters, no collages, no text overlays. Daylight is better than a work lamp, except in #1.

| # | What | Where it goes | Orientation / min size | Why |
|---|------|---------------|------------------------|-----|
| 1 | **Finished szlichta wall in side light.** Shoot along the wall with a lamp or window light coming from the side (raking light). Ideally a **pair**: the same wall, or two neighbouring walls, plain zatarty tynk vs tynk ze szlichtą, from the same angle and distance. A close-up (about 30–50 cm from the wall) plus one shot from 2 m. | "Co daje szlichta wygładzająca?" (it would replace or sit next to the procedural before/after slider) | Landscape 16:10, ≥1600 px wide | Real proof of the main selling point. The current slider is a drawn visualisation, and the owner rightly noticed the real difference is subtle. |
| 2 | **Owner at work**, mid-task (trowel, pace, agregat), natural light, face visible, wearing the M-TYNK shirt. Not posed against a wall. | `#o-nas` section (replaces the cut-out on the plaster panel) | Portrait 4:5, ≥1200 px tall | Critics said the cut-out looks posed and "too young for experience since 1999". A real on-site shot builds more trust. |
| 3 | **Finished, empty, smooth rooms**: 3–6 photos of rooms after szlichta and before painting, or freshly painted. Corners, window reveals, a long wall with light across it. Note the town and m² for each. | "Nasze realizacje" cards + the post pages | Landscape 4:3, ≥1200 px wide | The current cards show the backs of workers. Customers want to see the result. |
| 4 | **One wide site shot**: agregat + silo / hoses, the team mid-job, protected windows (foil) visible. | "Co się dzieje na budowie" timeline (optional side image) | Landscape 3:2, ≥1600 px wide | Shows the process and "zabezpieczamy stolarkę" in practice. |
| 5 | *(optional)* **Detail macro**: a hand running over a finished szlichta surface, or the edge of a corner bead. | Flagship page / hero alternative | Any, ≥1200 px | A tactile "gładko" image. Good for social media too. |

Already have and keep: the hero photo, the van with the logo (intro), the mascot artwork (unchanged, owner's copyright) and the owner cut-out (fallback until #2 arrives).

When the files arrive: put them in `solid-site/public/images/uploads/2026/`, run `python3 scripts/generate-thumbs.py`, and I'll wire them in.

## Low-resolution photos to replace (realizacje posts)

These are the main (hero / share) photos of older posts. They came from the old WordPress site as WhatsApp-compressed copies, so they are below the 1200 px width Google recommends for large previews (they still pass the 50,000 px minimum). Their galleries have nothing bigger either (975×731 PNGs or 576×1024 JPEGs). Ask the owner for the **phone originals of the same jobs**, not new photos of other jobs.

| Page | Hero file (`solid-site/public/images/…`) | Now | Shows | Note |
|------|------------------------------------------|-----|-------|------|
| `/realizacje/tynki-ze-szlichta-pod-malowanie-wroclaw/` | `uploads/2023/08/wyr.png` | 700×700 | M-TYNK van in front of the house | Weakest one: shows the van, not the walls. Until an original arrives, a gallery photo of the walls (`uploads/2023/09/tynk-ze-szlichta-wygladzajaca-6.png`, 975×731) would be a better hero. Gallery: all 6 photos ~975×731. |
| `/realizacje/tynkowanie-w-domu-jednorodzinnym/` | `uploads/2023/08/obrazek-wyr.png` | 700×700 | Plastered hallway and doorways | No gallery at all. Any extra photos of this job are welcome. |
| `/realizacje/tynkowanie-scian-pod-malowanie/` | `uploads/2023/08/obrazek-wyr-1.png` | 700×700 | Bay-window room after plastering | Gallery: 2 photos ~727×970. |
| `/realizacje/tynkowanie-scian-we-wroclawiu/` | `uploads/2023/08/wyr.jpg` | 576×1024 | White walls next to a large window | Gallery: 14 photos, all 576×1024. |
| `/realizacje/tynk-wraz-z-zabudowa-gk-i-malowaniem/` | `uploads/2023/08/img-20230904-wa0012.jpg` | 1125×2000 | (hero is fine) | Gallery only: 5 PNGs ~974×731. |
| `/realizacje/tynk-na-gladko-pod-malowanie/` | `uploads/2023/08/img-20230904-wa0019.jpg` | 1536×2048 | (hero is fine) | Gallery only: 8 photos 576×1024. |
| `/tynki-ze-szlichta-pod-malowanie/` (flagship) | `uploads/2023/08/tynki-ze-szlichta-pod-malowanie.jpg` | 1125×2000 | | Nice to have; nearly 1200 already. |

Target: JPEG straight from the phone, ≥1600 px on the long side. When an original arrives, keep the same file name if possible (or update `posts.json` → `thumbnail`/`gallery`), then run `python3 scripts/generate-thumbs.py` and `pnpm build` (the build regenerates `src/data/image-sizes.json`, so the structured data picks up the new size automatically). If the hero changes from PNG to JPEG, the post page and the sizes script switch to the original file on their own.
