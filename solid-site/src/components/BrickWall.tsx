import { createSignal } from "solid-js";
import site from "~/data/site.json";
import styles from "./BrickWall.module.css";

// 404 toy: a bare brick wall with "404" chalked on it. Drag (or use the arrow
// keys) and the mascot lays a smooth coat of plaster over the whole mess.
export default function BrickWall() {
  const [pos, setPos] = createSignal(0);
  const [touched, setTouched] = createSignal(false);
  const done = () => pos() >= 97;

  return (
    <div class={`${styles.wall} ${touched() ? styles.touched : ""} ${done() ? styles.done : ""}`} style={{ "--pos": `${pos()}%` }}>
      <svg class={styles.bricks} viewBox="0 0 640 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <pattern id="brick" width="64" height="32" patternUnits="userSpaceOnUse">
            <rect width="64" height="32" fill="#cdc2b2" />
            <rect x="1.5" y="1.5" width="61" height="13" rx="1.5" fill="#b4573a" />
            <rect x="-30.5" y="17.5" width="61" height="13" rx="1.5" fill="#a94f33" />
            <rect x="33.5" y="17.5" width="61" height="13" rx="1.5" fill="#bd6142" />
          </pattern>
          <pattern id="brickShade" width="192" height="96" patternUnits="userSpaceOnUse">
            <rect x="65.5" y="1.5" width="61" height="13" fill="rgba(60,20,10,0.16)" />
            <rect x="33.5" y="49.5" width="61" height="13" fill="rgba(255,220,190,0.1)" />
            <rect x="129.5" y="33.5" width="61" height="13" fill="rgba(60,20,10,0.12)" />
            <rect x="1.5" y="81.5" width="61" height="13" fill="rgba(60,20,10,0.1)" />
            <rect x="97.5" y="65.5" width="61" height="13" fill="rgba(255,220,190,0.08)" />
          </pattern>
        </defs>
        <rect width="640" height="480" fill="url(#brick)" />
        <rect width="640" height="480" fill="url(#brickShade)" />
        <text class={styles.chalk} x="320" y="300" text-anchor="middle">404</text>
      </svg>

      <div class={styles.coat}>
        <img src="images/plaster-smooth.svg" alt="" width="1200" height="750" decoding="async" />
        <span class={styles.coatText} aria-hidden="true">Gładko. Gotowe pod malowanie.</span>
      </div>

      <div class={`${styles.track} ${styles.seamTrack}`} aria-hidden="true">
        <span class={styles.seam} />
      </div>
      <div class={`${styles.track} ${styles.mascotTrack}`} aria-hidden="true">
        <picture class={styles.mascot}>
          <source srcset={site.mascotFigureWebp} type="image/webp" />
          <img src={site.mascotFigure} alt="" width="600" height="600" decoding="async" />
        </picture>
      </div>

      <span class={styles.hint} aria-hidden="true">Przeciągnij, żeby otynkować →</span>

      <input
        class={styles.range}
        type="range"
        min="0"
        max="100"
        step="1"
        value={pos()}
        aria-label="Otynkuj ścianę z napisem 404"
        aria-valuetext={`${Math.round(pos())}% ściany otynkowane`}
        onInput={(e) => {
          setTouched(true);
          setPos(Number(e.currentTarget.value));
        }}
      />
    </div>
  );
}
