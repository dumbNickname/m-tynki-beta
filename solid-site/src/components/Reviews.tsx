import { createSignal, For, onSettled } from "solid-js";
import reviews from "~/data/reviews.json";
import site from "~/data/site.json";
import { opinieLabel } from "~/utils/plural";
import styles from "./Reviews.module.css";

function Star() {
  return (
    <svg class={styles.star} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z" />
    </svg>
  );
}

// Long reviews are clamped to keep the rail even; the full text is always in the HTML.
const CLAMP_CHARS = 380;

function ReviewCard(props: { review: typeof reviews[0] }) {
  const [open, setOpen] = createSignal(false);
  const long = props.review.text.length > CLAMP_CHARS;
  return (
    <div class={styles.card}>
      <div class={styles.stars} role="img" aria-label={`${props.review.stars} na 5 gwiazdek`}>
        <For each={Array(props.review.stars).fill(0)}>{() => <Star />}</For>
      </div>
      <p class={`${styles.text} ${long && !open() ? styles.clamped : ""}`}>{props.review.text}</p>
      {long && (
        <button type="button" class={styles.more} aria-expanded={open() ? "true" : "false"} onClick={() => setOpen(!open())}>
          {open() ? "Zwiń" : "Pokaż całą opinię"}
        </button>
      )}
      <div class={styles.author}>
        <div class={styles.avatar}>{props.review.name.charAt(0).toUpperCase()}</div>
        <div class={styles.info}>
          <div class={styles.name}>{props.review.name}</div>
          <div class={styles.date}>Opinia Google · {props.review.year}</div>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  let rail!: HTMLDivElement;
  const [atStart, setAtStart] = createSignal(true);
  const [atEnd, setAtEnd] = createSignal(false);

  const update = () => {
    setAtStart(rail.scrollLeft < 8);
    setAtEnd(rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 8);
  };
  const step = (dir: number) => {
    const card = rail.firstElementChild as HTMLElement | null;
    const by = card ? card.offsetWidth + 20 : rail.clientWidth * 0.8;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({ left: dir * by, behavior: smooth ? "smooth" : "auto" });
  };

  // Autoplay: one card every few seconds, looping. It stops for good when the
  // visitor scrolls the rail themselves, pauses while the pointer rests on a
  // card / the rail is off screen / the tab is hidden, and never starts under
  // prefers-reduced-motion. The play button resumes it straight away.
  const DELAY = 4000;
  const [canAutoplay, setCanAutoplay] = createSignal(false);
  const [playing, setPlaying] = createSignal(false);
  let hovered = false;
  let visible = false;
  let timer = 0;

  const advance = () => {
    if (rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 8) {
      rail.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      step(1);
    }
  };
  const schedule = () => {
    clearInterval(timer);
    timer = window.setInterval(() => {
      if (playing() && !hovered && visible && !document.hidden) advance();
    }, DELAY);
  };
  const stop = () => setPlaying(false);
  const togglePlay = () => {
    if (playing()) return stop();
    setPlaying(true);
    advance();
    schedule();
  };
  let touchX = 0;
  let touchY = 0;

  onSettled(() => {
    update();
    const ro = new ResizeObserver(update);
    ro.observe(rail);
    return () => ro.disconnect();
  });

  onSettled(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (rail.scrollWidth <= rail.clientWidth + 8) return;
    setCanAutoplay(true);
    setPlaying(true);
    const io = new IntersectionObserver(
      ([e]) => {
        const was = visible;
        visible = e.isIntersecting;
        // Count the delay from the moment the reviews come into view.
        if (visible && !was) schedule();
      },
      { threshold: 0.5 },
    );
    io.observe(rail);
    // Turning on reduced motion mid-visit stops autoplay for good.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onReduce = () => {
      if (!reduce.matches) return;
      stop();
      setCanAutoplay(false);
    };
    reduce.addEventListener("change", onReduce);
    return () => {
      clearInterval(timer);
      io.disconnect();
      reduce.removeEventListener("change", onReduce);
    };
  });

  return (
    <div>
      <a class={styles.summary} href={site.googleReviewsListUrl} target="_blank" rel="noopener noreferrer">
        <strong class={styles.summaryScore}>{site.googleRating}</strong>
        <span class={styles.summaryMeta}>
          <span class={styles.summaryStars} role="img" aria-label={`${site.googleRating} na 5 gwiazdek`}>
            <For each={[0, 1, 2, 3, 4]}>{() => <Star />}</For>
          </span>
          <span>
            <img src="images/google-favicon.ico" alt="" width="16" height="16" loading="lazy" />
            {site.googleReviewCount} {opinieLabel(site.googleReviewCount)} w Google
          </span>
        </span>
      </a>
      <div class={styles.railWrap}>
        <div class={styles.rail} ref={rail} onScroll={update}
          onMouseEnter={() => (hovered = true)}
          onMouseLeave={() => (hovered = false)}
          onPointerDown={(e) => e.pointerType === "mouse" && stop()}
          onTouchStart={(e) => {
            touchX = e.touches[0].clientX;
            touchY = e.touches[0].clientY;
          }}
          onTouchMove={(e) => {
            const dx = Math.abs(e.touches[0].clientX - touchX);
            if (dx > 10 && dx > Math.abs(e.touches[0].clientY - touchY)) stop();
          }}
          onWheel={(e) => Math.abs(e.deltaX) > Math.abs(e.deltaY) && stop()}
          onKeyDown={stop}
          onFocusIn={stop}
          tabindex="0" role="region" aria-label="Opinie klientów">
          <For each={reviews}>{(review) => <ReviewCard review={review} />}</For>
        </div>
        <div class={styles.railNav}>
          <button type="button" class={styles.railBtn} onClick={() => {
            if (atStart()) return;
            stop();
            step(-1);
          }} aria-disabled={atStart() ? "true" : "false"} aria-label="Poprzednie opinie">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 6 9 12 15 18" /></svg>
          </button>
          <button type="button" class={styles.railBtn} onClick={() => {
            if (atEnd()) return;
            stop();
            step(1);
          }} aria-disabled={atEnd() ? "true" : "false"} aria-label="Następne opinie">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18" /></svg>
          </button>
          {canAutoplay() && (
            <button
              type="button"
              class={styles.railBtn}
              onClick={togglePlay}
              aria-label={playing() ? "Zatrzymaj przewijanie opinii" : "Wznów przewijanie opinii"}
            >
              {playing() ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" /></svg>
              )}
            </button>
          )}
        </div>
      </div>
      <p class={styles.disclaimer}>
        Wybrane opinie z naszego profilu w Google, przepisane bez zmian. Nazwiska autorów skróciliśmy do inicjału.
      </p>
      <div class={styles.badgeRow}>
        <a class={styles.googleBadge} href={site.googleReviewsListUrl} target="_blank" rel="noopener noreferrer">
          <img src="images/google-favicon.ico" alt="" width="18" height="18" loading="lazy" />
          Przeczytaj wszystkie opinie w Google
        </a>
        <a class={styles.googleBadge} href={site.googleReviewUrl} target="_blank" rel="noopener noreferrer">
          Wystaw nam opinię
        </a>
      </div>
    </div>
  );
}
