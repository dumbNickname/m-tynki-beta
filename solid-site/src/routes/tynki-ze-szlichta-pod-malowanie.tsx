import { For } from "solid-js";
import Layout from "~/components/Layout";
import SeoHead from "~/components/SeoHead";
import PageHeader from "~/components/PageHeader";
import site from "~/data/site.json";
import styles from "./tynki-ze-szlichta-pod-malowanie.module.css";

const benefits = [
  { icon: "⏱️", title: "Oszczędność czasu", description: "Eliminacja etapu nakładania gładzi skraca czas wykończenia nawet o kilka dni." },
  { icon: "✨", title: "Idealna gładkość", description: "Szlichta z gładziolitem zapewnia perfekcyjnie równą powierzchnię bez widocznych nierówności." },
  { icon: "💰", title: "Oszczędność kosztów", description: "Brak potrzeby osobnej gładzi oznacza niższe koszty materiałów i robocizny." },
  { icon: "🎨", title: "Gotowe pod malowanie", description: "Po wyschnięciu ściany są od razu gotowe do malowania — bez dodatkowego szlifowania." },
  { icon: "🏗️", title: "Trwałość", description: "Tynk ze szlichtą tworzy jednolitą, mocną warstwę, odporną na pęknięcia i uszkodzenia mechaniczne." },
  { icon: "🔧", title: "Uniwersalność", description: "Nadaje się do zastosowania na ścianach i sufitach, w budynkach mieszkalnych oraz użytkowych." },
];

const faqs = [
  {
    question: "Ile kosztuje tynk ze szlichtą wygładzającą?",
    answer: "Koszt tynku ze szlichtą wygładzającą zależy od wielkości powierzchni, stanu podłoża oraz lokalizacji inwestycji. Zapraszamy do kontaktu telefonicznego w celu uzyskania bezpłatnej wyceny — każde zlecenie wyceniamy indywidualnie.",
  },
  {
    question: "Jak długo schnie tynk ze szlichtą?",
    answer: "Czas schnięcia zależy od grubości warstwy, temperatury i wilgotności w pomieszczeniu. Zazwyczaj tynk ze szlichtą jest gotowy do malowania po ok. 2–4 tygodniach. Dokładny czas podajemy przy każdej realizacji.",
  },
  {
    question: "Czy tynk ze szlichtą nadaje się od razu pod malowanie?",
    answer: "Tak — to główna zaleta naszej metody. Szlichta z gładziolitem wygładza powierzchnię tynku do takiego stopnia, że po wyschnięciu nie wymaga nakładania dodatkowej gładzi. Ściana jest gotowa bezpośrednio pod malowanie lub tapetowanie.",
  },
  {
    question: "Na jakich powierzchniach można stosować tynk ze szlichtą?",
    answer: "Tynk ze szlichtą wygładzającą można stosować na ścianach i sufitach z cegły, betonu, pustaków oraz bloków silikatowych. Sprawdza się zarówno w domach jednorodzinnych, mieszkaniach, jak i obiektach użytkowych.",
  },
  {
    question: "Jaki jest czas realizacji tynkowania?",
    answer: "Czas realizacji zależy od powierzchni do otynkowania. Dla domu jednorodzinnego o powierzchni ok. 500–800 m² prace trwają zazwyczaj od 7 do 25 dni roboczych. Dokładny termin ustalamy indywidualnie po zapoznaniu się z zakresem prac.",
  },
];

