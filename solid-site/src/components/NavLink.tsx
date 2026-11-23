import type { JSX } from "@solidjs/web";
import { basePath } from "~/utils/base";
import { withTrailingSlash } from "~/utils/url";

interface NavLinkProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export default function NavLink(props: NavLinkProps) {
  const resolvedHref = () => {
    const h = props.href;
    if (h.startsWith("http") || h.startsWith("mailto:") || h.startsWith("tel:")) return h;
    if (h.startsWith("#")) return h;
    return basePath + withTrailingSlash(h);
  };

  return (
    <a {...props} href={resolvedHref()}>
      {props.children}
    </a>
  );
}
