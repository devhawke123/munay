export function parseCurrency(value: string): number {
  return Number(value.replace(/[^0-9.-]/g, "")) || 0;
}

export function formatCurrency(value: number): string {
  return `CHF ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
