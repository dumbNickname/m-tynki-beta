import { createSignal, For, Show } from "solid-js";

interface GalleryProps {
  images: string[];
}

export default function Gallery(props: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = createSignal<number | null>(null);

  function openLightbox(index: number) {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }

  function prev() {
    const current = lightboxIndex();
    if (current !== null && current > 0) setLightboxIndex(current - 1);
  }

  function next() {
    const current = lightboxIndex();
    if (current !== null && current < props.images.length - 1) setLightboxIndex(current + 1);
  }

  return (
    <>
      <div class="gallery-grid">
        <For each={props.images}>
          {(src, i) => (
            <button class="gallery-item" onClick={() => openLightbox(i())} type="button">
              <img src={src} alt="" loading="lazy" />
              <div class="gallery-overlay" />
            </button>
          )}
        </For>
      </div>

      <Show when={lightboxIndex() !== null}>
        <div class="lightbox" onClick={closeLightbox}>
          <div class="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button class="lightbox-close" onClick={closeLightbox} aria-label="Zamknij">✕</button>
            <button class="lightbox-prev" onClick={prev} aria-label="Poprzednie" disabled={lightboxIndex() === 0}>‹</button>
            <img src={props.images[lightboxIndex()!]} alt="" />
            <button class="lightbox-next" onClick={next} aria-label="Następne" disabled={lightboxIndex() === props.images.length - 1}>›</button>
          </div>
        </div>
      </Show>
    </>
  );
}
