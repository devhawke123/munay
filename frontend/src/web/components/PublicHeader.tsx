import { ChevronDown, Heart, Menu, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const primaryLinks = [
  { label: "Women", href: "/category/women", hasDropdown: true },
  { label: "Men", href: "/category/men", hasDropdown: true },
  { label: "Home", href: "/category/home", hasDropdown: true },
  { label: "Our Story", href: "/our-story", hasDropdown: true },
  { label: "Vicuna", href: "/vicuna", hasDropdown: false },
];

const secondaryLinks = [
  { label: "Fiber", href: "/baby-alpaca-fiber", hasDropdown: true },
  { label: "Community", href: "/the-women", hasDropdown: true },
];

export function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-white px-header-x  py-header-y lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-6 tall:lg:gap-8 tall:py-3">
        <button
          aria-label="Toggle menu"
          className="text-ink lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className="hidden items-center justify-start gap-5 lg:flex xl:gap-7 tall:gap-8">
          {primaryLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-futura flex items-center gap-0.5 text-nav font-medium tracking-[0.35px] text-ink"
            >
              {link.label}
              {link.hasDropdown && <ChevronDown size={14} className="tall:size-4" />}
            </Link>
          ))}
        </nav>

        <Link
          to="/"
          className="absolute left-1/2 -mt-5 -translate-x-1/2 lg:static lg:translate-x-0 lg:justify-self-center"
        >
          <img
            src={logo}
            alt="Munay"
            className="h-logo-h w-logo-w  tall:lg:h-[90px] tall:lg:w-35"
          />
        </Link>

        <div className="flex items-center gap-6 lg:justify-self-end xl:gap-8">
          <nav className="hidden items-center gap-5 lg:flex xl:gap-7 tall:gap-8">
            {secondaryLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="font-futura flex items-center gap-0.5 text-nav font-medium tracking-[0.35px] text-ink"
              >
                {link.label}
                {link.hasDropdown && <ChevronDown size={14} className="tall:size-4" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 tall:gap-4">
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
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-ink/10 bg-white px-header-x py-3 lg:hidden">
          {[...primaryLinks, ...secondaryLinks].map((link) => (
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
