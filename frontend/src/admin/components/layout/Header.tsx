import { ChevronDown, LogOut, Settings as SettingsIcon } from "lucide-react";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { currentUser } from "../../data/currentUser";

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
  const navigate = useNavigate();
  const title = getPageTitle(pathname);
  const [profileOpen, setProfileOpen] = useState(false);

  function handleSignOut() {
    setProfileOpen(false);
    navigate("/");
  }

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
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((prev) => !prev)}
            className="flex items-center gap-2"
          >
            <div className="leading-tight text-left">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-900">{currentUser.firstName}</span>
                <ChevronDown size={14} className="text-gray-500" />
              </div>
              <span className="text-xs text-gray-500">{currentUser.role}</span>
            </div>
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-[14px] border border-brand-border bg-white p-3 shadow-card">
                <div className="border-b border-brand-border px-1 pb-3">
                  <p className="text-sm font-display font-bold text-text-primary">{currentUser.name}</p>
                  <p className="text-xs text-text-muted">{currentUser.email}</p>
                </div>

                <div className="flex flex-col gap-1 py-2">
                  <Link
                    to="/admin/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 rounded-[8px] px-2 py-2 text-sm text-text-primary hover:bg-brand-soft/60"
                  >
                    <SettingsIcon size={15} className="text-text-muted" />
                    Account Settings
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2.5 rounded-[8px] border-t border-brand-border px-2 pt-3 pb-1 text-sm font-medium text-danger"
                >
                  <LogOut size={15} />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
