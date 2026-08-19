import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import women from "../assets/product-3.png";
import men from "../assets/category-men.png";
import home from "../assets/category-home.png";

const categories = [
  {
    name: "Women",
    description:
      "Refined silhouettes and soft textures crafted from the finest baby alpaca. A timeless approach to modern elegance.",
    image: women,
    imageSide: "right" as const,
    imagePosition: "top" as const,
  },
  {
    name: "Men",
    description:
      "Refined silhouettes and soft textures crafted from the finest baby alpaca. A timeless approach to modern elegance.",
    image: men,
    imageSide: "left" as const,
  },
  {
    name: "Home Essentials",
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
    <div className="flex flex-col items-center gap-16 bg-[#f3eee6] pt-32">
      <div className="flex max-w-[600px] flex-col items-center gap-6 px-12 text-center">
        <p className="text-xs font-medium uppercase tracking-[3.6px] text-ink">
          Browse by category
        </p>
        <h2 className="font-serif text-5xl text-ink">Find What You Love</h2>
        <p className="text-lg font-light text-ink/60">
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

        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-12 md:px-24">
          <div className="relative flex w-full max-w-[1440px] items-center">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className={`absolute inset-0 flex items-center gap-16 transition-opacity duration-700 ease-out ${
                  index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                {category.imageSide === "left" && (
                  <div className="aspect-[776/717] w-1/2 min-w-0 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className=" object-cover"
                    />
                  </div>
                )}
                <div className="flex w-1/2 flex-col items-start gap-8">
                  <h3 className="font-serif text-7xl text-ink">{category.name}</h3>
                  <p className="max-w-[448px] text-lg font-light text-ink/70">
                    {category.description}
                  </p>
                  <a
                    href="#"
                    className="flex items-center gap-4 border-b border-ink/30 pb-2 text-xs uppercase tracking-[1.2px] text-ink"
                  >
                    Discover {category.name}
                    <ArrowRight size={12} />
                  </a>
                </div>
                {category.imageSide === "right" && (
                  <div className="aspect-[776/717] w-1/2 min-w-0 overflow-hidden">
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
