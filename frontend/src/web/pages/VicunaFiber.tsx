import { Link } from "react-router-dom";
import { Announcement } from "../components/Announcement";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { PublicHeader } from "../components/PublicHeader";
import vicuna from "../assets/vicuna.jpg";
import women from "../assets/women.png";
import men from "../assets/men.png";
import theVicuna from "../assets/the-vicuna.png";

export function VicunaFiber() {
  return (
    <div className="overflow-x-hidden bg-white">
      <Announcement />
      <PublicHeader />

      <PageHero image={vicuna}>
        <span
          className="rounded-full px-4 py-1.5 font-sans text-[12px] font-normal uppercase leading-[18px] tracking-[4px] text-white"
          style={{
            background:
              "linear-gradient(90deg, #996300, #A06900, #A76F00, #AE7500, #B57B00, #BC8100, #C48700, #CB8D00, #D29300, #DA9900, #E1A000, #E8A600, #F0AC00, #F7B300, #FFB900)",
          }}
        >
          Vicu&ntilde;a Collection
        </span>
        <h1 className="mt-2 font-serif text-display uppercase tracking-[0.05em] text-white drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.15)]">
          Vicu&ntilde;a
        </h1>
        <p className="font-futura text-[12px] uppercase tracking-[0.3em] text-white/85">
          The World&rsquo;s Rarest &amp; Finest Fiber
        </p>

        <div className="mt-4 flex items-center gap-6">
          <Link
            to="/category/women"
            className="border-b border-white pb-1 font-sans text-[18px] font-light leading-[27px] tracking-[-0.4px] text-white"
          >
            Explore the Collection
          </Link>
          <Link
            to="/heritage"
            className="border-b border-white pb-1 font-sans text-[18px] font-light leading-[27px] tracking-[-0.4px] text-white"
          >
            The Story of Vicu&ntilde;a
          </Link>
        </div>
      </PageHero>

      <div className="flex flex-col items-center gap-4 bg-sand px-page-x py-section-y text-center sm:py-section-y-lg">
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-ink/30" aria-hidden />
          <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-gold-deep">
            The Crown Jewel
          </span>
          <span className="h-px w-8 bg-ink/30" aria-hidden />
        </div>
        <h2 className="font-serif text-section-title text-[#573400]">
          Why Vicu&ntilde;a is the Crown Jewel of Fibers
        </h2>
        <p className="max-w-[46rem] text-body font-light text-ink/70">
          Sourced from the high Andes, Vicu&ntilde;a is the rarest and finest natural fiber in
          the world &mdash; feather-light, supremely soft, and a true symbol of luxury.
        </p>
        <p className="max-w-none whitespace-nowrap text-body font-light text-ink/70">
          At Munay, we transform the world&rsquo;s finest fiber into refined essentials &mdash;
          explore the collections below.
        </p>

        <div className="mt-16 flex w-full max-w-shell flex-col items-center gap-8 sm:mt-20 lg:ml-24 lg:flex-row lg:items-center lg:gap-24">
          <div className="relative aspect-square w-full max-w-[600px] shrink-0">
            <img src={women} alt="Model wearing a Vicu&ntilde;a wrap" className="absolute inset-0 object-cover" />
            <span
              className="absolute right-4 top-4 rounded-full px-4 py-1.5 font-sans text-[12px] font-normal uppercase leading-[18px] tracking-[4px] text-white"
              style={{
                background:
                  "linear-gradient(90deg, #996300, #A06900, #A76F00, #AE7500, #B57B00, #BC8100, #C48700, #CB8D00, #D29300, #DA9900, #E1A000, #E8A600, #F0AC00, #F7B300, #FFB900)",
              }}
            >
              Vicu&ntilde;a Collection
            </span>
          </div>
          <div className="flex w-full max-w-[420px] flex-col items-start gap-4 text-left">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-ink/30" aria-hidden />
              <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-[#8B6F47]">
                Women
              </span>
            </div>
            <p className="text-body font-light text-ink/70">
              Quiet elegance in its rarest form. Pieces designed to move effortlessly between
              structure and softness. Made in Peru.
            </p>
            <Link
              to="/category/women"
              className="border-b border-ink/60 pb-1 font-serif text-[16px] font-semibold not-italic leading-[24px] tracking-normal text-[#573400]"
            >
              Nahua Scarf
            </Link>
          </div>
        </div>

        <div className="mt-16 flex w-full max-w-shell flex-col items-center gap-8 sm:mt-20 lg:mr-24 lg:flex-row-reverse lg:items-center lg:gap-24">
          <div className="relative aspect-square w-full max-w-[600px] shrink-0">
            <img src={men} alt="Model wearing a Vicu&ntilde;a scarf" className="absolute inset-0 object-cover" />
          </div>
          <div className="flex w-full max-w-[420px] flex-col items-start gap-4 text-left">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-ink/30" aria-hidden />
              <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-[#8B6F47]">
                Men
              </span>
            </div>
            <p className="text-body font-light text-ink/70">
              Essential forms, elevated by exceptional fibre. Understated pieces where
              precision meets softness. Made in Peru.
            </p>
            <Link
              to="/category/men"
              className="border-b border-ink/60 pb-1 font-serif text-[16px] font-semibold not-italic leading-[24px] tracking-normal text-[#573400]"
            >
              &Ntilde;ahua Scarf
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center bg-cream px-page-x py-section-y sm:py-section-y-lg">
        <div className="flex w-full max-w-shell flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16">
          <img
            src={theVicuna}
            alt="A herd of vicu&ntilde;as in the Andes"
            className="aspect-[16/10] w-full max-w-[500px] shrink-0 object-cover lg:w-1/2 lg:max-w-none"
          />
          <div className="flex w-full max-w-[420px] flex-col items-start gap-4 text-left">
            <h2 className="font-serif text-section-title text-ink">The Vicu&ntilde;a</h2>
            <p className="text-body-sm font-light text-ink/70">
              One of the rarest and most precious fibers in the world, vicu&ntilde;a is
              revered for its extraordinary softness and lightness. Harvested sustainably from
              wild vicu&ntilde;as in the Andes, this fiber is incredibly fine, offering
              unmatched warmth without weight. Luxuriously smooth and naturally insulating,
              vicu&ntilde;a represents the pinnacle of refinement &mdash; a true symbol of
              heritage, rarity, and quiet luxury.
            </p>
            <Link
              to="/category/women"
              className="border-b border-gold-deep pb-1 text-btn font-normal normal-case tracking-normal text-gold-deep"
            >
              Explore More
            </Link>
          </div>
        </div>
      </div>

      <div className="h-16 bg-white sm:h-24" aria-hidden />

      <Footer />
    </div>
  );
}
