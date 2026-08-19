import { FileText, HelpCircle, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { downloadSampleCsv, isCsvFile, parseCsv } from "./csvUtils";
import type { ParsedCsv } from "./types";

type UploadStepProps = {
  file: File | null;
  csv: ParsedCsv | null;
  error: string | null;
  onFileParsed: (file: File, csv: ParsedCsv) => void;
  onError: (message: string) => void;
  onClear: () => void;
};

export function UploadStep({ file, csv, error, onFileParsed, onError, onClear }: UploadStepProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);
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
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
        Upload CSV File
      </p>

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
              <p className="text-[11px] text-text-muted">
                {csv.rows.length} rows · {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <button onClick={onClear} className="text-text-muted">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="flex items-center gap-4 text-xs">
        <button
          onClick={downloadSampleCsv}
          className="font-semibold text-brand-accent hover:underline"
        >
          Download Sample CSV
        </button>
        <button
          onClick={() => setShowGuidelines((v) => !v)}
          className="flex items-center gap-1 text-text-muted hover:underline"
        >
          <HelpCircle size={12} />
          Need help? View CSV Guidelines
        </button>
      </div>

      {showGuidelines && (
        <div className="rounded-[6px] bg-surface-muted p-3 text-xs text-text-muted">
          <p className="mb-1 font-semibold text-text-primary">CSV Guidelines</p>
          <ul className="list-disc pl-4">
            <li>First row must contain column headers.</li>
            <li>Required columns: Date, Store / Event Exhibition, Transaction ID, Sales Amount, Payment Mode.</li>
            <li>Dates should be in YYYY-MM-DD format.</li>
            <li>Sales Amount should be numeric (e.g. 120.00).</li>
          </ul>
        </div>
      )}
    </div>
  );
}
