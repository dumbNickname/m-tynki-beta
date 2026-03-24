import Layout from "~/components/Layout";
import SeoHead from "~/components/SeoHead";
import PageHeader from "~/components/PageHeader";
import Gallery from "~/components/Gallery";
import galleryImages from "~/data/gallery.json";

export default function Galeria() {
  return (
    <Layout>
      <SeoHead
        title="Galeria Realizacji — Tynki pod Malowanie"
        canonical="/galeria"
        description="Galeria zdjęć realizacji tynków gipsowych ze szlichtą wygładzającą pod malowanie. Zobacz efekty pracy firmy M-TYNK Wrocław."
        ogImage="images/uploads/2023/09/img-20230904-wa0001.jpg"
        dateModified="2023-09-04T13:54:30+00:00"
        breadcrumbs={[
          { name: "HOME", href: "/" },
          { name: "Galeria" },
        ]}
      />

      <PageHeader
        title="Galeria"
        breadcrumbs={[{ label: "HOME", href: "/" }, { label: "Galeria" }]}
      />

      <section class="section">
        <div class="container">
          <Gallery images={galleryImages} altPrefix="Tynki ze szlichtą pod malowanie M-TYNK Wrocław" />
        </div>
      </section>
    </Layout>
  );
}
