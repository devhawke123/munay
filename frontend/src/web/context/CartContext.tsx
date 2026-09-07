import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartLine = {
  variantId: string;
  productId: string;
  sku: string;
  name: string;
  image?: string;
  color: string;
  size: string;
  unitPrice: number;
  quantity: number;
  // Client-side cap only, read from the product's cached stock at add-to-cart time — the
  // checkout endpoint is the real, authoritative stock check.
  availableQty: number;
};

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  subtotal: number;
  addItem: (line: Omit<CartLine, "quantity">, quantity: number) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "munay-cart";

function readStoredCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>(readStoredCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ponytail: storage can throw (private mode, quota) — cart just won't persist that write
    }
  }, [items]);

  function addItem(line: Omit<CartLine, "quantity">, quantity: number) {
    setItems((current) => {
      const existing = current.find((i) => i.variantId === line.variantId);
      if (existing) {
        const nextQty = Math.min(existing.availableQty, existing.quantity + quantity);
        return current.map((i) => (i.variantId === line.variantId ? { ...i, quantity: nextQty } : i));
      }
      return [...current, { ...line, quantity: Math.min(line.availableQty, quantity) }];
    });
  }

  function updateQuantity(variantId: string, quantity: number) {
    setItems((current) =>
      current
        .map((i) =>
          i.variantId === variantId ? { ...i, quantity: Math.max(0, Math.min(i.availableQty, quantity)) } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  }

  function removeItem(variantId: string) {
    setItems((current) => current.filter((i) => i.variantId !== variantId));
  }

  function clear() {
    setItems([]);
  }

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
    return { items, itemCount, subtotal, addItem, updateQuantity, removeItem, clear };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
