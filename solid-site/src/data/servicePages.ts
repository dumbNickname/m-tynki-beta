export interface ServicePage {
  slug: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  points: string[];
  faq: { question: string; answer: string }[];
}

export const servicePages: ServicePage[] = [
  {
    slug: "tynki-maszynowe-wroclaw",
    title: "Tynki maszynowe Wrocław",
    h1: "Tynki maszynowe Wrocław",
    description: "Tynki maszynowe Wrocław i okolice. M-TYNK wykonuje tynki gipsowe maszynowe ze szlichtą pod malowanie od 1999 roku. Bezpłatna wycena.",
    intro: "Wykonujemy tynki maszynowe we Wrocławiu i okolicach dla domów jednorodzinnych, mieszkań oraz obiektów użytkowych. Specjalizujemy się w tynkach gipsowych wykańczanych szlichtą wygładzającą, dzięki czemu ściany po wyschnięciu są przygotowane bezpośrednio pod malowanie.",
    points: [
      "tynki maszynowe gipsowe z wykończeniem pod malowanie",
      "prace w domach jednorodzinnych, mieszkaniach i lokalach usługowych",
      "zabezpieczenie stolarki, instalacji i elementów narażonych na zabrudzenie",
      "obsługa Wrocławia oraz miejscowości w powiecie wrocławskim",
    ],
    faq: [
      {
        question: "Czy wykonujecie tynki maszynowe tylko we Wrocławiu?",
        answer: "Najczęściej pracujemy we Wrocławiu i najbliższych okolicach, ale zakres dojazdu ustalamy indywidualnie po poznaniu lokalizacji inwestycji.",
      },
      {
        question: "Czy tynki maszynowe są gotowe pod malowanie?",
        answer: "W naszej metodzie tynk gipsowy jest wykańczany szlichtą wygładzającą, dlatego po wyschnięciu ściany są przygotowane bezpośrednio pod malowanie bez osobnej warstwy gładzi.",
      },
      {
        question: "Jak zamówić wycenę tynków maszynowych?",
        answer: "Najprościej zadzwonić i podać lokalizację, przybliżoną powierzchnię oraz etap budowy. Wycena jest bezpłatna i przygotowywana indywidualnie.",
      },
    ],
  },
  {
    slug: "tynki-gipsowe-wroclaw",
    title: "Tynki gipsowe Wrocław",
    h1: "Tynki gipsowe Wrocław",
    description: "Tynki gipsowe Wrocław ze szlichtą wygładzającą pod malowanie. Równe ściany, estetyczne wykończenie i bezpłatna wycena M-TYNK.",
    intro: "Tynki gipsowe to dobre rozwiązanie do wnętrz, w których liczy się równa, estetyczna i gładka powierzchnia. M-TYNK wykonuje tynki gipsowe we Wrocławiu w technologii maszynowej, a następnie wykańcza je szlichtą wygładzającą.",
    points: [
      "gładka powierzchnia ścian i sufitów",
      "wykończenie ograniczające potrzebę dodatkowej gładzi",
      "doradztwo przy przygotowaniu podłoża i wyborze materiału",
      "doświadczenie w tynkowaniu od 1999 roku",
    ],
    faq: [
      {
        question: "Gdzie sprawdzają się tynki gipsowe?",
        answer: "Tynki gipsowe stosuje się głównie wewnątrz budynków: w domach, mieszkaniach, lokalach i obiektach użytkowych, gdzie ważna jest gładka powierzchnia ścian.",
      },
      {
        question: "Czy po tynku gipsowym trzeba nakładać gładź?",
        answer: "Przy standardowym tynku często jest to konieczne. Nasze tynki wykańczamy szlichtą wygładzającą, co pozwala przygotować ścianę bezpośrednio pod malowanie.",
      },
      {
        question: "Od czego zależy cena tynków gipsowych?",
        answer: "Cena zależy od powierzchni, stanu podłoża, zakresu zabezpieczeń, lokalizacji i szczegółów inwestycji. Dlatego przygotowujemy indywidualną wycenę.",
      },
    ],
  },
  {
    slug: "firma-tynkarska-wroclaw",
    title: "Firma tynkarska Wrocław",
    h1: "Firma tynkarska Wrocław",
    description: "Firma tynkarska Wrocław M-TYNK. Tynki maszynowe, tynki gipsowe ze szlichtą, gładź natryskowa i wykończenie ścian pod malowanie.",
    intro: "M-TYNK to firma tynkarska z Wrocławia działająca od 1999 roku. Pomagamy inwestorom uzyskać równe, estetyczne ściany przygotowane pod malowanie, dbając o dokładność, zabezpieczenie budowy i jasną komunikację przed rozpoczęciem prac.",
    points: [
      "specjalizacja w tynkach gipsowych ze szlichtą wygładzającą",
      "realizacje w nowych domach, mieszkaniach i obiektach usługowych",
      "możliwość obejrzenia aktualnej budowy po wcześniejszym kontakcie",
      "bezpłatna wycena i doradztwo technologiczne",
    ],
    faq: [
      {
        question: "Jak wybrać firmę tynkarską we Wrocławiu?",
        answer: "Warto sprawdzić realizacje, opinie klientów, specjalizację wykonawcy oraz to, czy firma jasno opisuje technologię prac i sposób zabezpieczenia budowy.",
      },
      {
        question: "Czy można zobaczyć wcześniejsze realizacje M-TYNK?",
        answer: "Tak. Na stronie publikujemy realizacje, a po kontakcie telefonicznym możemy też umówić wizytę na aktualnej budowie, jeśli jest taka możliwość.",
      },
      {
        question: "Czy firma M-TYNK wykonuje także gładzie i malowanie?",
        answer: "W ofercie mamy między innymi tynki gipsowe ze szlichtą, gładź natryskową, zabudowy G-K oraz natryskowe malowanie ścian.",
      },
    ],
  },
];

export const getServicePage = (slug: string) => servicePages.find((page) => page.slug === slug);
