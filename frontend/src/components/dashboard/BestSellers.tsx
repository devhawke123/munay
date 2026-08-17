const products = [
  { name: "Oversized Coat", sold: "392 sold" },
  { name: "Oversized Coat", sold: "392 sold" },
  { name: "Oversized Coat", sold: "392 sold" },
];

export function BestSellers() {
  return (
    <div className="bg-white border border-[#E8E6E1] rounded-xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-gray-900">Best Sellers</h3>
        <a href="#" className="text-xs font-medium text-[#8B5A2B]">
          All →
        </a>
      </div>

      {/* List */}
      <div className="flex flex-col gap-1.5">
        {products.map((product, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
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
