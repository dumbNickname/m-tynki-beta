import { For, JSX, onCleanup, onMount } from "solid-js";
import Layout from "~/components/Layout";
import SeoHead from "~/components/SeoHead";
import PageHeader from "~/components/PageHeader";
import PhotoPending from "~/components/PhotoPending";
import NavLink from "~/components/NavLink";
import site from "~/data/site.json";
import { opinieLabel } from "~/utils/plural";
import styles from "./o-nas.module.css";

const OWNER_NAME = site.owner.name;

type Flag = "pl" | "lt" | "de" | "ch" | "mtynk";
type Stamp = { flag: Flag; top: string; place: string; foot: string; tilt: number };

const stages: { label: string; title: string; content: JSX.Element; flags: Flag[]; stamps: Stamp[] }[] = [
  {
    label: "1999",
    title: "Początki: Podlasie i Litwa",
    flags: ["pl", "lt"],
    stamps: [
      { flag: "pl", top: "Polska", place: "Podlasie", foot: "1999", tilt: -7 },
      { flag: "lt", top: "Lietuva", place: "Litwa", foot: "za granicą", tilt: 5 },
    ],
    content: (
      <p>Moja przygoda z tynkowaniem zaczęła się w 1999 roku na Podlasiu. Tam zdobywałem pierwsze doświadczenia, a z czasem praca zaprowadziła mnie również na Litwę.</p>
    ),
  },
  {
    label: "2005–2010",
    title: "Warszawa: budowy deweloperskie",
    flags: ["pl"],
    stamps: [{ flag: "pl", top: "Polska", place: "Warszawa", foot: "2005–2010", tilt: 3 }],
    content: (
      <p>Po powrocie do Polski przeniosłem się do Warszawy. W latach 2005–2010 pracowałem głównie na budowach deweloperskich, gdzie zdobywałem kolejne doświadczenia i doskonaliłem swój warsztat.</p>
    ),
  },
  {
    label: "ok. 3 lata",
    title: "Niemcy: pierwsze spotkanie ze szlichtą",
    flags: ["de"],
    stamps: [{ flag: "de", top: "Deutschland", place: "Niemcy", foot: "ok. 3 lata", tilt: -4 }],
    content: (
      <>
        <p>Kolejnym ważnym etapem były Niemcy, gdzie przez około trzy lata pracowałem dla niemieckiej firmy. Wyjechałem przede wszystkim po to, żeby poznać nowe technologie i metody tynkowania.</p>
        <p>To właśnie tam po raz pierwszy zetknąłem się z <NavLink href="/tynki-ze-szlichta-pod-malowanie">tynkowaniem ze szlichtą</NavLink>. Wcześniej nie spotkałem się w Polsce z takim rozwiązaniem, dlatego tym bardziej zaskoczył mnie efekt końcowy: naprawdę gładkie, estetyczne ściany, bardzo dobrze przygotowane pod malowanie. To doświadczenie w dużej mierze ukształtowało moje podejście do jakości pracy.</p>
      </>
    ),
  },
  {
    label: "ok. 2 lata",
    title: "Szwajcaria: kolejne standardy",
    flags: ["ch"],
    stamps: [{ flag: "ch", top: "Schweiz", place: "Szwajcaria", foot: "ok. 2 lata", tilt: 6 }],
    content: (
      <p>Następnie przez około dwa lata pracowałem w Szwajcarii, gdzie poznałem kolejne standardy i rozwiązania stosowane w branży.</p>
    ),
  },
  {
    label: "od ok. 12 lat",
    title: "Wrocław: tu zostałem",
    flags: ["pl"],
    stamps: [{ flag: "pl", top: "Polska", place: "Wrocław", foot: "tu zostałem", tilt: -3 }],
    content: (
      <p>Po powrocie do Polski trafiłem w okolice Wrocławia. Przypadkiem natrafiłem na ogłoszenie o pracę, które spodobało mi się na tyle, że postanowiłem zostać. Z czasem przeprowadziłem się tu na stałe i dziś Wrocław jest moim domem już od około 12 lat.</p>
    ),
  },
  {
    label: "2019",
    title: "Własna firma: M-TYNK",
    flags: ["mtynk"],
    stamps: [{ flag: "mtynk", top: "Wrocław", place: "M-TYNK", foot: "IX 2019", tilt: -9 }],
    content: (
      <p>We wrześniu 2019 roku założyłem we Wrocławiu własną działalność — firmę tynkarską M-TYNK. Od początku stawiam na metodę, którą poznałem w Niemczech: tynki gipsowe ze szlichtą wygładzającą, po których ściany są gotowe pod malowanie.</p>
    ),
  },
];

