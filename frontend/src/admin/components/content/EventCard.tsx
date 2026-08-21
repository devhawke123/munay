import { CalendarDays, ChevronDown, SquarePen } from "lucide-react";
import type { EventRow } from "../../types/event";
import { EventStatusBadge, EventTypeBadge } from "./EventBadges";
import { EventImagePlaceholder } from "./EventImagePlaceholder";

type EventCardProps = {
  event: EventRow;
  onViewDetails: () => void;
  onEdit: () => void;
};

export function EventCard({ event, onViewDetails, onEdit }: EventCardProps) {
  return (
    <div className="rounded-[10px] border border-brand/10 bg-white p-2">
      <div className="relative  w-full overflow-hidden rounded-[8px]">
        <EventImagePlaceholder
          src={event.posterImage}
          label={event.title}
          className="h-full w-full object-top"
        />

        <div className="absolute left-2 top-2">
          <EventTypeBadge type={event.type} />
        </div>
        <div className="absolute right-2 top-2">
          <EventStatusBadge status={event.status} />
        </div>
        <button className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-text-primary">
          <ChevronDown size={13} />
        </button>
      </div>

      <div className="px-1 pt-3">
        <p className="text-xs font-semibold text-brand">{event.monthYear}</p>
        <p className="mt-0.5 text-sm font-display font-bold text-text-primary">{event.title}</p>
        <p className="text-xs text-text-muted">{event.location}</p>

        <div className="mt-2 flex items-center gap-3 pb-1 text-xs">
          <button
            onClick={onViewDetails}
            className="flex items-center gap-1 font-semibold text-brand-accent"
          >
            <CalendarDays size={12} />
            View Event Details
          </button>
          <button onClick={onEdit} className="flex items-center gap-1 text-text-muted">
            <SquarePen size={12} />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
