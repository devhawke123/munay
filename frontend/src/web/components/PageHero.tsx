import type { CSSProperties, ReactNode } from "react";

type PageHeroProps = {
  image: string;
  imageAlt?: string;
  imageClassName?: string;
  imageStyle?: CSSProperties;
  overlayClassName?: string;
  children: ReactNode;
};

export function PageHero({
  image,
  imageAlt = "",
  imageClassName = "",
  imageStyle,
  overlayClassName = "bg-black/20",
  children,
}: PageHeroProps) {
  return (
    <div className="relative flex h-[calc(100dvh-var(--header-total-h,96px))] min-h-[420px] items-center justify-center overflow-hidden">
      <img
        src={image}
        alt={imageAlt}
        className={`absolute inset-0 size-full object-cover ${imageClassName}`}
        style={imageStyle}
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="relative flex flex-col items-center gap-3 px-page-x text-center">
        {children}
      </div>
    </div>
  );
}
