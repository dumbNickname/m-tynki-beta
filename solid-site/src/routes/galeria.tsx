import Layout from "~/components/Layout";
import SeoHead from "~/components/SeoHead";
import PageHeader from "~/components/PageHeader";
import Gallery from "~/components/Gallery";
import SpiritLevel from "~/components/SpiritLevel";
import NavLink from "~/components/NavLink";
import styles from "./galeria.module.css";
import galleryImages from "~/data/gallery.json";
import { galleryAlts } from "~/utils/images";

export default function Galeria() {
  return (
    <Layout>
      <SeoHead
        title="Galeria zdjęć z naszych budów"
        canonical="/galeria"
        description="Zdjęcia ścian i sufitów z budów, na których pracowaliśmy — tynk wykończony szlichtą, w stanie gotowym pod malowanie."
        dateModified="2026-11-06T08:00:00+00:00"
        breadcrumbs={[
          { name: "Strona Główna", href: "/" },
          { name: "Galeria" },
        ]}
      />

      <PageHeader
        title="Galeria"
        breadcrumbs={[{ label: "Strona Główna", href: "/" }, { label: "Galeria" }]}
        lead={
          <>
            {galleryImages.length} zdjęć ścian i sufitów z naszych budów: tynki gipsowe ze szlichtą wygładzającą, gotowe pod malowanie — w typowych pomieszczeniach bez osobnej warstwy gładzi. Kliknij zdjęcie, aby je powiększyć.
          </>
        }
      />

      <section class={`section ${styles.gallerySection}`}>
        <div class="container">
          <Gallery
            images={galleryImages}
            altPrefix="Tynki ze szlichtą pod malowanie M-TYNK Wrocław"
            alts={galleryImages.map((src) => galleryAlts[src])}
            variant="bento"
          />
          <p class={styles.more}>
            Opisy prac, metraże i czas realizacji znajdziesz w <NavLink href="/realizacje">realizacjach</NavLink>.
          </p>
          <SpiritLevel label={`${galleryImages.length} zdjęć`} />
        </div>
      </section>
    </Layout>
  );
}
