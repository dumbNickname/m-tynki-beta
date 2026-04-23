import { Title, Meta, Link } from "@solidjs/meta";
import site from "~/data/site.json";
import navigation from "~/data/navigation.json";
import reviews from "~/data/reviews.json";

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
  datePublished?: string;
  dateModified?: string;
  breadcrumbs?: BreadcrumbItem[];
  faq?: FaqItem[];
}

export default function SeoHead(props: SeoHeadProps) {
  const pageTitle = () => props.title ? `${props.title} - ${site.name}` : site.title;

  const jsonLd = () => {
    const graph: object[] = [];

    graph.push({
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${site.url}/#organization`,
      name: site.title,
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
        latitude: 51.137,
        longitude: 16.978,
      },
      sameAs: [site.facebookUrl, site.instagramUrl],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: (reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1),
        bestRating: "5",
        worstRating: "1",
        ratingCount: reviews.length,
        reviewCount: reviews.length,
      },
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

    graph.push({
      "@type": "SiteNavigationElement",
      "@id": `${site.url}/#navigation`,
      name: navigation.main.map((item) => item.label),
      url: navigation.main
        .filter((item) => !item.href.includes("#"))
        .map((item) => `${site.url}${item.href}`),
    });

    const webPage: Record<string, unknown> = {
      "@type": props.ogType === "article" ? "Article" : "WebPage",
      "@id": props.canonical ? `${site.url}${props.canonical}` : site.url,
      url: props.canonical ? `${site.url}${props.canonical}` : site.url,
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
        "@id": `${props.canonical ? `${site.url}${props.canonical}` : site.url}#breadcrumb`,
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
        "@id": `${props.canonical ? `${site.url}${props.canonical}` : site.url}#faq`,
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
      {props.canonical && (
        <>
          <Link rel="canonical" href={`${site.url}${props.canonical}`} />
          <Meta property="og:url" content={`${site.url}${props.canonical}`} />
        </>
      )}
      <Meta name="twitter:card" content="summary_large_image" />
      {props.dateModified && <Meta property="article:modified_time" content={props.dateModified} />}
      {props.canonical && <Link rel="alternate" hreflang="pl" href={`${site.url}${props.canonical}`} />}
      {props.canonical && <Link rel="alternate" hreflang="x-default" href={`${site.url}${props.canonical}`} />}
      <script type="application/ld+json" innerHTML={jsonLd()} />
    </>
  );
}
