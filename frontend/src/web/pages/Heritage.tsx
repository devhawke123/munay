import { Announcement } from "../components/Announcement";
import { Footer } from "../components/Footer";
import { Newsletter } from "../components/Newsletter";
import { PublicHeader } from "../components/PublicHeader";
import heritage from "../assets/heritage.jpg";
import whyMunayWasCreated from "../assets/why-munay-was-created.png";
import article1 from "../assets/Article1.png";
import article2 from "../assets/Article2.png";
import article3 from "../assets/Article3.png";
import artisan1 from "../assets/artisan1.png";
import artisan2 from "../assets/artisan2.png";
import artisan3 from "../assets/artisan3.png";
import rhythms from "../assets/rhythms.jpg";
import figure1 from "../assets/Figure1.png";
import figure2 from "../assets/Figure2.png";
import figure3 from "../assets/Figure3.png";
import figure4 from "../assets/Figure4.png";
import figure5 from "../assets/Figure5.png";

const rhythmCards = [
  {
    title: "Traditional Instruments",
    body: "Charango and panpipes create melodies that resonate with the soul.",
  },
  {
    title: "Dance Forms",
    body: "Marinera Norteña & Huayano — expressions of cultural identity and joy.",
  },
  {
    title: "Cultural Blend",
    body: "Indigenous, African, and European influences merge harmoniously.",
  },
];

const artisanCrafts = [
  {
    image: artisan1,
    badge: "500+ Years",
    title: "Textile Weaving",
    body: "Centuries-old techniques passed down through generations.",
  },
  {
    image: artisan2,
    badge: "Handcrafted",
    title: "Pottery & Ceramics",
    body: "Ancient art forms shaped by skilled hands.",
  },
  {
    image: artisan3,
    badge: "Traditional",
    title: "Wood Carving",
    body: "Intricate designs telling stories of tradition.",
  },
];

const articles = [
  {
    image: article1,
    title: "Machu Picchu",
    body: "An architectural marvel testifying to the ingenuity of the Inca Empire.",
  },
  {
    image: article2,
    title: "Nazca Lines",
    body: "Intricate geoglyphs revealing the advanced knowledge of pre-Columbian societies.",
  },
  {
    image: article3,
    title: "Chan Chan",
    body: "The mysterious ancient city showcasing centuries of craftsmanship and culture.",
  },
];

