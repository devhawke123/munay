import { ChevronDown, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/products": "Products",
  "/admin/products/new": "Add Product",
  "/admin/orders": "Orders",
  "/admin/customers": "Customers",
  "/admin/sales-analytics": "Sales Analytics",
  "/admin/inventory": "Inventory",
  "/admin/content-manager": "Content Manager",
  "/admin/reviews": "Reviews",
  "/admin/settings": "Settings",
};

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  if (pathname.startsWith("/admin/products/")) return "Product Details";
  return "Dashboard";
}

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  const { pathname } = useLocation();
  const title = getPageTitle(pathname);

  return (
   <div className="flex items-center justify-between gap-4 px-4 py-2 sm:px-6 bg-[#FBF7F0] border-b border-[#E8E6E1]">
      {/* Left: Menu toggle + Page Title */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenuClick}
          className="text-gray-700 lg:hidden"
        >
          <Menu size={22} />
        </button>
        <h1 className="truncate text-lg font-semibold text-gray-900">{title}</h1>
      </div>

      {/* Right: Search + Profile */}
      <div className="flex shrink-0 items-center gap-6">

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
