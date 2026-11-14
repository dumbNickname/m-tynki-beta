import { Show } from "solid-js";
import NavLink from "./NavLink";
import { toMedium, toThumb } from "~/utils/images";
import { formatDatePl } from "~/utils/date";
import styles from "./SiteBoard.module.css";

interface Post {
  slug: string;
  title: string;
  date: string;
  thumbnail: string;
  excerpt: string;
  location: string;
  area?: string | null;
  duration?: string | null;
  executor?: string | null;
  gallery: string[];
}

// Featured realizacja shown next to a yellow construction-site information
// board ("tablica informacyjna budowy"), filled in with the job's facts.
export default function SiteBoard(props: { post: Post; kind: string; flip?: boolean; priority?: boolean }) {
  return (
    <article class={`${styles.card} ${props.flip ? styles.flip : ""} reveal`}>
      <div class={styles.photo}>
        <img
          src={toMedium(props.post.thumbnail)}
          srcset={`${toThumb(props.post.thumbnail)} 400w, ${toMedium(props.post.thumbnail)} 800w`}
          sizes="(max-width: 768px) 100vw, 640px"
          alt=""
          width="800"
          height="500"
          loading={props.priority ? "eager" : "lazy"}
          fetchpriority={props.priority ? "high" : undefined}
        />
        <Show when={props.post.gallery.length > 1}>
          <span class={styles.count}>{props.post.gallery.length} zdjęć</span>
        </Show>
      </div>
      <div class={styles.side}>
        <h2 class={styles.title}>
          <NavLink href={`/realizacje/${props.post.slug}`} class={styles.link}>{props.post.title}</NavLink>
        </h2>
        <p class={styles.excerpt}>{props.post.excerpt}</p>
        <div class={styles.board}>
          <span class={`${styles.bolt} ${styles.b1}`} aria-hidden="true" />
          <span class={`${styles.bolt} ${styles.b2}`} aria-hidden="true" />
          <span class={`${styles.bolt} ${styles.b3}`} aria-hidden="true" />
          <span class={`${styles.bolt} ${styles.b4}`} aria-hidden="true" />
          <p class={styles.boardHead}>Tablica informacyjna</p>
          <dl class={styles.facts}>
            <div>
              <dt>Rodzaj robót</dt>
              <dd>{props.kind}</dd>
            </div>
            <div>
              <dt>Lokalizacja</dt>
              <dd>{props.post.location}</dd>
            </div>
            <Show when={props.post.area}>
              <div>
                <dt>Powierzchnia</dt>
                <dd>{props.post.area}</dd>
              </div>
            </Show>
            <Show when={props.post.duration}>
              <div>
                <dt>Czas prac</dt>
                <dd>{props.post.duration}</dd>
              </div>
            </Show>
            <div>
              <dt>Wykonawca</dt>
              <dd>{props.post.executor || "M-TYNK"}</dd>
            </div>
            <div>
              <dt>Opublikowano</dt>
              <dd><time datetime={props.post.date}>{formatDatePl(props.post.date)}</time></dd>
            </div>
          </dl>
        </div>
        <span class={styles.more} aria-hidden="true">Zobacz realizację <span class={styles.arrow}>→</span></span>
      </div>
    </article>
  );
}
