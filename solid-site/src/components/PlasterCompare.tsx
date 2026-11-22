import { createSignal, onCleanup, onMount } from "solid-js";
import site from "~/data/site.json";
import styles from "./PlasterCompare.module.css";

// Before/after wall under side light. Both surfaces are procedural SVG
// (feTurbulence + feDiffuseLighting) loaded as <img>, so the browser rasterises
// them once and dragging only moves a clip-path.
export default function PlasterCompare() {
  const [pos, setPos] = createSignal(50);
  const [sweeping, setSweeping] = createSignal(false);
  const [lit, setLit] = createSignal(false);
  let root!: HTMLDivElement;
  let touched = false;
  let raf = 0;

  function sweep() {
    const from = 94;
    const to = 50;
    const dur = 1800;
    const start = performance.now();
    setSweeping(true);
    const tick = (now: number) => {
      if (touched) return setSweeping(false);
      const t = Math.min(1, (now - start) / dur);
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setPos(from + (to - from) * e);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setSweeping(false);
    };
    setPos(from);
    raf = requestAnimationFrame(tick);
  }

  onMount(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          setLit(true);
          sweep();
        }
      },
      { threshold: 0.55 },
    );
    io.observe(root);
    onCleanup(() => {
      io.disconnect();
      cancelAnimationFrame(raf);
    });
  });

  return (
    <figure class={styles.figure}>
      <div
        ref={root}
        class={styles.panel}
        classList={{ [styles.sweeping]: sweeping(), [styles.lit]: lit() }}
        style={{ "--pos": `${pos()}%` }}
      >
        <img class={styles.surface} src="images/plaster-rough.svg" alt="" width="1200" height="750" loading="lazy" decoding="async" />
        <div class={styles.smooth}>
          <img class={styles.surface} src="images/plaster-smooth.svg" alt="" width="1200" height="750" loading="lazy" decoding="async" />
        </div>
        <div class={styles.light} aria-hidden="true" />
        <span class={`${styles.label} ${styles.labelLeft}`}>Zwykły tynk</span>
        <span class={`${styles.label} ${styles.labelRight}`}>Tynk ze szlichtą</span>
        <div class={`${styles.track} ${styles.dividerTrack}`} aria-hidden="true">
          <div class={styles.divider}>
            <span class={styles.handle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 6 3 12 9 18" />
                <polyline points="15 6 21 12 15 18" />
              </svg>
            </span>
          </div>
        </div>
        <div class={`${styles.track} ${styles.mascotTrack}`} aria-hidden="true">
          <picture class={styles.mascot}>
            <source srcset={site.mascotFigureWebp} type="image/webp" />
            <img src={site.mascotFigure} alt="" width="600" height="600" loading="lazy" decoding="async" />
          </picture>
        </div>
        <input
          class={styles.range}
          type="range"
          min="4"
          max="96"
          step="1"
          value={pos()}
          aria-label="Przesuń, aby porównać zwykły tynk z tynkiem ze szlichtą"
          aria-valuetext={`${Math.round(100 - pos())}% tynku ze szlichtą`}
          onInput={(e) => {
            touched = true;
            setSweeping(false);
            setPos(Number(e.currentTarget.value));
          }}
          onKeyDown={(e) => {
            if (e.key !== "PageUp" && e.key !== "PageDown") return;
            e.preventDefault();
            touched = true;
            setSweeping(false);
            const next = Math.round(pos()) + (e.key === "PageUp" ? 10 : -10);
            setPos(Math.min(96, Math.max(4, next)));
          }}
        />
      </div>
      <figcaption class={styles.caption}>
        Wizualizacja poglądowa: duże zbliżenie ściany w świetle padającym z boku. Faktura zwykłego tynku jest drobna, ale wyczuwalna pod ręką i widoczna po pomalowaniu. Pod mocne światło boczne doradzamy gładź.
      </figcaption>
    </figure>
  );
}
