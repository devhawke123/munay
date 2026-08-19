import { storeSales } from "../../data/salesAnalytics";

export function SalesByStoreTable() {
  return (
    <div className="rounded-[7px] bg-white p-5">
      <h2 className="mb-4 text-sm font-display font-bold text-text-primary">
        Sales by Store / Exhibition
      </h2>

      <div className="grid grid-cols-[1fr_110px_90px_110px_90px] items-center px-1 text-xs uppercase tracking-wide text-text-muted">
        <div>Store / Location</div>
        <div>Transactions</div>
        <div>Revenue</div>
        <div>Avg. Order Value</div>
        <div>Share</div>
      </div>

      <div className="mt-3 flex flex-col gap-4">
        {storeSales.map((row) => (
          <div
            key={row.store}
            className="grid grid-cols-[1fr_110px_90px_110px_90px] items-center px-1"
          >
            <div className="text-[13px] font-semibold text-text-primary">{row.store}</div>
            <div className="text-[13px] text-text-primary">{row.transactions}</div>
            <div className="text-[13px] font-display font-bold text-text-primary">
              {row.revenue}
            </div>
            <div className="text-[13px] text-text-primary">{row.avgOrderValue}</div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-10 overflow-hidden rounded-full bg-surface-muted">
                <div
                  className="h-full rounded-full bg-brand-accent"
                  style={{ width: `${row.share}%` }}
                />
              </div>
              <span className="text-xs text-text-muted">{row.share}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
