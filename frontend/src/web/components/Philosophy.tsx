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
    <div className="flex flex-col items-center gap-24 bg-cream px-12 py-32 md:px-24">
      <div className="flex max-w-[600px] flex-col items-center gap-4 text-center">
        <p className="text-xs font-medium uppercase tracking-[3.6px] text-ink">Our Philosophy</p>
        <h2 className="font-serif text-5xl text-ink">Crafted With Purpose.</h2>
        <p className="text-lg text-ink/60">
          Every piece we create reflects our commitment to craftsmanship, timeless design, and
          meaningful human connection.
        </p>
      </div>

      <div className="grid w-full max-w-[1440px] grid-cols-3 gap-12">
        {pillars.map(({ number, title, icon: Icon, body }) => (
          <div key={title} className="relative flex flex-col gap-8 overflow-hidden">
            <div className="flex items-center gap-4">
              <Icon size={14} className="text-ink" />
              <span className="text-[11px] font-medium tracking-[3.3px] text-ink/50">
                {number}
              </span>
            </div>
            <h3 className="font-serif text-5xl text-ink">{title}</h3>
            <p className="text-lg font-light leading-[1.8] text-ink/60">{body}</p>
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-10 -left-4 select-none whitespace-nowrap text-[140px] font-bold uppercase tracking-tighter text-ink/[0.04]"
            >
              {title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
