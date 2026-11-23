import type { JSX } from "@solidjs/web";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import CookieBanner from "./CookieBanner";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout(props: LayoutProps) {
  return (
    <div class="site">
      <a class="skip-link" href="#content">Przejdź do treści</a>
      <Header />
      <main id="content">{props.children}</main>
      <Footer />
      <ScrollToTop />
      <CookieBanner />
    </div>
  );
}