const allStamps = stages.flatMap((stage, i) => stage.stamps.map((stamp) => ({ ...stamp, stage: i })));

// Round flag markers for the timeline (decorative; the country is in the text).
function FlagIcon(props: { flag: Flag }) {
  const body: Record<Flag, JSX.Element> = {
    pl: (
      <>
        <rect width="24" height="12" fill="#ffffff" />
        <rect y="12" width="24" height="12" fill="#dc143c" />
      </>
    ),
    lt: (
      <>
        <rect width="24" height="8" fill="#fdb913" />
        <rect y="8" width="24" height="8" fill="#006a44" />
        <rect y="16" width="24" height="8" fill="#c1272d" />
      </>
    ),
    de: (
      <>
        <rect width="24" height="8" fill="#000000" />
        <rect y="8" width="24" height="8" fill="#dd0000" />
        <rect y="16" width="24" height="8" fill="#ffce00" />
      </>
    ),
    ch: (
      <>
        <rect width="24" height="24" fill="#da291c" />
        <path d="M10 5h4v5h5v4h-5v5h-4v-5H5v-4h5z" fill="#ffffff" />
      </>
    ),
    mtynk: (
      <>
        <rect width="24" height="24" fill="#2e6b3b" />
        <path d="M6.5 16.5V8l5.5 5 5.5-5v8.5" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
      </>
    ),
  };
  return (
    <svg class={styles.flag} viewBox="0 0 24 24" aria-hidden="true">
      {body[props.flag]}
    </svg>
  );
}

function StampMark(props: { stamp: Stamp; stage: number; class?: string }) {
  return (
    <span
      class={`${styles.stamp} ${styles[`ink_${props.stamp.flag}`]} ${props.class ?? ""}`}
      style={{ "--tilt": `${props.stamp.tilt}deg` }}
      data-stage={props.stage}
      aria-hidden="true"
    >
      <span class={styles.stampTop}>{props.stamp.top}</span>
      <span class={styles.stampPlace}>{props.stamp.place}</span>
      <span class={styles.stampFoot}>{props.stamp.foot}</span>
    </span>
  );
}

