import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../../admin/types/product";
import placeholder from "../assets/product-1.png";
import { slugify } from "../lib/slug";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images?.[0]?.url ?? placeholder;
  const href = `/category/${slugify(product.category)}/${slugify(product.subcategory)}/${product.id}`;

  return (
    <Link to={href} className="group flex flex-col gap-4">
      <div className="relative aspect-[308/352] w-full overflow-hidden bg-cream">
        <img src={image} alt={product.name} className="size-full object-cover" />
        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={(event) => event.preventDefault()}
          className="absolute right-4 top-4 text-ink/50"
        >
          <Heart size={18} />
        </button>
      </div>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[13px] uppercase tracking-[1.5px] text-ink">{product.name}</p>
        <p className="text-[13px] text-gold-deep">{product.price}</p>
      </div>
    </Link>
  );
}
