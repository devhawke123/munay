import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import women from "../assets/product-3.png";
import men from "../assets/category-men.png";
import home from "../assets/category-home.png";

const categories = [
  {
    name: "Women",
    href: "/category/women",
    description:
      "Refined silhouettes and soft textures crafted from the finest baby alpaca. A timeless approach to modern elegance.",
    image: women,
    imageSide: "right" as const,
    imagePosition: "top" as const,
  },
  {
    name: "Men",
    href: "/category/men",
    description:
      "Refined silhouettes and soft textures crafted from the finest baby alpaca. A timeless approach to modern elegance.",
    image: men,
    imageSide: "left" as const,
    imagePosition: "top" as const,
  },
  {
    name: "Home Essentials",
    href: "/category/home",
    description:
      "Refined silhouettes and soft textures crafted from the finest baby alpaca. A timeless approach to modern elegance.",
    image: home,
    imageSide: "right" as const,
  },
];

export function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = sentinelRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) setActiveIndex(index);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    for (const el of sentinelRefs.current) {
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 bg-sand pt-section-y-lg sm:gap-16">
      <div className="flex max-w-prose flex-col items-center gap-4 px-page-x text-center sm:gap-6">
        <p className="text-section-label font-medium uppercase text-ink">Browse by category</p>
        <h2 className="font-serif text-section-title text-ink">Find What You Love</h2>
        <p className="text-body font-light text-ink/60">
          Explore our collection by category and discover styles that fit your lifestyle and
          every occasion.
        </p>
      </div>

      <div className="relative w-full" style={{ height: `${categories.length * 100}vh` }}>
        {categories.map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              sentinelRefs.current[index] = el;
            }}
            className="pointer-events-none absolute inset-x-0 h-screen"
            style={{ top: `${index * 100}vh` }}
          />
        ))}

        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-page-x py-8 sm:py-0">
          <div className="relative flex w-full max-w-shell items-center">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className={`absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-700 ease-out sm:gap-8 lg:flex-row lg:gap-16 ${
                  index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                {category.imageSide === "left" && (
                  <div className="aspect-[16/9] w-full shrink-0 overflow-hidden sm:aspect-[776/717] lg:aspect-[776/717] lg:w-1/2 lg:min-w-0">
                    <img
                      src={category.image}
                      alt={category.name}
                      className={`size-full object-cover ${
                        category.imagePosition === "top" ? "object-top" : "object-center"
                      }`}
                    />
                  </div>
                )}
                <div className="flex w-full min-w-0 flex-col items-start gap-3 sm:gap-6 lg:w-1/2 lg:gap-8">
                  <h3 className="font-serif text-display text-ink">{category.name}</h3>
                  <p className="max-w-[448px] text-body font-light text-ink/70">
                    {category.description}
                  </p>
                  <Link
                    to={category.href}
                    className="flex items-center gap-4 border-b border-ink/30 pb-2 text-btn uppercase text-ink"
                  >
                    Discover {category.name}
                    <ArrowRight size={12} />
                  </Link>
                </div>
                {category.imageSide === "right" && (
                  <div className="aspect-[16/9] w-full shrink-0 overflow-hidden sm:aspect-[776/717] lg:aspect-[776/717] lg:w-1/2 lg:min-w-0">
                    <img
                      src={category.image}
                      alt={category.name}
                      className={`size-full object-cover ${
                        category.imagePosition === "top" ? "object-top" : "object-center"
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
