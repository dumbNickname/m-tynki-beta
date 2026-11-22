// "ok 700 mkw" → { prefix: "ok. ", value: "700" }, printed as "ok. 700 m²".
export function parseArea(raw: string | null | undefined) {
  const m = /^(ok\.?\s*)?(\d+)\s*(mkw|m2|m²)$/i.exec((raw || "").trim());
  return m ? { prefix: m[1] ? "ok. " : "", value: m[2] } : null;
}

export function formatArea(raw: string | null | undefined) {
  const a = parseArea(raw);
  return a ? `${a.prefix}${a.value} m²` : raw || "";
}
