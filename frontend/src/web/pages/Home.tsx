import { Announcement } from "../components/Announcement";
import { Campaign } from "../components/Campaign";
import { Categories } from "../components/Categories";
import { Footer } from "../components/Footer";
import { Founder } from "../components/Founder";
import { Hero } from "../components/Hero";
import { NewArrivals } from "../components/NewArrivals";
import { Philosophy } from "../components/Philosophy";
import { PublicHeader } from "../components/PublicHeader";

export function Home() {
  return (
    <div className="overflow-x-hidden bg-white">
      <div className="flex h-dvh flex-col">
        <Announcement />
        <PublicHeader />
        <Hero />
      </div>
      <NewArrivals />
      <Categories />
      <Founder />
      <Campaign />
      <Philosophy />
      <Footer />
    </div>
  );
}
