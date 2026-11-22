import { For } from "solid-js";
import Layout from "~/components/Layout";
import SeoHead from "~/components/SeoHead";
import PageHeader from "~/components/PageHeader";
import styles from "./polityka-prywatnosci.module.css";

const SECTIONS = [
  { id: "informacje-ogolne", title: "Informacje ogólne" },
  { id: "cookies", title: "Cookies i localStorage" },
  { id: "logi-serwera", title: "Logi serwera" },
  { id: "udostepnienie-danych", title: "Udostępnienie danych" },
  { id: "dane-przegladarki", title: "Dane przeglądarki" },
];

export default function PolitykaPrywatnosci() {
  return (
    <Layout>
      <SeoHead
        title="Polityka prywatności"
        canonical="/polityka-prywatnosci"
        description="Polityka prywatności serwisu M-TYNK Wrocław. Informacje o plikach cookies, logach serwera i udostępnianiu danych."
        dateModified="2026-11-14T08:00:00+01:00"
        breadcrumbs={[
          { name: "Strona Główna", href: "/" },
          { name: "Polityka prywatności" },
        ]}
      />

      <PageHeader
        title="Polityka prywatności"
        breadcrumbs={[{ label: "Strona Główna", href: "/" }, { label: "Polityka prywatności" }]}
        lead="Krótko: to zwykła strona-wizytówka. Nie ma formularzy ani kont, a my nie zbieramy przez nią Twoich danych."
      />

      <section class="section">
        <div class="container">
          <h2 class={styles.summaryTitle}>W skrócie</h2>
          <ul class={styles.summary}>
            <li class="reveal">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <circle cx="24" cy="24" r="17" />
                <circle cx="18" cy="19" r="2.6" class={styles.fill} />
                <circle cx="29" cy="17" r="2" class={styles.fill} />
                <circle cx="27" cy="29" r="2.8" class={styles.fill} />
                <circle cx="17" cy="29" r="1.8" class={styles.fill} />
                <path d="M9 39 39 9" class={styles.cross} />
              </svg>
              <strong>Bez plików cookies</strong>
              <span>Strona nie zapisuje cookies. W przeglądarce pamięta tylko motyw (jasny/ciemny) i to, że komunikat o cookies został zamknięty.</span>
            </li>
            <li class="reveal">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <path d="M4 24s7-12 20-12 20 12 20 12-7 12-20 12S4 24 4 24z" />
                <circle cx="24" cy="24" r="5.5" />
                <path d="M9 39 39 9" class={styles.cross} />
              </svg>
              <strong>Bez analityki i reklam</strong>
              <span>Nie ma Google Analytics, Facebook Pixel ani innych narzędzi śledzących. Nie profilujemy i nie pokazujemy reklam.</span>
            </li>
            <li class="reveal">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <rect x="9" y="8" width="30" height="34" rx="3" />
                <path d="M16 18h16M16 25h16M16 32h9" />
                <path d="M9 39 39 9" class={styles.cross} />
              </svg>
              <strong>Bez formularzy i kont</strong>
              <span>Kontakt jest tylko telefoniczny lub mailowy, więc przez stronę nie trafiają do nas żadne dane osobowe.</span>
            </li>
          </ul>

          <div class={styles.layout}>
            <nav class={styles.toc} aria-label="Spis treści">
              <p class={styles.tocTitle}>Spis treści</p>
              <ol>
                <For each={SECTIONS}>{(sec) => <li><a href={`#${sec.id}`}>{sec.title}</a></li>}</For>
              </ol>
            </nav>

            <div class={styles.contentText}>
              <section id="informacje-ogolne">
                <h2>Informacje ogólne</h2>
                <ol>
                  <li>Operatorem Serwisu jest Tynki gipsowe z gładziolitem pod malowanie – M – Tynk Obornicka 77C/4A, 51-114 Wrocław, zwana dalej ADMINISTRATOREM.</li>
                  <li>Serwis jest statyczną stroną internetową i nie posiada formularzy rejestracyjnych, logowania ani panelu użytkownika.</li>
                  <li>Administrator nie zbiera, nie przetwarza ani nie przekazuje danych osobowych Użytkowników za pośrednictwem Serwisu.</li>
                </ol>
              </section>

              <section id="cookies">
                <h2>Informacja o plikach cookies i localStorage</h2>
                <ol>
                  <li>Serwis nie korzysta z plików cookies.</li>
                  <li>Serwis wykorzystuje mechanizm localStorage przeglądarki wyłącznie w celu zapamiętania, że Użytkownik zaakceptował komunikat o plikach cookie oraz w celu zapamiętania wybranego motywu kolorystycznego (jasny/ciemny). Są to dane techniczne przechowywane lokalnie w przeglądarce Użytkownika, które nie są przesyłane na serwer.</li>
                  <li>Serwis nie stosuje żadnych narzędzi analitycznych, reklamowych ani śledzących (np. Google Analytics, Facebook Pixel itp.).</li>
                  <li>Serwis nie profiluje Użytkowników ani nie wyświetla reklam dopasowanych do ich zachowań.</li>
                </ol>
              </section>

              <section id="logi-serwera">
                <h2>Logi serwera</h2>
                <ol>
                  <li>Informacje o niektórych zachowaniach użytkowników podlegają logowaniu w warstwie serwerowej. Dane te są wykorzystywane wyłącznie w celu administrowania serwisem oraz w celu zapewnienia jak najbardziej sprawnej obsługi świadczonych usług hostingowych.</li>
                  <li>
                    Przeglądane zasoby identyfikowane są poprzez adresy URL. Ponadto zapisowi mogą podlegać:
                    <ol type="a">
                      <li>czas nadejścia zapytania,</li>
                      <li>czas wysłania odpowiedzi,</li>
                      <li>nazwę stacji klienta – identyfikacja realizowana przez protokół HTTP,</li>
                      <li>informacje o błędach jakie nastąpiły przy realizacji transakcji HTTP,</li>
                      <li>adres URL strony poprzednio odwiedzanej przez użytkownika (referer link) – w przypadku gdy przejście do Serwisu nastąpiło przez odnośnik,</li>
                      <li>informacje o przeglądarce użytkownika,</li>
                      <li>informacje o adresie IP.</li>
                    </ol>
                  </li>
                  <li>Dane powyższe nie są kojarzone z konkretnymi osobami przeglądającymi strony.</li>
                  <li>Dane powyższe są wykorzystywane jedynie dla celów administrowania serwerem.</li>
                </ol>
              </section>

              <section id="udostepnienie-danych">
                <h2>Udostępnienie danych</h2>
                <ol>
                  <li>Dane podlegają udostępnieniu podmiotom zewnętrznym wyłącznie w granicach prawnie dozwolonych.</li>
                  <li>Operator może mieć obowiązek udzielania informacji zebranych przez Serwis upoważnionym organom na podstawie zgodnych z prawem żądań w zakresie wynikającym z żądania.</li>
                </ol>
              </section>

              <section id="dane-przegladarki">
                <h2>Zarządzanie danymi przeglądarki</h2>
                <ol>
                  <li>Użytkownik może w dowolnym momencie wyczyścić dane localStorage swojej przeglądarki, co spowoduje ponowne wyświetlenie komunikatu o plikach cookie oraz zresetowanie preferencji motywu kolorystycznego przy następnej wizycie na stronie.</li>
                  <li>Szczegółowe informacje na temat zarządzania danymi przeglądarki zawiera pomoc lub dokumentacja danej przeglądarki internetowej.</li>
                </ol>
              </section>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
