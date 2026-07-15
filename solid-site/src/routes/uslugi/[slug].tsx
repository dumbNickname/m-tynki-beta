import { useParams } from "@solidjs/router";
import { For, Show } from "solid-js";
import Layout from "~/components/Layout";
import SeoHead from "~/components/SeoHead";
import PageHeader from "~/components/PageHeader";
import NavLink from "~/components/NavLink";
import site from "~/data/site.json";
import { getServicePage, servicePages } from "~/data/servicePages";
import styles from "../uslugi.module.css";

export default function ServiceLocationPage() {
  const params = useParams();
  const page = () => params.slug ? getServicePage(params.slug) : undefined;

  return (
    <Show when={page()} fallback={<Layout><div class="container section"><h1>Nie znaleziono strony</h1></div></Layout>}>
      {(p) => (
        <Layout>
          <SeoHead
            title={p().title}
            canonical={`/uslugi/${p().slug}`}
            description={p().description}
            ogImage="images/uploads/2023/08/tynki-ze-szlichta-pod-malowanie.jpg"
            service={{ name: p().h1 }}
            breadcrumbs={[
              { name: "Strona Główna", href: "/" },
              { name: p().h1 },
            ]}
            faq={p().faq}
          />

          <PageHeader
            title={p().h1}
            breadcrumbs={[
              { label: "Strona Główna", href: "/" },
              { label: p().h1 },
            ]}
          />

          <section class={`section ${styles.hero}`}>
            <div class={`container ${styles.heroGrid}`}>
              <div>
                <span class={styles.eyebrow}>M-TYNK Wrocław</span>
                <h2>{p().h1} i okolice</h2>
                <p class={styles.lead}>{p().intro}</p>
                <a class="btn btn-primary btn-lg" href={`tel:${site.phoneRaw}`}>Bezpłatna wycena</a>
              </div>
              <div class={styles.card}>
                <p><strong>Telefon:</strong> <a href={`tel:${site.phoneRaw}`}>{site.phone}</a></p>
                <p><strong>E-mail:</strong> <a href={`mailto:${site.email}`}>{site.email}</a></p>
                <p><strong>Adres:</strong> {site.address}</p>
                <p><strong>Obszar:</strong> Wrocław, powiat wrocławski, Trzebnica, Oława, Sobótka, Długołęka, Miękinia, Domasław, Dobrzykowice, Lutynia</p>
              </div>
            </div>
          </section>

          <section class="section">
            <div class="container">
              <h2>Zakres usługi</h2>
              <ul class={styles.list}>
                <For each={p().points}>{(point) => <li>{point}</li>}</For>
              </ul>
              <div class={styles.serviceLinks}>
                <NavLink class={styles.serviceLink} href="/tynki-ze-szlichta-pod-malowanie">Tynki ze szlichtą pod malowanie</NavLink>
                <For each={servicePages.filter((item) => item.slug !== p().slug)}>
                  {(item) => <NavLink class={styles.serviceLink} href={`/uslugi/${item.slug}`}>{item.cardTitle}</NavLink>}
                </For>
              </div>
            </div>
          </section>

          <section class={`section ${styles.contentSection}`}>
            <div class="container">
              <div class={styles.prose}>
                <For each={p().sections}>
                  {(s) => (
                    <>
                      <h2>{s.heading}</h2>
                      <For each={s.paragraphs}>{(para) => <p>{para}</p>}</For>
                    </>
                  )}
                </For>
              </div>
            </div>
          </section>

          <section class="section">
            <div class="container">
              <div class="text-center">
                <h2>Najczęściej zadawane pytania</h2>
              </div>
              <div class={styles.faqList}>
                <For each={p().faq}>
                  {(faq) => (
                    <details class={styles.faqItem}>
                      <summary class={styles.faqQuestion}>{faq.question}</summary>
                      <p class={styles.faqAnswer}>{faq.answer}</p>
                    </details>
                  )}
                </For>
              </div>
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
      )}
    </Show>
  );
}
