import { Hand, Leaf, Mountain } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const pillars: { number: string; title: string; icon: LucideIcon; body: string }[] = [
  {
    number: "01",
    title: "Purpose",
    icon: Leaf,
    body: "Our ambition is to honour traditional craftsmanship while redefining it for modern life. We focus on quality, natural materials, and thoughtful details, creating pieces that feel timeless, meaningful, and made to last.",
  },
  {
    number: "02",
    title: "Roots",
    icon: Mountain,
    body: "Our work is rooted in Peru, where generations of artisans have preserved ancestral techniques and a deep respect for craft. Drawing from this heritage, we collaborate closely with local communities to create contemporary pieces that celebrate tradition while embracing modern design.",
  },
  {
    number: "03",
    title: "People",
    icon: Hand,
    body: "Born from a shared respect for craftsmanship and conscious creation, our brand is the result of a close collaboration built on trust, values, and a love for well-made objects. Inspired by the skill, patience, and knowledge of Peruvian artisans, we set out to create a brand that values people as much as products.",
  },
];

export function Philosophy() {
  return (
    <div className="flex flex-col items-center gap-10 bg-cream px-4 py-16 sm:gap-16 sm:px-12 sm:py-24 lg:gap-24 lg:px-24 lg:py-32">
      <div className="flex max-w-[600px] flex-col items-center gap-4 text-center">
        <p className="text-xs font-medium uppercase tracking-[3.6px] text-ink">Our Philosophy</p>
        <h2 className="font-serif text-3xl text-ink sm:text-4xl lg:text-5xl">
          Crafted With Purpose.
        </h2>
        <p className="text-base text-ink/60 sm:text-lg">
          Every piece we create reflects our commitment to craftsmanship, timeless design, and
          meaningful human connection.
        </p>
      </div>

      <div className="grid w-full max-w-[1440px] grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8 lg:gap-12">
        {pillars.map(({ number, title, icon: Icon, body }) => (
          <div key={title} className="relative flex flex-col gap-4 overflow-hidden sm:gap-8">
            <div className="flex items-center gap-4">
              <Icon size={14} className="text-ink" />
              <span className="text-[11px] font-medium tracking-[3.3px] text-ink/50">
                {number}
              </span>
            </div>
            <h3 className="font-serif text-3xl text-ink sm:text-4xl lg:text-5xl">{title}</h3>
            <p className="text-base font-light leading-[1.7] text-ink/60 sm:text-lg sm:leading-[1.8]">
              {body}
            </p>
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -left-2 select-none whitespace-nowrap text-[80px] font-bold uppercase tracking-tighter text-ink/[0.04] sm:-bottom-10 sm:-left-4 sm:text-[110px] lg:text-[140px]"
            >
              {title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
