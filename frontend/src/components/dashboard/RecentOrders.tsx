const orders = [
  { id: "#12345", customer: "Emily ", items: "2 items", status: "Processing", amount: "$259.00", date: "24 May" },
  { id: "#12345", customer: "Emily", items: "2 items", status: "Shipped", amount: "$259.00", date: "24 May" },
  { id: "#12345", customer: "Emily", items: "2 items", status: "Delivered", amount: "$259.00", date: "24 May" },
  { id: "#12345", customer: "Emily", items: "2 items", status: "Cancelled", amount: "$259.00", date: "24 May" },
  { id: "#12345", customer: "Emily", items: "2 items", status: "Processing", amount: "$259.00", date: "24 May" },
];

const statusStyles: Record<string, string> = {
  Processing: "bg-[#FEF3E2] text-[#EA580C]",
  Shipped: "bg-[#EFF6FF] text-[#2563EB]",
  Delivered: "bg-[#F0FDF4] text-[#16A34A]",
  Cancelled: "bg-[#FEF2F2] text-[#DC2626]",
};

export function RecentOrders() {
  return (
    <div className="bg-white border border-[#E8E6E1] rounded-xl p-6 max-w-[99%] -ml-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-gray-900">Recent Orders</h3>
        <a href="#" className="text-xs font-medium text-[#8B5A2B]">
          View All →
        </a>
      </div>

      {/* Table */}
      <table className="w-full text-left">
        <thead>
          <tr className="text-xs text-gray-400">
            <th className="font-medium pb-1.5">ORDER</th>
            <th className="font-medium pb-1.5">CUSTOMER</th>
            <th className="font-medium pb-1.5">ITEMS</th>
            <th className="font-medium pb-1.5">STATUS</th>
            <th className="font-medium pb-1.5">AMOUNT</th>
            <th className="font-medium pb-1.5">DATE</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="text-xs border-t border-[#F0F0F0]">
              <td className="py-2 font-medium text-[#8B5A2B]">{order.id}</td>
              <td className="py-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">{order.customer}</span>
                </div>
              </td>
              <td className="py-[9px] text-gray-500">{order.items}</td>
              <td className="py-[9px]">
                <span
                  className={`px-2 py-[9px] rounded-full text-[10px] font-medium ${statusStyles[order.status]}`}
                >
                  • {order.status}
                </span>
              </td>
              <td className="py-[9px] text-gray-700">{order.amount}</td>
              <td className="py-[9px] text-gray-400">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
