import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  subtitle?: string;
  iconBgClassName?: string;
  iconClassName?: string;
  valueClassName?: string;
  className?: string;
  compact?: boolean;
};

export function StatCard({
  label,
  value,
  icon: Icon,
  subtitle,
  iconBgClassName = "bg-brand-soft",
  iconClassName = "text-brand",
  valueClassName = "text-brand-dark",
  className = "",
  compact = false,
}: StatCardProps) {
  if (compact) {
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

  return (
    <div className={`bg-[#fbf7f1] ${className}`}>
      <div className="flex h-[103px] items-center">
        <div className="grid w-[182px]">
          <div className="relative h-[93px] w-[182px] rounded-[10px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.18)]">
            <div className="absolute left-[9.84px] top-[21px] flex items-start">
              <div
                className={`flex h-[34.968px] w-[34.99px] items-center justify-center rounded-[10px] ${iconBgClassName}`}
              >
                <Icon size={20} className={iconClassName} />
              </div>
              <div className="ml-[9px] pt-[2px]">
                <p className="text-[15px] font-medium text-text-primary">
                  {label}
                </p>
                <p className={`mt-[3px] text-[20px] font-bold ${valueClassName}`}>
                  {value}
                </p>
                {subtitle ? (
                  <p className="mt-[2px] text-[13px] text-[#464646]">
                    {subtitle}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
