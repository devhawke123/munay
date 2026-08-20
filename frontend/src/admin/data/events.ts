import lesAutomnalesImage from "../../web/assets/Image (Les Automnales — Geneva).jpg";
import empowermentEleganceImage from "../../web/assets/Image (An Evening of Empowerment & Elegance).jpg";
import winterCollectionImage from "../../web/assets/Image (Munay Winter Collection Preview).jpg";
import alpacaPopUpImage from "../../web/assets/Image (Alpaca Pop-up — Larco Mar).jpg";
import type { EventRow } from "../types/event";

export const initialEvents: EventRow[] = [
  {
    id: "1",
    monthYear: "November 2025",
    standSubtitle: "Munay Stand : D51",
    title: "Les Automnales — Geneva",
    dateRange: "7 – 10 November 2025",
    location: "Palexpo, Geneva, Switzerland",
    type: "Fair / Expo",
    status: "Published",
    description:
      "Munay is delighted to be part of Les Automnales Geneva 2025, from November 7 to 10 at Palexpo.\n\nVisit us at Stand D51 in the Market Area, and discover the softness of our baby alpaca creations, lovingly made in Peru.\n\nFrom sweaters and scarves to timeless accessories, each piece celebrates our Peru heritage and the warmth of authentic craftsmanship.",
    venueCallout: "Here's where you'll find us inside Les Automnales: Stand D51 in the Market Area.",
    bulletPoints: [
      "Step into Munay's world — a space inspired by the landscapes of Peru and the softness of baby alpaca.",
      "Touch and feel our natural fibres.",
      "Discover new pieces from our 2025 collection.",
      "Meet Shalie, Munay's founder, and hear the story behind the brand.",
    ],
    posterImage: lesAutomnalesImage,
    heroImage: lesAutomnalesImage,
    galleryThumbnails: [],
  },
  {
    id: "2",
    monthYear: "June 2025",
    standSubtitle: "",
    title: "An Evening of Empowerment & Elegance",
    dateRange: "14 June 2025",
    location: "Munay Flagship, Lima, Peru",
    type: "In-Store",
    status: "Published",
    description:
      "An intimate evening at our Lima flagship celebrating the women behind Munay's craft, paired with a preview of new seasonal pieces.",
    venueCallout: "Join us in-store for an evening of stories, craft, and community.",
    bulletPoints: [
      "Meet the artisans behind our alpaca weaves.",
      "Preview new arrivals before they launch online.",
      "Enjoy refreshments and live music.",
    ],
    posterImage: empowermentEleganceImage,
    heroImage: empowermentEleganceImage,
    galleryThumbnails: [],
  },
  {
    id: "3",
    monthYear: "December 2024",
    standSubtitle: "",
    title: "Munay Winter Collection Preview",
    dateRange: "3 December 2024",
    location: "Grand Palais, Paris, France",
    type: "Fair / Expo",
    status: "Published",
    description:
      "A first look at Munay's Winter Collection, showcased at the Grand Palais alongside a curated selection of Peruvian craft brands.",
    venueCallout: "Find our showcase near the east entrance of the Grand Palais.",
    bulletPoints: [
      "See the full Winter Collection before it drops.",
      "Learn about our sourcing from Andean alpaca farms.",
    ],
    posterImage: winterCollectionImage,
    heroImage: winterCollectionImage,
    galleryThumbnails: [],
  },
  {
    id: "4",
    monthYear: "November 2025",
    standSubtitle: "",
    title: "Alpaca Pop-up — Larco Mar",
    dateRange: "20 – 23 November 2025",
    location: "Larco Mar, Miraflores, Lima",
    type: "Pop-up",
    status: "Draft",
    description:
      "A weekend pop-up overlooking the Miraflores coastline, featuring limited-run alpaca pieces and made-to-order accessories.",
    venueCallout: "Look for the Munay kiosk on the ocean-view terrace.",
    bulletPoints: [
      "Shop limited-run pieces not available online.",
      "Get accessories made to order on-site.",
    ],
    posterImage: alpacaPopUpImage,
    heroImage: alpacaPopUpImage,
    galleryThumbnails: [],
  },
  {
    id: "5",
    monthYear: "September 2025",
    standSubtitle: "",
    title: "Maison & Objet — Paris",
    dateRange: "4 – 8 September 2025",
    location: "Paris Nord Villepinte, France",
    type: "Fair / Expo",
    status: "Scheduled",
    description:
      "Munay returns to Maison & Objet to present our latest home and accessory lines to international buyers and press.",
    venueCallout: "Visit our booth in the Craft & Origins hall.",
    bulletPoints: [
      "Meet our team for wholesale and press inquiries.",
      "Preview our new home accessories line.",
    ],
    posterImage: null,
    heroImage: null,
    galleryThumbnails: [],
  },
  {
    id: "6",
    monthYear: "March 2026",
    standSubtitle: "",
    title: "Munay Spring Showcase — Milan",
    dateRange: "12 – 15 March 2026",
    location: "Fiera Milano, Milan, Italy",
    type: "Fair / Expo",
    status: "Published",
    description:
      "Our Spring Showcase debuts in Milan, bringing Munay's newest lightweight alpaca-blend pieces to a European audience.",
    venueCallout: "Find us in Hall 4, close to the main entrance.",
    bulletPoints: [
      "Discover our new lightweight spring fabrics.",
      "Meet the Munay team and ask about stockist partnerships.",
    ],
    posterImage: null,
    heroImage: null,
    galleryThumbnails: [],
  },
];
