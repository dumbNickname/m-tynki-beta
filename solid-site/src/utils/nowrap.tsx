// Keeps standard numbers like "PN-B-10110" on one line (they break at the hyphens).
export function keepCodes(text: string) {
  return text.split(/(PN-B-\d+)/).map((part, i) => (i % 2 ? <span class="nowrap">{part}</span> : part));
}
