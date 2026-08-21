const COLOR_SWATCHES: Record<string, string> = {
  Ivory: "#f1ece1",
  Camel: "#c19a6b",
  Terracotta: "#b1502f",
  Slate: "#5f6a72",
  Black: "#1a1a1a",
  "Fuchsia & Blue": "linear-gradient(135deg, #d6499b 0%, #2f6bd6 100%)",
  "Coral & Red": "linear-gradient(135deg, #e8b39a 0%, #c8433a 100%)",
  "Stone Gray": "linear-gradient(135deg, #cfc9c0 0%, #8a827a 100%)",
};

export function swatchColor(name: string): string {
  return COLOR_SWATCHES[name] ?? "#cfc9c0";
}

export function isSwatchGradient(name: string): boolean {
  return swatchColor(name).startsWith("linear-gradient");
}
