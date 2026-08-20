const COLOR_SWATCHES: Record<string, string> = {
  Ivory: "#f1ece1",
  Camel: "#c19a6b",
  Terracotta: "#b1502f",
  Slate: "#5f6a72",
  Black: "#1a1a1a",
};

export function swatchColor(name: string): string {
  return COLOR_SWATCHES[name] ?? "#cfc9c0";
}
