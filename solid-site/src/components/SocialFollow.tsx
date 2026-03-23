import site from "~/data/site.json";
import NavLink from "./NavLink";
import styles from "./SocialFollow.module.css";

export default function SocialFollow() {
  return (
    <section class={`section ${styles.section}`}>
      <div class="container text-center">
        <div class={styles.heading}>
          <h2>Śledź nas</h2>
          <p>Zobacz nasze realizacje i bądź na bieżąco z naszą pracą</p>
        </div>
        <div class={styles.cards}>
          <a
            href={site.facebookUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            class={`${styles.card} ${styles.facebook}`}
          >
            <div class={styles.icon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </div>
            <span class={styles.label}>Facebook</span>
            <span class={styles.subtitle}>Polub nasz profil</span>
          </a>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            class={`${styles.card} ${styles.instagram}`}
          >
            <div class={styles.icon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
            <span class={styles.label}>Instagram</span>
            <span class={styles.subtitle}>Zobacz nasze zdjęcia</span>
          </a>
          <NavLink
            href="/galeria"
            class={`${styles.card} ${styles.gallery}`}
          >
            <div class={styles.icon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <span class={styles.label}>Galeria</span>
            <span class={styles.subtitle}>Przeglądaj nasze realizacje</span>
          </NavLink>
        </div>
      </div>
    </section>
  );
}
