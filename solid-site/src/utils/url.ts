/**
 * Append a trailing slash to a path unless:
 * - it's the root "/"
 * - it already ends with "/"
 * - it's an external URL (http://, https://, mailto:, tel:)
 * - it contains "#" or "?" (hash anchors / query strings)
 *
 * The hash/query carve-out is intentionally simple per the C-i decision
 * in the audit grill session — we treat any path with "#" or "?" as
 * already-normalized and skip it. If we later need to slash the
 * pathname while preserving hash/query, swap to a URL-parse-based
 * variant (the C-ii option).
 */
export function withTrailingSlash(path: string): string {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("mailto:") || path.startsWith("tel:")) return path;
  if (path.includes("#") || path.includes("?")) return path;
  if (path === "/" || path.endsWith("/")) return path;
  return path + "/";
}
