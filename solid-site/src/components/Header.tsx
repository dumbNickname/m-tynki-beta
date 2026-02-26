import { A } from "@solidjs/router";
import { createSignal, For } from "solid-js";
import navigation from "~/data/navigation.json";
import site from "~/data/site.json";

export default function Header() {
  const [menuOpen, setMenuOpen] = createSignal(false);

  return (
    <header class="site-header">
      <div class="header-desktop">
        <div class="container header-inner">
          <A href="/" class="header-logo">
            <img src={site.logo} alt={site.name} width="300" height="62" />
          </A>
          <div class="header-right">
            <a class="btn btn-primary btn-sm" href={`tel:${site.phoneRaw}`}>
              {site.phone}
            </a>
            <nav class="main-nav">
              <ul>
                <For each={navigation.main}>
                  {(item) => (
                    <li>
                      <A href={item.href}>{item.label}</A>
                    </li>
                  )}
                </For>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div class="header-mobile">
        <div class="container header-inner">
          <button
            class="menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Otwórz menu"
          >
            <span class="hamburger-icon" />
          </button>
          <A href="/" class="header-logo">
            <img src={site.logo} alt={site.name} width="200" height="41" />
          </A>
          <a class="btn btn-primary btn-icon" href={`tel:${site.phoneRaw}`} aria-label="Zadzwoń">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            </a>
        </div>
      </div>

      <div class={`flyout-overlay ${menuOpen() ? "open" : ""}`} onClick={() => setMenuOpen(false)} />
      <nav class={`flyout-menu ${menuOpen() ? "open" : ""}`}>
        <button class="flyout-close" onClick={() => setMenuOpen(false)} aria-label="Zamknij menu">
          ✕
        </button>
        <ul>
          <For each={navigation.main}>
            {(item) => (
              <li>
                <A href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </A>
              </li>
            )}
          </For>
        </ul>
      </nav>
    </header>
  );
}
