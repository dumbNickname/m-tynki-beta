import { onSettled } from "solid-js";
import styles from "./PaintRoller.module.css";

// Reading progress for the painting guide: a strip of raw plaster under the
// header that a paint roller paints white as you scroll. Driven by the CSS scroll
// timeline where supported; elsewhere a small passive scroll handler sets --p.
export default function PaintRoller() {
  let bar!: HTMLDivElement;

  onSettled(() => {
    if (CSS.supports("animation-timeline: scroll()")) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.setProperty("--p", max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : "0");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  });

  return (
    <div class={styles.bar} ref={bar} aria-hidden="true">
      <div class={styles.paint} />
      <span class={styles.hint}>Przewiń — pomalujemy tę ścianę</span>
      <svg class={styles.roller} viewBox="0 0 62 28">
        <path class={styles.frame} d="M47 14H31" />
        <rect class={styles.handle} x="2" y="10.75" width="30" height="6.5" rx="3.25" />
        <rect class={styles.cover} x="47" y="1" width="13" height="26" rx="4" />
        <path class={styles.nap} d="M53.5 3.5v21" />
      </svg>
    </div>
  );
}
