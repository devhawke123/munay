import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { orders as seedOrders } from "../data/orders";
import type { OrderRow } from "../types/order";

type OrdersContextValue = {
  orders: OrderRow[];
  updateOrder: (order: OrderRow) => void;
};

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<OrderRow[]>(seedOrders);

  const value = useMemo(
    () => ({
      orders,
      updateOrder: (updated: OrderRow) =>
        setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o))),
    }),
    [orders],
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within an OrdersProvider");
  return ctx;
}