export default function ONas() {
  let career!: HTMLElement;
  let rail!: HTMLOListElement;

  // Scroll story: the stage crossing ~60% of the screen height becomes active,
  // its stamp lands in the passport and the rail fills up to it. Without JS or
  // with reduced motion every stamp is already in place and the rail is full.
  onMount(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(rail.children) as HTMLElement[];
    const stamps = Array.from(career.querySelectorAll<HTMLElement>("[data-stage]"));
    let reached = -1;
    const mark = (index: number) => {
      items.forEach((el, i) => el.classList.toggle(styles.active, i === index));
      if (index <= reached) return;
      reached = index;
      items.forEach((el, i) => i <= index && el.classList.add(styles.passed));
      stamps.forEach((el) => Number(el.dataset.stage) <= index && el.classList.add(styles.stamped));
    };

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.6;
      const r = rail.getBoundingClientRect();
      rail.style.setProperty("--fill", Math.min(1, Math.max(0, (line - r.top) / r.height)).toFixed(3));
      // At the very bottom of the page the last stage may never reach the line.
      const atEnd = r.bottom < window.innerHeight * 0.9;
      let index = -1;
      items.forEach((el, i) => el.getBoundingClientRect().top < line && (index = i));
      mark(atEnd ? items.length - 1 : index);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    career.classList.add(styles.live);
    window.addEventListener("scroll", onScroll, { passive: true });
    onCleanup(() => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    });
  });

  return (
    <Layout>
      <SeoHead
        title={`O nas — tynkarz ${OWNER_NAME}`}
        canonical="/o-nas"
        pageType="AboutPage"
        description={`${OWNER_NAME}, właściciel M-TYNK, tynkuje od 1999 roku — w Polsce, na Litwie, w Niemczech i Szwajcarii. Dziś tynki ze szlichtą we Wrocławiu.`}
        dateModified="2026-11-04T00:00:00+00:00"
        aboutOwner
        breadcrumbs={[
          { name: "Strona Główna", href: "/" },
          { name: "O nas" },
        ]}
      />

      <PageHeader
        title={`${OWNER_NAME} — tynkarz od 1999 roku`}
        breadcrumbs={[{ label: "Strona Główna", href: "/" }, { label: "O nas" }]}
        lead={<>Nazywam się {OWNER_NAME} i prowadzę firmę tynkarską M-TYNK. Tynkuję od 1999 roku — pracowałem w Polsce, na Litwie, w Niemczech i w Szwajcarii, a od około 12 lat mieszkam i pracuję we Wrocławiu.</>}
        media={
<PhotoPending name={OWNER_NAME} class={styles.owner} />
        }
      />

      <section class={`section ${styles.career}`} ref={career}>
        <div class={`container ${styles.careerGrid}`}>
          <div class={styles.passportCol}>
            <div class={styles.passport} aria-hidden="true">
              <div class={styles.passportHead}>
                <span>Paszport tynkarza</span>
                <span class={styles.passportNo}>Nr 1999</span>
              </div>
              <dl class={styles.passportFields}>
                <div>
                  <dt>Imię i nazwisko</dt>
                  <dd>{OWNER_NAME}</dd>
                </div>
                <div>
                  <dt>Zawód</dt>
                  <dd>tynkarz</dd>
                </div>
                <div>
                  <dt>W zawodzie od</dt>
                  <dd>1999</dd>
                </div>
                <div>
                  <dt>Kraje</dt>
                  <dd>PL · LT · DE · CH</dd>
                </div>
              </dl>
              <div class={styles.stampGrid}>
                <For each={allStamps}>{(stamp) => <StampMark stamp={stamp} stage={stamp.stage} />}</For>
              </div>
            </div>
          </div>

          <div>
            <h2 class={styles.careerTitle}>Ponad 25 lat w zawodzie tynkarza</h2>
            <ol class={styles.timeline} ref={rail}>
              <For each={stages}>
                {(stage, i) => (
                  <li class={styles.timelineItem}>
                    <span class={styles.marker}>
                      <For each={stage.flags}>{(flag) => <FlagIcon flag={flag} />}</For>
                    </span>
                    <span class={styles.timelineLabel}>{stage.label}</span>
                    <h3>{stage.title}</h3>
                    {stage.content}
                    <div class={styles.inlineStamps}>
                      <For each={stage.stamps}>{(stamp) => <StampMark stamp={stamp} stage={i()} />}</For>
                    </div>
                  </li>
                )}
              </For>
            </ol>
          </div>
        </div>
      </section>

      <section class={`section ${styles.why}`}>
        <div class={`container ${styles.whyGrid}`}>
          <div>
          <h2>Dlaczego wyjeżdżałem za granicę</h2>
          <p>Za granicę wyjeżdżałem przede wszystkim z ciekawości i chęci rozwoju. Chciałem zobaczyć, jak pracuje się w innych krajach, jakie metody tynkowania się tam stosuje i jaką wagę przykłada się do jakości wykonania. Z tych doświadczeń korzystam w swojej pracy do dziś.</p>

          <h2>M-TYNK dzisiaj</h2>
          <p>Obecnie skupiamy się przede wszystkim na tynkowaniu domów jednorodzinnych we Wrocławiu i okolicach. Stawiamy na dokładność i efekt końcowy, bo w naszej pracy liczy się jakość, a nie ilość.</p>
          <p>
            Zobacz nasze <NavLink href="/realizacje">realizacje</NavLink>, przeczytaj, na czym polegają <NavLink href="/tynki-ze-szlichta-pod-malowanie">tynki gipsowe ze szlichtą pod malowanie</NavLink>, albo sprawdź <a href={site.googleReviewsListUrl} target="_blank" rel="noopener noreferrer">{site.googleReviewCount} {opinieLabel(site.googleReviewCount)} w Google (średnia {site.googleRating}/5)</a>.
          </p>
          <div class={styles.ctaRow}>
            <a class="btn btn-primary btn-lg" href={`tel:${site.phoneRaw}`}>Zadzwoń: {site.phone}</a>
            <NavLink class={styles.ctaLink} href="/kontakt">Kontakt i bezpłatna wycena →</NavLink>
          </div>
          </div>
          <blockquote class={`${styles.quote} reveal`}>
            <p>Jakość, nie ilość.</p>
            <cite>— {OWNER_NAME}</cite>
          </blockquote>
        </div>
      </section>
    </Layout>
  );
}
