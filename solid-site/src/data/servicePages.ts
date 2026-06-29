export interface ServiceSection {
  heading: string;
  paragraphs: string[];
}

export interface ServicePage {
  slug: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  points: string[];
  sections: ServiceSection[];
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
    sections: [
      {
        heading: "Na czym polega tynkowanie maszynowe?",
        paragraphs: [
          "Tynk maszynowy nakładany jest na ścianę agregatem tynkarskim, który w sposób ciągły miesza suchą zaprawę z wodą i podaje gotową masę pod ciśnieniem prosto na powierzchnię. Dzięki temu zaprawa ma zawsze tę samą, powtarzalną konsystencję, a tynk dokładnie wypełnia podłoże i mocno się z nim wiąże. Maszyna zastępuje najbardziej pracochłonny etap ręcznego narzucania zaprawy, więc duże powierzchnie da się otynkować w znacznie krótszym czasie.",
          "Po nałożeniu warstwy właściwej ściągamy tynk łatą do równego, a następnie wygładzamy go ręcznie — u nas dodatkowo szlichtą gładziolitu. To połączenie wydajności maszyny z ręcznym, dokładnym wykończeniem daje równą ścianę gotową pod malowanie.",
        ],
      },
      {
        heading: "Tynk maszynowy a tynk ręczny — co wybrać?",
        paragraphs: [
          "Przy większych metrażach tynk maszynowy jest zwykle szybszy i bardziej jednolity niż tynk kładziony wyłącznie ręcznie, bo cała ściana powstaje z tej samej, równo wymieszanej zaprawy. Maszynowe podawanie ogranicza też różnice wynikające ze zmęczenia czy tempa pracy. Tynk ręczny pozostaje rozsądnym rozwiązaniem przy małych powierzchniach, trudno dostępnych miejscach i drobnych poprawkach.",
          "W praktyce na jednej budowie często łączymy obie metody: większość ścian i sufitów wykonujemy maszynowo, a detale, naroża i miejsca przy instalacjach dopracowujemy ręcznie. O doborze technologii decydujemy po obejrzeniu zakresu prac i stanu podłoża.",
        ],
      },
      {
        heading: "Tynki maszynowe we Wrocławiu i okolicach",
        paragraphs: [
          "Pracujemy głównie we Wrocławiu i powiecie wrocławskim — w nowych domach jednorodzinnych, mieszkaniach oraz lokalach usługowych. Realizowaliśmy tynki między innymi w Sobótce, Domasławiu, Trzebnicy, Dobrzykowicach i Lutyni, a zakres dojazdu ustalamy indywidualnie po poznaniu lokalizacji inwestycji.",
          "Przed rozpoczęciem prac zabezpieczamy okna, drzwi, instalacje i posadzki, a po zakończeniu zostawiamy ściany przygotowane do dalszego wykończenia. Wycena tynków maszynowych jest bezpłatna i przygotowywana na podstawie powierzchni, stanu budowy i lokalizacji.",
        ],
      },
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
        question: "Ile schnie tynk maszynowy gipsowy?",
        answer: "Czas schnięcia zależy od grubości warstwy, temperatury i wentylacji pomieszczeń. Orientacyjnie przyjmuje się około jednego dnia na każdy milimetr grubości tynku, a do malowania przystępuje się dopiero po pełnym wyschnięciu ścian.",
      },
      {
        question: "Jaką powierzchnię można otynkować maszynowo w ciągu dnia?",
        answer: "Wydajność zależy od ekipy, dostępu do ścian, stanu podłoża i rodzaju pomieszczeń, dlatego realny postęp prac szacujemy dla konkretnej budowy podczas wyceny.",
      },
      {
        question: "Czy trzeba gruntować ściany przed tynkiem maszynowym?",
        answer: "Przygotowanie podłoża dobieramy do rodzaju ściany — chłonne i nierównomiernie nasiąkliwe podłoża zwykle wymagają zagruntowania, aby tynk dobrze się związał i równo wysychał.",
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
    sections: [
      {
        heading: "Dlaczego tynki gipsowe?",
        paragraphs: [
          "Tynk gipsowy daje gładką i równą powierzchnię ścian oraz sufitów, dobrze sprawdzającą się we wnętrzach mieszkalnych. Gips jest materiałem paroprzepuszczalnym, który pomaga regulować wilgotność powietrza w pomieszczeniach, a jednocześnie pozwala uzyskać estetyczne wykończenie bez grubych warstw dodatkowych mas.",
          "W naszym wykonaniu tynk gipsowy nakładamy maszynowo, a potem wygładzamy szlichtą gładziolitu. Taka ściana po wyschnięciu jest przygotowana bezpośrednio pod malowanie, więc w wielu przypadkach nie trzeba nakładać osobnej, kosztownej warstwy gładzi.",
        ],
      },
      {
        heading: "Tynk gipsowy a tynk cementowo-wapienny",
        paragraphs: [
          "Tynk gipsowy najlepiej sprawdza się w suchych pomieszczeniach mieszkalnych — pokojach, sypialniach, korytarzach — gdzie zależy nam na gładkiej powierzchni i komforcie wykończenia. Tynk cementowo-wapienny jest bardziej odporny na wilgoć i mechaniczne uszkodzenia, dlatego częściej stosuje się go w pomieszczeniach narażonych na zawilgocenie oraz na niektórych powierzchniach technicznych.",
          "Wybór technologii zależy od przeznaczenia pomieszczenia, oczekiwanego efektu i budżetu. Podczas wyceny doradzamy, które rozwiązanie będzie lepsze dla konkretnego wnętrza, i wskazujemy, gdzie tynk gipsowy ze szlichtą da najlepszy stosunek jakości do ceny.",
        ],
      },
      {
        heading: "Tynki gipsowe we Wrocławiu",
        paragraphs: [
          "Tynki gipsowe wykonujemy we Wrocławiu i okolicach — w domach jednorodzinnych, mieszkaniach oraz lokalach. Przed rozpoczęciem prac oceniamy stan podłoża i dobieramy sposób jego przygotowania, aby tynk dobrze się związał i równomiernie wysychał.",
          "Efektem jest gładka, estetyczna ściana gotowa do malowania. Wycenę tynków gipsowych przygotowujemy bezpłatnie na podstawie powierzchni, stanu budowy i lokalizacji inwestycji.",
        ],
      },
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
        question: "Czy tynk gipsowy nadaje się do łazienki i kuchni?",
        answer: "W pomieszczeniach okresowo wilgotnych tynk gipsowy bywa stosowany, ale w strefach narażonych na bezpośredni kontakt z wodą oraz w pomieszczeniach mokrych lepiej sprawdzają się tynki bardziej odporne na wilgoć. Dobór rozwiązania ustalamy dla konkretnego wnętrza.",
      },
      {
        question: "Czym różni się tynk gipsowy od gładzi gipsowej?",
        answer: "Tynk gipsowy to warstwa wyrównująca nakładana na surową ścianę, a gładź to cienka warstwa wykończeniowa. Dzięki wykończeniu szlichtą wygładzającą nasz tynk gipsowy w wielu przypadkach pełni obie role i ścianę można malować bez osobnej gładzi.",
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
    sections: [
      {
        heading: "Firma tynkarska M-TYNK — od 1999 roku",
        paragraphs: [
          "M-TYNK to firma tynkarska działająca we Wrocławiu nieprzerwanie od 1999 roku. Przez ten czas wykonaliśmy tynki w wielu domach jednorodzinnych, mieszkaniach i lokalach usługowych — między innymi w Sobótce, Domasławiu, Trzebnicy, Dobrzykowicach i Lutyni. Doświadczenie zebrane na różnych budowach pozwala nam dobrać technologię do konkretnego podłoża i oczekiwań inwestora.",
          "Naszą specjalnością są tynki gipsowe ze szlichtą wygładzającą pod malowanie. Stawiamy na dokładne wykończenie i powtarzalną jakość, a nie na maksymalne tempo kosztem efektu — tak, aby ściany po wyschnięciu były naprawdę gotowe do malowania.",
        ],
      },
      {
        heading: "Jak pracujemy?",
        paragraphs: [
          "Pracę zaczynamy od obejrzenia zakresu robót i zabezpieczenia budowy — okien, drzwi, instalacji i posadzek. Następnie wykonujemy właściwe tynkowanie, najczęściej maszynowo, i wygładzamy powierzchnię szlichtą gładziolitu. Przed rozpoczęciem prac ustalamy zakres, technologię i warunki, aby uniknąć nieporozumień w trakcie realizacji.",
          "Zależy nam na jasnej komunikacji: tłumaczymy, dlaczego proponujemy dane rozwiązanie i czego inwestor może się spodziewać na kolejnych etapach. Na stronie publikujemy realizacje, a po kontakcie telefonicznym możemy też umówić wizytę na aktualnej budowie, jeśli jest taka możliwość.",
        ],
      },
      {
        heading: "Zakres usług i obszar działania",
        paragraphs: [
          "Oprócz tynków gipsowych ze szlichtą oferujemy także tynki maszynowe, gładź natryskową, zabudowy z płyt karton-gipsowych oraz natryskowe malowanie ścian. Dzięki temu na jednej budowie możemy zająć się wykończeniem ścian od tynku aż po malowanie.",
          "Najczęściej pracujemy w nowych domach jednorodzinnych i mieszkaniach, ale realizujemy też tynki w lokalach usługowych i mniejszych obiektach. Zakres prac dopasowujemy do etapu budowy — od surowego stanu deweloperskiego po pojedyncze pomieszczenia wymagające wykończenia.",
          "Działamy we Wrocławiu i powiecie wrocławskim, a w uzasadnionych przypadkach również w dalszych okolicach. Wycena i doradztwo technologiczne są bezpłatne — wystarczy kontakt telefoniczny i kilka informacji o inwestycji.",
        ],
      },
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
        question: "Od kiedy działa firma M-TYNK?",
        answer: "M-TYNK działa we Wrocławiu od 1999 roku i przez ten czas zrealizował tynki w wielu domach, mieszkaniach i lokalach w mieście oraz okolicznych miejscowościach.",
      },
      {
        question: "Czy firma M-TYNK wykonuje także gładzie i malowanie?",
        answer: "W ofercie mamy między innymi tynki gipsowe ze szlichtą, gładź natryskową, zabudowy G-K oraz natryskowe malowanie ścian.",
      },
      {
        question: "Jak umówić bezpłatną wycenę?",
        answer: "Wystarczy zadzwonić i podać lokalizację inwestycji, przybliżoną powierzchnię oraz etap budowy. Na tej podstawie przygotowujemy indywidualną, bezpłatną wycenę.",
      },
    ],
  },
];

export const getServicePage = (slug: string) => servicePages.find((page) => page.slug === slug);
