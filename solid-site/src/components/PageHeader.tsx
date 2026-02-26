import { A } from "@solidjs/router";

interface PageHeaderProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function PageHeader(props: PageHeaderProps) {
  return (
    <section class="page-header">
      <div class="container">
        {props.breadcrumbs && (
          <nav class="breadcrumbs" aria-label="Ścieżka nawigacji">
            {props.breadcrumbs.map((crumb, i) => (
              <>
                {i > 0 && <span class="breadcrumb-sep"> » </span>}
                {crumb.href ? (
                  <A href={crumb.href}>{crumb.label}</A>
                ) : (
                  <span aria-current="page">{crumb.label}</span>
                )}
              </>
            ))}
          </nav>
        )}
        <h1>{props.title}</h1>
      </div>
    </section>
  );
}
