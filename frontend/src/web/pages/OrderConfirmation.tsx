import { Link, useLocation } from "react-router-dom";
import { Announcement } from "../components/Announcement";
import { Footer } from "../components/Footer";
import { PublicHeader } from "../components/PublicHeader";
import type { CheckoutResponse } from "../lib/checkoutApi";

function formatChf(amount: number) {
  return `CHF ${amount.toFixed(2)}`;
}

export function OrderConfirmation() {
  // Read straight from the just-completed checkout response passed via router state — no
  // public "get order" endpoint exists (or is needed) for this. A page refresh loses this
  // state and falls back to a generic thank-you below.
  const location = useLocation();
  const order = location.state as CheckoutResponse | null;

  return (
    <div className="overflow-x-hidden bg-white">
      <Announcement />
      <PublicHeader />

      <div className="mx-auto flex w-full max-w-shell flex-col items-center gap-6 px-page-x py-section-y text-center sm:py-section-y-lg">
        <h1 className="font-serif text-display uppercase text-ink">Thank You!</h1>

        {order ? (
          <>
            <p className="max-w-[40rem] text-body text-ink/70">
              Your order <span className="font-semibold text-ink">#{order.orderNumber}</span> has
              been placed. A confirmation has been noted for {formatChf(order.total)}.
            </p>

            <div className="mt-4 flex w-full max-w-[500px] flex-col gap-3 rounded-[14px] bg-cream p-6 text-left">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-body-sm">
                  <span className="text-ink/80">
                    {item.productName}
                    {item.variantLabel ? ` (${item.variantLabel})` : ""} × {item.quantity}
                  </span>
                  <span className="font-medium text-ink">{formatChf(item.lineTotal)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-ink/10 pt-3 text-body font-semibold">
                <span className="text-ink">Total</span>
                <span className="text-ink">{formatChf(order.total)}</span>
              </div>
            </div>
          </>
        ) : (
          <p className="max-w-[40rem] text-body text-ink/70">
            Your order has been placed. Thank you for shopping with us.
          </p>
        )}

        <Link to="/" className="mt-4 text-btn uppercase text-ink underline">
          Continue shopping
        </Link>
      </div>

      <Footer />
    </div>
  );
}
