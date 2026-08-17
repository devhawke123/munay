type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

const orders: {
  id: string;
  customer: string;
  items: string;
  status: OrderStatus;
  amount: string;
  date: string;
}[] = [
  { id: "#12345", customer: "Emily ", items: "2 items", status: "Processing", amount: "$259.00", date: "24 May" },
  { id: "#12345", customer: "Emily", items: "2 items", status: "Shipped", amount: "$259.00", date: "24 May" },
  { id: "#12345", customer: "Emily", items: "2 items", status: "Delivered", amount: "$259.00", date: "24 May" },
  { id: "#12345", customer: "Emily", items: "2 items", status: "Cancelled", amount: "$259.00", date: "24 May" },
  { id: "#12345", customer: "Emily", items: "2 items", status: "Processing", amount: "$259.00", date: "24 May" },
];

const statusStyles: Record<OrderStatus, string> = {
  Processing: "bg-[#FEF3E2] text-[#EA580C]",
  Shipped: "bg-[#EFF6FF] text-[#2563EB]",
  Delivered: "bg-[#F0FDF4] text-[#16A34A]",
  Cancelled: "bg-[#FEF2F2] text-[#DC2626]",
};

export function RecentOrders() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#E8E6E1] bg-white p-3">
      <div className="mb-1 flex shrink-0 items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">Recent Orders</h3>
        <a href="#" className="text-xs font-medium text-[#8B5A2B]">
          View All →
        </a>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="text-xs text-gray-400">
            <th className="pb-1 font-medium">ORDER</th>
            <th className="pb-1 font-medium">CUSTOMER</th>
            <th className="pb-1 font-medium">ITEMS</th>
            <th className="pb-1 font-medium">STATUS</th>
            <th className="pb-1 font-medium">AMOUNT</th>
            <th className="pb-1 font-medium">DATE</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="border-t border-[#F0F0F0] text-xs">
              <td className="py-1.5 font-medium text-[#8B5A2B]">{order.id}</td>
              <td className="py-1.5 text-gray-700">{order.customer}</td>
              <td className="py-1.5 text-gray-500">{order.items}</td>
              <td className="py-1.5">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusStyles[order.status]}`}
                >
                  • {order.status}
                </span>
              </td>
              <td className="py-1.5 text-gray-700">{order.amount}</td>
              <td className="py-1.5 text-gray-400">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
