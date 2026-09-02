import { Mail, MessageCircle, Phone } from "lucide-react";
import { Announcement } from "../components/Announcement";
import { Footer } from "../components/Footer";
import { GoldButton } from "../components/GoldButton";
import { Newsletter } from "../components/Newsletter";
import { PublicHeader } from "../components/PublicHeader";
import connect from "../assets/connect.jpg";
import instagramLogo from "../assets/instagram.png";
import facebookLogo from "../assets/facebook.png";
import pinterestLogo from "../assets/pinterest.png";
import linkedinLogo from "../assets/linkedin.png";

const contactMethods = [
  {
    icon: Phone,
    label: "Phone",
    detail: "Mon–Fri 9am–6pm",
    value: "+1012 3456 789",
  },
  {
    icon: Mail,
    label: "Email",
    detail: "We reply within 24–48h",
    value: "info@munay.store",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    detail: "Chat with us instantly",
    value: "+41 76 382 33 19",
  },
];

export function Contact() {
  return (
    <div className="overflow-x-hidden bg-white">
      <Announcement />
      <PublicHeader />

      <div className="flex flex-col items-center gap-4 bg-cream px-page-x py-section-y text-center sm:py-section-y-lg">
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-ink/30" aria-hidden />
          <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-gold-deep">
            Contact
          </span>
          <span className="h-px w-8 bg-ink/30" aria-hidden />
        </div>
        <h1 className="font-serif text-display uppercase text-ink">Let&rsquo;s Stay in Touch</h1>
        <p className="max-w-[43rem] text-body font-light text-ink/70">
          Whether you have a question about a piece, wholesale inquiries or simply wish to
          connect, we will answer you personally. We usually reply within 24&ndash;48 hours.
        </p>

        <div className="mt-8 flex w-full max-w-shell flex-col items-start gap-8 lg:flex-row lg:items-stretch">
          <div className="flex w-full flex-col gap-5 lg:w-[300px] lg:shrink-0">
            {contactMethods.map((method) => (
              <div key={method.label} className="rounded-[14px] bg-white p-6 text-left shadow-card">
                <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-gold-deep">
                  <method.icon size={18} className="text-white" />
                </span>
                <p className="mt-4 text-body font-semibold text-ink">{method.label}</p>
                <p className="mt-1 font-sans text-[14px] font-normal leading-[20px] tracking-normal text-ink">
                  {method.detail}
                </p>
                <p className="mt-1 font-sans text-[14px] font-normal leading-[20px] tracking-normal text-ink/50">
                  {method.value}
                </p>
              </div>
            ))}
          </div>

          <div className="flex w-full flex-col rounded-[14px] bg-white p-8 text-left shadow-card">
            <h2 className="font-serif text-3xl text-ink">Send us a message</h2>
            <p className="mt-1 font-serif text-[16px] font-normal leading-[24px] tracking-normal text-[#84540C]">
              Fill in the form below and we&rsquo;ll get back to you as soon as possible.
            </p>

            <form className="mt-6 flex flex-1 flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="font-sans text-[14px] font-light leading-[20px] tracking-normal text-[#573400]">
                    Your Name{" "}
                    <span className="font-semibold text-[#573400]">*</span>
                  </span>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="rounded-[8px] border border-[#5734001A] px-4 py-2.5 text-body-sm text-ink placeholder:text-ink/40 focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-sans text-[14px] font-light leading-[20px] tracking-normal text-[#573400]">
                    Email Address{" "}
                    <span className="font-semibold text-[#573400]">*</span>
                  </span>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="rounded-[8px] border border-[#5734001A] px-4 py-2.5 text-body-sm text-ink placeholder:text-ink/40 focus:outline-none"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="font-sans text-[14px] font-light leading-[20px] tracking-normal text-[#573400]">
                  Subject <span className="font-semibold text-[#573400]">*</span>
                </span>
                <input
                  type="text"
                  placeholder="How can we help you?"
                  className="rounded-[8px] border border-[#5734001A] px-4 py-2.5 text-body-sm text-ink placeholder:text-ink/40 focus:outline-none"
                />
              </label>

              <label className="flex flex-1 flex-col gap-1.5">
                <span className="font-sans text-[14px] font-light leading-[20px] tracking-normal text-[#573400]">
                  Message <span className="font-semibold text-[#573400]">*</span>
                </span>
                <textarea
                  placeholder="Tell us more about your inquiry..."
                  className="min-h-[120px] flex-1 resize-none rounded-[8px] border border-[#5734001A] px-4 py-2.5 text-body-sm text-ink placeholder:text-ink/40 focus:outline-none"
                />
              </label>

              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-[#84540C]">* Required fields</p>
                <GoldButton type="submit">Send Message</GoldButton>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="flex justify-center bg-cream px-page-x pt-section-y pb-24 sm:pt-section-y-lg sm:pb-50">
        <div className="flex w-full max-w-shell flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16">
          <img
            src={connect}
            alt="Two women wearing baby alpaca knitted hoods"
            className="aspect-[4/4.6] w-full max-w-[500px] shrink-0 object-cover lg:w-1/2 lg:max-w-none"
          />
          <div className="flex w-full max-w-[600px] flex-col items-start gap-4 text-left">
            <h2 className="font-serif text-section-title text-ink">
              Connect With Us On The Socials
            </h2>
            <p className="max-w-[46rem] text-body font-light text-ink/70">
              Discover our world beyond the website. Follow us for behind-the-scenes moments,
              new collections, and stories from Peru.
            </p>
            <div className="mt-2 flex items-center gap-3">
              <a href="#" aria-label="Instagram">
                <img src={instagramLogo} alt="" className="h-9 w-9 object-contain" />
              </a>
              <a href="#" aria-label="Facebook">
                <img src={facebookLogo} alt="" className="h-9 w-9 object-contain" />
              </a>
              <a href="#" aria-label="Pinterest">
                <img src={pinterestLogo} alt="" className="h-9 w-9 object-contain" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <img src={linkedinLogo} alt="" className="h-9 w-9 object-contain" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-cream py-13">
        <Newsletter />
      </div>

      <Footer />
    </div>
  );
}
