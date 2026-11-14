// Polish plural: 1 → one, 2–4 (not 12–14) → few, everything else → many.
export function plural(n: number, one: string, few: string, many: string) {
  const lastTwo = n % 100;
  const last = n % 10;
  if (n === 1) return one;
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return few;
  return many;
}

export const opinieLabel = (n: number) => plural(n, "opinia", "opinie", "opinii");
export const realizacjeLabel = (n: number) => plural(n, "realizacja", "realizacje", "realizacji");
export const zdjeciaLabel = (n: number) => plural(n, "zdjęcie", "zdjęcia", "zdjęć");
