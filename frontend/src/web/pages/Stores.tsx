import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { useState } from "react";
import { Announcement } from "../components/Announcement";
import { Footer } from "../components/Footer";
import { GoldButton } from "../components/GoldButton";
import { Newsletter } from "../components/Newsletter";
import { PageHero } from "../components/PageHero";
import { PublicHeader } from "../components/PublicHeader";
import stores from "../assets/stores.jpg";
import prunelle from "../assets/prunelle.png";
import fleurs from "../assets/fleurs.png";

const boutiqueDetails = [
  {
    image: prunelle,
    name: "Boutique Prunelle",
    description:
      "At the heart of Carouge, you'll find Munay's scarves and pullovers resting quietly, waiting to be discovered. A boutique that celebrates quality and emotion, just like us.",
    addressLine1: "Place du Marché 3, 1227",
    addressLine2: "Carouge",
    phone: "+41 76 382 33 19",
    hours: "Mon–Sat: 10h–19h",
  },
  {
    image: fleurs,
    name: "Boutique Au-delà des Fleurs",
    description:
      "A poetic corner at the heart of Troinex where flowers meet fine textures and natural fibers. Here, Munay blends with scent, softness and poetry.",
    addressLine1: "Chemin de la Grand-Cour 4, 1256",
    addressLine2: "Troinex",
    phone: "+41 76 382 33 19",
    hours: "Mon–Sat: 9h–12h, 14h–18h",
  },
];

export function Stores() {
  const [selectedName, setSelectedName] = useState(boutiqueDetails[0].name);

  return (
    <div className="overflow-x-hidden bg-white">
      <Announcement />
      <PublicHeader />

      <PageHero image={stores} imageClassName="object-[50%_90%]">
        <p className="font-futura text-section-label uppercase tracking-[0.3em] text-white">
          Stores
        </p>
        <h1 className="font-serif text-display text-white drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.15)]">
          Where Munay Lives
        </h1>
        <p className="max-w-[40rem] text-body-sm font-light text-white/85">
          Our pieces are available in a selection of carefully chosen boutiques. Each
          location reflects the same values of quality, emotion and authenticity that
          define Munay
        </p>
      </PageHero>

      <div className="flex flex-col items-center gap-8 bg-cream px-page-x py-section-y sm:py-section-y-lg">
        <div className="flex w-full flex-col items-center gap-6">
          <h2 className="font-serif text-[32px] font-normal leading-[32px] tracking-normal text-center text-[#2C2A2899]">
            {selectedName}
          </h2>
          <div className="flex aspect-[927/478] w-full max-w-[927px] items-center justify-center rounded-[8px] border border-ink/10 bg-sand">
            <div className="flex flex-col items-center gap-2 text-ink/40">
              <MapPin size={28} />
              <p className="text-body-sm font-light">Map coming soon</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid w-full max-w-shell grid-cols-1 gap-8 sm:mt-25 sm:grid-cols-2">
          {boutiqueDetails.map((boutique) => {
            const isSelected = boutique.name === selectedName;
            return (
            <div
              key={boutique.name}
              onClick={() => setSelectedName(boutique.name)}
              className={`cursor-pointer overflow-hidden rounded-[12px] border bg-white text-left shadow-card ${
                isSelected ? "border-gold-deep" : "border-ink/10"
              }`}
            >
              <img src={boutique.image} alt={boutique.name} className="aspect-[4/2.4] w-full object-cover" />
              <div className="flex flex-col gap-3 p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-xl text-ink">{boutique.name}</h3>
                  {isSelected && (
                    <span className="shrink-0 rounded-full bg-gold-deep px-3 py-1 font-[Arial] text-[12px] font-normal leading-[16px] tracking-normal text-white">
                      Selected
                    </span>
                  )}
                </div>
                <p className="text-body-sm font-light text-ink/60">{boutique.description}</p>

                <div className="flex flex-col gap-2 pt-1">
                  <div className="flex items-start gap-2 text-body-sm text-ink/70">
                    <MapPin size={15} className="mt-0.5 shrink-0 text-gold-deep" />
                    <span>
                      {boutique.addressLine1}
                      <br />
                      {boutique.addressLine2}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-body-sm text-ink/70">
                    <Phone size={15} className="shrink-0 text-gold-deep" />
                    <span>{boutique.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-body-sm text-ink/70">
                    <Clock size={15} className="shrink-0 text-gold-deep" />
                    <span>{boutique.hours}</span>
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center gap-2 rounded-[8px] border border-ink/15 py-2.5 text-body-sm font-medium text-ink"
                  >
                    <MapPin size={14} />
                    View on Map
                  </button>
                  <GoldButton
                    onClick={(e) => e.stopPropagation()}
                    className="!py-2.5 gap-2 rounded-[8px] !text-body-sm normal-case tracking-normal"
                  >
                    <Navigation size={14} />
                    Directions
                  </GoldButton>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        <p className="mt-16 max-w-[987px] font-serif text-[24px] font-normal italic leading-[32px] tracking-normal text-center text-[#2C2A28] sm:mt-16">
          &ldquo;Munay is a Swiss&ndash;Peruvian maison rooted in the craftsmanship of the
          Andes. Each boutique that carries our pieces shares our commitment to authenticity,
          softness and lasting quality&rdquo;
        </p>
      </div>

      <div className="bg-cream py-13">
        <Newsletter />
      </div>

      <Footer />
    </div>
  );
}
