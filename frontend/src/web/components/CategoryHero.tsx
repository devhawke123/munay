type CategoryHeroProps = {
  title: string;
  image: string;
};

export function CategoryHero({ title, image }: CategoryHeroProps) {
  return (
    <div className="relative flex min-h-0 flex-1 items-end overflow-hidden pb-10 sm:pb-16 lg:pb-24">
      <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-black/20" />
      <h1 className="relative w-full max-w-related px-page-x text-display text-white drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.05)] lg:pl-[100px]">
        {title}
      </h1>
    </div>
  );
}
