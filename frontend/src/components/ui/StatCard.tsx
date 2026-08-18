import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  iconBgClassName?: string;
  iconClassName?: string;
  valueClassName?: string;
  className?: string;
};

export function StatCard({
  label,
  value,
  icon: Icon,
  iconBgClassName = "bg-brand-soft",
  iconClassName = "text-brand",
  valueClassName = "text-brand-dark",
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-card border border-brand-border bg-white p-4 ${className}`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-panel ${iconBgClassName}`}
      >
        <Icon size={20} className={iconClassName} />
      </div>
      <div>
        <p className="text-sm font-medium text-text-primary">{label}</p>
        <p className={`text-xl font-bold ${valueClassName}`}>{value}</p>
      </div>
    </div>
  );
}
