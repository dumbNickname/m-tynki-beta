import { Title, Meta, Link } from "@solidjs/meta";
import site from "~/data/site.json";
import reviews from "~/data/reviews.json";
import { withTrailingSlash } from "~/utils/url";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface SeoHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  pageType?: "ContactPage" | "AboutPage" | "ImageGallery";
  datePublished?: string;
  dateModified?: string;
  breadcrumbs?: BreadcrumbItem[];
  faq?: FaqItem[];
}

export default function SeoHead(props: SeoHeadProps) {
  const pageTitle = () => props.title ? `${props.title} - ${site.name}` : site.title;
  const canonicalPath = () => props.canonical ? withTrailingSlash(props.canonical) : undefined;

  const jsonLd = () => {
    const graph: object[] = [];

    graph.push({
      "@type": ["Organization", "HomeAndConstructionBusiness"],
      "@id": `${site.url}/#organization`,
      name: site.name,
      alternateName: site.title,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/${site.logo}`,
      },
      image: `${site.url}/${site.logo}`,
      telephone: site.phone,
      email: site.email,
      priceRange: "$$",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: site.phone,
        contactType: "customer service",
        areaServed: "PL",
        availableLanguage: "Polish",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Obornicka 77C/4A",
        addressLocality: "Wrocław",
        postalCode: "51-114",
        addressCountry: "PL",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 51.1403259,
        longitude: 17.0283809,
      },
      hasMap: "https://www.google.com/maps/place/?q=place_id:ChIJreagzIzpD0cRAlXgmSCeWFg",
      foundingDate: "1999",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      areaServed: [
        { "@type": "City", name: "Wrocław" },
        { "@type": "AdministrativeArea", name: "Powiat wrocławski" },
        { "@type": "City", name: "Sobótka" },
        { "@type": "City", name: "Trzebnica" },
        { "@type": "City", name: "Oława" },
        { "@type": "City", name: "Długołęka" },
        { "@type": "City", name: "Miękinia" },
        { "@type": "City", name: "Domasław" },
        { "@type": "City", name: "Dobrzykowice" },
        { "@type": "City", name: "Lutynia" },
      ],
      sameAs: [
        site.facebookUrl,
        site.instagramUrl,
        "https://www.google.com/maps/place/?q=place_id:ChIJreagzIzpD0cRAlXgmSCeWFg",
        "https://maps.google.com/?cid=6365008272716023554",
        site.googleReviewUrl,
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: (reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1),
        bestRating: "5",
        worstRating: "1",
        ratingCount: reviews.length,
        reviewCount: reviews.length,
      },
      review: reviews.map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.name },
        datePublished: r.date,
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.stars,
          bestRating: "5",
          worstRating: "1",
        },
        reviewBody: r.text,
      })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Usługi tynkarskie",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tynki gipsowe ze szlichtą wygładzającą pod malowanie" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gładź natryskowa" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tynki gipsowe" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Zabudowy z płyt karton-gipsowych" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Natryskowe malowanie ścian" } },
        ],
      },
    });

    graph.push({
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.title,
      description: site.description,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "pl-PL",
    });

    const baseWebPageType = props.ogType === "article" ? "Article" : "WebPage";
    const webPage: Record<string, unknown> = {
      "@type": props.pageType ? [baseWebPageType, props.pageType] : baseWebPageType,
      "@id": canonicalPath() ? `${site.url}${canonicalPath()}` : site.url,
      url: canonicalPath() ? `${site.url}${canonicalPath()}` : site.url,
      name: pageTitle(),
      isPartOf: { "@id": `${site.url}/#website` },
      ...(props.ogType === "article"
        ? { author: { "@id": `${site.url}/#organization` }, publisher: { "@id": `${site.url}/#organization` } }
        : { about: { "@id": `${site.url}/#organization` } }),
      inLanguage: "pl-PL",
    };

    if (props.description) {
      webPage.description = props.description;
    }
    if (props.datePublished) {
      webPage.datePublished = props.datePublished;
    }
    if (props.dateModified) {
      webPage.dateModified = props.dateModified;
    }
    if (props.ogImage) {
      webPage.primaryImageOfPage = {
        "@type": "ImageObject",
        url: `${site.url}/${props.ogImage}`,
      };
    }

    graph.push(webPage);

    if (props.breadcrumbs && props.breadcrumbs.length > 0) {
      graph.push({
        "@type": "BreadcrumbList",
        "@id": `${canonicalPath() ? `${site.url}${canonicalPath()}` : site.url}#breadcrumb`,
        itemListElement: props.breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          ...(item.href ? { item: `${site.url}${item.href}` } : {}),
        })),
      });
    }

    if (props.faq && props.faq.length > 0) {
      graph.push({
        "@type": "FAQPage",
        "@id": `${canonicalPath() ? `${site.url}${canonicalPath()}` : site.url}#faq`,
        mainEntity: props.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      });
    }

    return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
  };

  return (
    <>
      <Title>{pageTitle()}</Title>
      <Meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      {props.description && <Meta name="description" content={props.description} />}
      <Meta property="og:locale" content="pl_PL" />
      <Meta property="og:type" content={props.ogType || "website"} />
      <Meta property="og:title" content={pageTitle()} />
      {props.description && <Meta property="og:description" content={props.description} />}
      <Meta property="og:site_name" content={site.title} />
      {props.ogImage && <Meta property="og:image" content={`${site.url}/${props.ogImage}`} />}
      {props.ogImage && <Meta property="og:image:width" content="1200" />}
      {props.ogImage && <Meta property="og:image:height" content="630" />}
      {canonicalPath() && (
        <>
          <Link rel="canonical" href={`${site.url}${canonicalPath()}`} />
          <Meta property="og:url" content={`${site.url}${canonicalPath()}`} />
        </>
      )}
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={pageTitle()} />
      {props.description && <Meta name="twitter:description" content={props.description} />}
      {props.dateModified && <Meta property="article:modified_time" content={props.dateModified} />}
      {canonicalPath() && <Link rel="alternate" hreflang="pl" href={`${site.url}${canonicalPath()}`} />}
      {canonicalPath() && <Link rel="alternate" hreflang="x-default" href={`${site.url}${canonicalPath()}`} />}
      <script type="application/ld+json" innerHTML={jsonLd()} />
    </>
  );
}
