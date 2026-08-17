import { Search, ChevronDown } from "lucide-react";

export function Header() {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-[#E8E6E1] bg-[#FBF7F0] px-6 py-2">
      <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>

      <div className="flex items-center gap-6">
        <div className="flex w-64 items-center gap-2 rounded-lg border border-[#E8E6E1] bg-[#F7F7F8] px-4 py-1.5">
          <input
            type="text"
            placeholder="Search Destination"
            className="flex-1 bg-transparent text-sm text-gray-600 outline-none placeholder-gray-400"
          />
          <Search size={16} className="text-gray-400" />
        </div>

        <div className="leading-tight">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-gray-900">Admin</span>
            <ChevronDown size={14} className="text-gray-500" />
          </div>
          <span className="text-xs text-gray-500">Super Admin</span>
        </div>
      </div>
    </div>
  );
}
