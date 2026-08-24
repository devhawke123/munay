const COLOR_SWATCHES: Record<string, string> = {
  Ivory: "#f3ede0",
  Camel: "#c19a6b",
  Natural: "#e8ddc7",
  Charcoal: "#36393f",
  Espresso: "#4b3221",
  Oatmeal: "#d8cdb8",
  Terracotta: "#c1673f",
  Cream: "#f5ebd8",
  Mocha: "#7b5642",
  Blue: "#4a6fa5",
  Black: "#1a1a1a",
  Grey: "#9ca3af",
  Beige: "#e3d5b8",
  Mustard: "#c9973a",
};

export function getColorSwatch(color: string): string {
  return COLOR_SWATCHES[color] ?? "#c9973a";
}
