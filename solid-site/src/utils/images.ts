export function toThumb(src: string): string {
  const withoutExt = src.replace(/\.[^.]+$/, "");
  if (src.startsWith("images/")) {
    return "images/thumbs/" + withoutExt.slice("images/".length) + ".jpg";
  }
  return "images/thumbs/" + withoutExt + ".jpg";
}
