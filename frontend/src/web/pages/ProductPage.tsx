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
      className={`group flex size-[42px] items-center justify-center rounded-full border border-ink/[0.46] transition-colors hover:border-ink/60 hover:bg-gold-deep/[0.13] ${
        direction === "next" ? "rotate-180" : ""
      }`}
    >
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <div className="bg-white">
        <Announcement />
        <PublicHeader />
        <div className="flex flex-col items-center gap-4 px-4 py-24 text-center">
          <p className="text-ink/60">This product doesn&apos;t exist yet.</p>
          <Link to="/" className="text-sm uppercase tracking-[1.2px] text-ink underline">
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
    <div className="bg-white">
      <Announcement />
      <PublicHeader />

      <div className="mx-auto flex max-w-[1344px] flex-col gap-12 px-4 py-4 sm:px-8 sm:py-6 lg:flex-row lg:gap-20 lg:px-0">
        <div className="flex flex-col gap-4 lg:w-[632px] lg:shrink-0">
          <div className="aspect-[632/606] w-full overflow-hidden bg-cream">
            <img
              src={images[activeImage].url}
              alt={product.name}
              className="size-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <>
              <div className="flex gap-3">
                {images.map((image, index) => (
                  <button
                    key={`${image.id}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`size-20 shrink-0 overflow-hidden bg-cream sm:size-24 lg:size-[144px] ${
                      index === activeImage ? "ring-1 ring-ink" : "opacity-80"
                    }`}
                  >
                    <img src={image.url} alt="" className="size-full object-cover" />
                  </button>
                ))}
              </div>
              <div className="flex  gap-4">
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
            </>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="font-futura text-xs font-medium uppercase tracking-[2px] text-gold-deep">
              {product.collection || product.composition || product.category}
            </p>
            <h1 className="font-futura text-4xl tracking-[-1.4px] text-ink sm:text-5xl lg:text-[56px]">
              {product.name}
            </h1>
            <p className="font-futura text-[32px] leading-[48px] text-ink">{product.price}</p>
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="font-futura text-xs font-medium uppercase tracking-[2px] text-ink/60">
                Color — <span className="text-ink">{selectedColor}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    aria-label={color}
                    onClick={() => setSelectedColor(color)}
                    className={`size-9 rounded-full ${
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

          <div className="flex flex-col gap-4 border-t border-ink/10 pt-6">
            <p className="font-futura text-base font-black uppercase tracking-[0.16px] text-ink">
              Product Details
            </p>
            <div className="grid grid-cols-2 gap-x-10 gap-y-6">
              {DETAIL_FIELDS.map(({ label, key }) => (
                <div key={key} className="flex flex-col gap-1">
                  <p className="font-futura text-xs font-black uppercase tracking-[1.6px] text-ink">
                    {label}
                  </p>
                  <p className="font-futura text-[15px] font-light text-ink/80">
                    {product[key] || "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col border-t border-ink/10">
            {(["description", "care"] as const).map((section) => (
              <div key={section} className="border-b border-ink/10 py-5">
                <button
                  type="button"
                  onClick={() => setOpenSection(openSection === section ? null : section)}
                  className="font-futura flex w-full items-center justify-between text-left text-base font-black uppercase tracking-[1px] text-ink"
                >
                  {section === "description" ? "Description" : "Care Instructions"}
                  <span
                    className={`transition-transform ${openSection === section ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                {openSection === section && (
                  <p className="font-futura mt-4 whitespace-pre-line text-[15px] font-light leading-6 text-ink/70">
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
            className="font-futura w-full bg-ink py-4 text-[13px] font-black uppercase tracking-[1.6px] text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1344px] grid-cols-1 gap-10 px-4 py-12 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-0">
        <div className="aspect-[632/395] w-full overflow-hidden bg-cream">
          <img src={alpacasHighlands} alt="Alpacas in the Peruvian highlands" className="size-full object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <p className="font-futura text-xs font-medium uppercase tracking-[3.6px] text-ink">
            The Fiber
          </p>
          <h2 className="font-futura text-4xl text-ink sm:text-5xl lg:text-[56px]">The Alpaca</h2>
          <p className="font-futura text-base font-light leading-[26px] text-ink/70">
            Soft, warm, and naturally breathable, alpaca is a noble fiber sourced from the
            highlands of Peru. Known for its exceptional softness and lightweight warmth, it
            offers the comfort of wool without the heaviness. Hypoallergenic and durable, alpaca
            drapes beautifully while maintaining its shape over time. A timeless material that
            blends tradition, craftsmanship, and everyday elegance.
          </p>
          <Link
            to="/category/women"
            className="font-futura flex items-center gap-2 pt-2 text-[13px] uppercase tracking-[1.4px] text-ink"
          >
            Explore Collection <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto flex max-w-[1304px] flex-col items-center gap-12 px-4 py-16 sm:px-8 sm:py-24 lg:px-0">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="font-futura text-xs font-medium uppercase tracking-[3.6px] text-ink">
              Curated Selection
            </p>
            <h2 className="font-futura text-4xl text-ink sm:text-5xl lg:text-[56px]">
              You Might Also Like
            </h2>
          </div>
          <div className="grid w-full grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
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
