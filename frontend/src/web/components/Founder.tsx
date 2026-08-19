import { ArrowRight } from "lucide-react";
import founder from "../assets/founder.png";

export function Founder() {
  return (
    <div className="flex items-center gap-34 bg-cream px-12 py-32 xl:px-64">
      <img
        src={founder}
        alt="Stella Enriquez, founder of Munay"
        className="h-[800px] w-[640px] shrink-0 object-cover"
      />
      <div className="flex max-w-[50%] flex-col items-start gap-10">
        <p className="text-[11px] font-semibold uppercase tracking-[2.2px] text-ink/60">
          Our Beginning
        </p>
        <h2 className="font-serif text-6xl leading-[1.1] text-ink">
          From the
          
          Founder
        </h2>
        <div className="flex flex-col gap-6 text-base font-light text-ink/80">
          <p>
            Munay means &ldquo;love&rdquo; in Quechua. Inspired by my grandmother Lita, we create
            timeless pieces with care between Peru and Switzerland.
          </p>
          <p>
            Every collection reflects generations of craftsmanship, ethical production, and the
            enduring beauty of natural fibers. Our approach is quiet, intentional, and deeply
            rooted in the landscapes that shape our materials.
          </p>
        </div>
        <p className="font-serif text-3xl italic text-ink">Stella Enriquez</p>
        <a
          href="#"
          className="flex items-center gap-2 border-b border-ink pb-1 text-[13px] font-medium uppercase tracking-[1.3px] text-ink"
        >
          Read Our Story
          <ArrowRight size={12} />
        </a>
      </div>
    </div>
  );
}
