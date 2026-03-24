import NavLink from "./NavLink";
import { toThumb } from "~/utils/images";
import styles from "./PostCard.module.css";

interface Post {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  thumbnail: string;
  excerpt: string;
  location: string;
}

interface PostCardProps {
  post: Post;
  categoryLabels: Record<string, string>;
}

export default function PostCard(props: PostCardProps) {
  const firstCategory = () => props.post.categories.find((c) => c !== "wszystkie") || props.post.categories[0];
  const badgeLabel = () => props.categoryLabels[firstCategory()] || firstCategory();

  return (
    <article class={styles.card}>
      <NavLink href={`/realizacje/${props.post.slug}`} class={styles.thumbnail}>
        <img src={toThumb(props.post.thumbnail)} alt={props.post.title} loading="lazy" />
      </NavLink>
      <div class={styles.badge}>{badgeLabel()}</div>
      <div class={styles.body}>
        <h2 class={styles.title}>
          <NavLink href={`/realizacje/${props.post.slug}`}>{props.post.title}</NavLink>
        </h2>
        <p class={styles.excerpt}>{props.post.excerpt}</p>
      </div>
      <div class={styles.meta}>
        <span>{props.post.date}</span>
        <span>{props.post.location}</span>
      </div>
    </article>
  );
}
