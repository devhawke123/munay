import { Link } from "react-router-dom";
import { Announcement } from "../components/Announcement";
import { Footer } from "../components/Footer";
import { PublicHeader } from "../components/PublicHeader";
import pimaCotton from "../assets/pima-cotton.png";
import pimaCotton1 from "../assets/pima-cotton1.png";
import container1 from "../assets/Container1.png";
import container2 from "../assets/Container2.png";
import aboutPima from "../assets/about-pima.jpg";

const pimaCategories = [
  {
    image: container1,
    badge: "Men",
    caption: "Draping the Q'UNI Shawl",
    title: "Essential forms, refined through material.",
    body: "Clean lines and breathable textures come together in pieces designed for ease, comfort and understated elegance.",
  },
  {
    image: container2,
    badge: "Women",
    caption: "",
    title: "Soft structure, effortless movement.",
    body: "Designed for everyday wear, these pieces combine lightness and refinement with natural comfort shaped into timeless silhouettes.",
  },
];

export function PimaCotton() {
  return (
    <div className="overflow-x-hidden bg-white">
      <Announcement />
      <PublicHeader />

      <div className="relative flex h-[70vh] min-h-[420px] items-center justify-center overflow-hidden">
        <img src={pimaCotton} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative flex flex-col items-center gap-3 px-page-x text-center">
          <p className="font-sans text-[12px] font-normal uppercase leading-[18px] tracking-[4px] text-white/80">
            Baby Alpaca Fiber
          </p>
          <h1 className="font-serif text-display text-white drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.15)]">
            The rarest softness nature
            <br />
            ever created.
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 bg-sand px-page-x py-section-y text-center sm:py-section-y-lg">
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-ink/30" aria-hidden />
          <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-gold-deep">
            Pima Cotton
          </span>
          <span className="h-px w-8 bg-ink/30" aria-hidden />
        </div>
        <p className="max-w-[50rem] text-body font-light text-ink/70">
          Grown in the lush coastal valleys of northern Peru, Pima cotton possesses an
          extraordinary capacity to produce a fiber of unparalleled length and strength.
          Renowned for its silk-like handle and durability, it thrives in a unique microclimate
          where the rich soil and perfect humidity create a textile found nowhere else on
          Earth.
        </p>

        <div className="mt-16 flex w-full max-w-shell flex-col items-center gap-8 sm:mt-20 lg:flex-row lg:items-center lg:gap-16">
          <img
            src={pimaCotton1}
            alt="Pima cotton branch"
            className="aspect-[4/3] w-full max-w-[500px] shrink-0 object-cover lg:w-1/2 lg:max-w-none"
          />
          <div className="flex w-full max-w-[560px] flex-col items-start gap-4 text-left">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-ink/30" aria-hidden />
              <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-gold-deep">
                Heritage
              </span>
              <span className="h-px w-8 bg-ink/30" aria-hidden />
            </div>
            <h2 className="font-serif text-section-title text-ink">The Fiber of the Gods</h2>
            <p className="max-w-[560px] font-sans text-[17px] font-light leading-[31.45px] tracking-normal text-[#2C2A28B3]">
              Grown along the northern coast of Peru, Pima cotton is prized for its
              extra-long fibres, giving it a naturally smooth texture and lasting softness.
            </p>
            <p className="max-w-[560px] font-sans text-[17px] font-light leading-[31.45px] tracking-normal text-[#2C2A28B3]">
              Light, breathable, and gentle on the skin, it offers everyday comfort with a
              refined finish &mdash; a quiet essential, elevated through material.
            </p>
            <button
              type="button"
              className="mt-2 border-b border-ink pb-1 font-sans text-[13px] font-normal uppercase leading-[19.5px] tracking-[1.4px] text-[#2C2A28]"
            >
              Explore
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 bg-[#DFDAD3A8] px-page-x py-section-y text-center sm:py-section-y-lg">
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-ink/30" aria-hidden />
          <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-gold-deep">
            Types of Pima Cotton
          </span>
          <span className="h-px w-8 bg-ink/30" aria-hidden />
        </div>
        <h2 className="font-serif text-section-title text-ink">Two Categories, One Excellence</h2>
        <p className="max-w-[46rem] text-body font-light text-ink/70">
          Pima cotton is known for its exceptional softness, strength, and durability &mdash;
          making it a preferred choice for high-quality apparel.
        </p>

        <div className="mt-12 grid w-full max-w-shell grid-cols-1 gap-10 sm:mt-16 sm:grid-cols-2">
          {pimaCategories.map((category) => (
            <div key={category.badge} className="flex flex-col items-start gap-4 text-left">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={category.image}
                  alt={category.badge}
                  className="absolute inset-0 size-full object-cover"
                />
                <span className="absolute left-4 top-4 text-section-label font-futura font-medium uppercase tracking-[0.2em] text-white">
                  {category.badge}
                </span>
                {category.caption && (
                  <span className="absolute bottom-4 left-4 whitespace-nowrap font-sans text-[13px] font-light italic leading-[19.5px] tracking-normal text-white/90">
                    {category.caption}
                  </span>
                )}
              </div>

              <h3 className="font-serif text-2xl text-ink">{category.title}</h3>
              <p className="text-body-sm font-light text-ink/70">{category.body}</p>

              <button
                type="button"
                className="border-b border-ink pb-1 font-sans text-[13px] font-normal uppercase leading-[19.5px] tracking-[1.4px] text-[#2C2A28]"
              >
                Discover
              </button>
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-[820px] font-sans text-[16px] font-light leading-[27px] tracking-normal text-center text-ink/70 sm:mt-16">
          <span className="font-sans text-[16px] font-medium leading-[27px] tracking-normal text-gold-deep">Key Market Fact:</span> From the
          Peruvian coast to everyday essentials, Pima cotton reflects a balance between
          simplicity, comfort, and refinement.
        </p>
      </div>

      <div className="flex justify-center bg-sand px-page-x pt-section-y pb-32 sm:pt-section-y-lg sm:pb-40">
        <div className="flex w-full max-w-shell flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16">
          <img
            src={aboutPima}
            alt="A woman with an alpaca"
            className="aspect-[4/3] w-full max-w-[500px] shrink-0 object-cover lg:w-1/2 lg:max-w-none"
          />
          <div className="flex w-full max-w-[560px] flex-col items-start gap-4 text-left">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-ink/30" aria-hidden />
              <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-gold-deep">
                About Pima
              </span>
            </div>
            <h2 className="font-serif text-section-title text-ink">What Is Pima Cotton?</h2>
            <p className="font-sans text-[17px] font-light leading-[31.45px] tracking-normal text-[#2C2A28B3]">
              Pima cotton is a high-end, extra-long staple (ELS) cotton variety known for its
              exceptional softness, strength, and durability, often used in luxury clothing
              and linens. It has longer fibers than common cotton, resulting in smoother, more
              breathable fabrics that resist pilling and last for years.
            </p>
            <p className="max-w-none whitespace-nowrap font-serif-alt text-[22px] font-normal italic leading-[33px] tracking-normal text-[#8B6F47]">
              &ldquo;Among the finest natural fibers in the world.&rdquo;
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-5 bg-cream px-page-x pt-section-y-lg pb-36 text-center">
        <h2 className="max-w-[46rem] font-serif text-section-title text-ink">
          Nature perfected comfort long before we did.
        </h2>
        <p className="max-w-[50rem] text-body font-light text-ink/70">
          For centuries, artisans have transformed this extraordinary fiber into garments of
          enduring beauty. Each piece tells a story of ancient heritage, sustainable practices,
          and uncompromising quality.
        </p>

        <Link
          to="/category/women"
          className="mt-4 inline-flex items-center justify-center border border-ink px-8 py-btn-y font-sans text-[13px] font-normal uppercase leading-[19.5px] tracking-[1.4px] text-[#2C2A28]"
        >
          Explore Our Collection
        </Link>

        <p className="mt-2 text-body-sm font-light text-ink/60">
          Note &mdash; For fibre care, visit our{" "}
          <Link to="/care-guide" className="font-medium text-gold-deep underline">
            Care Guide
          </Link>
        </p>
      </div>

      <div className="h-16 bg-white sm:h-24" aria-hidden />

      <Footer />
    </div>
  );
}
