import { AlertTriangle, XCircle } from "lucide-react";

export function InventoryAlert() {
  return (
    <div className="bg-white border border-[#E8E6E1] rounded-xl p-4 max-w-[97%]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-900">Inventory Alert</h3>
        <a href="#" className="text-xs font-medium text-[#8B5A2B]">
          View All →
        </a>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-2">
        {/* Low Stock */}
        <div className="flex items-center justify-between bg-[#FFF7ED] rounded-lg px-3 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FDEAD1] flex items-center justify-center">
              <AlertTriangle size={14} className="text-[#EA580C]" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Low Stock Items</p>
              <p className="text-xs text-gray-500">Needs restocking soon</p>
            </div>
          </div>
          <span className="text-sm font-semibold text-[#EA580C]">23</span>
        </div>

        {/* Out of Stock */}
        <div className="flex items-center justify-between bg-[#FEF2F2] rounded-lg px-3 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FCDADA] flex items-center justify-center">
              <XCircle size={14} className="text-[#DC2626]" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Out of Stock</p>
              <p className="text-xs text-gray-500">Immediate action</p>
            </div>
          </div>
          <span className="text-sm font-semibold text-[#DC2626]">7</span>
        </div>
      </div>
    </div>
  );
}
