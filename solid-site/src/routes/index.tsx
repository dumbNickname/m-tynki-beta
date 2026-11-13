import { For } from "solid-js";
import Layout from "~/components/Layout";
import SeoHead from "~/components/SeoHead";
import Reviews from "~/components/Reviews";
import NavLink from "~/components/NavLink";
import PlasterCompare from "~/components/PlasterCompare";
import MascotBadge from "~/components/MascotBadge";
import SocialFollow from "~/components/SocialFollow";
import site from "~/data/site.json";
import posts from "~/data/posts.json";
import { opinieLabel } from "~/utils/plural";
import { toMedium, toThumb } from "~/utils/images";
import styles from "./index.module.css";

const featured = {
  title: "Tynki gipsowe ze szlichtą wygładzającą",
  description: "Na tynki gipsowe nakładamy dodatkową warstwę wygładzającą, która wyraźnie wygładza ścianę już na etapie tynkowania. W typowych pomieszczeniach po wyschnięciu ścianę się gruntuje i maluje — bez osobnej gładzi. Pod oświetlenie wzdłuż ścian czy farby z połyskiem doradzamy gładź, którą robimy przy malowaniu.",
  href: "/tynki-ze-szlichta-pod-malowanie",
};

const services = [
  {
    title: "Zabezpieczenie budowy",
    icon: "M4 4h16v16H4z M4 10l10 10 M10 4l10 10",
    description: "Oklejamy okna, drzwi, osłaniamy posadzki oraz instalacje, aby ochronić budowę przed zabrudzeniami podczas tynkowania.",
    href: "/tynki-ze-szlichta-pod-malowanie#tynki-maszynowe",
  },
  {
    title: "Tynkowanie maszynowe",
    icon: "M3 19c3 0 4-3 7-3s4 3 7 3 M13 5l7 3-2 4-7-3z M12 9l-2 7",
    description: "Nakładamy tynk gipsowy agregatem tynkarskim — zaprawa ma powtarzalną konsystencję, a ściany są pokryte równo i szybko.",
    href: "/tynki-ze-szlichta-pod-malowanie#tynki-maszynowe",
  },
  {
    title: "Ściąganie i wygładzanie",
    icon: "M2 15l17-8 2 3-17 8z M3 21h18",
    description: "Ściągamy tynk łatą do równego, a następnie wygładzamy ręcznie trzema rodzajami łat gładzących — uzupełniamy każdy ubytek.",
    href: "/tynki-ze-szlichta-pod-malowanie#szlichta",
  },
  {
    title: "Szlichta z gładziolitem",
    icon: "M3 15h13l5-5H8z M13 10V6a2 2 0 0 1 2-2h3",
    description: "Nakładamy szlichtę gładziolitu wygładzającego — tynk staje się gładki i w typowych pomieszczeniach nadaje się pod malowanie bez osobnej gładzi.",
    href: "/tynki-ze-szlichta-pod-malowanie#szlichta",
  },
  {
    title: "Zabudowy G-K i gładź natryskowa",
    icon: "M4 3h7v18H4z M13 3h7v18h-7z M4 10h7 M13 14h7",
    description: "Wykonujemy też zabudowy z płyt karton-gipsowych, gładź natryskową oraz sufity podwieszane.",
    href: "/tynki-ze-szlichta-pod-malowanie#gladz-natryskowa",
  },
  {
    title: "Natryskowe malowanie ścian",
    icon: "M4 8h10v5H4z M14 10h3 M8 13v7h3 M20 7h.01 M21 10.5h.01 M20 14h.01",
    description: "Malujemy natryskowo na biało i w kolorze — równe pokrycie na dużych powierzchniach, szybciej niż wałkiem.",
    href: "/tynki-ze-szlichta-pod-malowanie#gladz-natryskowa",
  },
];

const steps = [
  { title: "Przygotowanie", content: "Pierwszym etapem zawsze jest odpowiednie zabezpieczenie okien, drzwi i elementów, które mogą zostać uszkodzone." },
  { title: "Narzut", content: "Nakładanie pierwszej warstwy tynku, warstwy właściwej na ścianę. Na tym etapie zużywamy najwięcej materiału." },
  { title: "Wygładzanie", content: "Wygładzanie powierzchni narzędziami tynkarskimi, uzupełnianie ubytków i nieprawidłowości. Każdy narzut jest przez nas wygładzany 3 rodzajami łat gładzących." },
  { title: "Gładziolit", content: "Zastosowanie Gładziolitu wygładzającego w celu uzyskania gładkiej powierzchni tynku. Na tym etapie wygładzamy ścianę tak, aby po wyschnięciu i zagruntowaniu w typowych pomieszczeniach można ją było malować. Płaskość sprawdzamy łatą 2 m według normy PN-B-10110." },
];

