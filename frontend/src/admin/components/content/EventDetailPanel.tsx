import { CalendarDays, MapPin, SquarePen, X } from "lucide-react";
import type { EventRow } from "../../types/event";
import { EventStatusBadge, EventTypeBadge } from "./EventBadges";
import { EventImagePlaceholder } from "./EventImagePlaceholder";

type EventDetailPanelProps = {
  event: EventRow;
  onClose: () => void;
  onEdit: () => void;
};

export function EventDetailPanel({ event, onClose, onEdit }: EventDetailPanelProps) {
  const paragraphs = event.description.split("\n\n").filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div className="flex h-full w-full max-w-[380px] flex-col overflow-y-auto bg-white shadow-card">
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="flex items-center gap-2">
            <EventStatusBadge status={event.status} />
            <EventTypeBadge type={event.type} />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="inline-flex h-[30px] items-center gap-1 rounded-[6px] bg-brand-dark px-3 text-xs font-semibold text-white"
            >
              <SquarePen size={12} />
              Edit
            </button>
            <button onClick={onClose} className="text-text-muted">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="px-4 pt-3">
          <EventImagePlaceholder
            src={event.heroImage ?? event.posterImage}
            label={event.title}
            className="h-[160px] w-full rounded-[10px]"
          />
        </div>

        {event.galleryThumbnails.length > 0 && (
          <div className="flex gap-2 px-4 pt-3">
            {event.galleryThumbnails.map((thumb, index) => (
              <EventImagePlaceholder
                key={index}
                src={thumb}
                label="Gallery"
                className="h-12 w-12 rounded-[6px]"
              />
            ))}
          </div>
        )}

        <div className="px-4 pt-4">
          <p className="text-xs font-semibold text-brand">{event.monthYear}</p>
          <h2 className="mt-0.5 text-lg font-display font-bold text-text-primary">
            {event.title}
          </h2>
          {event.standSubtitle && (
            <p className="text-xs text-text-muted">{event.standSubtitle}</p>
          )}

          <div className="mt-3 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs text-text-primary">
              <CalendarDays size={13} className="text-brand" />
              {event.dateRange}
            </div>
            <div className="flex items-center gap-2 text-xs text-text-primary">
              <MapPin size={13} className="text-brand" />
              {event.location}
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
              About This Event
            </p>
            <div className="flex flex-col gap-2 text-xs leading-relaxed text-text-primary">
              {paragraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
          </div>

          {event.venueCallout && (
            <div className="mt-3 rounded-[6px] border border-brand/10 bg-tint-brand px-3 py-2 text-xs text-brand-dark">
              {event.venueCallout}
            </div>
          )}

          {event.bulletPoints.length > 0 && (
            <div className="mb-5 mt-4">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                What You Can Do
              </p>
              <ul className="flex flex-col gap-1.5">
                {event.bulletPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-text-primary">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
