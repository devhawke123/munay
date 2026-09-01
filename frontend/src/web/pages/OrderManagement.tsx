import { ChevronUp, ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Announcement } from "../components/Announcement";
import { Footer } from "../components/Footer";
import { Newsletter } from "../components/Newsletter";
import { PublicHeader } from "../components/PublicHeader";

type AccordionItem = {
  question: string;
  answer: ReactNode;
};

const shippingFaqs: AccordionItem[] = [
  {
    question: "Return Policy",
    answer: (
      <>
        <p>
          You can request a return for any item purchased on{" "}
          <a href="/" className="underline">
            munay.store
          </a>{" "}
          within 20 days of the delivery date. Once you have filled in the return form, you
          have up to 14 days to ship the parcel back to us.
        </p>
        <p>Returned items must comply with our Return Policy:</p>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li>They must be returned unworn, undamaged and unused, with all tags attached and the original packaging included</li>
          <li>The package can only be shipped from the same country it was delivered to</li>
          <li>Less than 20 days have passed since the courier delivered the order</li>
        </ul>
        <p>If all the above conditions are met, then :</p>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li>Simply click return button after you have received the package and if you are not registered, fill in the online Return Form.</li>
          <li>Replace the shipping label on the box with pre-paid return label UPS</li>
          <li>Contact UPS to arrange the pick-up or leave the parcel at a designated drop-off location.</li>
        </ul>
        <p>
          We normally verify and process returns within 3 business days from when they are
          received. The refund will be issued upon return acceptance, and you will receive a
          confirmation email.
        </p>
      </>
    ),
  },
  {
    question: "Shipping",
    answer: (
      <>
        <p>
          Fill in the Online Return Form with 20 days of the delivery date. You then have up
          to 14 days to ship the parcel back to our Distribution Center.
        </p>
        <p>How to ship the return :</p>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li>Make sure the return complies with our Return Policy</li>
          <li>Pack the item/s in the original order box or any sturdy carton box</li>
          <li>Stick the pre-paid UPS label over any prior delivery information. The pre-paid label gives you free return shipping.</li>
          <li>Drop the package at your nearest UPS location or contact the courier in order to organize the pick-up</li>
        </ul>
      </>
    ),
  },
];

const paymentFaqs: AccordionItem[] = [
  {
    question: "Payment method - Find your method",
    answer: (
      <>
        <div>
          <p className="text-body font-semibold uppercase tracking-[0.1em] text-ink/50">
            Credit Cards
          </p>
          <p>American Express, Mastercard, VISA</p>
        </div>
        <div>
          <p className="text-body font-semibold uppercase tracking-[0.1em] text-ink/50">
            Mobile Payment
          </p>
          <p>Apple Pay, Google Pay, PayPal</p>
        </div>
      </>
    ),
  },
  {
    question: "Your delivery options",
    answer: (
      <>
        <div>
          <p className="text-body font-semibold uppercase tracking-[0.1em] text-ink/50">
            Standard &ndash; Free
          </p>
          <ul className="flex list-disc flex-col gap-1 pl-5">
            <li>Delivery within 6 business days from date of shipping confirmation</li>
            <li>Island and remote zones will require an additional day for delivery</li>
          </ul>
        </div>
        <div>
          <p className="text-body font-semibold uppercase tracking-[0.1em] text-ink/50">
            Express &ndash; CHF15
          </p>
          <ul className="flex list-disc flex-col gap-1 pl-5">
            <li>Delivery in 1&ndash;3 business days from date of shipping confirmation</li>
          </ul>
        </div>
        <div>
          <p className="text-body font-semibold uppercase tracking-[0.1em] text-ink/50">
            Next Day &ndash; CHF17
          </p>
          <ul className="flex list-disc flex-col gap-1 pl-5">
            <li>Delivery next working day, if order is placed by 13:00 GMT</li>
          </ul>
        </div>
        <div>
          <p className="text-body font-semibold uppercase tracking-[0.1em] text-ink/50">
            Saturday &ndash; CHF17
          </p>
          <ul className="flex list-disc flex-col gap-1 pl-5">
            <li>Delivery on Saturday morning, if order is placed by 15:30 GMT on Friday</li>
          </ul>
        </div>
        <div>
          <p className="text-body font-semibold uppercase tracking-[0.1em] text-ink/50">
            Same Day &ndash; CHF40
          </p>
          <ul className="flex list-disc flex-col gap-1 pl-5">
            <li>Delivery on the same day, only in Switzerland, if order is placed by 14:00 GMT</li>
            <li>For Standard and Express deliveries, the preparation of your order will require 1&ndash;2 business days.</li>
          </ul>
        </div>
        <p>Please note that business days are Monday through Friday.</p>
      </>
    ),
  },
];

function AccordionGroup({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex w-full flex-col">
      {items.map((item, index) => {
        const isOpen = index === openIndex;

        if (isOpen) {
          return (
            <div
              key={item.question}
              className="mb-4 rounded-[12px] border border-ink/10 bg-white p-6 text-left"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(-1)}
                className="flex w-full items-center justify-between gap-4 border-b border-ink/10 pb-4 text-left"
              >
                <span className="text-body font-semibold text-ink">{item.question}</span>
                <ChevronUp size={18} className="shrink-0 text-ink/60" />
              </button>
              <div className="mt-4 flex flex-col gap-3 text-body-sm font-light text-ink/70">
                {item.answer}
              </div>
            </div>
          );
        }

        return (
          <button
            key={item.question}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="flex w-full items-center justify-between gap-4 border-b border-gold-deep/25 py-5 text-left"
          >
            <span className="text-body font-semibold text-ink">{item.question}</span>
            <ChevronDown size={18} className="shrink-0 text-ink/60" />
          </button>
        );
      })}
    </div>
  );
}

export function OrderManagement() {
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
        <h1 className="font-serif text-display uppercase text-ink">Order Management</h1>

        <div className="mt-6 flex w-full max-w-[1080px] flex-col items-start gap-4">
          <h2 className="text-body font-semibold uppercase tracking-[0.1em] text-ink/50">
            Shipping &amp; Returns
          </h2>
          <AccordionGroup items={shippingFaqs} />
        </div>

        <div className="mt-10 flex w-full max-w-[1080px] flex-col items-start gap-4">
          <h2 className="text-body font-semibold uppercase tracking-[0.1em] text-ink/50">
            Payment and Delivery Method
          </h2>
          <AccordionGroup items={paymentFaqs} />
        </div>
      </div>

      <div className="bg-cream py-13">
        <Newsletter />
      </div>

      <Footer />
    </div>
  );
}
