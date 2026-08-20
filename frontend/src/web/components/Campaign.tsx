import campaign from "../assets/campaign.png";

export function Campaign() {
  return (
    <div className="relative flex h-[520px] items-center justify-center overflow-hidden sm:h-[650px] lg:h-[921px]">
      <img src={campaign} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="relative flex w-full max-w-[1440px] justify-center px-4 sm:px-8 lg:justify-end lg:px-12">
        <div className="flex w-full max-w-[512px] flex-col items-start gap-4 bg-[#fcfbf9]/90 p-6 backdrop-blur-[6px] sm:gap-6 sm:p-10 lg:p-16">
          <h2 className="font-serif-alt text-2xl text-ink sm:text-3xl lg:text-4xl">
            Autumn / Winter &apos;26
          </h2>
          <p className="text-sm font-light text-ink/70 sm:text-base">
            A study in contrasts. Exploring the delicate balance between structural tailoring and
            the inherent softness of pure baby alpaca.
          </p>
          <a
            href="#"
            className="border-b border-ink pb-1 text-xs uppercase tracking-[1.4px] text-ink sm:text-sm"
          >
            View Campaign
          </a>
        </div>
      </div>
    </div>
  );
}
