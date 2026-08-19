import { Heart } from "lucide-react";
import product1 from "../assets/product-1.png";
import product2 from "../assets/product-2.png";
import product3 from "../assets/product-3.png";
import product4 from "../assets/product-4.png";

const products = [
  { name: "Ribbed Turtleneck Knit", price: "$650", image: product1 },
  { name: "The Oversized Cashmere Blend", price: "$890", image: product2 },
  { name: "Pleated Wool Trousers", price: "$720", image: product3 },
  { name: "Tailored Alpaca Coat", price: "$1,450", image: product4 },
];

export function NewArrivals() {
  return (
    <div className="flex flex-col items-center gap-16 px-12 py-16">
      <div className="flex w-full max-w-[1440px] flex-col gap-16">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-5xl text-ink">New Arrivals</h2>
            <p className="text-sm tracking-[0.35px] text-ink/60">
              Discover the latest styles and fresh picks, newly added to our collection.
            </p>
          </div>
          <a href="#" className="border-b border-ink pb-1 text-sm text-ink">
            Explore All New In
          </a>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.name} className="group flex flex-col gap-6">
              <div className="relative aspect-[318/600] w-full overflow-hidden">
                <img src={product.image} alt={product.name} className="size-full object-cover" />
                <button
                  aria-label="Add to wishlist"
                  className="absolute right-4 top-4 text-ink/50"
                >
                  <Heart size={20} />
                </button>
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="w-full bg-ink py-3 text-xs uppercase tracking-[1.2px] text-white">
                    Add to Bag
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <h3 className="font-serif-alt text-sm text-ink">{product.name}</h3>
                <p className="text-sm text-ink/60">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
