import campaign from "../assets/campaign.png";

export function Campaign() {
  return (
    <div className="relative flex h-[921px] items-center justify-center overflow-hidden">
      <img src={campaign} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="relative flex w-full max-w-[1440px] justify-end px-12">
        <div className="flex max-w-[512px] flex-col items-start gap-6 bg-[#fcfbf9]/90 p-16 backdrop-blur-[6px]">
          <h2 className="font-serif-alt text-4xl text-ink">Autumn / Winter &apos;26</h2>
          <p className="text-base font-light text-ink/70">
            A study in contrasts. Exploring the delicate balance between structural tailoring and
            the inherent softness of pure baby alpaca.
          </p>
          <a
            href="#"
            className="border-b border-ink pb-1 text-sm uppercase tracking-[1.4px] text-ink"
          >
            View Campaign
          </a>
        </div>
      </div>
    </div>
  );
}
