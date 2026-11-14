import { For, Show } from "solid-js";
import NavLink from "./NavLink";
import PostCard from "./PostCard";
import SiteBoard from "./SiteBoard";
import allPosts from "~/data/posts.json";
import navigation from "~/data/navigation.json";
import styles from "~/routes/realizacje/index.module.css";

type Post = (typeof allPosts)[number];

const categoryLabels: Record<string, string> = {};
navigation.categories.forEach((c) => { categoryLabels[c.slug] = c.label; });

const countFor = (slug: string) =>
  slug === "wszystkie" ? allPosts.length : allPosts.filter((p) => p.categories.includes(slug)).length;

const kindOf = (post: Post) => {
  const kinds = post.categories.filter((c) => c !== "wszystkie").map((c) => categoryLabels[c] || c);
  return kinds.join(", ") || "Tynki";
};

// Category filters (as masking-tape labels) + the newest job on a site board +
// the rest as cards. Two-item lists get two boards instead of a lone card.
export default function PostList(props: { posts: Post[]; active: string }) {
  const rest = () => props.posts.slice(1);
  return (
    <>
      <nav class={styles.categoryNav} aria-label="Kategorie realizacji">
        <For each={navigation.categories}>
          {(cat) => (
            <NavLink
              href={cat.href}
              class={`${styles.categoryLink} ${cat.slug === props.active ? styles.categoryLinkActive : ""}`}
              aria-current={cat.slug === props.active ? "page" : undefined}
            >
              {cat.label}
              <span class={styles.categoryCount}>{countFor(cat.slug)}</span>
            </NavLink>
          )}
        </For>
      </nav>

      <Show when={props.posts.length > 0} fallback={<p>Brak realizacji w tej kategorii.</p>}>
        <div class={styles.boards}>
          <SiteBoard post={props.posts[0]} kind={kindOf(props.posts[0])} priority />
          <Show when={rest().length === 1}>
            <SiteBoard post={rest()[0]} kind={kindOf(rest()[0])} flip />
          </Show>
        </div>
        <Show when={rest().length > 1}>
          <div class={`${styles.postsGrid} ${rest().length % 3 === 1 ? styles.postsGridTwo : ""}`}>
            <For each={rest()}>{(post) => <PostCard post={post} categoryLabels={categoryLabels} />}</For>
          </div>
        </Show>
      </Show>
    </>
  );
}
