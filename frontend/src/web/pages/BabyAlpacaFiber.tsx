import { Link } from "react-router-dom";
import { Announcement } from "../components/Announcement";
import { Footer } from "../components/Footer";
import { PublicHeader } from "../components/PublicHeader";
import babyAlpacaFiber from "../assets/baby-alpaca-fiber.png";
import theFiber from "../assets/the-fiber.png";
import apollo11Mission from "../assets/apollo-11-mission.png";
import huacaya from "../assets/huacaya.png";
import suri from "../assets/suri.jpg";

const naturalPalette = [
  "#EDE6DC",
  "#E3D6C4",
  "#D9C6AC",
  "#CDB08C",
  "#C29F76",
  "#B58B5D",
  "#A97C4C",
  "#8B633B",
  "#74502E",
  "#603F22",
  "#4C3018",
  "#3F2A1C",
  "#34211A",
  "#2A1912",
  "#C8C3BC",
  "#ADA79E",
  "#96908A",
  "#7C7772",
  "#625E5A",
  "#464341",
  "#2C2A28",
  "#0E0D0C",
];

const exceptionalProperties = [
  { label: "Thermoregulating", body: "Adapts to temperature, warm yet breathable" },
  { label: "Hypoallergenic", body: "Gentle on sensitive skin" },
  { label: "No Pilling", body: "Maintains pristine appearance" },
  { label: "Odor Resistant", body: "Natural properties repel odors" },
  { label: "Lightweight", body: "Superior insulation, minimal weight" },
  { label: "Flame Resistant", body: "Self-extinguishing properties" },
  { label: "Highly Durable", body: "4x stronger than sheep's wool" },
  { label: "Elastic", body: "Retains shape perfectly" },
  { label: "Gentle Grazing", body: "Soft padded feet prevent soil erosion" },
  { label: "Regenerative Feeding", body: "Nibble grass tips, allowing natural regeneration" },
  { label: "Chemical-Free Processing", body: "No treatments needed, 22 natural colors" },
  { label: "100% Biodegradable", body: "Returns to earth with no synthetic residue" },
];

type AlpacaBreed = {
  name: string;
  image: string;
  badge: string;
  description: string;
  facts: { label: string; value: string }[];
};

const alpacaBreeds: AlpacaBreed[] = [
  {
    name: "Huacaya",
    image: huacaya,
    badge: "93% of Market",
    description:
      "The Huacaya's fur has the appearance of a voluminous-looking fiber. It is the most prevalent breed, distinguished by its voluminous, crimped fleece that creates a cloud-like appearance. The fiber's natural crimp provides exceptional warmth.",
    facts: [
      { label: "Texture", value: "Fluffy & voluminous" },
      { label: "Characteristic", value: "Natural crimp structure" },
      { label: "Properties", value: "Superior insulation" },
    ],
  },
  {
    name: "Suri",
    image: suri,
    badge: "7% — Luxury Rarity",
    description:
      "The Suri has an atypical appearance as their fur hangs down to form long dreadlocks. Their wool is shinier, wavier and above all, rarer than the Huacaya's. It is an exceptionally rare breed with lustrous fiber hanging in elegant pencil-like locks, prized for its natural sheen and silk-like drape.",
    facts: [
      { label: "Texture", value: "Silky lustrous locks" },
      { label: "Characteristic", value: "Dreadlock structure" },
      { label: "Properties", value: "Exceptional drape" },
    ],
  },
];

