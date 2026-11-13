# Brief: M-TYNK homepage, Cook experiment

Target: rework the wroclawtynki.pl homepage (plus shared header) into a calmer, more confident page with purposeful motion design. Stack: SolidJS SSG (solid-site/), CSS Modules, no new dependencies.
References: no external references. R00 = current production homepage (baseline, left side of every side-by-side). The bar is "clearly better than R00", not similarity.
Bar (UI mapping, 1-10, critic median): layout and spacing 8, typography 8, color 8, imagery 8, motion and interaction 8, trust and clarity 8.
Calibration offset: none yet.
Rules: Cook slop ban list (no eyebrow labels, no 01/02/03 counters, no glowing dots, no decorative particles, no purple, no beige). Exception: Polish dashes stay, they are normal punctuation. Code-made motion only (CSS + tiny inline JS), honour prefers-reduced-motion, content must be fully visible without JS and without scroll-driven animation support.
Must keep: the mascot (owner's copyrighted character, original artwork only, never redrawn), H1 text, internal link anchors and copy (SEO), SeoHead/JSON-LD, Lighthouse-grade performance (hero image stays the LCP element, no web fonts, no libraries).
Time: hard cap, experiment, about 3 rounds. Started: 2026-11-13 15:30.
Deliverable: branch experiment/cook-redesign, never pushed to origin.
Permissions: download no, push no (user switches beta deploy branch), publish no.
User's words: "have a fun run and experiment but keep all the changes on a branch. Do not loop too long. Feel free to change anything you like just remember about strong SEO." "keep the mascot. it is important to the owner. you can try to re-draw it in some way and animate if you like, it is even copyrighted by them"
