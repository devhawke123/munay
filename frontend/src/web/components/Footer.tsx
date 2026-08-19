import logo from "../assets/logo.png";

const shopLinks = ["Women", "Men", "Home", "Accessories"];
const infoLinks = ["Shipping", "Returns", "Care Guide", "Contact"];

export function Footer() {
  return (
    <footer className="bg-[#dbd6ce] px-12 pb-[120px] pt-[88px] md:px-24">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-9">
        <div className="flex justify-between gap-12">
          <div className="flex w-[280px] shrink-0 flex-col gap-6">
            <img src={logo} alt="Munay" className="h-[72px] w-[113px] object-contain" />
            <p className="max-w-[320px] text-sm font-light text-ink/60">
              Crafting timeless luxury from the finest Peruvian fibers, honoring artisan
              traditions.
            </p>
          </div>

          <div className="flex w-[140px] shrink-0 flex-col gap-6">
            <h4 className="text-xs font-medium uppercase tracking-[2.4px] text-ink">Shop</h4>
            <ul className="flex flex-col gap-4">
              {shopLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm font-light text-ink/60">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex w-[140px] shrink-0 flex-col gap-6">
            <h4 className="text-xs font-medium uppercase tracking-[2.4px] text-ink">
              Information
            </h4>
            <ul className="flex flex-col gap-4">
              {infoLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm font-light text-ink/60">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex w-[360px] shrink-0 flex-col gap-6">
            <h4 className="text-xs font-medium uppercase tracking-[2.4px] text-ink">
              Newsletter
            </h4>
            <p className="text-sm font-light text-ink/60">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex items-end justify-between border-b border-ink/60 pb-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="min-w-0 flex-1 bg-transparent text-sm text-ink/60 placeholder:text-ink/60 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 text-xs uppercase tracking-[1.2px] text-ink/60"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-ink/60 pt-8">
          <p className="text-xs font-light text-ink/60">© 2026 MUNAY. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs font-light text-ink/60">
              Terms
            </a>
            <a href="#" className="text-xs font-light text-ink/60">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
