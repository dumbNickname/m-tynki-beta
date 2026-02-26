import Layout from "~/components/Layout";
import SeoHead from "~/components/SeoHead";
import PageHeader from "~/components/PageHeader";
import Gallery from "~/components/Gallery";
import galleryImages from "~/data/gallery.json";

export default function Galeria() {
  return (
    <Layout>
      <SeoHead title="Galeria" canonical="/galeria" description="GALERIA" />

      <PageHeader
        title="GALERIA"
        breadcrumbs={[{ label: "HOME", href: "/" }, { label: "Galeria" }]}
      />

      <section class="section">
        <div class="container">
          <Gallery images={galleryImages} />
        </div>
      </section>
    </Layout>
  );
}
