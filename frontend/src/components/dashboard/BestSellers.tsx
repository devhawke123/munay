const products = [
  { name: "Oversized Coat", sold: "392 sold" },
  { name: "Oversized Coat", sold: "392 sold" },
  { name: "Oversized Coat", sold: "392 sold" },
];

export function BestSellers() {
  return (
    <div className="flex min-h-0 shrink-0 flex-col overflow-hidden rounded-xl border border-[#E8E6E1] bg-white p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">Best Sellers</h3>
        <a href="#" className="text-xs font-medium text-[#8B5A2B]">
          All →
        </a>
      </div>

      <div className="flex flex-col gap-1">
        {products.map((product, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EFF6FF]">
              <span className="text-xs">🧥</span>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-800">{product.name}</p>
              <p className="text-[10px] text-gray-400">{product.sold}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
