export type LiveDeduction = {
  id: string;
  product: string;
  variantLabel: string;
  orderNumber: string;
  amount: number;
  timestamp: number;
};

const now = Date.now();

export const initialLiveDeductions: LiveDeduction[] = [
  {
    id: "ld-1",
    product: "Silk Scarf — Geometric",
    variantLabel: "Camel · OS",
    orderNumber: "#MU-4820",
    amount: -2,
    timestamp: now - 11 * 60 * 1000,
  },
  {
    id: "ld-2",
    product: "Women's Alpaca Cardigan",
    variantLabel: "Blue · M",
    orderNumber: "#MU-4818",
    amount: -1,
    timestamp: now - 34 * 60 * 1000,
  },
  {
    id: "ld-3",
    product: "Alpaca Plush Cushion",
    variantLabel: "Cream · OS",
    orderNumber: "#MU-4815",
    amount: -3,
    timestamp: now - 60 * 60 * 1000,
  },
  {
    id: "ld-4",
    product: "Merino Shawl — Natural",
    variantLabel: "Natural · OS",
    orderNumber: "#MU-4809",
    amount: -1,
    timestamp: now - 2 * 60 * 60 * 1000,
  },
];

export function formatTimeAgo(timestamp: number): string {
  const diffMs = Date.now() - timestamp;
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}
