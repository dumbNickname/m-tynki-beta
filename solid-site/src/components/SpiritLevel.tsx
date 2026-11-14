import { onCleanup, onMount } from "solid-js";
import styles from "./SpiritLevel.module.css";

// Scroll indicator for a long section: a spirit level that sticks to the bottom
// of the screen while its bubble travels along the vial. Put it as the last
// child of the section; the section needs `view-timeline: --level block`.
// Browsers without scroll timelines get a small passive scroll handler.
export default function SpiritLevel(props: { label: string }) {
  let el!: HTMLDivElement;

  onMount(() => {
    if (CSS.supports("animation-timeline: view()")) return;
    const scope = el.closest("section");
    if (!scope) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = scope.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onCleanup(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    });
  });

  return (
    <div class={styles.dock} aria-hidden="true">
      <div class={styles.level} ref={el}>
        <span class={styles.end} />
        <span class={styles.vial}>
          <span class={styles.mark} />
          <span class={styles.bubble} />
        </span>
        <span class={styles.label}>{props.label}</span>
        <span class={styles.end} />
      </div>
    </div>
  );
}
