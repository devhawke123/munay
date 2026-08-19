import hero from "../assets/hero.png";

export function Hero() {
  return (
    <div className="relative flex h-[812px] items-center justify-center overflow-hidden">
      <img src={hero} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-black/[0.07]" />
      <div className="relative flex max-w-[896px] flex-col items-center px-4 text-center">
        <h1 className="font-serif text-[92px] font-medium leading-[80px] tracking-[2px] text-white drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.05)]">
          Soft by Nature.
          <br />
          Made in Peru.
        </h1>
        <p className="mt-6 max-w-[430px] text-base font-light uppercase leading-6 tracking-[1.6px] text-white/90">
          Discover the timeless elegance of ethically sourced, masterfully crafted alpaca
          garments.
        </p>
        <a
          href="#"
          className="mt-10 border border-white px-10 py-4 text-sm uppercase tracking-[1.4px] text-white"
        >
          Explore the Collection
        </a>
      </div>
    </div>
  );
}