const latestPosts = [...posts]
  .filter((p) => p.thumbnail)
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 3);

export default function Home() {
  return (
    <Layout>
      <SeoHead
        canonical="/"
        description={site.description}
        ogImage="images/og-default.jpg"
      />

      <div class={styles.page}>
      <section class={styles.hero}>
        <img
          class={styles.heroImg}
          src="images/hero-1125w.jpg"
          srcset="images/hero-480w.jpg 480w, images/hero-768w.jpg 768w, images/hero-1125w.jpg 1125w"
          sizes="100vw"
          alt="Tynki gipsowe ze szlichtą pod malowanie"
          fetchpriority="high"
        />
        <div class={styles.heroShade} />
        <div class={`container ${styles.heroInner}`}>
          <div class={styles.heroContent}>
            <h1>
              <span class={styles.heroLocation}>Firma tynkarska — Wrocław i okolice</span>
              <span class={styles.heroService}>Tynki gipsowe ze szlichtą, przygotowane pod malowanie</span>
            </h1>
            <p class={styles.heroSubtitle}>W typowych pomieszczeniach malujesz bez osobnej gładzi — a gdzie jest potrzebna, zrobimy ją przy malowaniu</p>
            <div class={styles.heroActions}>
              <a href={`tel:${site.phoneRaw}`} class="btn btn-primary btn-lg">Bezpłatna wycena</a>
              <NavLink href="/realizacje" class={`btn btn-lg ${styles.btnGhost}`}>Zobacz realizacje</NavLink>
            </div>
            <ul class={styles.heroTrust}>
              <li>
                <a href={site.googleReviewsListUrl} target="_blank" rel="noopener noreferrer">
                  <span class={styles.heroStars} aria-hidden="true">
                    <For each={[0, 1, 2, 3, 4]}>
                      {() => <svg viewBox="0 0 20 20"><path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z" /></svg>}
                    </For>
                  </span>
                  <strong>{site.googleRating}</strong> · {site.googleReviewCount} {opinieLabel(site.googleReviewCount)} w Google
                </a>
              </li>
              <li>Wrocław, Oława, Trzebnica, Sobótka i okolice</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class={styles.introGrid}>
            <div class="reveal">
              <h2>Doświadczenie w tynkowaniu od 1999 roku</h2>
              <p class={styles.lead}>Jesteśmy firmą tynkarską z Wrocławia z doświadczeniem w tynkowaniu od 1999 roku — zdobywanym w Polsce, na Litwie, w Niemczech i w Szwajcarii.</p>
              <p>Wykonujemy tynki we Wrocławiu i okolicach — tynkowanie domów, mieszkań i lokali użytkowych. Jako tynkarz z ponad 25-letnim doświadczeniem specjalizujemy się w tynkach gipsowych nakładanych agregatem, czyli <NavLink href="/tynki-ze-szlichta-pod-malowanie#tynki-maszynowe">tynkach maszynowych we Wrocławiu</NavLink>, wykańczanych szlichtą wygładzającą.</p>
              <p>Skontaktuj się z nami i przekonaj się o naszym profesjonalizmie! Zobacz nasze <NavLink href="/realizacje">realizacje</NavLink> lub dowiedz się więcej o <NavLink href="/tynki-ze-szlichta-pod-malowanie">tynkach gipsowych ze szlichtą pod malowanie</NavLink>.</p>
              <div class={styles.statsRow}>
                <div class={styles.statItem}>
                  <span class={styles.statNumber}>25+</span>
                  <span class={styles.statLabel}>Lat doświadczenia</span>
                </div>
                <a class={styles.statItem} href={site.googleReviewsListUrl} target="_blank" rel="noopener noreferrer">
                  <span class={styles.statNumber}>{site.googleRating}<svg class={styles.statStar} viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z" /></svg></span>
                  <span class={styles.statLabel}>{site.googleReviewCount} {opinieLabel(site.googleReviewCount)} w Google</span>
                </a>
              </div>
            </div>
            <div class={`${styles.introImage} reveal`}>
              <img
                src="images/uploads/elementor/thumbs/tynk-ze-szlichta-wygladzajaca-2-1-qbc493vjwnj8vdtfz6et930fnfrti3rzhl17p4djqe.jpg"
                alt="Tynk ze szlichtą wygładzającą"
                width="374"
                height="503"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section class={`section ${styles.compare}`} id="szlichta">
        <div class="container">
          <div class={styles.compareGrid}>
            <div class={`${styles.compareText} reveal`}>
              <h2>Co daje szlichta wygładzająca?</h2>
              <p>
                Zwykły tynk gipsowy po zatarciu ma wyczuwalną fakturę, więc przed malowaniem zwykle kładzie się na nim gładź, którą trzeba wysuszyć i wyszlifować.
              </p>
              <p>
                My na świeży tynk nakładamy jeszcze cienką warstwę Gładziolitu i wygładzamy ją ręcznie. Ściana wychodzi gładka już na etapie tynkowania, a w typowych pomieszczeniach po wyschnięciu wystarczy grunt i farba.
              </p>
              <NavLink href="/tynki-ze-szlichta-pod-malowanie" class={styles.textLink}>Jak wygląda tynk ze szlichtą pod malowanie</NavLink>
            </div>
            <div class="reveal">
              <PlasterCompare />
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class={styles.sectionHead}>
            <h2>Nasze realizacje</h2>
            <NavLink href="/realizacje" class={styles.textLink}>Wszystkie realizacje</NavLink>
          </div>
          <div class={styles.workGrid}>
            <For each={latestPosts}>
              {(post) => (
                <article class={`${styles.work} reveal`}>
                  <div class={styles.workImg}>
                    <img
                      src={toMedium(post.thumbnail)}
                      srcset={`${toThumb(post.thumbnail)} 400w, ${toMedium(post.thumbnail)} 800w`}
                      sizes="(max-width: 768px) 100vw, 380px"
                      alt=""
                      loading="lazy"
                    />
                  </div>
                  <h3>
                    <NavLink href={`/realizacje/${post.slug}`} class={styles.workLink}>{post.title}</NavLink>
                  </h3>
                  <p>{post.location}</p>
                </article>
              )}
            </For>
          </div>
        </div>
      </section>

      <SocialFollow />

      <section class={`section ${styles.reviews}`}>
        <div class="container text-center">
          <h2>Opinie o naszych tynkach we Wrocławiu i okolicach</h2>
          <Reviews />
        </div>
      </section>

      <section class={`section ${styles.services}`}>
        <div class="container">
          <h2 class={styles.servicesTitle}>Co robimy na budowie</h2>
          <NavLink href={featured.href} class={`${styles.featured} reveal`}>
            <h3>{featured.title}</h3>
            <div>
              <p>{featured.description}</p>
              <span class={styles.more}>Dowiedz się więcej</span>
            </div>
          </NavLink>
          <ul class={styles.serviceGrid}>
            <For each={services}>
              {(svc) => (
                <li class="reveal">
                  <NavLink href={svc.href} class={styles.serviceCard}>
                    <svg class={styles.serviceIcon} viewBox="0 0 24 24" aria-hidden="true">
                      <path d={svc.icon} />
                    </svg>
                    <h3>{svc.title}</h3>
                    <p>{svc.description}</p>
                  </NavLink>
                </li>
              )}
            </For>
          </ul>
          <a class={`${styles.serviceCall} reveal`} href={`tel:${site.phoneRaw}`}>
            <span>
              <strong class={styles.serviceCallTitle}>Nie wiesz jakie tynki wybrać?</strong>
              Zadzwoń — pomożemy dobrać technologię i wycenimy bezpłatnie.
            </span>
            <span class={styles.serviceCallPhone}>{site.phone}</span>
          </a>
        </div>
      </section>

      <section class={`section ${styles.process}`}>
        <div class="container">
          <h2 class="text-center">Co się dzieje na budowie, dzień po dniu</h2>
          <ol class={styles.timeline}>
            <For each={steps}>
              {(step, i) => (
                <li class={styles.timelineItem}>
                  <span class={styles.timelineDot} aria-hidden="true">{i() + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.content}</p>
                  </div>
                </li>
              )}
            </For>
          </ol>
        </div>
      </section>

      <section class={`section ${styles.about}`} id="o-nas">
        <div class="container">
          <div class={styles.aboutFullGrid}>
            <div class="reveal">
              <h2>Skąd się wzięliśmy i jak pracujemy</h2>
              <p>Jesteśmy firmą tynkarską z wieloletnim doświadczeniem, która od lat zajmuje się tynkarstwem we Wrocławiu i okolicach. Prawie od początku naszej działalności preferujemy metodę wykonywania tynków wraz ze szlichtą wygładzającą, która powoduje, że ściana jest przygotowana pod malowanie.</p>
              <p>Dzięki szlichcie uzyskujemy gładką, równą ścianę, odbieraną według normy dla tynków gipsowych.</p>
              <p>Firmę prowadzi {site.owner.name}, który tynkuje od 1999 roku. Metodę ze szlichtą poznał podczas pracy w Niemczech. <NavLink href="/o-nas">Poznaj jego historię</NavLink>.</p>
              <p>Nasza firma tynkarska specjalizuje się w wykonaniu tynków maszynowych — doświadczenie w tynkach maszynowych zdobywamy od 1999 r. Posiadamy doświadczoną brygadę (wieloletnia praktyka w zawodzie) więc:</p>
              <ul class={styles.checkList}>
                <li>Tynki cechuje wysoka jakość, estetyka i kultura wykonania.</li>
                <li>Zabezpieczamy stolarkę okienną, instalacje i inne wymagające tego rzeczy.</li>
                <li>Zawsze stosujemy specjalistyczne grunty i preparaty, obrzutki, narożniki, siatki, jak i również listwy dylatacyjne do okien i drzwi.</li>
                <li>Posiadamy sprzęt do pracy w systemie silosowym.</li>
                <li>Doradzamy przy wyborze najlepszego materiału oraz technologii wykonania.</li>
                <li>Dbamy o powierzone mienie.</li>
              </ul>
            </div>
            <div class={`${styles.aboutFullImage} reveal`}>
              <img class={styles.aboutWall} src="images/plaster-smooth.svg" alt="" width="1200" height="750" loading="lazy" decoding="async" />
              <picture>
                <source srcset="images/owner-cutout.webp" type="image/webp" />
                <img class={styles.aboutOwner} src="images/owner-cutout.png" alt={`${site.owner.name}, właściciel M-TYNK`} width="663" height="861" loading="lazy" decoding="async" />
              </picture>
            </div>
          </div>
          <div class={styles.approachGrid}>
            <MascotBadge class={`${styles.approachMascot} reveal`} />
            <div class="reveal">
              <h3 class={styles.approachTitle}>Jak podchodzimy do pracy</h3>
              <p>
                Panuje przeświadczenie, że wszystkie roboty budowlane trwają długo, są robione niedokładnie, przez co trzeba przygotować się na dużą ilość poprawek. Jednak to nie tyczy się NAS! Działamy profesjonalnie, wiemy co nas irytuje w pracach budowlanych, dlatego pracujemy tak jakbyśmy sami chcieli zostać obsłużeni.
              </p>
              <p>
                Liczy się dla nas satysfakcja i zadowolenie przebiegu współpracy z klientami, przez to zwracamy uwagę na najmniejsze szczegóły. Odpowiadamy na wszystkie pytania, aby nasi klienci byli świadomi interesujących ich kroków naszej pracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class={`section ${styles.cta}`}>
        <div class={`container ${styles.ctaInner}`}>
          <div>
            <h2>Umów bezpłatną wycenę</h2>
            <p>Zadzwoń i umów się na bezpłatną wycenę! Obsługujemy Wrocław, powiat wrocławski, Trzebnicę, Oławę, Sobótkę, Długołękę, Miękinię, Domasław, Dobrzykowice i Lutynię.</p>
            <p><strong>Adres:</strong> {site.address} · <strong>E-mail:</strong> <a href={`mailto:${site.email}`}>{site.email}</a></p>
          </div>
          <a class={`btn btn-lg ${styles.ctaBtn}`} href={`tel:${site.phoneRaw}`}>
            {site.phone}
          </a>
        </div>
      </section>
      </div>
    </Layout>
  );
}
