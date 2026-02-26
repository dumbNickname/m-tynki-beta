import { Title, Meta, Link } from "@solidjs/meta";
import site from "~/data/site.json";

interface SeoHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

export default function SeoHead(props: SeoHeadProps) {
  const pageTitle = () => props.title ? `${props.title} - ${site.title}` : site.title;

  return (
    <>
      <Title>{pageTitle()}</Title>
      <Meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <Meta name="google-site-verification" content={site.googleSiteVerification} />
      {props.description && <Meta name="description" content={props.description} />}
      <Meta property="og:locale" content="pl_PL" />
      <Meta property="og:type" content={props.ogType || "website"} />
      <Meta property="og:title" content={pageTitle()} />
      {props.description && <Meta property="og:description" content={props.description} />}
      <Meta property="og:site_name" content={site.title} />
      {props.ogImage && <Meta property="og:image" content={`${site.url}${props.ogImage}`} />}
      {props.canonical && (
        <>
          <Link rel="canonical" href={`${site.url}${props.canonical}`} />
          <Meta property="og:url" content={`${site.url}${props.canonical}`} />
        </>
      )}
      <Meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