export default function TynkiService() {
  return (
    <Layout>
      <SeoHead
        title="Tynki ze Szlichtą pod Malowanie Wrocław"
        canonical="/tynki-ze-szlichta-pod-malowanie"
        description="Tynki gipsowe ze szlichtą gładziolitu pod malowanie Wrocław. Ściany gotowe do malowania bez dodatkowej gładzi — oszczędność czasu i pieniędzy."
        ogImage="images/uploads/2023/08/tynki-ze-szlichta-pod-malowanie.jpg"
        dateModified="2023-09-04T09:44:26+00:00"
        breadcrumbs={[
          { name: "HOME", href: "/" },
          { name: "Tynki ze szlichtą pod malowanie" },
        ]}
        faq={faqs}
      />

      <PageHeader
        title="Tynki ze Szlichtą pod Malowanie"
        breadcrumbs={[{ label: "HOME", href: "/" }, { label: "Tynki ze szlichtą pod malowanie" }]}
      />

      <section class="section">
        <div class={`container ${styles.grid}`}>
          <div class={styles.text1}>
            <h2 class={styles.sectionTitle}>Tynki gipsowe ze szlichtą gładziolitu wygładzającego pod malowanie</h2>
            <div class={styles.divider} />
            <p>
              Nasza Firma posiada w swojej ofercie coś, co wyróżnia ją na tle innych firm zajmujących się tynkowaniem. Oferowane przez nas Tynki Gipsowe są wykańczane Szlichtą z GŁADZIOLITEM Wygładzającym, która nadaje gładkość tynkowanej ścianie. Dzięki Gładziolitowi, ściany i sufity w pomieszczeniu są perfekcyjnie równe i można od razu po wyschnięciu przejść do malowania.
            </p>
            <p>
              Tynk ze Gładziolitem Wygładzającym powoduje brak konieczności wykonywania dodatkowej gładzi na powierzchni tynku. Brak konieczności stosowania gładzi prowadzi do oszczędności czasu i pieniędzy.
            </p>
            <p>
              Na terenie Wrocławia, gdzie znajduje się siedziba naszej firmy, a także w okolicach, jesteśmy jedyną firmą, która stawia na Tynk Gipsowy z Gładziolitem Wygładzającym. Możemy się pochwalić szeregiem opinii naszych klientów, którzy chwalą nasze przywiązanie do detali, pracowitość i przede wszystkim jakość wykonanych tynków.
            </p>
          </div>

          <div class={`${styles.imageWrap} ${styles.img1}`}>
            <img
              src="images/uploads/2023/08/tynki-ze-szlichta-pod-malowanie.jpg"
              srcset="images/thumbs/uploads/2023/08/tynki-ze-szlichta-pod-malowanie.jpg 400w, images/uploads/2023/08/tynki-ze-szlichta-pod-malowanie.jpg 1125w"
              sizes="(max-width: 768px) 60vw, 500px"
              alt="Tynki ze szlichtą pod malowanie"
              loading="lazy"
            />
          </div>

          <div class={styles.szlichta}>
            <h2 class={styles.sectionTitle}>Czym jest szlichta z gładziolitem?</h2>
            <div class={styles.divider} />
            <p>
              Szlichta z Gładziolitem wygładzającym jest niczym innym jak ostatnią warstwą nakładanego tynku. Można powiedzieć, że jest to warstwa dodatkowa, która nadaje gładkości ścianie i pozwala od razu przejść do malowania bądź położenia płytek. Jest to coś, co wymaga dodatkowej pracy, ale daje piorunujący efekt końcowy.
            </p>
          </div>

          <div class={`${styles.imageWrap} ${styles.img2}`}>
            <img
              src="images/uploads/elementor/thumbs/tyni-pod-malowanie-qbdq91rev2rfmler3fd35z8elq8utmztpuh8j5jxts.jpg"
              alt="Tynki pod malowanie"
              loading="lazy"
            />
          </div>

          <div class={styles.gdzie}>
            <h2 class={styles.sectionTitle}>Gdzie mogę zobaczyć tynk ze szlichtą gładziolitu?</h2>
            <div class={styles.divider} />
            <p>
              Jeśli chcą Państwo zapoznać się z tym jak wygląda Tynk ze Szlichtą Gładziolitu – zapraszamy na naszą aktualną budowę. Zawsze zapraszamy inwestorów, aby zapoznali się z jakością wykonywanych przez nas tynków. Dlatego też, w każdej sytuacji, prosimy o kontakt telefoniczny w celu umówienia się na wizytę. Na takiej wizycie opowiemy też więcej o wykonywanych Tynkach Gipsowych ze Szlichtą Gładziolitu, a także pokażemy, jak wygląda tynk bez szlichty gładziolitu oraz ze szlichtą gładziolitem.
            </p>
            <div class="text-right">
              <a class="btn btn-primary" href={`tel:${site.phoneRaw}`}>
                Umów się na wizytę!
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class={`section ${styles.benefitsSection}`}>
        <div class="container">
          <div class="text-center">
            <h2>Zalety tynku ze szlichtą wygładzającą</h2>
          </div>
          <div class={styles.benefitsGrid}>
            <For each={benefits}>
              {(b) => (
                <div class={styles.benefitCard}>
                  <span class={styles.benefitIcon}>{b.icon}</span>
                  <h3>{b.title}</h3>
                  <p>{b.description}</p>
                </div>
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
            <For each={faqs}>
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

      <section class={`section ${styles.ctaSection}`}>
        <div class="container text-center">
          <h2>Zainteresowany? Skontaktuj się z nami!</h2>
          <p>Zadzwoń i umów się na bezpłatną wycenę lub wizytę na aktualnej budowie.</p>
          <a class="btn btn-primary btn-lg" href={`tel:${site.phoneRaw}`}>
            {site.phone}
          </a>
        </div>
      </section>
    </Layout>
  );
}
