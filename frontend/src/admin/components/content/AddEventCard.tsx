import { Plus } from "lucide-react";

export function AddEventCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-[232px] flex-col items-center justify-center gap-2 rounded-[10px] border-2 border-dashed border-brand/20 bg-surface-muted text-center"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-tint-brand">
        <Plus size={16} className="text-brand" />
      </div>
      <p className="text-sm font-semibold text-brand">Add New Event</p>
      <p className="max-w-[160px] text-xs text-text-muted">
        Fair, pop-up, in-store, or online
      </p>
    </button>
  );
}
