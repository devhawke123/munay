import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../../admin/context/ProductsContext";
import alpacasHighlands from "../assets/product-detail/alpacas-highlands.png";
import placeholderImage from "../assets/product-1.png";
import { Announcement } from "../components/Announcement";
import { Footer } from "../components/Footer";
import { Newsletter } from "../components/Newsletter";
import { ProductCard } from "../components/ProductCard";
import { PublicHeader } from "../components/PublicHeader";
import {
  findCategoryBySlug,
  findSubcategoryBySlug,
  getProduct,
  getRelatedProducts,
} from "../lib/catalog";
import { isSwatchGradient, swatchColor } from "../lib/colorSwatches";

type GalleryArrowButtonProps = {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
};

function GalleryArrowButton({ direction, onClick, label }: GalleryArrowButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`group flex size-8 items-center justify-center rounded-full border border-ink/40 bg-white/80 backdrop-blur-sm transition-colors hover:border-ink/60 hover:bg-white short:size-7 sm:size-9 tall:size-[42px] ${
        direction === "next" ? "rotate-180" : ""
      }`}
    >
      <svg
        className="size-full"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.3 21L22.7499 30L24.3 28.349L17.4002 21L24.3 13.6533L22.7499 12L14.3 21Z"
          className="fill-ink/[0.36] transition-colors group-hover:fill-ink/60"
        />
      </svg>
    </button>
  );
}

const DETAIL_FIELDS: Array<{
  label: string;
  key: "composition" | "weight" | "dimensions" | "origin" | "fiber";
}> = [
  { label: "Composition", key: "composition" },
  { label: "Weight", key: "weight" },
  { label: "Dimensions", key: "dimensions" },
  { label: "Origin", key: "origin" },
  { label: "Fiber", key: "fiber" },
];

