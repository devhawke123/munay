import { ChevronDown, Heart, Menu, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const primaryLinks = [
  { label: "Women", href: "/category/women" },
  { label: "Men", href: "/category/men" },
  { label: "Home", href: "/category/home-essentials" },
  { label: "The Brands", href: "#" },
  { label: "Our World", href: "#" },
];

export function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-white px-4 py-4 sm:px-6 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-8 lg:px-12 lg:py-5">
        <button
          aria-label="Toggle menu"
          className="text-ink lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <a
          href="#"
          className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:justify-self-start"
        >
          <img src={logo} alt="Munay" className="h-12 w-20 object-contain lg:h-[73px] lg:w-32" />
        </a>

        <nav className="hidden items-center justify-center gap-8 lg:flex">
          {primaryLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-futura flex items-center gap-1 text-xl font-medium tracking-[0.35px] text-ink"
            >
              {link.label}
              <ChevronDown size={16} />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 lg:gap-6 lg:justify-self-end">
          <button aria-label="Account" className="hidden text-ink lg:inline-flex">
            <User size={18} />
          </button>
          <button aria-label="Wishlist" className="hidden text-ink lg:inline-flex">
            <Heart size={18} />
          </button>
          <button aria-label="Bag" className="relative text-ink">
            <ShoppingBag size={18} />
            <span className="absolute -right-2 -top-1 flex size-4 items-center justify-center rounded-full bg-gold text-[10px] text-white">
              0
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-ink/10 bg-white px-4 py-4 lg:hidden">
          {primaryLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-futura py-2 text-sm font-medium tracking-[0.35px] text-ink"
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
