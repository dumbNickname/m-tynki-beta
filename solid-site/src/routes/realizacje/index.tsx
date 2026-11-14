import Layout from "~/components/Layout";
import SeoHead from "~/components/SeoHead";
import PageHeader from "~/components/PageHeader";
import PostList from "~/components/PostList";
import posts from "~/data/posts.json";

export default function Realizacje() {
  return (
    <Layout>
      <SeoHead
        title="Realizacje — domy i mieszkania we Wrocławiu"
        canonical="/realizacje"
        description="Konkretne budowy: lokalizacja, metraż i czas realizacji. Tynki ze szlichtą, zabudowy karton-gips i malowanie natryskowe we Wrocławiu i okolicach."
        dateModified="2024-09-30T08:10:47+00:00"
        breadcrumbs={[
          { name: "Strona Główna", href: "/" },
          { name: "Realizacje" },
        ]}
      />

      <PageHeader
        title="Realizacje"
        breadcrumbs={[{ label: "Strona Główna", href: "/" }, { label: "Realizacje" }]}
        lead="Zapoznaj się z naszymi realizacjami tynków gipsowych ze szlichtą wygładzającą pod malowanie. Każdy projekt to przykład naszego doświadczenia i dbałości o najwyższą jakość wykończenia ścian we Wrocławiu i okolicach."
      />

      <section class="section">
        <div class="container">
          <PostList posts={posts} active="wszystkie" />
        </div>
      </section>
    </Layout>
  );
}
