import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Announcement } from "../components/Announcement";
import { Footer } from "../components/Footer";
import { GoldButton } from "../components/GoldButton";
import { PublicHeader } from "../components/PublicHeader";

const faqs = [
  {
    question: "How should I take care of my garment?",
    answer: (
      <>
        <p>Care instructions can be found on :</p>
        <ul className="list-disc pl-5">
          <li>
            Care information available in the{" "}
            <a href="/care-guide" className="underline">
              Care page
            </a>{" "}
            on{" "}
            <a href="/" className="underline">
              munay.store
            </a>
          </li>
        </ul>
        <p>For proper care, instructions on this page should be strictly followed.</p>
        <ol className="flex list-decimal flex-col gap-2 pl-5">
          <li>
            Avoid contact with oil or alcohol-based substances such as perfumes, cosmetics,
            hand sanitizers, which might impact the fabric and cause unremovable stains.
          </li>
          <li>
            Regarding storage, we advise you to store your item in a cool dry place and avoid
            moisture sources. We also suggest to take the item out from storage and let the
            item breathe from time to time.
          </li>
        </ol>
      </>
    ),
  },
  {
    question: "Can you assist me with my garment?",
    answer: <p>Our customer service team is happy to help with fit, styling, and care questions at any time.</p>,
  },
  {
    question: "Which payment methods do you accept?",
    answer: <p>We accept all major credit cards, PayPal, and Apple Pay.</p>,
  },
  {
    question: "Are these payment methods secure?",
    answer: <p>Yes, all payments are processed through encrypted, PCI-compliant checkout providers.</p>,
  },
  {
    question: "What are the delivery times and costs?",
    answer: <p>Delivery is complimentary worldwide and typically arrives within 5&ndash;10 business days.</p>,
  },
  {
    question: "Is a signature required at delivery?",
    answer: <p>A signature is required for most international shipments to ensure safe delivery.</p>,
  },
  {
    question: "What is your Return Policy?",
    answer: <p>You may return unworn items within 30 days of delivery for a full refund.</p>,
  },
  {
    question: "How do I ship my return?",
    answer: <p>Use the prepaid return label included with your order, or request one from customer service.</p>,
  },
  {
    question: "What are the benefits of registering?",
    answer: <p>Registered customers enjoy faster checkout, order tracking, and early access to new collections.</p>,
  },
  {
    question: "Legal notices",
    answer: <p>Please refer to our Terms of Service and Privacy Policy for full legal information.</p>,
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="overflow-x-hidden bg-white">
      <Announcement />
      <PublicHeader />

      <div className="flex flex-col items-center gap-4 bg-cream px-page-x py-section-y text-center sm:py-section-y-lg">
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-ink/30" aria-hidden />
          <span className="text-section-label font-futura font-medium uppercase tracking-[0.3em] text-gold-deep">
            FAQ&rsquo;s
          </span>
          <span className="h-px w-8 bg-ink/30" aria-hidden />
        </div>
        <h1 className="font-serif text-display uppercase text-ink">Frequently Asked Questions</h1>
        <p className="max-w-[54rem] text-body font-light text-ink/70">
          Find answers to common questions about our products, shipping, and care
          instructions. If you need additional help, feel free to contact our customer
          service team.
        </p>

        <div className="mt-8 flex w-full max-w-[820px] flex-col">
          {faqs.map((faq, index) => {
            const isOpen = index === openIndex;

            if (isOpen) {
              return (
                <div
                  key={faq.question}
                  className="mb-4 rounded-[12px] bg-white p-6 text-left shadow-card"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(-1)}
                    className="flex w-full items-center justify-between gap-4 border-b border-ink/10 pb-4 text-left"
                  >
                    <span className="font-sans text-[20px] font-semibold leading-[27px] tracking-normal text-[#2C2A2899]">
                      {faq.question}
                    </span>
                    <ChevronUp size={18} className="shrink-0 text-ink/60" />
                  </button>
                  <div className="mt-4 flex flex-col gap-3 text-body-sm font-light text-ink/70">
                    {faq.answer}
                  </div>
                </div>
              );
            }

            return (
              <button
                key={faq.question}
                type="button"
                onClick={() => setOpenIndex(index)}
                className="flex w-full items-center justify-between gap-4 border-b border-gold-deep/25 py-5 text-left"
              >
                <span className="font-sans text-[20px] font-semibold leading-[27px] tracking-normal text-[#2C2A2899]">
                  {faq.question}
                </span>
                <ChevronDown size={18} className="shrink-0 text-ink/60" />
              </button>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col items-center gap-10 sm:mt-20">
          <h2 className="font-serif text-[48px] font-light leading-[24px] tracking-normal text-center text-[#84540C]">
            Still Something To Ask?
          </h2>
          <GoldButton className="mt-2">Contact Us</GoldButton>
        </div>
      </div>

      <Footer />
    </div>
  );
}
