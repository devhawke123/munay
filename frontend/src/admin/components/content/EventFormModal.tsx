import { Check, ImagePlus, Plus, X } from "lucide-react";
import { useState } from "react";
import { EVENT_STATUSES, EVENT_TYPES, type EventRow } from "../../types/event";
import { EventImagePlaceholder } from "./EventImagePlaceholder";

type EventFormModalProps = {
  event: EventRow;
  isNew: boolean;
  onCancel: () => void;
  onSave: (event: EventRow) => void;
};

function fieldClass() {
  return "h-[38px] w-full rounded-[8px] border border-brand/10 bg-surface-muted px-3 text-sm text-text-primary";
}

export function EventFormModal({ event, isNew, onCancel, onSave }: EventFormModalProps) {
  const [form, setForm] = useState<EventRow>(event);

  function update<K extends keyof EventRow>(key: K, value: EventRow[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateBullet(index: number, value: string) {
    setForm((prev) => ({
      ...prev,
      bulletPoints: prev.bulletPoints.map((b, i) => (i === index ? value : b)),
    }));
  }

  function addBullet() {
    setForm((prev) => ({ ...prev, bulletPoints: [...prev.bulletPoints, ""] }));
  }

  function removeBullet(index: number) {
    setForm((prev) => ({
      ...prev,
      bulletPoints: prev.bulletPoints.filter((_, i) => i !== index),
    }));
  }

  function handleImagePick(key: "posterImage" | "heroImage", file: File | undefined) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    update(key, url);
  }

  function handleGalleryPick(files: FileList | null) {
    if (!files || files.length === 0) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setForm((prev) => ({ ...prev, galleryThumbnails: [...prev.galleryThumbnails, ...urls] }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="flex max-h-[90vh] w-full max-w-[560px] flex-col rounded-[12px] bg-white shadow-card">
        <div className="flex items-start justify-between border-b border-brand-border px-6 py-4">
          <div>
            <h1 className="text-base font-bold text-text-primary">
              {isNew ? "Add Event" : "Edit Event"}
            </h1>
            {!isNew && <p className="text-xs text-text-muted">{event.title}</p>}
          </div>
          <button onClick={onCancel} className="text-text-muted">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-5 overflow-y-auto px-6 py-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
              Event Identity
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Month & Year (Headline)">
                <input
                  className={fieldClass()}
                  value={form.monthYear}
                  onChange={(e) => update("monthYear", e.target.value)}
                  placeholder="November 2025"
                />
              </Field>
              <Field label="Stand / Subtitle">
                <input
                  className={fieldClass()}
                  value={form.standSubtitle}
                  onChange={(e) => update("standSubtitle", e.target.value)}
                  placeholder="Munay Stand : D51"
                />
              </Field>
            </div>
            <div className="mt-3">
              <Field label="Event Title">
                <input
                  className={fieldClass()}
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="Les Automnales — Geneva"
                />
              </Field>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
              Date &amp; Location
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date Range">
                <input
                  className={fieldClass()}
                  value={form.dateRange}
                  onChange={(e) => update("dateRange", e.target.value)}
                  placeholder="7 – 10 November 2025"
                />
              </Field>
              <Field label="Full Location">
                <input
                  className={fieldClass()}
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="Palexpo, Geneva, Switzerland"
                />
              </Field>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Field label="Event Type">
                <select
                  className={fieldClass()}
                  value={form.type}
                  onChange={(e) => update("type", e.target.value as EventRow["type"])}
                >
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Status">
                <select
                  className={fieldClass()}
                  value={form.status}
                  onChange={(e) => update("status", e.target.value as EventRow["status"])}
                >
                  {EVENT_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
              Content
            </p>
            <Field label="Description">
              <textarea
                rows={4}
                className="w-full resize-none rounded-[8px] border border-brand/10 bg-surface-muted p-3 text-sm text-text-primary"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Describe the event. Use two blank lines to separate paragraphs."
              />
            </Field>
            <div className="mt-3">
              <Field label="Venue Callout (highlighted block on detail page)">
                <textarea
                  rows={2}
                  className="w-full resize-none rounded-[8px] border border-brand/10 bg-surface-muted p-3 text-sm text-text-primary"
                  value={form.venueCallout}
                  onChange={(e) => update("venueCallout", e.target.value)}
                  placeholder="e.g. Here's where you'll find us: Stand D51 in the Market Area."
                />
              </Field>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                What Visitors Can Do (Bullet Points)
              </p>
              <button
                onClick={addBullet}
                className="flex items-center gap-1 text-xs font-semibold text-brand-accent"
              >
                <Plus size={13} />
                Add
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {form.bulletPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    className={fieldClass()}
                    value={point}
                    onChange={(e) => updateBullet(index, e.target.value)}
                  />
                  <button onClick={() => removeBullet(index)} className="shrink-0 text-text-muted">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
              Images
            </p>
            <div className="grid grid-cols-2 gap-3">
              <ImagePicker
                label="Event Poster (Grid Card)"
                image={form.posterImage}
                onPick={(file) => handleImagePick("posterImage", file)}
              />
              <ImagePicker
                label="Hero Image (Detail Page)"
                image={form.heroImage}
                onPick={(file) => handleImagePick("heroImage", file)}
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
              Gallery Thumbnails
            </p>
            <div className="flex flex-wrap gap-2">
              {form.galleryThumbnails.map((thumb, index) => (
                <EventImagePlaceholder
                  key={index}
                  src={thumb}
                  label="Gallery"
                  className="h-[60px] w-[60px] rounded-[6px]"
                />
              ))}
              <label className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[6px] border-2 border-dashed border-brand/20 bg-surface-muted text-text-muted">
                <Plus size={16} />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    handleGalleryPick(e.target.files);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-brand-border px-6 py-4">
          <button
            onClick={onCancel}
            className="inline-flex h-[38px] items-center rounded-[8px] border border-brand/10 bg-white px-4 text-xs font-semibold text-text-primary"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="inline-flex h-[38px] items-center gap-1.5 rounded-[8px] bg-brand-dark px-4 text-xs font-semibold text-white"
          >
            <Check size={13} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] font-medium text-text-muted">{label}</span>
      {children}
    </label>
  );
}

function ImagePicker({
  label,
  image,
  onPick,
}: {
  label: string;
  image: string | null;
  onPick: (file: File | undefined) => void;
}) {
  return (
    <div>
      <p className="mb-1 text-[11px] font-medium text-text-muted">{label}</p>
      <label className="relative flex h-[110px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-[8px] border-2 border-dashed border-brand/20 bg-surface-muted">
        {image ? (
          <EventImagePlaceholder src={image} label={label} className="h-full w-full" />
        ) : (
          <div className="flex flex-col items-center gap-1 text-text-muted">
            <ImagePlus size={18} />
            <span className="text-[11px]">Upload image</span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onPick(e.target.files?.[0])}
        />
      </label>
    </div>
  );
}
