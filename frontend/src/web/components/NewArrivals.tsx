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
    <div className="flex flex-col items-center gap-8 px-4 py-10 sm:gap-16 sm:px-6 sm:py-16 lg:px-12">
      <div className="flex w-full max-w-[1440px] flex-col gap-8 sm:gap-16">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-3xl text-ink sm:text-4xl lg:text-5xl">New Arrivals</h2>
            <p className="text-sm tracking-[0.35px] text-ink/60">
              Discover the latest styles and fresh picks, newly added to our collection.
            </p>
          </div>
          <a href="#" className="border-b border-ink pb-1 text-sm text-ink">
            Explore All New In
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.name} className="group flex flex-col gap-3 sm:gap-6">
              <div className="relative aspect-[318/600] w-full overflow-hidden">
                <img src={product.image} alt={product.name} className="size-full object-cover" />
                <button
                  aria-label="Add to wishlist"
                  className="absolute right-4 top-4 text-ink/50"
                >
                  <Heart size={20} />
                </button>
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100">
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
