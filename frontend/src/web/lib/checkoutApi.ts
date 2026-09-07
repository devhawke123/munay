const API_BASE_URL: string = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export class CheckoutApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export interface CheckoutRequest {
  customer: { name: string; email: string; phone?: string };
  shipping: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  items: { variantId: string; quantity: number }[];
}

export interface CheckoutResponseItem {
  sku: string;
  productName: string;
  variantLabel: string | null;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface CheckoutResponse {
  orderId: string;
  orderNumber: number;
  total: number;
  createdAt: string;
  items: CheckoutResponseItem[];
}

export async function submitCheckout(data: CheckoutRequest): Promise<CheckoutResponse> {
  const res = await fetch(`${API_BASE_URL}/api/public/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new CheckoutApiError(res.status, body.error ?? res.statusText);
  }

  return res.json() as Promise<CheckoutResponse>;
}
