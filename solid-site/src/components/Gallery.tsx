import { createSignal, For, Show } from "solid-js";
import { toThumb } from "~/utils/images";
import styles from "./Gallery.module.css";

interface GalleryProps {
  images: string[];
  altPrefix?: string;
  alts?: string[];
  /** "mosaic": first image large (uses full-res source), 3-column layout. */
  variant?: "grid" | "mosaic";
}

function imageAlt(prefix: string, index: number, alts?: string[]): string {
  return alts?.[index] || `${prefix} — zdjęcie ${index + 1}`;
}

const VT_NAME = "gallery-photo";

function canAnimate(): boolean {
  return (
    typeof document.startViewTransition === "function" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Resolves true once the image is decoded, false if it takes longer than `ms`. */
function preload(src: string, ms: number): Promise<boolean> {
  const img = new Image();
  img.src = src;
  return Promise.race([
    img.decode().then(() => true, () => false),
    new Promise<boolean>((resolve) => setTimeout(() => resolve(false), ms)),
  ]);
}

function isInViewport(el: Element): boolean {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;
}

export default function Gallery(props: GalleryProps) {
  const prefix = () => props.altPrefix || "Realizacja M-TYNK";
  const [lightboxIndex, setLightboxIndex] = createSignal<number | null>(null);
  const [morphing, setMorphing] = createSignal(false);
  let dialogRef!: HTMLDialogElement;
  let opening = false;
  const thumbs: HTMLImageElement[] = [];

  // Thumbnail morphs into the full-size photo (View Transitions API). The full image
  // is decoded first — otherwise the morph would land on an empty frame. Browsers
  // without support, reduced-motion users and slow loads get the plain lightbox.
  async function openLightbox(index: number) {
    if (opening || dialogRef.open) return;
    opening = true;
    try {
      await openAt(index);
    } finally {
      opening = false;
    }
  }

  async function openAt(index: number) {
    const thumb = thumbs[index];
    const show = () => {
      setLightboxIndex(index);
      if (!dialogRef.open) dialogRef.showModal();
    };
    if (!canAnimate() || !thumb || !(await preload(props.images[index], 250))) {
      show();
      return;
    }
    thumb.style.viewTransitionName = VT_NAME;
    setMorphing(true);
    // `morphing` stays on until the dialog closes: dropping it here would restart the
    // CSS entry animation on an already-visible photo.
    const t = document.startViewTransition(() => {
      thumb.style.viewTransitionName = "";
      show();
    });
    await t.finished.catch(() => {});
  }

  function closeLightbox() {
    const index = lightboxIndex();
    const thumb = index !== null ? thumbs[index] : undefined;
    // Focus goes back to the tile of the photo that was open.
    const refocus = () => (thumb?.parentElement as HTMLElement | null)?.focus({ preventScroll: true });
    if (!canAnimate() || !thumb || !isInViewport(thumb)) {
      setLightboxIndex(null);
      refocus();
      return;
    }
    setMorphing(true);
    const t = document.startViewTransition(() => {
      hide();
      thumb.style.viewTransitionName = VT_NAME;
    });
    t.finished.finally(() => {
      thumb.style.viewTransitionName = "";
      setMorphing(false);
      refocus();
    });
  }

  function prev() {
    const current = lightboxIndex();
    if (current !== null && current > 0) setLightboxIndex(current - 1);
  }

  function next() {
    const current = lightboxIndex();
    if (current !== null && current < props.images.length - 1) setLightboxIndex(current + 1);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "ArrowLeft") prev();
    else if (e.key === "ArrowRight") next();
    else if (e.key === "Escape") closeLightbox();
    else if (e.key === "Tab") {
      // Keep keyboard focus inside the open lightbox.
      const items = [...lightboxRef.querySelectorAll<HTMLButtonElement>("button:not(:disabled)")];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === lightboxRef)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  // Esc / back gesture: run our closing morph instead of the instant native close.
  // If the browser doesn't let us cancel, the native close still lands in onClose.
  function handleCancel(e: Event) {
    if (!e.cancelable) return;
    e.preventDefault();
    closeLightbox();
  }

  return (
    <>
      <div class={props.variant === "mosaic" ? `${styles.grid} ${styles.mosaic}` : styles.grid}>
        <For each={props.images}>
          {(src, i) => (
            <button class={styles.item} onClick={() => openLightbox(i())} type="button" aria-label={`Powiększ: ${imageAlt(prefix(), i(), props.alts)}`}>
              <img
                ref={(el) => (thumbs[i()] = el)}
                src={toThumb(src)}
                srcset={props.variant === "mosaic" && i() === 0 ? `${toThumb(src)} 400w, ${src} 1200w` : undefined}
                sizes={props.variant === "mosaic" && i() === 0 ? "(max-width: 768px) 100vw, 800px" : undefined}
                alt={imageAlt(prefix(), i(), props.alts)}
                loading="lazy"
              />
              <div class={styles.overlay} />
            </button>
          )}
        </For>
      </div>

      <Show when={lightboxIndex() !== null}>
        <div
          ref={lightboxRef}
          class={morphing() ? `${styles.lightbox} ${styles.morphing}` : styles.lightbox}
          onClick={closeLightbox}
          onKeyDown={handleKeydown}
          tabindex="-1"
          role="dialog"
          aria-modal="true"
          aria-label={`Podgląd zdjęcia ${lightboxIndex()! + 1} z ${props.images.length}`}
        >
          <div class={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button class={styles.close} onClick={closeLightbox} aria-label="Zamknij">
              <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
            <span class={styles.counter} aria-hidden="true">{lightboxIndex()! + 1} / {props.images.length}</span>
            <button class={styles.prev} onClick={prev} aria-label="Poprzednie" disabled={lightboxIndex() === 0}>‹</button>
            <img
              src={props.images[lightboxIndex()!]}
              alt={imageAlt(prefix(), lightboxIndex()!, props.alts)}
              style={{ "view-transition-name": VT_NAME }}
            />
            <button class={styles.next} onClick={next} aria-label="Następne" aria-disabled={lightboxIndex() === props.images.length - 1}>›</button>
          </div>
        </Show>
      </dialog>
    </>
  );
}
