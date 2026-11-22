import site from "~/data/site.json";
import styles from "./MascotBadge.module.css";

// The owner's mascot artwork (cut out of the original logo, untouched) inside a
// live SVG text ring, so the ring can follow the theme colour and turn slowly.
export default function MascotBadge(props: { class?: string }) {
  return (
    <div class={`${styles.badge} ${props.class ?? ""}`}>
      <svg class={styles.ring} viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id="mascot-ring" d="M100,100 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0" />
        </defs>
        <text textLength="536" lengthAdjust="spacing">
          <textPath href="#mascot-ring">
            GŁADZIOLIT • GŁADZIOLIT • GŁADZIOLIT •
          </textPath>
        </text>
      </svg>
      <img class={styles.disc} src="images/plaster-smooth.svg" alt="" width="1200" height="750" loading="lazy" decoding="async" />
      <picture class={styles.figure}>
        <source srcset={site.mascotFigureWebp} type="image/webp" />
        <img src={site.mascotFigure} alt="Maskotka M-TYNK: tynkarz z wężem agregatu tynkarskiego" width="600" height="600" loading="lazy" decoding="async" />
      </picture>
    </div>
  );
}
