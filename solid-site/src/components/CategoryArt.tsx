import type { JSX } from "@solidjs/web";
import styles from "./CategoryArt.module.css";

// Small header illustration per realizacje category: a wall swatch with the
// tool that category is about, plus the number of jobs.
const ART: Record<string, () => JSX.Element> = {
  "malowanie-scian": () => (
    <>
      <rect class={styles.paint} x="58" y="14" width="44" height="122" rx="3" />
      <g class={styles.roller}>
        <rect class={styles.tool} x="52" y="124" width="56" height="20" rx="8" />
        <path class={styles.handle} d="M80 144v12h-26v22" />
        <rect class={styles.grip} x="47" y="176" width="14" height="26" rx="5" />
      </g>
    </>
  ),
  "tynk-ze-szlichta-wygladzajaca": () => (
    <>
      <path class={styles.rough} d="M20 40c10-4 18 4 28 0s18 4 28 0 18 4 28 0 18 4 28 0M20 62c10-4 18 4 28 0s18 4 28 0 18 4 28 0 18 4 28 0" />
      <rect class={styles.smooth} x="16" y="84" width="128" height="64" />
      <g class={styles.trowel}>
        <path class={styles.tool} d="M38 112h84l-6 18H44z" />
        <path class={styles.handle} d="M70 112V98h20v14" />
        <rect class={styles.grip} x="62" y="84" width="36" height="16" rx="7" />
      </g>
    </>
  ),
  "zabudowy-z-plyt-gk": () => (
    <>
      <path class={styles.profile} d="M36 18v150M80 18v150M124 18v150" />
      <rect class={styles.board} x="26" y="30" width="108" height="124" rx="2" />
      <path class={styles.seam} d="M80 30v124" />
      <g class={styles.screws}>
        <circle cx="36" cy="52" r="2.6" /><circle cx="36" cy="92" r="2.6" /><circle cx="36" cy="132" r="2.6" />
        <circle cx="76" cy="52" r="2.6" /><circle cx="84" cy="92" r="2.6" /><circle cx="76" cy="132" r="2.6" />
        <circle cx="124" cy="52" r="2.6" /><circle cx="124" cy="92" r="2.6" /><circle cx="124" cy="132" r="2.6" />
      </g>
    </>
  ),
};

export default function CategoryArt(props: { slug: string; count: number; countLabel: string }) {
  const art = ART[props.slug];
  if (!art) return null;
  return (
    <div class={styles.wrap} aria-hidden="true">
      <svg class={styles.art} viewBox="0 0 160 190">
        <rect class={styles.wall} x="6" y="6" width="148" height="178" rx="14" />
        {art()}
      </svg>
      <span class={styles.badge}>
        <strong>{props.count}</strong> {props.countLabel}
      </span>
    </div>
  );
}
