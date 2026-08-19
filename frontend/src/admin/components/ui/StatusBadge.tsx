export type StatusTone = "success" | "warning" | "danger" | "info" | "neutral";

const toneClasses: Record<StatusTone, { dot: string; text: string; bg: string; border: string }> = {
  success: { dot: "bg-success", text: "text-success", bg: "bg-success/10", border: "border-success/20" },
  warning: { dot: "bg-warning", text: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
  danger: { dot: "bg-danger", text: "text-danger", bg: "bg-danger/10", border: "border-danger/20" },
  info: { dot: "bg-info", text: "text-info", bg: "bg-info/10", border: "border-info/20" },
  neutral: { dot: "bg-text-muted", text: "text-text-muted", bg: "bg-surface-tan", border: "border-brand/10" },
};

export function StatusBadge({ label, tone }: { label: string; tone: StatusTone }) {
  const style = toneClasses[tone];
  return (
    <div
      className={`inline-flex h-[23.833px] w-fit items-center gap-[5px] whitespace-nowrap rounded-full border ${style.border} ${style.bg} px-[10px] py-[3px]`}
    >
      <span className={`h-[5px] w-[5px] shrink-0 rounded-[2.5px] ${style.dot}`} />
      <span className={`text-[11px] font-display font-semibold tracking-[0.11px] ${style.text}`}>
        {label}
      </span>
    </div>
  );
}