export function ProductPage() {
  const { categorySlug, subcategorySlug, productId } = useParams<{
    categorySlug: string;
    subcategorySlug: string;
    productId: string;
  }>();
  const { products } = useProducts();
  const category = categorySlug ? findCategoryBySlug(products, categorySlug) : undefined;
  const subcategory =
    category && subcategorySlug
      ? findSubcategoryBySlug(products, category, subcategorySlug)
      : undefined;
  const product = productId ? getProduct(products, productId) : undefined;

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.colors?.[0]);
  const [openSection, setOpenSection] = useState<"description" | "care" | null>("description");

  if (
    !category ||
    !subcategory ||
    !product ||
    product.category !== category ||
    product.subcategory !== subcategory
  ) {
    return (
      <div className="overflow-x-hidden bg-white">
        <Announcement />
        <PublicHeader />
        <div className="flex flex-col items-center gap-4 px-page-x py-24 text-center">
          <p className="text-ink/60">This product doesn&apos;t exist yet.</p>
          <Link to="/" className="text-btn uppercase text-ink underline">
            Back home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [{ id: "placeholder", url: placeholderImage }];
  const related = getRelatedProducts(products, product);

  return (
    <div className="overflow-x-hidden bg-white">
      {/*
        Width: stacks until lg, side-by-side from lg up.
        Height: short/medium keep PDP compact in-viewport; tall allows breathing room.
      */}
      <div className="flex flex-col lg:min-h-dvh">
        <Announcement />
        <PublicHeader />

        <div className="mx-auto md:px-10 md:pt-10 flex w-full min-w-0 max-w-page flex-1 flex-col gap-6 overflow-x-hidden short:gap-4 md:gap-8 lg:flex-row lg:items-center lg:gap-pdp-gap">
          {/* Gallery */}
          <div className="flex w-full min-w-0 flex-col gap-2.5 short:gap-2 sm:gap-3 lg:w-[min(52%,var(--max-width-gallery))] lg:shrink-0">
            <div
              className="relative aspect-[632/606] w-full overflow-hidden bg-cream
                max-w-[min(100%,var(--max-width-gallery),calc((100dvh-14rem)*632/606))]
                short:max-w-[min(100%,var(--max-width-gallery),calc((100dvh-11rem)*632/606))]
                tall:max-w-[min(100%,var(--max-width-gallery))]"
            >
              <img
                src={images[activeImage].url}
                alt={product.name}
                className="size-full object-cover"
              />
              {images.length > 1 && (
                <div className="absolute bottom-2 left-2 flex gap-2 sm:bottom-3 sm:left-3 tall:bottom-4 tall:left-4">
                  <GalleryArrowButton
                    direction="prev"
                    label="Previous image"
                    onClick={() =>
                      setActiveImage((current) => (current - 1 + images.length) % images.length)
                    }
                  />
                  <GalleryArrowButton
                    direction="next"
                    label="Next image"
                    onClick={() => setActiveImage((current) => (current + 1) % images.length)}
                  />
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {images.map((image, index) => (
                  <button
                    key={`${image.id}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`size-thumb shrink-0 overflow-hidden bg-cream short:size-14 ${
                      index === activeImage ? "ring-1 ring-ink" : "opacity-80"
                    }`}
                  >
                    <img src={image.url} alt="" className="size-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Buy box — min-w-0 + overflow-x-hidden so long copy can't force a horizontal scrollbar */}
          <div className="flex min-w-0  flex-1 flex-col gap-4 overflow-x-hidden short:gap-3 lg:max-h-[calc(100dvh-12rem)] lg:overflow-x-hidden lg:overflow-y-auto  short:lg:max-h-[calc(100dvh-10rem)] tall:gap-5 tall:lg:max-h-none">
            <div className="flex min-w-0 flex-col gap-1 short:gap-0.5 sm:gap-1.5">
              <p className="font-futura text-pdp-eyebrow font-medium uppercase text-gold-deep">
                {product.collection || product.composition || product.category}
              </p>
              <h1 className="font-futura break-words text-pdp-title text-ink">{product.name}</h1>
              <p className="font-futura text-pdp-price text-ink">{product.price}</p>
            </div>

            {product.colors && product.colors.length > 0 && (
              <div className="flex flex-col gap-2 short:gap-1.5 sm:gap-2.5">
                <p className="font-futura text-pdp-eyebrow font-medium uppercase text-ink/60">
                  Color — <span className="text-ink">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2.5 pl-0.5 sm:gap-3 sm:pl-1">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      aria-label={color}
                      onClick={() => setSelectedColor(color)}
                      className={`size-swatch rounded-full ${
                        selectedColor === color ? "ring-2 ring-ink ring-offset-2" : ""
                      }`}
                      style={
                        isSwatchGradient(color)
                          ? { backgroundImage: swatchColor(color) }
                          : { backgroundColor: swatchColor(color) }
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex min-w-0 flex-col gap-2.5 border-t border-ink/10 pt-3 short:gap-2 short:pt-2.5 sm:gap-3 sm:pt-4">
              <p className="font-futura text-pdp-heading font-black uppercase text-ink">
                Product Details
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 short:gap-y-2 sm:gap-x-8 sm:gap-y-3 tall:gap-y-4">
                {DETAIL_FIELDS.map(({ label, key }) => (
                  <div key={key} className="min-w-0 flex flex-col gap-0.5">
                    <p className="font-futura text-pdp-meta font-black uppercase text-ink">
                      {label}
                    </p>
                    <p className="font-futura break-words text-pdp-body font-light text-ink/80">
                      {product[key] || "—"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex min-w-0 flex-col border-t border-ink/10">
              {(["description", "care"] as const).map((section) => (
                <div
                  key={section}
                  className="min-w-0 border-b border-ink/10 py-3 short:py-2.5 sm:py-3.5 tall:py-4"
                >
                  <button
                    type="button"
                    onClick={() => setOpenSection(openSection === section ? null : section)}
                    className="font-futura flex w-full min-w-0 items-center justify-between gap-3 text-left text-pdp-heading font-black uppercase text-ink"
                  >
                    <span className="min-w-0 truncate">
                      {section === "description" ? "Description" : "Care Instructions"}
                    </span>
                    <span
                      className={`shrink-0 transition-transform ${openSection === section ? "rotate-45" : ""}`}
                    >
                      +
                    </span>
                  </button>
                  {openSection === section && (
                    <p className="font-futura mt-2.5 break-words whitespace-pre-wrap text-pdp-body font-light text-ink/70 short:mt-2 tall:mt-3">
                      {section === "description"
                        ? product.description || "No description yet."
                        : "Hand wash cold with a gentle detergent. Lay flat to dry, away from direct sunlight."}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              className="font-futura mt-auto w-full bg-ink py-btn-y text-btn uppercase text-white"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-page grid-cols-1 gap-8 px-page-x py-section-y md:gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <div className="aspect-[632/395] w-full overflow-hidden bg-cream">
          <img
            src={alpacasHighlands}
            alt="Alpacas in the Peruvian highlands"
            className="size-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-3 sm:gap-4">
          <p className="font-futura text-section-label font-medium uppercase text-ink">The Fiber</p>
          <h2 className="font-futura text-section-title text-ink">The Alpaca</h2>
          <p className="font-futura text-pdp-body font-light text-ink/70 sm:text-base sm:leading-[26px]">
            Soft, warm, and naturally breathable, alpaca is a noble fiber sourced from the
            highlands of Peru. Known for its exceptional softness and lightweight warmth, it
            offers the comfort of wool without the heaviness. Hypoallergenic and durable, alpaca
            drapes beautifully while maintaining its shape over time. A timeless material that
            blends tradition, craftsmanship, and everyday elegance.
          </p>
          <Link
            to="/category/women"
            className="font-futura flex items-center gap-2 pt-1 text-btn uppercase text-ink sm:pt-2"
          >
            Explore Collection <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto flex max-w-related flex-col items-center gap-8 px-page-x py-section-y sm:gap-12">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="font-futura text-section-label font-medium uppercase text-ink">
              Curated Selection
            </p>
            <h2 className="font-futura text-section-title text-ink">You Might Also Like</h2>
          </div>
          <div className="grid w-full grid-cols-2 gap-x-4 gap-y-8 xs:gap-x-6 sm:grid-cols-3 sm:gap-y-10">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}

      <Newsletter />
      <Footer />
    </div>
  );
}
