import type { EventStatus } from "../../types/event";

const statusClasses: Record<EventStatus, string> = {
  Published: "bg-success/90 text-white",
  Scheduled: "bg-info/90 text-white",
  Draft: "bg-text-muted/80 text-white",
};

export function EventStatusBadge({ status }: { status: EventStatus }) {
  return (
    <span
      className={`inline-flex h-[20px] items-center rounded-full px-2 text-[10px] font-semibold ${statusClasses[status]}`}
    >
      {status}
    </span>
  );
}

export function EventTypeBadge({ type }: { type: string }) {
  return (
    <span className="inline-flex h-[20px] items-center rounded-full bg-black/50 px-2 text-[10px] font-semibold text-white">
      {type}
    </span>
  );
}
