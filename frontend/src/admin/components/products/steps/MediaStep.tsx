import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { API_BASE_URL, api } from "../../../lib/api";
import type { ProductDraft } from "../../../types/product";

type MediaStepProps = {
  draft: ProductDraft;
  onChange: (patch: Partial<ProductDraft>) => void;
};

export function MediaStep({ draft, onChange }: MediaStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const toUpload = Array.from(files).slice(0, Math.max(0, 8 - draft.images.length));
    if (toUpload.length === 0) return;

    setUploading(true);
    setError(null);
    try {
      const { paths } = await api.uploadFiles("/uploads", toUpload);
      const newImages = paths.map((path) => ({ id: crypto.randomUUID(), url: `${API_BASE_URL}${path}` }));
      onChange({ images: [...draft.images, ...newImages] });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload images.");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(id: string) {
    onChange({ images: draft.images.filter((img) => img.id !== id) });
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-display font-bold text-text-primary">Product Media</h2>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="flex flex-col items-center gap-2 rounded-panel border border-dashed border-brand/20 bg-brand-soft/30 px-6 py-10 text-center"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-panel bg-brand-soft">
          <Upload size={18} className="text-brand" />
        </div>
        <p className="text-sm font-semibold text-text-primary">
          {uploading ? "Uploading…" : "Drop images here"}
        </p>
        <p className="text-xs text-text-muted">PNG, JPG, WEBP up to 10MB each. Max 8 images.</p>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="mt-1 rounded-[10px] border border-brand-border bg-white px-4 py-1.5 text-xs font-medium text-text-primary disabled:opacity-60"
        >
          Browse Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error && <p className="text-sm font-medium text-danger">{error}</p>}

      {draft.images.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {draft.images.map((image, index) => (
            <div key={image.id} className="relative aspect-square overflow-hidden rounded-panel">
              <img src={image.url} alt="" className="h-full w-full object-cover" />
              {index === 0 && (
                <span className="absolute left-1.5 top-1.5 rounded-full bg-brand-dark px-2 py-0.5 text-[10px] font-semibold text-white">
                  MAIN
                </span>
              )}
              <button
                type="button"
                onClick={() => removeImage(image.id)}
                aria-label="Remove image"
                className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
