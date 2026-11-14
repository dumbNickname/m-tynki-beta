import styles from "./PhotoPending.module.css";

// Stand-in for the owner's portrait until the real photo arrives: a CV-style
// photo slot (corner mounts) with the logo mascot, redrawn, winking out of it so the layout keeps its shape.
export default function PhotoPending(props: { name: string; class?: string }) {
  return (
    <div class={`${styles.card} ${props.class ?? ""}`} role="img" aria-label={`Miejsce na zdjęcie: ${props.name} — zdjęcie wkrótce`}>
      <span class={styles.tape} aria-hidden="true" />
      <div class={styles.slot} aria-hidden="true">
        <span class={`${styles.corner} ${styles.tl}`} />
        <span class={`${styles.corner} ${styles.tr}`} />
        <span class={`${styles.corner} ${styles.bl}`} />
        <span class={`${styles.corner} ${styles.br}`} />
        <svg class={styles.mascot} viewBox="0 0 120 150">
          <g class={styles.peek}>
            {/* shirt + overall bib */}
            <path class={styles.shirt} d="M10 152c2-20 16-31 34-33h32c18 2 32 13 34 33z" />
            <path class={styles.bib} d="M38 152v-22c0-4 3-6 6-6h32c3 0 6 2 6 6v22z" />
            <path class={styles.line} d="M44 124l-4-6M76 124l4-6" />
            <circle class={styles.button} cx="46" cy="131" r="2" />
            <circle class={styles.button} cx="74" cy="131" r="2" />
            {/* arm with a thumbs up */}
            <path class={styles.shirt} d="M88 124c6-4 12-6 17-3l5 31H90z" />
            <path class={styles.skin} d="M95 123l3-14h8l1 14z" />
            <rect class={styles.skin} x="91" y="99" width="19" height="15" rx="6" />
            <rect class={styles.skin} x="93" y="85" width="7.5" height="18" rx="3.75" />
            <path class={styles.line} d="M100 104h9M100 109h9" />
            {/* head */}
            <ellipse class={styles.skin} cx="60" cy="92" rx="28" ry="27" />
            {/* cap: dome, band and the brim to the side, like the logo */}
            <path class={styles.cap} d="M31 86c-3-22 12-36 31-36 20 0 31 14 28 36-9-6-20-8-30-8s-21 2-29 8z" />
            <path class={styles.cap} d="M31 86c-9 0-16 3-17 8 7 2 15 0 22-4z" />
            <path class={styles.line} d="M38 70c8-4 18-5 30-3" />
            {/* open eye + wink */}
            <g class={styles.eye}>
              <ellipse class={styles.white} cx="51" cy="91" rx="8" ry="10" />
              <circle class={styles.pupil} cx="53.5" cy="93" r="3.6" />
              <circle fill="#fff" stroke="none" cx="54.6" cy="91.6" r="1.1" />
            </g>
            <path class={styles.wink} d="M63 92q7-6 14 0" />
            <path class={styles.line} d="M76 87l3-2" />
            {/* nose, mouth */}
            <path class={styles.mouth} d="M46 106c5 12 25 13 31-1-10 4-21 4-31 1z" />
            <path class={styles.tongue} d="M54 112c4-3 10-3 14 0-4 3-10 3-14 0z" />
            <circle class={styles.skin} cx="61" cy="101" r="7" />
          </g>
        </svg>
        <span class={styles.stamp}>Zdjęcie wkrótce</span>
      </div>
      <span class={styles.caption} aria-hidden="true">{props.name}</span>
    </div>
  );
}
