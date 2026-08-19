type EventImagePlaceholderProps = {
  src?: string | null;
  label?: string;
  className?: string;
};

export function EventImagePlaceholder({ src, label, className = "" }: EventImagePlaceholderProps) {
  if (src) {
    return <img src={src} alt={label ?? ""} className={`object-cover ${className}`} />;
  }

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700 text-white ${className}`}
    >
      <span className="px-2 text-center text-[11px] font-semibold leading-tight">
        {label ?? "IMG"}
      </span>
    </div>
  );
}
