import { useParams } from "@solidjs/router";
import { For, Show, createMemo } from "solid-js";
import { A } from "@solidjs/router";
import Layout from "~/components/Layout";
import SeoHead from "~/components/SeoHead";
import PageHeader from "~/components/PageHeader";
import PostCard from "~/components/PostCard";
import posts from "~/data/posts.json";
import navigation from "~/data/navigation.json";

const categoryLabels: Record<string, string> = {};
navigation.categories.forEach((c) => { categoryLabels[c.slug] = c.label; });

export default function CategoryPage() {
  const params = useParams();

  const categoryLabel = createMemo(() => categoryLabels[params.slug ?? ""] || params.slug || "");

  const filteredPosts = createMemo(() => {
    const slug = params.slug ?? "";
    if (slug === "wszystkie") return posts;
    return posts.filter((p) => p.categories.includes(slug));
  });

  return (
    <Layout>
      <SeoHead
        title={categoryLabel()}
        canonical={`/category/${params.slug}`}
      />

      <PageHeader
        title={categoryLabel()}
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "Realizacje", href: "/realizacje" },
          { label: categoryLabel() },
        ]}
      />

      <section class="section">
        <div class="container">
          <nav class="category-nav">
            <For each={navigation.categories}>
              {(cat) => (
                <A
                  href={`/category/${cat.slug}`}
                  class="category-link"
                  classList={{ active: cat.slug === params.slug }}
                >
                  {cat.label}
                </A>
              )}
            </For>
          </nav>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <Show when={filteredPosts().length > 0} fallback={<p>Brak realizacji w tej kategorii.</p>}>
            <div class="posts-grid">
              <For each={filteredPosts()}>
                {(post) => <PostCard post={post} categoryLabels={categoryLabels} />}
              </For>
            </div>
          </Show>
        </div>
      </section>
    </Layout>
  );
}
