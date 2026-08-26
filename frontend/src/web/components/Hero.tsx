import hero from "../assets/hero.png";

export function Hero() {
  return (
    <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
      <img src={hero} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-black/[0.07]" />
      <div className="relative flex max-w-hero-copy flex-col items-center px-page-x text-center">
        <h1 className="font-serif text-hero-title font-medium text-white drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.05)]">
          Soft by Nature.
          <br />
          Made in Peru.
        </h1>
        <p className="mt-4 max-w-[430px] text-hero-body font-light uppercase text-white/90 sm:mt-6">
          Discover the timeless elegance of ethically sourced, masterfully crafted alpaca
          garments.
        </p>
        <a
          href="#"
          className="mt-6 border border-white px-6 py-3 text-hero-cta uppercase text-white sm:mt-10 sm:px-10 sm:py-4"
        >
          Explore the Collection
        </a>
      </div>
    </div>
  );
}
