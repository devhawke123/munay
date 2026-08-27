import { AlertTriangle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useProductsApi } from "../../hooks/useProductsApi";

export function InventoryAlert() {
  const { data } = useProductsApi();
  const products = data ?? [];
  const lowStockCount = products.filter((p) => p.stockStatus === "LOW_STOCK").length;
  const outOfStockCount = products.filter((p) => p.stockStatus === "OUT_OF_STOCK").length;

  return (
    <div className="bg-white border border-brand-border rounded-[14px] p-4 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-display font-bold text-text-primary tracking-tight">Inventory Alert</h3>
        <Link to="/admin/inventory" className="text-[10px] font-display font-semibold text-brand-accent">
          View All →
        </Link>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-2">
        {/* Low Stock */}
        <div className="flex items-center justify-between bg-warning/[0.07] border border-warning/15 rounded-[12px] px-3.5 py-3">
          <div className="flex items-center gap-3">
            <AlertTriangle size={18} className="text-warning" />
            <div>
              <p className="text-[10px] font-display font-semibold text-text-primary">Low Stock Items</p>
              <p className="text-[10px] text-text-muted">Needs restocking soon</p>
            </div>
          </div>
          <span className="text-sm font-display font-extrabold text-warning">{lowStockCount}</span>
        </div>

        {/* Out of Stock */}
        <div className="flex items-center justify-between bg-danger/[0.06] border border-danger/[0.12] rounded-[12px] px-3.5 py-3">
          <div className="flex items-center gap-3">
            <XCircle size={18} className="text-danger" />
            <div>
              <p className="text-[10px] font-display font-semibold text-text-primary">Out of Stock</p>
              <p className="text-[10px] text-text-muted">Immediate action</p>
            </div>
          </div>
          <span className="text-sm font-display font-extrabold text-danger">{outOfStockCount}</span>
        </div>
      </div>
    </div>
  );
}
