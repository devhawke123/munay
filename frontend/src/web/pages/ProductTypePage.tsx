import { Link, useParams } from "react-router-dom";
import { useProducts } from "../../admin/context/ProductsContext";
import heroImage from "../assets/hero.png";
import shawlsScarfsHero from "../assets/women-subcategories/scarfsshawls/IMG_2122.jpg";
import { Announcement } from "../components/Announcement";
import { CategoryHero } from "../components/CategoryHero";
import { Footer } from "../components/Footer";
import { Newsletter } from "../components/Newsletter";
import { ProductCard } from "../components/ProductCard";
import { PublicHeader } from "../components/PublicHeader";
import {
  findCategoryBySlug,
  findSubcategoryBySlug,
  getProductsBySection,
  getProductsBySubcategory,
  getSections,
} from "../lib/catalog";

export function ProductTypePage() {
  const { categorySlug, subcategorySlug } = useParams<{
    categorySlug: string;
    subcategorySlug: string;
  }>();
  const { products } = useProducts();
  const category = categorySlug ? findCategoryBySlug(products, categorySlug) : undefined;
  const subcategory =
    category && subcategorySlug
      ? findSubcategoryBySlug(products, category, subcategorySlug)
      : undefined;

  if (!category || !subcategory) {
    return (
      <div className="overflow-x-hidden bg-white">
        <Announcement />
        <PublicHeader />
        <div className="flex flex-col items-center gap-4 px-page-x py-24 text-center">
          <p className="text-ink/60">This collection doesn&apos;t exist yet.</p>
          <Link to="/" className="text-btn uppercase text-ink underline">
            Back home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const items = getProductsBySubcategory(products, category, subcategory);
  const sections = getSections(products, category, subcategory);
  const unsectioned = items.filter((product) => !product.section);

  return (
    <div className="overflow-x-hidden bg-white">
      <div className="flex h-dvh flex-col">
        <Announcement />
        <PublicHeader />
        <CategoryHero
          title={subcategory === "Shawls / Scarfs" ? "SCARVES & SHAWLS" : subcategory}
          image={subcategory === "Shawls / Scarfs" ? shawlsScarfsHero : heroImage}
        />
      </div>

      <div className="mx-auto flex max-w-related flex-col gap-24 px-page-x py-section-y sm:gap-32 sm:py-section-y-lg">
        {items.length === 0 ? (
          <p className="text-center text-ink/60">No products in this collection yet.</p>
        ) : sections.length === 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <>
            {sections.map((section) => (
              <div key={section} className="flex flex-col items-center">
                <h2 className="font-serif text-category-title uppercase tracking-[1px] text-ink">
                  {section}
                </h2>
                <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10 pt-14 sm:gap-x-6 lg:grid-cols-4">
                  {getProductsBySection(products, category, subcategory, section).map(
                    (product) => (
                      <ProductCard key={product.id} product={product} />
                    ),
                  )}
                </div>
              </div>
            ))}
            {unsectioned.length > 0 && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
                {unsectioned.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="py-13">
      <Newsletter />
     </div>
      <Footer />
    </div>
  );
}
