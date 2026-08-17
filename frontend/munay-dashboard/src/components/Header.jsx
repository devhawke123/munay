import { Search, ChevronDown } from "lucide-react";

function Header() {
  return (
    <div className="flex items-center justify-between px-6 py-2 bg-[#FBF7F0] border-b border-[#E8E6E1]">
      {/* Left: Page Title */}
      <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>

      {/* Right: Search + Profile */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-[#F7F7F8] border border-[#E8E6E1] rounded-lg px-4 py-2 w-64">
          <input
            type="text"
            placeholder="Search Destination"
            className="bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400 flex-1"
          />
          <Search size={16} className="text-gray-400" />
        </div>

        {/* Admin Profile */}
        <div className="flex items-center gap-2">
          <div className="leading-tight">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-900">Admin</span>
              <ChevronDown size={14} className="text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Super Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;