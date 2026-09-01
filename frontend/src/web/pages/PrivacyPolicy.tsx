import { Announcement } from "../components/Announcement";
import { Footer } from "../components/Footer";
import { Newsletter } from "../components/Newsletter";
import { PublicHeader } from "../components/PublicHeader";

export function PrivacyPolicy() {
  return (
    <div className="overflow-x-hidden bg-white">
      <Announcement />
      <PublicHeader />

      <div className="flex flex-col items-center gap-4 bg-cream px-page-x py-section-y text-center sm:py-section-y-lg">
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-ink/30" aria-hidden />
          <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-gold-deep">
            Privacy Policy
          </span>
          <span className="h-px w-8 bg-ink/30" aria-hidden />
        </div>
        <h1 className="font-serif text-display uppercase text-ink">Privacy &amp; Cookie Policy</h1>

        <div className="mt-6 flex w-full max-w-[1080px] flex-col items-start gap-4 text-left">
          <p className="text-body font-light text-[#364153]">
            This website, www.munay.store, uses cookies and tracking technologies. With your
            consent, we may use marketing and profiling cookies for the following purposes:
          </p>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-body font-light text-[#364153] marker:text-[#364153]">
            <li>Personalizing information and ads based on your interests while you browse the internet.</li>
            <li>Analyzing and monitoring your behavior on our site.</li>
            <li>Enabling you to connect and interact on social networks</li>
            <li>If you accept, you agree to use all non-essential cookies, including marketing, profiling, and social cookies.</li>
            <li>If you refuse, you will only allow essential cookies, and marketing, profiling, and social cookies will be disabled.</li>
            <li>Your consent is optional, and you have control over your preferences at all times.</li>
          </ul>
        </div>
      </div>

      <div className="bg-cream py-13">
        <Newsletter />
      </div>

      <Footer />
    </div>
  );
}
