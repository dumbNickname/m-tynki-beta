// Scroll reveals for every browser. Content is visible by default: the hidden
// starting state only applies once `html.motion` is set here, and anything
// already on screen is marked as revealed first so nothing flickers.
export function initMotion() {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .reveal-wipe"));
  if (!items.length) return;

  const groups = new Map<Element, number>();
  for (const el of items) {
    const parent = el.parentElement!;
    const i = groups.get(parent) ?? 0;
    groups.set(parent, i + 1);
    if (i) el.style.setProperty("--reveal-delay", `${Math.min(i, 3) * 70}ms`);
  }

  const vh = window.innerHeight;
  const reveal = (el: HTMLElement) => {
    el.classList.add("is-in");
    el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        reveal(e.target as HTMLElement);
      }
    },
    { rootMargin: "0px" },
  );

  for (const el of items) {
    const r = el.getBoundingClientRect();
    if (r.top < vh && r.bottom > 0) el.classList.add("is-in");
    else io.observe(el);
  }
  document.documentElement.classList.add("motion");

  initParallax();
}

function countUp(el: HTMLElement) {
  const final = el.textContent ?? "";
  const target = Number(final.replace(",", "."));
  if (!Number.isFinite(target)) return;
  const decimals = final.includes(",") ? final.split(",")[1].length : 0;
  // Screen readers get the final value, not the ticking numbers.
  const sr = document.createElement("span");
  sr.className = "sr-only";
  sr.textContent = final;
  el.after(sr);
  el.setAttribute("aria-hidden", "true");
  const dur = 1200;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / dur);
    const v = target * (1 - Math.pow(1 - t, 3));
    el.textContent = t < 1 ? v.toFixed(decimals).replace(".", ",") : final;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function initParallax() {
  const img = document.querySelector<HTMLElement>("[data-parallax]");
  if (!img) return;
  // Touch browsers scroll on the compositor; a JS-driven offset lags a frame
  // behind and jitters (worst when the address bar collapses). Desktop only.
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    if (y > window.innerHeight * 1.2) return;
    img.style.setProperty("--parallax", `${(y * 0.3).toFixed(1)}px`);
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
}
