function flattenToText(value) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(flattenToText).join(" ");
  if (typeof value === "object") {
    if (value.parts) return flattenToText(value.parts);
    if (value.quote?.parts) return flattenToText(value.quote.parts);
    if (value.images) return "";
  }
  return "";
}

export function estimateReadTimeMinutes(essay) {
  const text = [essay.title, essay.excerpt, essay.lede, essay.paragraphs]
    .map(flattenToText)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = text ? text.split(" ").length : 0;
  return Math.max(1, Math.round(wordCount / 220));
}
