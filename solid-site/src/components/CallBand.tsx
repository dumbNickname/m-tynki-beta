import site from "~/data/site.json";
import styles from "./CallBand.module.css";

// Green "call us" band at the end of listing pages, matching the homepage CTA.
export default function CallBand(props: { title: string; text: string }) {
  return (
    <section class={`section ${styles.band}`}>
      <div class={`container ${styles.inner}`}>
        <div>
          <h2>{props.title}</h2>
          <p>{props.text}</p>
        </div>
        <a class={`btn btn-lg ${styles.btn}`} href={`tel:${site.phoneRaw}`}>
          {site.phone}
        </a>
      </div>
    </section>
  );
}
