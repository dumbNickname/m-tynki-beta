import { createSignal, For } from "solid-js";
import styles from "./WallSection.module.css";

// Exploded cross-section of a wall ready for painting. The layers slide apart
// when the diagram scrolls into view (motion.ts adds .is-in); without JS, or
// with reduced motion, it simply shows the exploded view.
const layers = [
  {
    name: "Mur",
    note: "cegła, pustak, silikat, beton komórkowy",
    text: "Podłoże jest nierówne i w różnych miejscach różnie chłonie wodę, dlatego nigdy nie maluje się go bezpośrednio.",
  },
  {
    name: "Grunt pod tynk",
    note: "dobierany do podłoża",
    text: "Wyrównuje chłonność muru, żeby tynk dobrze się związał i równo wysychał. Na gładkim betonie stosuje się grunt z kruszywem, który daje tynkowi przyczepność.",
  },
  {
    name: "Tynk gipsowy maszynowy",
    note: "zwykle ok. 10–15 mm",
    text: "Główna warstwa: natryskiwana agregatem, ściągana łatą i zacierana. To ona wyrównuje krzywizny muru i prowadzi ściany w pionie.",
  },
  {
    name: "Szlichta wygładzająca",
    note: "cienka warstwa z gładziolitu",
    text: "Ostatnia warstwa tynku, która domyka pory i wygładza powierzchnię. Dzięki niej w typowych pomieszczeniach nie trzeba robić osobnej gładzi.",
  },
  {
    name: "Grunt i farba",
    note: "po wyschnięciu tynku",
    text: "Grunt pod farbę i zwykle dwie warstwy farby. Możesz malować sam, z własnym malarzem albo zlecić nam malowanie natryskowe.",
  },
];

export default function WallSection() {
  // Touch screens have no hover: a tap on a layer (or its description) lights
  // up the pair instead, and a tap on the diagram brings the description into view.
  const [active, setActive] = createSignal(0);
  let list!: HTMLOListElement;
  const tap = (n: number, fromDiagram: boolean) => {
    if (!window.matchMedia("(hover: none)").matches) return;
    setActive(active() === n ? 0 : n);
    if (fromDiagram && active()) {
      list.querySelector(`[data-l="${n}"]`)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  };
  return (
    <figure class={styles.wrap} data-active={active() || undefined}>
      <div class={`${styles.diagram} reveal`} aria-hidden="true">
        <For each={layers}>
          {(_, i) => (
            <div class={styles.band} data-l={i() + 1} onClick={() => tap(i() + 1, true)}>
              <span class={styles.badge}>{i() + 1}</span>
            </div>
          )}
        </For>
        <span class={styles.room}>pokój</span>
      </div>

      <ol class={styles.list} ref={list}>
        <For each={layers}>
          {(layer, i) => (
            <li class={styles.item} data-l={i() + 1} onClick={() => tap(i() + 1, false)}>
              <span class={styles.itemNo} aria-hidden="true">{i() + 1}</span>
              <h3>{layer.name}</h3>
              <p class={styles.note}>{layer.note}</p>
              <p>{layer.text}</p>
            </li>
          )}
        </For>
      </ol>

      <figcaption class={styles.caption}>
        Schemat poglądowy, grubości warstw nie są w skali. Rzeczywista grubość tynku zależy od tego, jak równy jest mur.
      </figcaption>
    </figure>
  );
}
