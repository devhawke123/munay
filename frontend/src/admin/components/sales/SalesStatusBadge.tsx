import type { WebsiteOrderStatus } from "../../types/sales";

const toneClasses: Record<WebsiteOrderStatus, { dot: string; text: string; bg: string; border: string }> = {
  Delivered: { dot: "bg-success", text: "text-success", bg: "bg-success/10", border: "border-success/20" },
  Shipped: { dot: "bg-info", text: "text-info", bg: "bg-info/10", border: "border-info/20" },
  Processing: { dot: "bg-warning", text: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
};

export function SalesStatusBadge({ status }: { status: WebsiteOrderStatus }) {
  const style = toneClasses[status];
  return (
    <div
      className={`inline-flex h-[23.833px] w-fit items-center gap-[5px] whitespace-nowrap rounded-full border ${style.border} ${style.bg} px-[10px] py-[3px]`}
    >
      <span className={`h-[5px] w-[5px] shrink-0 rounded-[2.5px] ${style.dot}`} />
      <span className={`text-[11px] font-display font-semibold tracking-[0.11px] ${style.text}`}>
        {status}
      </span>
    </div>
  );
}
