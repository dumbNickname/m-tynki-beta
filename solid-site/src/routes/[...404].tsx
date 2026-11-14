import Layout from "~/components/Layout";
import SeoHead from "~/components/SeoHead";
import NavLink from "~/components/NavLink";
import BrickWall from "~/components/BrickWall";
import site from "~/data/site.json";
import styles from "./[...404].module.css";

export default function NotFound() {
  return (
    <Layout>
      <SeoHead
        title="Strona nie została znaleziona"
        noindex
        description="Nie znaleziono żądanej strony. Wróć na stronę główną M-TYNK Wrocław."
      />

      <section class={`section ${styles.notFound}`}>
        <div class={`container ${styles.inner}`}>
          <div class={styles.top}>
            <div>
              <span class={styles.code}>404</span>
              <h1>Tej ściany jeszcze nie otynkowaliśmy</h1>
              <p class={styles.lead}>
                Strony, której szukasz, tu nie ma — mogła zostać przeniesiona albo nigdy nie istniała.
                Zanim pójdziesz dalej, możesz przynajmniej tę ścianę doprowadzić do porządku. Albo zadzwoń, a doradzimy.
              </p>

              <div class={styles.actions}>
                <NavLink href="/" class="btn btn-primary">
                  Strona główna
                </NavLink>
                <a href={`tel:${site.phoneRaw}`} class={styles.callLink}>
                  Zadzwoń: {site.phone}
                </a>
              </div>
            </div>
            <BrickWall />
          </div>

          <div class={styles.suggested}>
            <p class={styles.suggestedHeading}>Najczęściej odwiedzane</p>
            <ul>
              <li>
                <NavLink href="/realizacje">Realizacje</NavLink>
                <span>Zdjęcia i opisy ostatnich projektów</span>
              </li>
              <li>
                <NavLink href="/tynki-ze-szlichta-pod-malowanie">Tynki ze szlichtą pod malowanie</NavLink>
                <span>Nasza specjalność — ściana gotowa do malowania</span>
              </li>
              <li>
                <NavLink href="/galeria">Galeria</NavLink>
                <span>Pełen zbiór zdjęć z realizacji</span>
              </li>
              <li>
                <NavLink href="/kontakt">Kontakt</NavLink>
                <span>Telefon, e-mail i mapa dojazdu</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
