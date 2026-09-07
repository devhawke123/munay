import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Announcement } from "../components/Announcement";
import { Footer } from "../components/Footer";
import { GoldButton } from "../components/GoldButton";
import { PublicHeader } from "../components/PublicHeader";
import { useCart } from "../context/CartContext";

function formatChf(amount: number) {
  return `CHF ${amount.toFixed(2)}`;
}

export function Cart() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <div className="overflow-x-hidden bg-white">
      <Announcement />
      <PublicHeader />

      <div className="mx-auto flex w-full max-w-shell flex-col gap-8 px-page-x py-section-y sm:py-section-y-lg">
        <h1 className="font-serif text-display uppercase text-ink">Your Bag</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="text-body text-ink/60">Your bag is empty.</p>
            <Link to="/" className="text-btn uppercase text-ink underline">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <div className="flex flex-1 flex-col gap-5">
              {items.map((item) => (
                <div
                  key={item.variantId}
                  className="flex gap-4 border-b border-ink/10 pb-5 last:border-0"
                >
                  <div className="size-24 shrink-0 overflow-hidden bg-cream">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="size-full object-cover" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <p className="font-futura text-pdp-eyebrow font-medium uppercase text-ink">
                      {item.name}
                    </p>
                    <p className="text-body-sm text-ink/60">
                      {item.size} / {item.color}
                    </p>
                    <p className="text-body-sm text-ink">{formatChf(item.unitPrice)}</p>

                    <div className="mt-1 flex items-center gap-3">
                      <div className="flex items-center border border-ink/20">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-ink"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="flex h-8 w-8 items-center justify-center text-body-sm text-ink">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          disabled={item.quantity >= item.availableQty}
                          className="flex h-8 w-8 items-center justify-center text-ink disabled:opacity-40"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.variantId)}
                        aria-label="Remove item"
                        className="text-ink/50 hover:text-ink"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="font-futura text-pdp-eyebrow text-ink">
                    {formatChf(item.unitPrice * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex w-full flex-col gap-4 rounded-[14px] bg-cream p-6 lg:w-[340px] lg:shrink-0">
              <div className="flex items-center justify-between text-body">
                <span className="text-ink/70">Subtotal</span>
                <span className="font-semibold text-ink">{formatChf(subtotal)}</span>
              </div>
              <p className="text-xs text-ink/50">Shipping and taxes calculated at checkout.</p>
              <Link to="/checkout">
                <GoldButton className="w-full justify-center py-3">Proceed to Checkout</GoldButton>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
