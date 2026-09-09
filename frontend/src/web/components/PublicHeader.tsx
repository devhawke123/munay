import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useCart } from "../context/CartContext";

const primaryLinks = [
  { label: "Women", href: "/category/women" },
  { label: "Men", href: "/category/men" },
  { label: "Home", href: "/category/home" },
  { label: "The Brands", href: "#" },
  { label: "Our World", href: "#" },
];

export function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-cream px-header-x py-header-y lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-6 tall:lg:gap-8 tall:py-3">
        <button
          aria-label="Toggle menu"
          className="text-ink lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link to="/">
          <img
            src={logo}
            alt="Munay"
            className="h-logo-h w-logo-w tall:lg:h-[90px] tall:lg:w-35 -mt-5"
          />
        </Link>

        <nav className="hidden items-center justify-center gap-5 lg:flex xl:gap-8 tall:gap-9">
          {primaryLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-futura flex items-center gap-1 text-[20px] font-[450] leading-5 tracking-[0.35px] text-ink"
            >
              {link.label}
              <ChevronDown size={17} strokeWidth={1.5} />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 lg:justify-self-end tall:gap-4">
       
          <Link to="/cart" aria-label="Bag" className="relative text-ink">
            <ShoppingBag size={24} />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-1 flex size-4 items-center justify-center rounded-full bg-gold text-[10px] text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-ink/10 bg-cream px-header-x py-3 lg:hidden">
          {primaryLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-futura py-2 text-body-sm font-medium tracking-[0.35px] text-ink"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
