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
      <div className="bg-white">
        <Announcement />
        <PublicHeader />
        <div className="flex flex-col items-center gap-4 px-4 py-24 text-center">
          <p className="text-ink/60">This collection doesn&apos;t exist yet.</p>
          <Link to="/" className="text-sm uppercase tracking-[1.2px] text-ink underline">
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
    <div className="bg-white">
      <div className="flex h-[100dvh] flex-col">
        <Announcement />
        <PublicHeader />
        <CategoryHero
          title={subcategory === "Shawls / Scarfs" ? "Shawls & Scarfs" : subcategory}
          image={subcategory === "Shawls / Scarfs" ? shawlsScarfsHero : heroImage}
        />
      </div>

      <div className="mx-auto flex max-w-[1304px] flex-col gap-24 px-4 py-16 sm:gap-32 sm:px-8 sm:py-24 lg:px-0">
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
                <h2 className="font-serif text-3xl uppercase leading-none tracking-[1px] text-ink sm:text-4xl lg:text-[44px] lg:leading-[44px]">
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

      <Newsletter />
      <Footer />
    </div>
  );
}
