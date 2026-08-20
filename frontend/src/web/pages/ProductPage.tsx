import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../../admin/context/ProductsContext";
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
import { swatchColor } from "../lib/colorSwatches";

const DETAIL_FIELDS: Array<{
  label: string;
  key: "composition" | "weight" | "dimensions" | "origin";
}> = [
  { label: "Composition", key: "composition" },
  { label: "Weight", key: "weight" },
  { label: "Dimensions", key: "dimensions" },
  { label: "Origin", key: "origin" },
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

      <div className="mx-auto flex max-w-[1344px] flex-col gap-12 px-4 py-12 sm:px-8 sm:py-16 lg:flex-row lg:gap-20 lg:px-0">
        <div className="flex flex-col gap-4 lg:w-[632px] lg:shrink-0">
          <div className="aspect-[632/606] w-full overflow-hidden bg-cream">
            <img
              src={images[activeImage].url}
              alt={product.name}
              className="size-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((image, index) => (
                <button
                  key={image.id}
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
          )}
        </div>

        <div className="flex flex-1 flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[2px] text-gold-deep">
              {product.composition || product.collection || product.category}
            </p>
            <h1 className="font-serif text-4xl text-ink sm:text-5xl">{product.name}</h1>
            <p className="font-serif text-2xl text-ink">{product.price}</p>
            {product.origin && (
              <p className="text-sm font-semibold tracking-[0.4px] text-gold-deep">
                Made in {product.origin}
              </p>
            )}
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[2px] text-ink/60">
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
                    style={{ backgroundColor: swatchColor(color) }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4 border-t border-ink/10 pt-6">
            <p className="text-sm font-medium uppercase tracking-[0.16px] text-ink">
              Product Details
            </p>
            <div className="grid grid-cols-2 gap-x-10 gap-y-6">
              {DETAIL_FIELDS.map(({ label, key }) => (
                <div key={key} className="flex flex-col gap-1">
                  <p className="text-[11px] font-medium uppercase tracking-[1.6px] text-ink">
                    {label}
                  </p>
                  <p className="text-sm font-light text-ink/80">{product[key] || "—"}</p>
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
                  className="flex w-full items-center justify-between text-left text-sm font-medium uppercase tracking-[1px] text-ink"
                >
                  {section === "description" ? "Description" : "Care Instructions"}
                  <span
                    className={`transition-transform ${openSection === section ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                {openSection === section && (
                  <p className="mt-4 text-[15px] font-light leading-6 text-ink/70">
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
            className="w-full bg-ink py-4 text-xs font-semibold uppercase tracking-[1.6px] text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto flex max-w-[1304px] flex-col items-center gap-12 px-4 py-16 sm:px-8 sm:py-24 lg:px-0">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-xs uppercase tracking-[3.6px] text-ink">Curated Selection</p>
            <h2 className="font-serif text-4xl text-ink sm:text-5xl">You Might Also Like</h2>
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
