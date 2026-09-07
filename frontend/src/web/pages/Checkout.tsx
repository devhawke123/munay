import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Announcement } from "../components/Announcement";
import { Footer } from "../components/Footer";
import { GoldButton } from "../components/GoldButton";
import { PublicHeader } from "../components/PublicHeader";
import { useCart } from "../context/CartContext";
import { CheckoutApiError, submitCheckout } from "../lib/checkoutApi";

function formatChf(amount: number) {
  return `CHF ${amount.toFixed(2)}`;
}

const inputClass =
  "rounded-[8px] border border-[#5734001A] px-4 py-2.5 text-body-sm text-ink placeholder:text-ink/40 focus:outline-none";
const labelTextClass = "font-sans text-[14px] font-light leading-[20px] tracking-normal text-[#573400]";

type FormState = {
  name: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

export function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await submitCheckout({
        customer: { name: form.name, email: form.email, phone: form.phone || undefined },
        shipping: {
          line1: form.line1,
          line2: form.line2 || undefined,
          city: form.city,
          state: form.state || undefined,
          postalCode: form.postalCode,
          country: form.country,
        },
        items: items.map((item) => ({ variantId: item.variantId, quantity: item.quantity })),
      });
      clear();
      navigate("/order-confirmation", { state: response });
    } catch (err) {
      setError(err instanceof CheckoutApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="overflow-x-hidden bg-white">
        <Announcement />
        <PublicHeader />
        <div className="flex flex-col items-center gap-4 px-page-x py-24 text-center">
          <p className="text-ink/60">Your bag is empty.</p>
          <Link to="/" className="text-btn uppercase text-ink underline">
            Continue shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden bg-white">
      <Announcement />
      <PublicHeader />

      <div className="mx-auto flex w-full max-w-shell flex-col gap-8 px-page-x py-section-y sm:py-section-y-lg lg:flex-row lg:items-start">
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6">
          <h1 className="font-serif text-display uppercase text-ink">Checkout</h1>

          <div className="flex flex-col gap-4 rounded-[14px] bg-white p-6 shadow-card">
            <h2 className="font-serif text-2xl text-ink">Contact</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className={labelTextClass}>Full Name *</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelTextClass}>Email *</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelTextClass}>Phone</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-[14px] bg-white p-6 shadow-card">
            <h2 className="font-serif text-2xl text-ink">Shipping Address</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className={labelTextClass}>Address Line 1 *</span>
                <input
                  required
                  value={form.line1}
                  onChange={(e) => update("line1", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className={labelTextClass}>Address Line 2</span>
                <input
                  value={form.line2}
                  onChange={(e) => update("line2", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelTextClass}>City *</span>
                <input
                  required
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelTextClass}>State / Province</span>
                <input
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelTextClass}>Postal Code *</span>
                <input
                  required
                  value={form.postalCode}
                  onChange={(e) => update("postalCode", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelTextClass}>Country *</span>
                <input
                  required
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
          </div>

          {error && <p className="text-sm font-medium text-danger">{error}</p>}

          <GoldButton type="submit" disabled={submitting} className="w-full justify-center py-3 disabled:opacity-60">
            {submitting ? "Placing Order…" : `Place Order — ${formatChf(subtotal)}`}
          </GoldButton>
        </form>

        <div className="flex w-full flex-col gap-4 rounded-[14px] bg-cream p-6 lg:w-[340px] lg:shrink-0">
          <h2 className="font-serif text-2xl text-ink">Order Summary</h2>
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.variantId} className="flex items-center justify-between gap-3 text-body-sm">
                <span className="text-ink/80">
                  {item.name} ({item.size} / {item.color}) × {item.quantity}
                </span>
                <span className="shrink-0 font-medium text-ink">
                  {formatChf(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-ink/10 pt-3 text-body">
            <span className="text-ink/70">Subtotal</span>
            <span className="font-semibold text-ink">{formatChf(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-body">
            <span className="text-ink/70">Shipping</span>
            <span className="text-ink">Free</span>
          </div>
          <div className="flex items-center justify-between border-t border-ink/10 pt-3 text-body font-semibold">
            <span className="text-ink">Total</span>
            <span className="text-ink">{formatChf(subtotal)}</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
