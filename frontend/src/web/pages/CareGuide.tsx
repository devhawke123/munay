import { Heart } from "lucide-react";
import { Announcement } from "../components/Announcement";
import { Footer } from "../components/Footer";
import { PublicHeader } from "../components/PublicHeader";
import careGuide from "../assets/care-guide.png";

type CareStep = { label: string; body: string };

type CareMaterial = {
  name: string;
  intro: string;
  steps: CareStep[];
};

const careMaterials: CareMaterial[] = [
  {
    name: "Baby Alpaca",
    intro:
      "Naturally soft and delicate, baby alpaca requires gentle care to preserve its texture and structure over time.",
    steps: [
      {
        label: "Hand Wash",
        body: "Best washed by hand in cold water with a mild detergent. Avoid fabric softener. Gently press water out, do not wring. Lay flat to dry.",
      },
      {
        label: "Machine Washing",
        body: "No machine washing. This will destroy your garment.",
      },
      {
        label: "Ironing",
        body: "Rarely needed. If necessary, use low heat and place a cloth between the iron and the garment.",
      },
      {
        label: "Temperature",
        body: "Keep water temperature consistent to avoid felting.",
      },
    ],
  },
  {
    name: "Pima Cotton",
    intro:
      "Light, breathable, and naturally smooth, Pima cotton is easy to care for while maintaining its softness over time.",
    steps: [
      {
        label: "Washing",
        body: "Machine wash at 30°C with similar colours. Use a mild detergent.",
      },
      {
        label: "Drying",
        body: "Air dry when possible to preserve softness and shape.",
      },
      {
        label: "Ironing",
        body: "Can be ironed at medium temperature if needed.",
      },
    ],
  },
  {
    name: "Vicuña",
    intro:
      "Exceptionally rare and delicate, vicuña requires the utmost care to preserve its natural softness and integrity.",
    steps: [
      {
        label: "Cleaning",
        body: "We recommend professional dry cleaning only.",
      },
      {
        label: "Handling",
        body: "Avoid frequent washing. Handle gently and store carefully.",
      },
    ],
  },
];

export function CareGuide() {
  return (
    <div className="overflow-x-hidden bg-white">
      <Announcement />
      <PublicHeader />

      <div className="relative flex h-[70vh] min-h-[420px] items-center justify-center overflow-hidden">
        <img src={careGuide} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative flex flex-col items-center gap-3 px-page-x text-center">
          <p className="max-w-[581px] font-sans text-[16px] font-light leading-[24px] tracking-[0.5px] text-[#FEF3C6]">
            Preserving Your Baby Alpaca, Pima Cotton, and Vicu&ntilde;a
          </p>
          <h1 className="font-serif text-display text-white drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.15)]">
            Take Care of
            <br />
            Your Garments
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 bg-sand px-page-x py-section-y text-center sm:py-section-y-lg">
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-ink/30" aria-hidden />
          <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-gold-deep">
            Care Guide
          </span>
          <span className="h-px w-8 bg-ink/30" aria-hidden />
        </div>
        <p className="max-w-[41rem] text-body font-light text-ink/70">
          Thoughtful care keeps every fiber at its finest. Follow these guidelines to preserve
          the softness, structure, and beauty of each material.
        </p>
      </div>

      <div className="flex justify-center bg-sand px-page-x pb-20 sm:pb-28">
        <div className="flex w-full max-w-shell flex-col gap-8">
          {careMaterials.map((material) => (
            <div
              key={material.name}
              className="flex min-h-[340px] flex-col rounded-[24px] bg-white p-8 shadow-card sm:p-10"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-gold-deep">
                  <Heart size={18} className="fill-white text-white" />
                </span>
                <h3 className="font-serif text-section-title text-ink">{material.name}</h3>
              </div>
              <p className="mt-3 text-body font-light text-ink/60">{material.intro}</p>

              <div className="mt-6 border-t border-ink/10 pt-6">
                <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
                  {material.steps.map((step) => (
                    <div key={step.label} className="flex flex-col gap-1.5 text-left">
                      <p className="text-section-label font-futura font-semibold uppercase tracking-[0.15em] text-gold-deep">
                        {step.label}
                      </p>
                      <p className="text-body-sm font-light text-ink/70">{step.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
