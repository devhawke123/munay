import logo from "../assets/logo.png";

const shopLinks = ["Women", "Men", "Home", "Accessories"];
const infoLinks = ["Shipping", "Returns", "Care Guide", "Contact"];

export function Footer() {
  return (
    <footer className="bg-[#dbd6ce] px-4 pb-16 pt-12 sm:px-12 sm:pb-24 sm:pt-16 lg:px-24 lg:pb-[120px] lg:pt-[88px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-9">
        <div className="flex flex-col gap-10 sm:flex-row sm:flex-wrap sm:justify-between lg:flex-nowrap lg:gap-12">
          <div className="flex w-full shrink-0 flex-col gap-6 sm:w-[45%] lg:w-[280px]">
            <img src={logo} alt="Munay" className="h-[72px] w-[113px] object-contain" />
            <p className="max-w-[320px] text-sm font-light text-ink/60">
              Crafting timeless luxury from the finest Peruvian fibers, honoring artisan
              traditions.
            </p>
          </div>

          <div className="flex w-1/2 shrink-0 flex-col gap-6 sm:w-[20%] lg:w-[140px]">
            <h4 className="font-futura text-xs font-medium uppercase tracking-[2.4px] text-ink">Shop</h4>
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

          <div className="flex w-1/2 shrink-0 flex-col gap-6 sm:w-[20%] lg:w-[140px]">
            <h4 className="font-futura text-xs font-medium uppercase tracking-[2.4px] text-ink">
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

          <div className="flex w-full shrink-0 flex-col gap-6 sm:w-full lg:w-[360px]">
            <h4 className="font-futura text-xs font-medium uppercase tracking-[2.4px] text-ink">
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

        <div className="flex flex-col items-start gap-4 border-t border-ink/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
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
