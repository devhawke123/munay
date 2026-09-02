import { Announcement } from "../components/Announcement";
import { Footer } from "../components/Footer";
import { Newsletter } from "../components/Newsletter";
import { PageHero } from "../components/PageHero";
import { PublicHeader } from "../components/PublicHeader";
import roots from "../assets/munay-roots.png";
import aGift from "../assets/a-gift.jpg";
import moreThanAFiber from "../assets/more-than-a-fiber.png";
import ourMission from "../assets/our-mission.png";

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-8 bg-ink/30" aria-hidden />
      <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-gold-deep">
        {children}
      </span>
      <span className="h-px w-8 bg-ink/30" aria-hidden />
    </div>
  );
}

export function OurStory() {
  return (
    <div className="overflow-x-hidden bg-white">
      <Announcement />
      <PublicHeader />

      <PageHero image={roots} overlayClassName="bg-black/35">
        <p className="font-futura text-section-label uppercase tracking-[0.3em] text-white">
          The Founder
        </p>
        <h1 className="font-serif text-display text-white drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.15)]">
          Munay&rsquo;s Roots
        </h1>
      </PageHero>

      <div className="flex justify-center bg-sand px-page-x py-section-y sm:py-section-y-lg">
        <p className="max-w-[52rem] indent-8 text-center font-serif text-[clamp(1.125rem,2vw,1.5rem)] leading-[1.6] text-ink/80">
          My Peruvian heritage roots me deeply in the culture where alpaca fiber intertwines
          seamlessly with my childhood memories. Handcrafted pullovers adorned with intricate
          figures, gloves, and hats woven from llama or alpaca fiber were cherished staples of
          my upbringing. These garments evoke memories of warmth, a profound connection to
          nature, and, above all, a deep sense of heritage and tradition.
        </p>
      </div>

      <div className="flex justify-center bg-sand px-page-x pb-section-y sm:pb-section-y-lg">
        <div className="flex w-full max-w-shell flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16">
          <img
            src={aGift}
            alt="Skeins of dyed alpaca yarn drying"
            className="aspect-[4/3] w-full max-w-[500px] shrink-0 object-cover lg:w-1/2 lg:max-w-none"
          />
          <div className="flex w-full max-w-[420px] flex-col items-start gap-5">
            <SectionLabel>A Gift</SectionLabel>
            <h2 className="font-serif text-section-title text-ink">A Gift of Heritage</h2>
            <p className="text-body font-light text-ink/70">
              But who introduced me to the wonders of alpaca fiber? It was my grandmother.
              Whenever I visited her, she would always surprise me with a gift, sometimes a
              garment made from alpaca fiber. She was a woman of great generosity that extended
              beyond material gifts. She taught me words in Quechua, the indigenous language of
              Peru. This is why each product bears a Quechua name as a homage to her.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 bg-cream px-page-x py-section-y text-center sm:py-section-y-lg">
        <SectionLabel>The Meaning</SectionLabel>
        <h2 className="font-serif text-section-title text-ink">More Than Fiber</h2>
        <div className="flex max-w-[42rem] flex-col gap-5 text-body font-light text-ink/70">
          <p>
            Beyond its physical properties, alpaca fiber carries immense significance in
            Peruvian life. It symbolises not only economic sustenance but also cultural
            preservation, environmental stewardship, and personal identity for those involved
            in its production.
          </p>
          <p>
            This fiber embodies the intricate tapestry of Peru&rsquo;s economy, culture, and
            environmental landscapes, weaving together threads of tradition and resilience.
          </p>
        </div>

        <img
          src={moreThanAFiber}
          alt="Alpacas in the Andes"
          className="mt-10 aspect-[20/10] w-full max-w-[90rem] object-cover sm:mt-16"
        />
      </div>

      <div className="flex flex-col items-center gap-6 bg-sand px-page-x py-section-y text-center sm:py-section-y-lg">
        <SectionLabel>Our Mission</SectionLabel>
        <h2 className="font-serif text-section-title text-ink">A Mission of Purpose</h2>
        <div className="flex max-w-[52rem] flex-col gap-5 text-body font-light text-ink/70">
          <p>
            This is why launching a brand dedicated to this luxurious material is more than a
            business venture&mdash;it&rsquo;s a mission. It&rsquo;s about preserving the
            craftsmanship of generations past, advocating for sustainability and ethical
            practices, and fostering a connection between consumers and the ancient traditions
            of the Andes.
          </p>
          <p>
            Each garment weaves together threads of heritage and innovation, crafting pieces
            that not only adorn the body but also nourish the soul.
          </p>
          <p>
            In the story of my brand, the past dances harmoniously with the present, and the
            spirit of Peru&mdash;a land vibrant, resilient, and endlessly enchanting&mdash;finds
            a new home in the hearts of those who embrace the warmth of Munay.
          </p>
        </div>

        <img
          src={ourMission}
          alt="Stella Enriquez working with dyed alpaca yarn"
          className="mt-10 aspect-[25/13] w-full max-w-[90rem] object-cover sm:mt-16"
        />

        <div className="mt-8 flex flex-col items-center gap-2">
          <span className="h-px w-10 bg-gold" aria-hidden />
          <p className="font-serif text-signature italic text-ink">Stella Enriquez</p>
          <p className="font-futura text-section-label tracking-[0.2em] text-gold-deep">
            Founder of Munay
          </p>
        </div>
      </div>

      <div className="h-16 bg-white sm:h-24" aria-hidden />

      <div className="py-13">
      <Newsletter />
     </div>
      <Footer />
    </div>
  );
}
