import { topPerformingProducts } from "../../data/salesAnalytics";

export function TopPerformingProducts() {
  return (
    <div className="rounded-[7px] bg-white p-5">
      <h2 className="mb-4 text-sm font-display font-bold text-text-primary">
        Top Performing Products
      </h2>

      <div className="grid grid-cols-[50px_1fr_90px_60px] items-center px-1 text-xs uppercase tracking-wide text-text-muted">
        <div>Rank</div>
        <div>Product</div>
        <div>Revenue</div>
        <div>Units</div>
      </div>

      <div className="mt-3 flex flex-col gap-4">
        {topPerformingProducts.map((product) => (
          <div
            key={product.rank}
            className="grid grid-cols-[50px_1fr_90px_60px] items-center px-1"
          >
            <div className="text-[13px] font-semibold text-brand">#{product.rank}</div>
            <div className="text-[13px] font-semibold text-text-primary">{product.name}</div>
            <div className="text-[13px] font-display font-bold text-text-primary">
              {product.revenue}
            </div>
            <div className="text-[13px] text-text-primary">{product.units}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
