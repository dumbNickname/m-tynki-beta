import Layout from "~/components/Layout";
import SeoHead from "~/components/SeoHead";
import site from "~/data/site.json";

export default function Home() {
  return (
    <Layout>
      <SeoHead
        canonical="/"
        description={site.description}
        ogImage="/images/uploads/elementor/thumbs/tynk-ze-szlichta-wygladzajaca-2-1-qbc493vjwnj8vdtfz6et930fnfrti3rzhl17p4djqe.png"
      />

      <section class="hero">
        <div class="hero-bg" style={{ "background-image": "url('/images/uploads/2023/08/tynki-ze-szlichta-pod-malowanie.jpg')" }}>
          <div class="hero-overlay" />
          <div class="hero-content">
            <h1>
              Tynki ze szlichtą<br />wygładzającą<br />pod malowanie
            </h1>
            <a href="#dowiedz-sie-wiecej" class="btn btn-outline">Dowiedz się więcej</a>
          </div>
        </div>
      </section>

      <section class="section" id="dowiedz-sie-wiecej">
        <div class="container grid-2">
          <div>
            <h2>Tynki ze szlichtą wygładzającą pod malowanie</h2>
            <p class="lead">Jesteśmy firmą budowlaną świadczącą swoje usługi od 1999r co jest gwarancją jakości usług.</p>
            <h2>Zaufaj profesjonalnym usługom tynkarskim</h2>
            <p>Skontaktuj się z nami i przekonaj się o naszym profesjonalizmie!</p>
          </div>
          <div class="text-center">
            <img
              src="/images/uploads/elementor/thumbs/tynk-ze-szlichta-wygladzajaca-2-1-qbc493vjwnj8vdtfz6et930fnfrti3rzhl17p4djqe.png"
              alt="Tynk ze szlichtą wygładzającą"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section class="section section-alt" id="o-nas">
        <div class="container grid-2">
          <div class="text-center">
            <img src={site.mascot} alt="M-TYNK maskotka" width="300" height="300" loading="lazy" />
          </div>
          <div>
            <h2>Działamy szybko i dokładnie!</h2>
            <p>
              Panuje przeświadczenie że wszystkie roboty budowlane trwają długo, są robione niedokładne, przez co trzeba przygotować się na dużą ilość poprawek. Jednak to nie tyczy się NAS! Działamy profesjonalnie, wiemy co nas irytuje w pracach budowlanych, dlatego pracujemy tak jakbyśmy sami chcieli zostać obsłużeni.
            </p>
            <p>
              Liczy się dla nas satysfakcja i zadowolenie przebiegu współpracy z klientami, przez to zwracamy uwagę na najmniejsze szczegóły. Opowiadamy na wszystkie pytania, aby Nasi klienci byli świadomi interesujących ich kroków naszej pracy.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container text-center">
          <h2>Opinie naszych klientów</h2>
          <div id="trustindex-widget" />
        </div>
      </section>

      <section class="section section-cta">
        <div class="container text-center">
          <h2>Skontaktuj się z nami</h2>
          <p>Zadzwoń i umów się na bezpłatną wycenę!</p>
          <a class="btn btn-primary btn-lg" href={`tel:${site.phoneRaw}`}>
            {site.phone}
          </a>
        </div>
      </section>
    </Layout>
  );
}
