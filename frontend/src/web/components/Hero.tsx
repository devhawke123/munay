import hero from "../assets/hero.png";

export function Hero() {
  return (
    <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
      <img src={hero} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-black/[0.07]" />
      <div className="relative flex max-w-[896px] flex-col items-center px-4 text-center">
        <h1 className="font-serif text-[40px] font-medium leading-[1.1] tracking-[2px] text-white drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.05)] sm:text-[60px] lg:text-[92px] lg:leading-[80px]">
          Soft by Nature.
          <br />
          Made in Peru.
        </h1>
        <p className="mt-4 max-w-[430px] text-xs font-light uppercase leading-5 tracking-[1.2px] text-white/90 sm:mt-6 sm:text-base sm:leading-6 sm:tracking-[1.6px]">
          Discover the timeless elegance of ethically sourced, masterfully crafted alpaca
          garments.
        </p>
        <a
          href="#"
          className="mt-6 border border-white px-6 py-3 text-xs uppercase tracking-[1.2px] text-white sm:mt-10 sm:px-10 sm:py-4 sm:text-sm sm:tracking-[1.4px]"
        >
          Explore the Collection
        </a>
      </div>
    </div>
  );
}
