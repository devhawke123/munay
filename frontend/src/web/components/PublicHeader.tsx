import { Heart, ShoppingBag, User } from "lucide-react";
import logo from "../assets/logo.png";

const primaryLinks = ["Women", "Men", "Home", "Our Story", "Vicuna"];
const secondaryLinks = ["Fiber", "Community"];

export function PublicHeader() {
  return (
    <div className="flex items-center justify-between px-12 py-5">
      <nav className="flex items-center gap-6">
        {primaryLinks.map((label) => (
          <a key={label} href="#" className="text-sm tracking-[0.35px] text-ink">
            {label}
          </a>
        ))}
      </nav>

      <a href="#">
        <img src={logo} alt="Munay" className="h-[73px] w-32 object-contain" />
      </a>

      <div className="flex items-center gap-8">
        <nav className="flex items-center gap-8">
          {secondaryLinks.map((label) => (
            <a key={label} href="#" className="text-sm tracking-[0.35px] text-ink">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-6">
          <button aria-label="Account" className="text-ink">
            <User size={18} />
          </button>
          <button aria-label="Wishlist" className="text-ink">
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
  );
}
