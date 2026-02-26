import { A } from "@solidjs/router";

interface Post {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  thumbnail: string;
  excerpt: string;
}

interface PostCardProps {
  post: Post;
  categoryLabels: Record<string, string>;
}

export default function PostCard(props: PostCardProps) {
  const firstCategory = () => props.post.categories.find((c) => c !== "wszystkie") || props.post.categories[0];
  const badgeLabel = () => props.categoryLabels[firstCategory()] || firstCategory();

  return (
    <article class="post-card">
      <A href={`/realizacje/${props.post.slug}`} class="post-card-thumbnail">
        <img src={props.post.thumbnail} alt={props.post.title} loading="lazy" />
      </A>
      <div class="post-card-badge">{badgeLabel()}</div>
      <div class="post-card-body">
        <h3 class="post-card-title">
          <A href={`/realizacje/${props.post.slug}`}>{props.post.title}</A>
        </h3>
        <p class="post-card-excerpt">{props.post.excerpt}</p>
      </div>
      <div class="post-card-meta">
        <span>{props.post.date}</span>
        <span>Brak komentarzy</span>
      </div>
    </article>
  );
}
