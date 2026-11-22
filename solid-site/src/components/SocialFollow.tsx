import site from "~/data/site.json";
import NavLink from "./NavLink";
import styles from "./SocialFollow.module.css";

export const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);

export const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const GalleryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

export default function SocialFollow() {
  return (
    <section class={`section ${styles.section}`}>
      <div class="container">
        <div class={`${styles.heading} reveal`}>
          <h2>Śledź nas</h2>
          <p>Nowe zdjęcia z budów wrzucamy na bieżąco na Facebooka i Instagrama — zobacz, jak pracujemy na co dzień.</p>
        </div>
        <div class={styles.cards}>
          <a href={site.facebookUrl} target="_blank" rel="nofollow noopener noreferrer" class={`reveal ${styles.card} ${styles.facebook}`}>
            <span class={styles.icon}><FacebookIcon /></span>
            <span class={styles.text}>
              <span class={styles.label}>Facebook</span>
              <span class={styles.subtitle}>Polub nasz profil</span>
            </span>
          </a>
          <a href={site.instagramUrl} target="_blank" rel="nofollow noopener noreferrer" class={`reveal ${styles.card} ${styles.instagram}`}>
            <span class={styles.icon}><InstagramIcon /></span>
            <span class={styles.text}>
              <span class={styles.label}>Instagram</span>
              <span class={styles.subtitle}>@firmamtynk · zdjęcia z budów</span>
            </span>
          </a>
          <NavLink href="/galeria" class={`reveal ${styles.card} ${styles.gallery}`}>
            <span class={styles.icon}><GalleryIcon /></span>
            <span class={styles.text}>
              <span class={styles.label}>Galeria</span>
              <span class={styles.subtitle}>Przeglądaj nasze realizacje</span>
            </span>
          </NavLink>
        </div>
      </div>
    </section>
  );
}