export function Heritage() {
  return (
    <div className="overflow-x-hidden bg-white">
      <Announcement />
      <PublicHeader />

      <div className="relative flex h-[70vh] min-h-[420px] items-center justify-center overflow-hidden">
        <img src={heritage} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative flex flex-col items-center gap-3 px-page-x text-center">
          <p className="font-futura text-section-label uppercase tracking-[0.3em] text-white">
            Our Heritage
          </p>
          <h1 className="font-serif text-display text-white drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.15)]">
            Heritage
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 bg-sand px-page-x py-section-y text-center sm:py-section-y-lg">
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-ink/30" aria-hidden />
          <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-gold-deep">
            Our Story
          </span>
          <span className="h-px w-8 bg-ink/30" aria-hidden />
        </div>
        <h2 className="font-serif text-section-title text-ink">Why Munay Was Created</h2>
        <p className="max-w-[52rem] text-body font-light text-ink/70">
          The story behind the brand is about people. Each Peruvian has been an inspiration
          behind the creation of Munay. We celebrate the hands that craft, the voices that
          sing, and the traditions that endure. Every piece tells a story of heritage,
          passion, and the timeless artistry of Peru.
        </p>
        <p className="mt-4 font-serif text-signature italic text-gold-deep">
          &ldquo;Munay means love and affection in Quechua.&rdquo;
        </p>

        <div className="mt-10 flex w-full max-w-shell flex-col items-start text-left sm:mt-16">
          <img
            src={whyMunayWasCreated}
            alt="Colorful Peruvian textiles and crafts on display"
            className="mb-25 aspect-[27/13] w-full object-cover"
          />

          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-ink/30" aria-hidden />
            <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-gold-deep">
              Heritage
            </span>
            <span className="h-px w-8 bg-ink/30" aria-hidden />
          </div>
          <h2 className="mt-3 font-serif text-section-title text-ink">Peruvian Culture</h2>
          <p className="mt-3 max-w-[36rem] text-body-sm font-light text-ink/70">
            A tapestry woven with threads of history, tradition, and breathtaking diversity.
            It is a celebration of its rich heritage, deep-rooted traditions, and the
            resilience of its people.
          </p>

          <div className="mt-12 flex w-full flex-col flex-wrap items-center justify-center gap-3 sm:mt-16 sm:flex-row">
            {articles.map((article) => (
              <img
                key={article.title}
                src={article.image}
                alt={article.title}
                className="aspect-[4/5] w-full max-w-[384px] object-cover"
              />
            ))}
          </div>
        </div>

        <div className="mt-24 flex flex-col items-center gap-4 text-center sm:mt-32">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-ink/30" aria-hidden />
            <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-gold-deep">
              Masters of Crafts
            </span>
            <span className="h-px w-8 bg-ink/30" aria-hidden />
          </div>
          <h2 className="font-serif text-section-title text-ink">Artisans &amp; Their Crafts</h2>
          <p className="max-w-[32rem] text-body font-light text-ink/70">
            Each piece is a testament to the skill, dedication, and heritage of Peruvian
            artisans.
          </p>
        </div>

        <div className="mt-12 flex flex-col flex-wrap items-center justify-center gap-3 sm:mt-16 sm:flex-row">
          {artisanCrafts.map((craft) => (
            <img
              key={craft.title}
              src={craft.image}
              alt={craft.title}
              className="aspect-[4/5] w-full max-w-[384px] object-cover"
            />
          ))}
        </div>

        <p className="mt-12 max-w-none whitespace-nowrap font-serif text-signature italic text-gold-deep sm:mt-16">
          &ldquo;Every thread, every stroke, every detail carries the soul of Peru.&rdquo;
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 bg-cream px-page-x py-section-y text-center sm:py-section-y-lg">
        <h2 className="font-serif text-section-title text-ink">Rhythms of Peruvian Heritage</h2>
        <p className="max-w-[56rem] text-body font-light text-ink/70">
          The rhythms of Peruvian music and dance are infectious, reflecting a blend of
          indigenous, African, and European influences. Traditional instruments like the
          charango and the panpipes create melodies that resonate with the soul. The dance
          forms such as Marinera Norte&ntilde;a and the Huayano are not just performances but
          expressions of cultural identity, joy and love.
        </p>

        <div className="mt-12 flex w-full max-w-shell flex-col items-center gap-6 sm:mt-16 lg:flex-row lg:items-stretch">
          <img
            src={rhythms}
            alt="Peruvian weaver at work"
            className="aspect-[4/3] w-full max-w-[500px] object-cover lg:w-1/2 lg:max-w-none"
          />
          <div className="flex w-full flex-col gap-4 lg:w-1/2">
            {rhythmCards.map((card) => (
              <div
                key={card.title}
                className="flex flex-1 flex-col justify-center rounded-2xl bg-[#A87730] px-6 py-5 text-left"
              >
                <p className="font-serif text-2xl text-white">{card.title}</p>
                <p className="mt-1 text-body-sm font-light text-white/80">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 bg-sand px-page-x pt-10 pb-section-y text-center sm:pt-14 sm:pb-section-y-lg">
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-ink/30" aria-hidden />
          <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-gold-deep">
            Visual Journey
          </span>
          <span className="h-px w-8 bg-ink/30" aria-hidden />
        </div>
        <h2 className="font-serif text-section-title text-ink">Glimpses of Peru</h2>
        <p className="max-w-[36rem] text-body font-light text-ink/70">
          A collection of moments that capture the essence, beauty, and spirit of Peruvian
          heritage.
        </p>

        <div className="mt-12 flex w-full max-w-[1280px] flex-col items-start gap-4 sm:mt-16 lg:flex-row">
          <img
            src={figure1}
            alt="Peruvian artisans spinning wool"
            className="aspect-[414/460] w-full object-cover lg:w-1/3"
          />
          <div className="flex w-full flex-col gap-4 lg:w-1/3">
            <img
              src={figure2}
              alt="Colorful Peruvian textile market"
              className="aspect-[414/220] w-full object-cover"
            />
            <img
              src={figure3}
              alt="Herd of llamas in the Andes"
              className="aspect-[414/220] w-full object-cover"
            />
          </div>
          <div className="flex w-full flex-col gap-4 lg:w-1/3">
            <img
              src={figure4}
              alt="Alpaca with traditional Peruvian decorations"
              className="aspect-[414/220] w-full object-cover"
            />
            <img
              src={figure5}
              alt="Colorful handwoven textile threads"
              className="aspect-[414/460] w-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="pb-13">
      <Newsletter />
     </div>
      <Footer />
    </div>
  );
}
