import { children, For, JSX } from "solid-js";
import NavLink from "./NavLink";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
  lead?: JSX.Element;
  /** Optional picture standing on the right of the title (desktop) / below it (mobile). */
  media?: JSX.Element;
}

// Page title on a side-lit plaster wall (same visual idea as the homepage),
// with a trowel stroke that draws itself under the headline.
export default function PageHeader(props: PageHeaderProps) {
  // Resolve the media slot once: reading the getter repeatedly would create the
  // JSX again and break hydration.
  const media = children(() => props.media);
  return (
    <section class={styles.wrapper}>
      <img class={styles.wall} src="images/plaster-smooth.svg" alt="" width="1200" height="750" decoding="async" />
      <div class={`container ${styles.inner} ${media() ? styles.withMedia : ""}`}>
        <div class={styles.copy}>
        {props.breadcrumbs && (
          <nav class={styles.breadcrumbs} aria-label="Ścieżka nawigacji">
            <ol>
              <For each={props.breadcrumbs}>
                {(crumb) => (
                  <li>
                    {crumb.href ? (
                      <NavLink href={crumb.href}>{crumb.label}</NavLink>
                    ) : (
                      <span aria-current="page">{crumb.label}</span>
                    )}
                  </li>
                )}
              </For>
            </ol>
          </nav>
        )}
        <h1 class={styles.title}>{props.title}</h1>
        <svg class={styles.stroke} viewBox="0 0 320 18" preserveAspectRatio="none" aria-hidden="true">
          <path d="M3 12 C 60 4, 110 15, 165 9 S 270 5, 317 8" pathLength="1" />
        </svg>
        {props.lead && <p class={styles.lead}>{props.lead}</p>}
        </div>
        {media() && <div class={styles.media}>{media()}</div>}
      </div>
    </section>
  );
}
