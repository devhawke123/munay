import { Download, FileText, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { downloadTemplateCsv, isCsvFile, parseCsv } from "../inventoryCsvUtils";
import type { ParsedCsv } from "../importTypes";

type ImportUploadStepProps = {
  warehouseName: string;
  file: File | null;
  csv: ParsedCsv | null;
  error: string | null;
  onFileParsed: (file: File, csv: ParsedCsv) => void;
  onError: (message: string) => void;
  onClear: () => void;
};

export function ImportUploadStep({
  warehouseName,
  file,
  csv,
  error,
  onFileParsed,
  onError,
  onClear,
}: ImportUploadStepProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(candidate: File) {
    if (!isCsvFile(candidate)) {
      onError(`"${candidate.name}" isn't a .csv file. Please upload a CSV file.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      const parsed = parseCsv(text);
      if (parsed.headers.length === 0 || parsed.rows.length === 0) {
        onError(`"${candidate.name}" doesn't contain any readable rows.`);
        return;
      }
      onFileParsed(candidate, parsed);
    };
    reader.onerror = () => onError(`Couldn't read "${candidate.name}". Please try again.`);
    reader.readAsText(candidate);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleFile(dropped);
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-sm font-display font-bold text-text-primary">Upload CSV File</p>
        <p className="text-xs text-text-muted">
          Upload or drag &amp; drop your inventory spreadsheet for {warehouseName}.
        </p>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center gap-3 rounded-[10px] border-2 border-dashed px-6 py-10 text-center transition-colors ${
          isDragging ? "border-brand bg-tint-brand" : "border-brand/20 bg-surface-muted"
        }`}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-tint-brand">
          <Upload size={18} className="text-brand" />
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">Drag &amp; drop your CSV file here</p>
          <p className="text-xs text-text-muted">or</p>
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          className="inline-flex h-[36px] items-center rounded-[8px] bg-brand-dark px-4 text-xs font-semibold text-white"
        >
          Choose File
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(e) => {
            const selected = e.target.files?.[0];
            if (selected) handleFile(selected);
            e.target.value = "";
          }}
        />
      </div>

      {error && (
        <div className="rounded-[6px] bg-danger/10 px-3 py-2 text-xs font-medium text-danger">
          {error}
        </div>
      )}

      {file && csv && !error && (
        <div className="flex items-center justify-between rounded-[6px] border border-brand/10 bg-white px-3 py-2">
          <div className="flex items-center gap-2">
            <FileText size={15} className="text-brand" />
            <div>
              <p className="text-xs font-semibold text-text-primary">{file.name}</p>
              <p className="text-[11px] text-text-muted">{csv.rows.length} rows</p>
            </div>
          </div>
          <button onClick={onClear} className="text-text-muted">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="rounded-[10px] bg-surface-muted p-4">
        <p className="mb-2 text-xs font-semibold text-text-primary">Required CSV columns</p>
        <p className="text-xs text-text-muted">
          Product SKU, Product Name, Category, Total Stock, Reorder Point, Status
        </p>
        <button
          onClick={downloadTemplateCsv}
          className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-brand-accent hover:underline"
        >
          <Download size={12} />
          Download template CSV
        </button>
      </div>
    </div>
  );
}
