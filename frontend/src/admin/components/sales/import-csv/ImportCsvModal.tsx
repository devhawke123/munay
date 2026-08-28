import { Check, X } from "lucide-react";
import { useMemo, useState } from "react";
import { salesApi } from "../../../hooks/useSalesApi";
import { autoMapColumns, buildCanonicalCsv, buildSummary, mappedFieldCount, validateRows } from "./csvUtils";
import { MappingStep } from "./MappingStep";
import { ResultStep } from "./ResultStep";
import { ReviewStep } from "./ReviewStep";
import {
  REQUIRED_FIELDS,
  type ColumnMapping,
  type ImportStep,
  type ParsedCsv,
  type StoreEventType,
} from "./types";
import { UploadStep } from "./UploadStep";

const STEPS: { key: ImportStep; label: string }[] = [
  { key: "upload", label: "Upload File" },
  { key: "mapping", label: "Map & Preview" },
  { key: "review", label: "Review & Confirm" },
];

type ImportCsvModalProps = {
  onClose: () => void;
  onImported: () => void;
};

export function ImportCsvModal({ onClose, onImported }: ImportCsvModalProps) {
  const [step, setStep] = useState<ImportStep>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [csv, setCsv] = useState<ParsedCsv | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [mapping, setMapping] = useState<ColumnMapping>({});
  const [storeEventType, setStoreEventType] = useState<StoreEventType>("Store");
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [result, setResult] = useState<{ validRows: number; invalidRows: number } | null>(null);

  const validations = useMemo(() => (csv ? validateRows(csv, mapping) : []), [csv, mapping]);
  const summary = useMemo(
    () => (csv ? buildSummary(csv, mapping, validations) : null),
    [csv, mapping, validations],
  );

  async function handleImport() {
    if (!csv) return;
    setImporting(true);
    setImportError(null);
    try {
      const response = await salesApi.importInStoreSales(buildCanonicalCsv(csv, mapping));
      setResult({ validRows: response.validRows, invalidRows: response.invalidRows });
      setStep(response.invalidRows > 0 ? "error" : "success");
    } catch (err) {
      setImportError(err instanceof Error ? err.message : "Failed to import CSV.");
    } finally {
      setImporting(false);
    }
  }

  function handleFileParsed(nextFile: File, nextCsv: ParsedCsv) {
    setFile(nextFile);
    setCsv(nextCsv);
    setFileError(null);
    setMapping(autoMapColumns(nextCsv.headers));
  }

  function handleClearFile() {
    setFile(null);
    setCsv(null);
    setFileError(null);
    setMapping({});
  }

  const stepIndex = STEPS.findIndex((s) => s.key === step);
  const showStepper = step === "upload" || step === "mapping" || step === "review";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="flex max-h-[90vh] w-full max-w-[640px] flex-col rounded-[12px] bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-brand-border px-6 py-4">
          <h1 className="text-base font-bold text-text-primary">Import In-Store Sales</h1>
          <button onClick={onClose} className="text-text-muted">
            <X size={18} />
          </button>
        </div>

        {showStepper && (
          <div className="flex items-center gap-2 border-b border-brand-border px-6 py-4">
            {STEPS.map((s, index) => {
              const isDone = index < stepIndex;
              const isCurrent = index === stepIndex;
              return (
                <div key={s.key} className="flex flex-1 items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                        isDone
                          ? "bg-success text-white"
                          : isCurrent
                            ? "bg-brand-dark text-white"
                            : "bg-surface-muted text-text-muted"
                      }`}
                    >
                      {isDone ? <Check size={12} /> : index + 1}
                    </div>
                    <span
                      className={`whitespace-nowrap text-xs font-medium ${
                        isCurrent ? "text-text-primary" : "text-text-muted"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`h-px flex-1 ${isDone ? "bg-success" : "bg-brand-border"}`} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="overflow-y-auto px-6 py-5">
          {step === "upload" && (
            <UploadStep
              file={file}
              csv={csv}
              error={fileError}
              onFileParsed={handleFileParsed}
              onError={(message) => {
                setFileError(message);
                setFile(null);
                setCsv(null);
              }}
              onClear={handleClearFile}
            />
          )}

          {step === "mapping" && csv && (
            <MappingStep
              csv={csv}
              mapping={mapping}
              onMappingChange={setMapping}
              storeEventType={storeEventType}
              onStoreEventTypeChange={setStoreEventType}
            />
          )}

          {step === "review" && csv && summary && (
            <ReviewStep csv={csv} mapping={mapping} validations={validations} summary={summary} />
          )}

          {step === "success" && result && (
            <ResultStep variant="success" rowsAdded={result.validRows} onViewData={onImported} />
          )}

          {step === "error" && result && (
            <ResultStep
              variant="error"
              invalidRows={result.invalidRows}
              onCancelImport={onClose}
              onReviewFlaggedRows={() => setStep("review")}
            />
          )}
        </div>

        {(step === "upload" || step === "mapping" || step === "review") && (
          <div className="flex items-center justify-between border-t border-brand-border px-6 py-4">
            <button
              onClick={step === "upload" ? onClose : () => setStep(STEPS[stepIndex - 1].key)}
              className="inline-flex h-[38px] items-center rounded-[8px] border border-brand/10 bg-white px-4 text-xs font-semibold text-text-primary"
            >
              {step === "upload" ? "Cancel" : "Back"}
            </button>

            {step === "upload" && (
              <button
                disabled={!csv || !!fileError}
                onClick={() => setStep("mapping")}
                className="inline-flex h-[38px] items-center rounded-[8px] bg-brand-dark px-4 text-xs font-semibold text-white disabled:pointer-events-none disabled:opacity-40"
              >
                Next
              </button>
            )}

            {step === "mapping" && (
              <button
                disabled={mappedFieldCount(mapping) < REQUIRED_FIELDS.length}
                onClick={() => setStep("review")}
                className="inline-flex h-[38px] items-center rounded-[8px] bg-brand-dark px-4 text-xs font-semibold text-white disabled:pointer-events-none disabled:opacity-40"
              >
                Next
              </button>
            )}

            {step === "review" && (
              <button
                disabled={importing}
                onClick={handleImport}
                className="inline-flex h-[38px] items-center rounded-[8px] bg-brand-dark px-4 text-xs font-semibold text-white disabled:opacity-60"
              >
                {importing ? "Importing…" : "Import Data"}
              </button>
            )}
          </div>
        )}

        {importError && (
          <div className="mx-6 mb-4 rounded-[6px] bg-danger/10 px-3 py-2 text-xs font-medium text-danger">
            {importError}
          </div>
        )}
      </div>
    </div>
  );
}
