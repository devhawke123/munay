import { CalendarRange } from "lucide-react";
import { useMemo, useState } from "react";
import { AdminLayout } from "../components/layout/AdminLayout";
import { AddEventCard } from "../components/content/AddEventCard";
import { EventCard } from "../components/content/EventCard";
import { EventDetailPanel } from "../components/content/EventDetailPanel";
import { EventFormModal } from "../components/content/EventFormModal";
import { DeleteEventConfirm } from "../components/content/DeleteEventConfirm";
import { StatCard } from "../components/ui/StatCard";
import { initialEvents } from "../data/events";
import { emptyEvent, EVENT_STATUSES, type EventRow, type EventStatus } from "../types/event";

type FilterValue = "All" | EventStatus;

export function ContentManager() {
  const [events, setEvents] = useState<EventRow[]>(initialEvents);
  const [filter, setFilter] = useState<FilterValue>("All");
  const [viewingEventId, setViewingEventId] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<EventRow | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [deletingEvent, setDeletingEvent] = useState<EventRow | null>(null);

  const filters: { label: FilterValue; count: number }[] = useMemo(
    () => [
      { label: "All", count: events.length },
      ...EVENT_STATUSES.map((status) => ({
        label: status as FilterValue,
        count: events.filter((e) => e.status === status).length,
      })),
    ],
    [events],
  );

  const visibleEvents = filter === "All" ? events : events.filter((e) => e.status === filter);
  const viewingEvent = events.find((e) => e.id === viewingEventId) ?? null;

  function handleAdd() {
    setEditingEvent({ ...emptyEvent, id: crypto.randomUUID() });
    setIsAddingNew(true);
  }

  function handleEdit(event: EventRow) {
    setEditingEvent(event);
    setIsAddingNew(false);
  }

  function handleSave(updated: EventRow) {
    setEvents((prev) =>
      isAddingNew ? [...prev, updated] : prev.map((e) => (e.id === updated.id ? updated : e)),
    );
    setEditingEvent(null);
  }

  function handleDelete(event: EventRow) {
    setDeletingEvent(event);
  }

  function confirmDelete() {
    if (!deletingEvent) return;
    setEvents((prev) => prev.filter((e) => e.id !== deletingEvent.id));
    if (viewingEventId === deletingEvent.id) setViewingEventId(null);
    setDeletingEvent(null);
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-[24px]">
        <div>
          <h1 className="text-2xl font-bold text-ink">Event Management</h1>
          <p className="text-[15px] font-medium text-brand-dark">
            Manage all events shown on the public-facing events page.
          </p>
        </div>

        <div className="gap-[10px] max-w-[300px] ">
          <StatCard label="Total Events" value={String(events.length)} icon={CalendarRange} />
        </div>

        <div className="flex w-fit items-center gap-1 rounded-full border border-brand/10 bg-white p-1">
          {filters.map((f) => (
            <button
              key={f.label}
              onClick={() => setFilter(f.label)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium ${
                filter === f.label
                  ? "bg-brand-dark text-white"
                  : "text-text-muted hover:bg-surface-muted"
              }`}
            >
              {f.label}
              <span
                className={`flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[11px] font-semibold ${
                  filter === f.label ? "bg-white/20 text-white" : "bg-surface-muted text-text-muted"
                }`}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-[14px]">
          {visibleEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={() => setViewingEventId(event.id)}
              onEdit={() => handleEdit(event)}
              onDelete={() => handleDelete(event)}
            />
          ))}
          <AddEventCard onClick={handleAdd} />
        </div>
      </div>

      {viewingEvent && (
        <EventDetailPanel
          event={viewingEvent}
          onClose={() => setViewingEventId(null)}
          onEdit={() => handleEdit(viewingEvent)}
        />
      )}

      {editingEvent && (
        <EventFormModal
          event={editingEvent}
          isNew={isAddingNew}
          onCancel={() => setEditingEvent(null)}
          onSave={handleSave}
        />
      )}

      {deletingEvent && (
        <DeleteEventConfirm
          event={deletingEvent}
          onCancel={() => setDeletingEvent(null)}
          onConfirm={confirmDelete}
        />
      )}
    </AdminLayout>
  );
}
