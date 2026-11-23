// Runs in the browser before hydration (start.clientSetup in vite.config.ts).
// Every page is its own prerendered document, so internal links do full page
// loads instead of client-side routing.

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

// Back/forward between in-page anchors (#faq etc.) stays on the same document —
// the browser restores the scroll position itself, so only reload on real page changes.
let currentPage = location.pathname + location.search;
window.addEventListener("popstate", () => {
  const page = location.pathname + location.search;
  if (page === currentPage) return;
  currentPage = page;
  window.location.reload();
});
