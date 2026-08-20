import { Heart, Menu, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const primaryLinks = [
  { label: "Women", href: "/category/women" },
  { label: "Men", href: "/category/men" },
  { label: "Home", href: "/category/home-essentials" },
  { label: "Our Story", href: "#" },
  { label: "Vicuna", href: "#" },
];
const secondaryLinks = ["Fiber", "Community"];

export function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-12 lg:py-5">
        <button
          aria-label="Toggle menu"
          className="text-ink lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className="hidden items-center gap-6 lg:flex">
          {primaryLinks.map((link) => (
            <Link key={link.label} to={link.href} className="text-sm tracking-[0.35px] text-ink">
              {link.label}
            </Link>
          ))}
        </nav>

        <a href="#" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
          <img src={logo} alt="Munay" className="h-12 w-20 object-contain lg:h-[73px] lg:w-32" />
        </a>

        <div className="flex items-center gap-4 lg:gap-8">
          <nav className="hidden items-center gap-8 lg:flex">
            {secondaryLinks.map((label) => (
              <a key={label} href="#" className="text-sm tracking-[0.35px] text-ink">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4 lg:gap-6">
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
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-ink/10 bg-white px-4 py-4 lg:hidden">
          {primaryLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="py-2 text-sm tracking-[0.35px] text-ink"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {secondaryLinks.map((label) => (
            <a
              key={label}
              href="#"
              className="py-2 text-sm tracking-[0.35px] text-ink"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
