import { ArrowRight } from "lucide-react";
import founder from "../assets/founder.png";

export function Founder() {
  return (
    <div className="flex justify-center bg-cream px-page-x py-section-y sm:py-section-y-lg">
      <div className="flex w-full max-w-shell flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16">
        <img
          src={founder}
          alt="Stella Enriquez, founder of Munay"
          className="aspect-[640/800] w-full shrink-0 object-cover sm:max-w-[500px] lg:h-[800px] lg:w-[640px] lg:max-w-none"
        />
        <div className="flex w-full max-w-[500px] flex-col items-start gap-5 sm:gap-8">
          <p className="text-section-label font-semibold uppercase text-ink/60">Our Beginning</p>
          <h2 className="font-serif text-display text-ink">
            From the
            <br />
            Founder
          </h2>
          <div className="flex flex-col gap-4 text-body font-light text-ink/80 sm:gap-6">
            <p>
              Munay means &ldquo;love&rdquo; in Quechua. Inspired by my grandmother Lita, we
              create timeless pieces with care between Peru and Switzerland.
            </p>
            <p>
              Every collection reflects generations of craftsmanship, ethical production, and the
              enduring beauty of natural fibers. Our approach is quiet, intentional, and deeply
              rooted in the landscapes that shape our materials.
            </p>
          </div>
          <p className="font-serif text-signature italic text-ink">Stella Enriquez</p>
          <a
            href="#"
            className="flex items-center gap-2 border-b border-ink pb-1 text-btn font-medium uppercase text-ink"
          >
            Read Our Story
            <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
