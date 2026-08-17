import { AlertTriangle, XCircle } from "lucide-react";

export function InventoryAlert() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#E8E6E1] bg-white p-3">
      <div className="mb-2 flex shrink-0 items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">Inventory Alert</h3>
        <a href="#" className="text-xs font-medium text-[#8B5A2B]">
          View All →
        </a>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between rounded-lg bg-[#FFF7ED] px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDEAD1]">
              <AlertTriangle size={13} className="text-[#EA580C]" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-800">Low Stock Items</p>
              <p className="text-[10px] text-gray-500">Needs restocking soon</p>
            </div>
          </div>
          <span className="text-sm font-semibold text-[#EA580C]">23</span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-[#FEF2F2] px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FCDADA]">
              <XCircle size={13} className="text-[#DC2626]" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-800">Out of Stock</p>
              <p className="text-[10px] text-gray-500">Immediate action</p>
            </div>
          </div>
          <span className="text-sm font-semibold text-[#DC2626]">7</span>
        </div>
      </div>
    </div>
  );
}
