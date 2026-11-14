// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";
import { initMotion } from "./utils/motion";

mount(() => <StartClient />, document.getElementById("app")!);
initMotion();

const base = (import.meta.env.SERVER_BASE_URL || "") as string;

document.addEventListener("click", (e) => {
  const anchor = (e.target as Element).closest?.("a");
  if (!anchor) return;
  const href = anchor.getAttribute("href");
  if (!href) return;
  if (anchor.hasAttribute("target")) return;
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

  // <base href> makes "#id" resolve to the homepage; keep in-page links on this page.
  if (href.startsWith("#")) {
    const target = href.length > 1 && document.getElementById(decodeURIComponent(href.slice(1)));
    if (!target) return;
    e.preventDefault();
    history.pushState(null, "", location.pathname + location.search + href);
    target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    // Move keyboard focus along too (skip link, tables of contents).
    if (!target.matches("a, button, input, select, textarea, [tabindex]")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    return;
  }

  e.preventDefault();
  e.stopPropagation();
  window.location.href = href;
}, true);

const loadedPath = location.pathname;
window.addEventListener("popstate", () => {
  // Back/forward between hashes of the same page: just scroll.
  if (location.pathname === loadedPath) {
    const id = decodeURIComponent(location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
    return;
  }
  window.location.reload();
});
