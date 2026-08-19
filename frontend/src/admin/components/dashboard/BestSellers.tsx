const products = [
  { name: "Oversized Coat", sold: "392 sold" },
  { name: "Oversized Coat", sold: "392 sold" },
  { name: "Oversized Coat", sold: "392 sold" },
];

export function BestSellers() {
  return (
    <div className="bg-white border border-brand-border rounded-[14px] p-6 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-display font-bold text-text-primary tracking-tight">Best Sellers</h3>
        <a href="#" className="text-xs font-display font-semibold text-brand-accent">
          All →
        </a>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-start gap-2.5">
            <div className="relative w-[30px] h-[29px] rounded-[3px] bg-gray-100 flex items-center justify-center flex-shrink-0">
              <span className="text-xs">🧥</span>
              <div className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-lg bg-gradient-to-br from-brand-accent to-brand flex items-center justify-center">
                <span className="text-[8px] font-display font-extrabold text-white">#{index + 1}</span>
              </div>
            </div>
            <div>
              <p className="text-[11.5px] font-display font-medium text-text-primary leading-tight">{product.name}</p>
              <p className="text-[10.5px] text-text-muted mt-0.5">{product.sold}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
