import { ChevronDown, Heart, Menu, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const primaryLinks = [
  { label: "Women", href: "/category/women" },
  { label: "Men", href: "/category/men" },
  { label: "Home", href: "/category/home-essentials" },
  { label: "The Brands", href: "#" },
  { label: "Our World", href: "/our-story" },
];

export function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-white px-header-x py-header-y lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-6 tall:lg:gap-8 tall:py-3">
        <button
          aria-label="Toggle menu"
          className="text-ink lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:justify-self-start"
        >
          <img
            src={logo}
            alt="Munay"
            className="h-logo-h w-logo-w object-contain tall:lg:h-[73px] tall:lg:w-32"
          />
        </Link>

        <nav className="hidden items-center justify-center gap-5 lg:flex xl:gap-7 tall:gap-8">
          {primaryLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-futura flex items-center gap-0.5 text-nav font-medium tracking-[0.35px] text-ink"
            >
              {link.label}
              <ChevronDown size={14} className="tall:size-4" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 lg:gap-4 lg:justify-self-end tall:lg:gap-6">
          <button aria-label="Account" className="hidden text-ink lg:inline-flex">
            <User size={16} className="tall:size-[18px]" />
          </button>
          <button aria-label="Wishlist" className="hidden text-ink lg:inline-flex">
            <Heart size={16} className="tall:size-[18px]" />
          </button>
          <button aria-label="Bag" className="relative text-ink">
            <ShoppingBag size={16} className="tall:size-[18px]" />
            <span className="absolute -right-2 -top-1 flex size-3.5 items-center justify-center rounded-full bg-gold text-[9px] text-white tall:size-4 tall:text-[10px]">
              0
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-ink/10 bg-white px-header-x py-3 lg:hidden">
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
