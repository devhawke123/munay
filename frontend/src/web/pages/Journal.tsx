import { Announcement } from "../components/Announcement";
import { Footer } from "../components/Footer";
import { GoldButton } from "../components/GoldButton";
import { Newsletter } from "../components/Newsletter";
import { PageHero } from "../components/PageHero";
import { PublicHeader } from "../components/PublicHeader";
import journal from "../assets/journal.jpg";
import shawl from "../assets/shawl.jpg";
import quniShawlMen from "../assets/quni-shawl-men.jpg";
import quniShawlWomen from "../assets/quni-shawl-women.jpg";
import winter from "../assets/winter.jpg";
import softSeason from "../assets/soft-season.jpg";

export function Journal() {
  return (
    <div className="overflow-x-hidden bg-white">
      <Announcement />
      <PublicHeader />

      <PageHero image={journal} imageStyle={{ objectPosition: "center 18%" }}>
        <h1 className="font-serif text-display text-white drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.15)]">
          The Munay Journal
        </h1>
        <p className="max-w-[710px] font-sans text-[17px] font-normal leading-[31px] tracking-[2px] text-white">
          A space where we share styling notes, seasonal reflections, and the stories
          behind our pieces &mdash; from Peru to Switzerland.
        </p>
      </PageHero>

      <div className="flex flex-col items-start gap-1.5 bg-cream px-page-x py-section-y text-left sm:py-section-y-lg">
        <h2 className="font-serif text-section-title text-ink">The Art of Wearing</h2>
        <p className="max-w-[36rem] text-body font-light text-ink/70">
          Find answers to common questions about our products, shipping, and care
          instructions. If you need additional help, feel free to contact our customer
          service team.
        </p>
      </div>

      <div className="flex justify-center bg-cream px-page-x pb-section-y sm:pb-section-y-lg">
        <div className="flex w-full max-w-shell flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16">
          <img
            src={shawl}
            alt="A woman wearing a shawl in the Andes"
            className="aspect-[4/4.4] w-full max-w-[520px] shrink-0 object-cover lg:w-1/2 lg:max-w-none"
          />
          <div className="flex w-full max-w-[420px] flex-col items-start gap-4 text-left">
            <h2 className="whitespace-nowrap font-serif text-section-title text-ink">How to Wear a Shawl</h2>
            <p className="text-body font-light text-ink/70">
              Soft structure. Natural movement. Timeless ease.
            </p>
            <ul className="flex flex-col gap-1 text-body font-light text-ink/70">
              <li>&bull; Draped over the shoulders</li>
              <li>&bull; Belted at the waist</li>
              <li>&bull; Wrapped close against the cold</li>
            </ul>
            <button
              type="button"
              className="border-b border-[#573400] pb-1 text-body font-normal text-[#573400]"
            >
              Discover
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center bg-cream px-page-x pb-section-y sm:pb-section-y-lg">
        <div className="grid w-full max-w-shell grid-cols-1 gap-10 sm:grid-cols-2">
          <div className="flex flex-col items-start gap-3 text-left">
            {/* Men image aspect ratio — change the 4/5 to resize */}
            <div className="relative aspect-[4/4.3] w-full overflow-hidden">
              <img
                src={quniShawlMen}
                alt="Draping the Q'UNI Shawl"
                className="absolute inset-0 size-full object-cover"
              />
            </div>

            <h3 className="font-serif text-2xl text-ink">Draping the Q&rsquo;UNI Shawl</h3>
            <p className="text-body-sm font-light text-ink/70">
              A study in restraint and refined layering.
            </p>
            <ul className="flex flex-col gap-1 text-body-sm font-light text-ink/70">
              <li>&bull; Worn over tailored outerwear</li>
              <li>&bull; Wrapped close for clean definition</li>
              <li>&bull; Designed for quiet presence</li>
            </ul>
            <button
              type="button"
              className="border-b border-[#573400] pb-1 text-body-md font-normal text-[#573400]"
            >
              Discover
            </button>
          </div>

          <div className="flex flex-col items-start gap-3 text-left">
            {/* Women image aspect ratio — change the 4/5 to resize */}
            <div className="relative aspect-[4/4.3] w-full overflow-hidden">
              <img
                src={quniShawlWomen}
                alt="From Day to Evening"
                className="absolute inset-0 size-full object-cover"
                style={{ objectPosition: "center 15%" }}
              />
            </div>

            <h3 className="font-serif text-2xl text-ink">From Day to Evening</h3>
            <p className="text-body-sm font-light text-ink/70">
              Soft layers that transition effortlessly.
            </p>
            <ul className="flex flex-col gap-1 text-body-sm font-light text-ink/70">
              <li>&bull; Structured silhouette</li>
              <li>&bull; Soft warmth in pure baby alpaca</li>
              <li>&bull; Designed for cold, styled for clarity</li>
            </ul>
            <button
              type="button"
              className="border-b border-[#573400] pb-1 text-body-md font-normal text-[#573400]"
            >
              Discover
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 bg-cream px-page-x py-section-y text-center sm:py-section-y-lg">
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-ink/30" aria-hidden />
          <span className="font-serif text-[36px] font-light leading-[40px] tracking-[-0.9px] text-[#84540C]">
            For Our Brand
          </span>
          <span className="h-px w-8 bg-ink/30" aria-hidden />
        </div>

        <div className="flex items-center gap-4">
          <span className="font-serif text-6xl leading-none text-gold-deep" aria-hidden>
            &ldquo;
          </span>
          <p className="max-w-[27rem] text-body text-ink/70">
            From the Andes to Switzerland, each piece carries a story of heritage, craft, and
            modern refinement.
          </p>
          <span className="font-serif text-6xl leading-none text-gold-deep" aria-hidden>
            &rdquo;
          </span>
        </div>

        <GoldButton className="mt-2">Explore</GoldButton>
      </div>

      <div className="flex justify-center bg-cream px-page-x py-section-y sm:py-section-y-lg">
        <div className="flex w-full max-w-shell flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-30">
          <img
            src={winter}
            alt="Two women wearing baby alpaca winter layers"
            className="aspect-[4/4.6] w-full max-w-[520px] shrink-0 object-cover lg:w-1/2 lg:max-w-none"
          />
          <div className="flex w-full max-w-[420px] flex-col items-start gap-4 text-left">
            <h2 className="max-w-[346px] font-serif text-[35px] font-normal leading-[140%] tracking-[-0.64px] text-[#573400]">
              Winter in Layers
            </h2>
            <p className="text-body font-light text-ink/70">
              Baby alpaca as your second skin.
            </p>
            <ul className="flex flex-col gap-1 text-body font-light text-ink/70">
              <li>&bull; Draped over the shoulders</li>
              <li>&bull; Cinched softly at the waist</li>
              <li>&bull; Wrapped close against the cold</li>
            </ul>
            <button
              type="button"
              className="border-b border-[#573400] pb-1 text-body font-normal text-[#573400]"
            >
              Discover
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center bg-cream px-page-x py-section-y sm:py-section-y-lg">
        <div className="flex w-full max-w-shell flex-col items-center gap-8 lg:flex-row-reverse lg:items-center lg:gap-30">
          <img
            src={softSeason}
            alt="A woman wearing a soft alpaca wrap in Arequipa"
            className="aspect-[4/4.6] w-full max-w-[520px] shrink-0 object-cover lg:w-1/2 lg:max-w-none"
          />
          <div className="flex w-full max-w-[420px] flex-col items-start gap-4 text-left">
            <h2 className="max-w-[346px] font-sans text-[32px] font-normal leading-[140%] tracking-[-0.64px] text-[#573400]">
              Soft Season
            </h2>
            <p className="text-body font-light text-ink/70">
              Light protection for shifting light and cooler air.
            </p>
            <ul className="flex flex-col gap-1 text-body font-light text-ink/70">
              <li>&bull; Effortlessly layered over tailoring</li>
              <li>&bull; Softly structured with a defined silhouette</li>
              <li>&bull; Drawn close in shifting air</li>
            </ul>
            <button
              type="button"
              className="border-b border-[#573400] pb-1 text-body font-normal text-[#573400]"
            >
              Discover
            </button>
          </div>
        </div>
      </div>

      <div className="bg-cream py-13">
        <Newsletter />
      </div>

      <Footer />
    </div>
  );
}
