import { Link, useParams } from "react-router-dom";
import { useProducts } from "../../admin/context/ProductsContext";
import placeholderImage from "../assets/product-2.png";
import homeHeroImage from "../assets/category-home.png";
import { Announcement } from "../components/Announcement";
import { CategoryHero } from "../components/CategoryHero";
import { Footer } from "../components/Footer";
import { Newsletter } from "../components/Newsletter";
import { PublicHeader } from "../components/PublicHeader";
import { findCategoryBySlug, getGroups, getSubcategoriesByGroup } from "../lib/catalog";
import { slugify } from "../lib/slug";
import { getWomenTileImage, WOMEN_HERO_IMAGE } from "../lib/womenCategoryImages";

type CategoryTile = {
  label: string;
  subcategory: string;
  image?: string;
};

const WOMEN_GROUP_ORDER = ["Ready to Wear", "Accessories"];

const WOMEN_TILE_ORDER = [
  "Pullovers",
  "Cardigans",
  "Jackets",
  "Capes",
  "Ponchos",
  "Coats",
  "Tops",
  "T-Shirts",
  "Dresses",
  "Skirts",
  "Pants",
  "Shorts",
  "Shirts",
  "Blouses",
  "Shawls / Scarfs",
  "Neck Warmers",
  "Snoods",
  "Headwears",
  "Gloves & Mittens",
];

// One real subcategory is intentionally kept as a single merged bucket (scarves and shawls
// together, split into sections instead) — its display label differs from its stored name.
const WOMEN_LABEL_OVERRIDES: Record<string, string> = {
  "Shawls / Scarfs": "Scarves & Shawls",
};

// Product types from the client's structure doc with no products yet.
// Rendered as empty-image placeholder tiles until real products are added.
const WOMEN_PLACEHOLDER_TILES: Record<string, string[]> = {
  "Ready to Wear": ["T-Shirts", "Shorts"],
};

function sortWomenGroups(groups: string[]): string[] {
  return [...groups].sort((a, b) => {
    const ai = WOMEN_GROUP_ORDER.indexOf(a);
    const bi = WOMEN_GROUP_ORDER.indexOf(b);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });
}

function getCategoryTiles(
  products: ReturnType<typeof useProducts>["products"],
  category: string,
  group: string,
): CategoryTile[] {
  const tiles: CategoryTile[] = [];

  for (const subcategory of getSubcategoriesByGroup(products, category, group)) {
    tiles.push({
      label: category === "Women" ? (WOMEN_LABEL_OVERRIDES[subcategory] ?? subcategory) : subcategory,
      subcategory,
      image: category === "Women" ? getWomenTileImage(subcategory) : undefined,
    });
  }

  if (category !== "Women") return tiles;

  for (const label of WOMEN_PLACEHOLDER_TILES[group] ?? []) {
    if (tiles.some((tile) => tile.label === label)) continue;
    tiles.push({ label, subcategory: label });
  }

  return tiles.sort((a, b) => {
    const ai = WOMEN_TILE_ORDER.indexOf(a.label);
    const bi = WOMEN_TILE_ORDER.indexOf(b.label);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });
}

export function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="overflow-x-hidden bg-white">
        <Announcement />
        <PublicHeader />
        <div className="flex flex-col items-center gap-4 px-page-x py-24 text-center">
          <p className="text-ink/60">Loading…</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-x-hidden bg-white">
        <Announcement />
        <PublicHeader />
        <div className="flex flex-col items-center gap-4 px-page-x py-24 text-center">
          <p className="text-ink/60">{error.message}</p>
        </div>
        <Footer />
      </div>
    );
  }

  const category = categorySlug ? findCategoryBySlug(products, categorySlug) : undefined;

  if (!category) {
    return (
      <div className="overflow-x-hidden bg-white">
        <Announcement />
        <PublicHeader />
        <div className="flex flex-col items-center gap-4 px-page-x py-24 text-center">
          <p className="text-ink/60">This category doesn&apos;t exist yet.</p>
          <Link to="/" className="text-btn uppercase text-ink underline">
            Back home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const groups =
    category === "Women"
      ? sortWomenGroups(getGroups(products, category))
      : getGroups(products, category);
  const heroImage =
    category === "Women" ? WOMEN_HERO_IMAGE : category === "Home" ? homeHeroImage : placeholderImage;

  return (
    <div className="overflow-x-hidden bg-white">
      <div className="flex h-dvh flex-col">
        <Announcement />
        <PublicHeader />
        <CategoryHero title={category === "Women" ? "WOMEN" : category} image={heroImage} />
      </div>

      <div className="mx-auto flex max-w-related flex-col gap-24 px-page-x py-section-y sm:gap-32 sm:py-section-y-lg">
        {groups.map((group) => (
          <div key={group} className="flex flex-col items-center">
            <h2 className="font-futura text-category-title font-medium uppercase text-ink">
              {group}
            </h2>
            <div className="grid w-full grid-cols-1 gap-x-7 gap-y-10 pt-14 sm:grid-cols-2 lg:grid-cols-4">
              {getCategoryTiles(products, category, group).map((tile) => (
                <Link
                  key={`${tile.subcategory}-${tile.label}`}
                  to={`/category/${slugify(category)}/${slugify(tile.subcategory)}`}
                  className="group flex flex-col"
                >
                  <div className="aspect-[320/480] w-full overflow-hidden bg-cream">
                    {tile.image ? (
                      <img
                        src={tile.image}
                        alt={tile.label}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-col pt-5">
                    <p className="font-futura text-tile-label uppercase text-ink">{tile.label}</p>
                    <div className="mt-2 h-[2px] w-16 bg-ink" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="py-13">
      <Newsletter />
     </div>
      <Footer />
    </div>
  );
}