export function BabyAlpacaFiber() {
  return (
    <div className="overflow-x-hidden bg-white">
      <Announcement />
      <PublicHeader />

      <div className="relative flex h-[70vh] min-h-[420px] items-center justify-center overflow-hidden">
        <img src={babyAlpacaFiber} alt="" className="absolute inset-0 size-full object-cover" />
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
            Baby Alpaca Fiber
          </span>
          <span className="h-px w-8 bg-ink/30" aria-hidden />
        </div>
        <p className="max-w-[46rem] text-body font-light text-ink/70">
          Living between 3,000 and 4,500 meters above sea level in the Andes Cordilleras,
          alpacas possess an extraordinary capacity to endure climatic variations of up to 30
          degrees between day and night.
        </p>

        <div className="mt-16 flex w-full max-w-shell flex-col items-center gap-8 sm:mt-20 lg:flex-row lg:items-center lg:gap-16">
          <img
            src={theFiber}
            alt="Alpacas grazing in a pasture"
            className="aspect-[4/3] w-full max-w-[500px] shrink-0 object-cover lg:w-1/2 lg:max-w-none"
          />
          <div className="flex w-full max-w-[460px] flex-col items-start gap-5 text-left">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-ink/30" aria-hidden />
              <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-gold-deep">
                Heritage
              </span>
              <span className="h-px w-8 bg-ink/30" aria-hidden />
            </div>
            <h2 className="font-serif text-section-title text-ink">The Fiber of the Gods</h2>
            <p className="text-body font-light text-ink/70">
              Bred by the ancient Incas and revered as the animal of the gods, alpaca fiber
              was not merely a textile &mdash; it was a symbol of divine favor and earthly
              power. Reserved exclusively for emperors and nobility, this extraordinary fiber
              was woven into garments that signified sovereignty itself. The Incas understood
              what modern science has since confirmed.
            </p>
            <p className="font-serif text-lg italic text-gold-deep">
              &ldquo;A legacy of warmth, woven through centuries of Andean heritage.&rdquo;
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 bg-[#DFDAD3A8] px-page-x py-section-y text-center sm:py-section-y-lg">
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-ink/30" aria-hidden />
          <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-gold-deep">
            Types of Alpaca
          </span>
          <span className="h-px w-8 bg-ink/30" aria-hidden />
        </div>
        <h2 className="font-serif text-section-title text-ink">Two Breeds, One Excellence</h2>
        <p className="max-w-[32rem] text-body font-light text-ink/70">
          Each alpaca breed offers distinct characteristics, yet both produce fiber of
          unparalleled quality.
        </p>

        <div className="mt-12 grid w-full max-w-shell grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2">
          {alpacaBreeds.map((breed) => (
            <div key={breed.name} className="overflow-hidden rounded-[14px] bg-white text-left shadow-card">
              <div className="relative aspect-[16/10] w-full">
                <img src={breed.image} alt={breed.name} className="absolute inset-0 size-full object-cover" />
                <span className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-[10px] font-futura font-semibold uppercase tracking-[0.1em] text-white">
                  {breed.badge}
                </span>
              </div>

              <div className="flex flex-col gap-4 p-6">
                <h3 className="font-serif text-section-title text-ink">{breed.name}</h3>
                <p className="text-body-sm font-light text-ink/70">{breed.description}</p>

                <div className="flex flex-col gap-3 border-t border-ink/10 pt-4">
                  {breed.facts.map((fact) => (
                    <div key={fact.label} className="flex items-center justify-between gap-4">
                      <span className="text-section-label font-futura uppercase tracking-[0.15em] text-ink/50">
                        {fact.label}
                      </span>
                      <span className="text-body-sm font-medium text-ink">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-[820px] font-sans text-[16px] font-light leading-[27px] tracking-normal text-center text-ink/70 sm:mt-16">
          <span className="font-sans text-[16px] font-medium leading-[27px] tracking-normal text-gold-deep">Key Market Fact:</span> Today, 93% of
          alpaca fiber on the market is Huacaya because they represent 98% of the worldwide
          alpaca population, making the Suri a true luxury rarity.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 bg-sand px-page-x py-section-y text-center sm:py-section-y-lg">
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-ink/30" aria-hidden />
          <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-gold-deep">
            Definition
          </span>
          <span className="h-px w-8 bg-ink/30" aria-hidden />
        </div>
        <h2 className="font-serif text-section-title text-ink">What Is Baby Alpaca?</h2>
        <p className="max-w-[42rem] text-body font-light text-ink/70">
          Measuring between 16 and 25 microns in diameter, baby alpaca fiber is harvested from
          the softest part of the animal &mdash; the delicate underside of the neck. This
          represents merely 10% of each shearing, making it extraordinarily precious.
        </p>
        <p className="max-w-[42rem] text-body font-light text-ink/70">
          A common misconception: &ldquo;baby alpaca&rdquo; does not refer to the animal&rsquo;s
          age. Rather, it denotes the <em className="italic">exceptional fineness</em> of the
          fiber itself.
        </p>

        <div className="mt-8 grid w-full max-w-[36rem] grid-cols-3 gap-6 border-t border-ink/15 pt-8 sm:mt-10">
          <div className="flex flex-col items-center gap-1">
            <p className="font-serif text-3xl text-ink">16&ndash;25</p>
            <p className="text-section-label font-futura uppercase tracking-[0.15em] text-ink/50">
              Microns Diameter
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="font-serif text-3xl text-ink">10%</p>
            <p className="text-section-label font-futura uppercase tracking-[0.15em] text-ink/50">
              Per Shearing
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="font-serif text-3xl text-ink">1x</p>
            <p className="text-section-label font-futura uppercase tracking-[0.15em] text-ink/50">
              Annually
            </p>
          </div>
        </div>

        <p className="mt-4 font-serif text-lg italic text-gold-deep">
          &ldquo;Among the finest natural fibers in the world.&rdquo;
        </p>
      </div>

      <div className="flex justify-center bg-cream px-page-x py-section-y sm:py-section-y-lg">
        <div className="flex w-full max-w-shell flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="flex w-full max-w-[560px] flex-col items-start gap-4 text-left">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-ink/30" aria-hidden />
              <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-gold-deep">
                Apollo 11 Mission
              </span>
            </div>
            <h2 className="font-serif text-[54px] font-normal leading-[56.7px] tracking-normal text-[#2C2A28]">
              Why NASA Chose Alpaca Fiber
            </h2>
            <p className="font-sans text-[17px] font-light leading-[31.45px] tracking-normal text-[#2C2A28B3]">
              When NASA selected materials for the Apollo 11 mission, they turned to one of
              Earth&rsquo;s oldest textiles. The choice was both practical and profound.
            </p>
            <p className="font-sans text-[17px] font-light leading-[31.45px] tracking-normal text-[#2C2A28B3]">
              Alpaca fiber met every critical requirement: extraordinarily lightweight for
              payload efficiency, thermoregulating across extreme temperature variations,
              naturally flame-resistant, and gentle enough for prolonged skin contact.
            </p>
            <p className="font-sans text-[14px] font-normal uppercase leading-[21px] tracking-[1.4px] text-[#886F47]">
              What ancient Incas knew instinctively, modern aerospace engineering confirmed
              scientifically.
            </p>
          </div>

          <img
            src={apollo11Mission}
            alt="Astronaut Buzz Aldrin on the Moon during the Apollo 11 mission"
            className="w-full max-w-[500px] shrink-0 object-cover object-top lg:mr-6 lg:h-[460px]"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 bg-sand px-page-x py-section-y text-center sm:py-section-y-lg">
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-ink/30" aria-hidden />
          <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-gold-deep">
            Excellence
          </span>
          <span className="h-px w-8 bg-ink/30" aria-hidden />
        </div>
        <h2 className="font-serif text-section-title text-ink">Exceptional Properties</h2>
        <p className="text-body font-light text-ink/70">
          Nature engineered perfection into every fiber.
        </p>

        <div className="mt-8 grid w-full max-w-shell grid-cols-1 sm:grid-cols-3">
          {exceptionalProperties.map((property, index) => (
            <div
              key={property.label}
              className={`flex items-start gap-3 border-t border-ink/10 py-5 text-left sm:px-8 ${
                index < 3 ? "sm:border-t-0" : ""
              }`}
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-deep" aria-hidden />
              <div className="flex flex-col gap-1">
                <p className="text-body-sm font-medium text-ink">{property.label}</p>
                <p className="text-body-sm font-light text-ink/60">{property.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-4 sm:mt-16">
          <span className="h-px w-8 bg-ink/30" aria-hidden />
          <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-gold-deep">
            Natural Spectrum
          </span>
          <span className="h-px w-8 bg-ink/30" aria-hidden />
        </div>
        <h2 className="font-serif text-section-title text-ink">Nature&rsquo;s Palette</h2>
        <p className="text-body font-light text-ink/70">
          Twenty-two naturally occurring colors, from snow white to deepest charcoal.
        </p>

        <div className="mt-8 grid w-full max-w-[900px] grid-cols-11 overflow-hidden rounded-[6px]">
          {naturalPalette.map((color, index) => (
            <span key={index} className="aspect-square w-full" style={{ backgroundColor: color }} />
          ))}
        </div>

        <div className="mt-8 flex items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <p className="font-serif text-[36px] font-medium leading-[54px] tracking-normal text-[#2C2A28]">22</p>
            <p className="text-section-label font-futura uppercase tracking-[0.15em] text-ink/50">
              Natural Shades
            </p>
          </div>
          <span className="h-10 w-px bg-ink/15" aria-hidden />
          <div className="flex flex-col items-center gap-1">
            <p className="font-serif text-[36px] font-medium leading-[54px] tracking-normal text-[#2C2A28]">0</p>
            <p className="text-section-label font-futura uppercase tracking-[0.15em] text-ink/50">
              Synthetic Dyes
            </p>
          </div>
        </div>

        <p className="mt-4 max-w-none whitespace-nowrap font-serif-alt text-[22px] font-normal italic leading-[33px] tracking-normal text-center text-[#886F47]">
          No dyes. No chemicals. Only nature&rsquo;s artistry.
        </p>
      </div>

      <div className="flex flex-col items-center gap-5 bg-sand px-page-x pt-section-y-lg pb-36 text-center">
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

      <Footer />
    </div>
  );
}
