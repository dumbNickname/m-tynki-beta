import { For } from "solid-js";
import Layout from "~/components/Layout";
import SeoHead from "~/components/SeoHead";
import PageHeader from "~/components/PageHeader";
import NavLink from "~/components/NavLink";
import site from "~/data/site.json";
import { servicePages } from "~/data/servicePages";
import styles from "../uslugi.module.css";

export default function ServicesIndex() {
  return (
    <Layout>
      <SeoHead
        title="Usługi tynkarskie Wrocław"
        canonical="/uslugi"
        description="Usługi tynkarskie M-TYNK we Wrocławiu: tynki maszynowe, tynki gipsowe ze szlichtą, tynkowanie ścian, gładź natryskowa i malowanie natryskowe. Bezpłatna wycena."
        breadcrumbs={[
          { name: "Strona Główna", href: "/" },
          { name: "Usługi tynkarskie" },
        ]}
      />

      <PageHeader
        title="Usługi tynkarskie we Wrocławiu"
        breadcrumbs={[
          { label: "Strona Główna", href: "/" },
          { label: "Usługi tynkarskie" },
        ]}
      />

      <section class="section">
        <div class="container">
          <p class={styles.lead}>
            M-TYNK to firma tynkarska z Wrocławia działająca od 1999 roku. Wykonujemy tynki gipsowe ze szlichtą wygładzającą pod malowanie, tynki maszynowe, gładź natryskową, zabudowy z płyt karton-gipsowych oraz natryskowe malowanie ścian. Poniżej znajdziesz nasze główne usługi — kliknij, aby poznać szczegóły i zamówić bezpłatną wycenę.
          </p>
          <div class={styles.serviceGrid}>
            <NavLink class={styles.serviceTile} href="/tynki-ze-szlichta-pod-malowanie">
              <span class={styles.serviceTileTag}>Nasza specjalność</span>
              <h2>Tynki ze szlichtą pod malowanie</h2>
              <p>Tynki gipsowe wykańczane szlichtą gładziolitu — ściany gotowe pod malowanie bez dodatkowej gładzi.</p>
            </NavLink>
            <For each={servicePages.filter((page) => page.slug !== "firma-tynkarska-wroclaw")}>
              {(page) => (
                <NavLink class={styles.serviceTile} href={`/uslugi/${page.slug}`}>
                  <h2>{page.cardTitle}</h2>
                  <p>{page.cardSummary}</p>
                </NavLink>
              )}
            </For>
          </div>
        </div>
      </section>

      <section class={`section ${styles.contentSection}`}>
        <div class="container">
          <NavLink class={styles.aboutTile} href="/uslugi/firma-tynkarska-wroclaw">
            <div>
              <span class={styles.serviceTileTag}>O firmie</span>
              <h2>Firma tynkarska M-TYNK Wrocław</h2>
              <p>Doświadczona ekipa tynkarska z Wrocławia działająca od 1999 roku — poznaj naszą firmę, sposób pracy i obszar działania.</p>
            </div>
            <span class={styles.serviceMore}>Poznaj firmę</span>
          </NavLink>
        </div>
      </section>

      <section class={`section ${styles.cta}`}>
        <div class="container text-center">
          <h2>Umów bezpłatną wycenę</h2>
          <p>Zadzwoń i opowiedz o inwestycji. Podpowiemy technologię i przygotujemy indywidualną ofertę.</p>
          <a class="btn btn-primary btn-lg" href={`tel:${site.phoneRaw}`}>{site.phone}</a>
        </div>
      </section>
    </Layout>
  );
}
