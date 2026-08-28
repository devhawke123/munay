import { Announcement } from "../components/Announcement";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { PublicHeader } from "../components/PublicHeader";
import theWomen from "../assets/the-women.jpg";

export function TheWomen() {
  return (
    <div className="overflow-x-hidden bg-white">
      <Announcement />
      <PublicHeader />

      <PageHero image={theWomen}>
        <h1 className="font-serif text-display uppercase text-white drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.15)]">
          The Women
        </h1>
        <p className="max-w-[40rem] font-futura text-[13px] uppercase tracking-[0.2em] text-white/85">
          Behind every portrait is a strong and brave woman who changed the life of many
          people. Their stories deserve to be told.
        </p>
      </PageHero>

      <div className="flex flex-col items-start gap-4 bg-cream px-page-x py-section-y sm:py-section-y-md">
        <h2 className="font-serif text-section-title text-ink">Portrait of the Month</h2>
      </div>

      <Footer />
    </div>
  );
}
