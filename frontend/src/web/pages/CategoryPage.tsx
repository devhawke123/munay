import { Link, useParams } from "react-router-dom";
import { useProducts } from "../../admin/context/ProductsContext";
import placeholderImage from "../assets/product-2.png";
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
  "Pullovers & Cardigans",
  "Jackets & Cardigans",
  "Capes & Ponchos",
  "Coats",
  "Tops & T-Shirts",
  "Dresses & Skirts",
  "Pants & Shorts",
  "Shirts & Blouses",
  "Scarves & Shawls",
  "Neck Warmers & Snoods",
  "Beanies & Chapkas",
  "Gloves & Mittens",
  "Hats & Caps",
];

// The Figma tile label, keyed by real subcategory name, where it differs from
// the subcategory itself (e.g. "Headwears" product data reads "Beanies & Chapkas" on the page).
const WOMEN_LABEL_OVERRIDES: Record<string, string> = {
  Pullovers: "Pullovers & Cardigans",
  Cardigans: "Jackets & Cardigans",
  Capes: "Capes & Ponchos",
  "Shawls / Scarfs": "Scarves & Shawls",
  Headwears: "Beanies & Chapkas",
  "Snoods & Hoods": "Neck Warmers & Snoods",
};

// Categories shown in the Figma design that don't have product data yet.
// Rendered as empty-image placeholder tiles until real products are added.
const WOMEN_PLACEHOLDER_TILES: Record<string, string[]> = {
  "Ready to Wear": ["Tops & T-Shirts", "Dresses & Skirts", "Pants & Shorts", "Shirts & Blouses"],
  Accessories: ["Hats & Caps"],
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
  const { products } = useProducts();
  const category = categorySlug ? findCategoryBySlug(products, categorySlug) : undefined;

  if (!category) {
    return (
      <div className="bg-white">
        <Announcement />
        <PublicHeader />
        <div className="flex flex-col items-center gap-4 px-4 py-24 text-center">
          <p className="text-ink/60">This category doesn&apos;t exist yet.</p>
          <Link to="/" className="text-sm uppercase tracking-[1.2px] text-ink underline">
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
  const heroImage = category === "Women" ? WOMEN_HERO_IMAGE : placeholderImage;

  return (
    <div className="bg-white">
      <div className="flex h-[100dvh] flex-col">
        <Announcement />
        <PublicHeader />
        <CategoryHero title={category === "Women" ? "WOMEN" : category} image={heroImage} />
      </div>

      <div className="mx-auto flex max-w-[1304px] flex-col gap-24 px-4 py-16 sm:gap-32 sm:px-8 sm:py-24 lg:gap-40 lg:px-0">
        {groups.map((group) => (
          <div key={group} className="flex flex-col items-center">
            <h2 className="font-futura text-4xl font-medium uppercase leading-none text-ink sm:text-5xl lg:text-[48px] lg:leading-[52px]">
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
                    <p className="font-futura text-base uppercase leading-[19.5px] tracking-[2.5px] text-ink">
                      {tile.label}
                    </p>
                    <div className="mt-2 h-[2px] w-16 bg-ink" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}
