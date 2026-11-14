import styles from "./PhotoPending.module.css";

// Stand-in for the owner's portrait until the real photo arrives: a CV-style
// photo slot (corner mounts, silhouette) so the layout keeps its shape.
export default function PhotoPending(props: { name: string; class?: string }) {
  return (
    <div class={`${styles.card} ${props.class ?? ""}`} role="img" aria-label={`Miejsce na zdjęcie: ${props.name} — zdjęcie wkrótce`}>
      <span class={styles.tape} aria-hidden="true" />
      <div class={styles.slot} aria-hidden="true">
        <span class={`${styles.corner} ${styles.tl}`} />
        <span class={`${styles.corner} ${styles.tr}`} />
        <span class={`${styles.corner} ${styles.bl}`} />
        <span class={`${styles.corner} ${styles.br}`} />
        <svg class={styles.silhouette} viewBox="0 0 120 150">
          <circle cx="60" cy="58" r="25" />
          <path d="M12 150c0-31 21-52 48-52s48 21 48 52z" />
        </svg>
        <span class={styles.stamp}>Zdjęcie wkrótce</span>
      </div>
      <span class={styles.caption} aria-hidden="true">{props.name}</span>
    </div>
  );
}
