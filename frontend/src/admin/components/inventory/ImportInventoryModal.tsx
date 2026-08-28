import { ArrowRight, Check, Upload, X } from "lucide-react";
import { useMemo, useState } from "react";
import { inventoryApi } from "../../hooks/useInventoryApi";
import { autoMapColumns, buildCanonicalCsv, buildSummary, validateRows } from "./inventoryCsvUtils";
import { ImportMappingStep } from "./steps/ImportMappingStep";
import { ImportResultStep } from "./steps/ImportResultStep";
import { ImportReviewStep } from "./steps/ImportReviewStep";
import { ImportUploadStep } from "./steps/ImportUploadStep";
import { type ColumnMapping, type ImportStep, type ParsedCsv } from "./importTypes";

const STEPS: { key: ImportStep; label: string }[] = [
  { key: "upload", label: "Upload File" },
  { key: "mapping", label: "Map & Preview" },
  { key: "review", label: "Review & Confirm" },
];

type ImportInventoryModalProps = {
  warehouseId: string;
  warehouseName: string;
  onClose: () => void;
  onImported: () => void;
};

export function ImportInventoryModal({ warehouseId, warehouseName, onClose, onImported }: ImportInventoryModalProps) {
  const [step, setStep] = useState<ImportStep>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [csv, setCsv] = useState<ParsedCsv | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [mapping, setMapping] = useState<ColumnMapping>({});
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [rowsImported, setRowsImported] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);

  const validations = useMemo(() => (csv ? validateRows(csv, mapping) : []), [csv, mapping]);
  const summary = useMemo(() => (csv ? buildSummary(csv, validations) : null), [csv, validations]);

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

  async function handleConfirmImport() {
    if (!csv || !summary || !file) return;
    if (summary.invalidRows > 0) {
      setStep("error");
      return;
    }
    setImporting(true);
    setImportError(null);
    try {
      const response = await inventoryApi.importCsv({
        warehouseId,
        csv: buildCanonicalCsv(csv, mapping),
        fileName: file.name,
      });
      setRowsImported(response.imported);
      setSkippedCount(response.skipped.length);
      setStep(response.status === "failed" ? "error" : "success");
    } catch (err) {
      setImportError(err instanceof Error ? err.message : "Failed to import CSV.");
    } finally {
      setImporting(false);
    }
  }

  const stepIndex = STEPS.findIndex((s) => s.key === step);
  const showStepper = step === "upload" || step === "mapping" || step === "review";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="flex max-h-[90vh] w-full max-w-[640px] flex-col rounded-[12px] bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-brand-border px-6 py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-text-primary">Import Inventory</h1>
            <span className="rounded-full bg-surface-tan px-2.5 py-0.5 text-[11px] font-semibold text-brand">
              {warehouseName}
            </span>
          </div>
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
            <ImportUploadStep
              warehouseName={warehouseName}
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

          {step === "mapping" && csv && summary && (
            <ImportMappingStep csv={csv} summary={summary} />
          )}

          {step === "review" && csv && summary && (
            <ImportReviewStep
              warehouseName={warehouseName}
              csv={csv}
              mapping={mapping}
              validations={validations}
              summary={summary}
            />
          )}

          {step === "success" && (
            <ImportResultStep
              variant="success"
              warehouseName={warehouseName}
              rowsAdded={rowsImported}
              skipped={skippedCount}
              onViewInventory={onImported}
            />
          )}

          {step === "error" && summary && (
            <ImportResultStep
              variant="error"
              invalidRows={summary.invalidRows > 0 ? summary.invalidRows : skippedCount}
              onCancelImport={onClose}
              onReviewFlaggedRows={() => setStep("review")}
            />
          )}

          {importError && (
            <div className="mt-3 rounded-[6px] bg-danger/10 px-3 py-2 text-xs font-medium text-danger">
              {importError}
            </div>
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
                className="inline-flex h-[38px] items-center gap-1.5 rounded-[8px] bg-brand-dark px-4 text-xs font-semibold text-white disabled:pointer-events-none disabled:opacity-40"
              >
                Next
                <ArrowRight size={13} />
              </button>
            )}

            {step === "mapping" && (
              <button
                disabled={!summary || summary.validRows === 0}
                onClick={() => setStep("review")}
                className="inline-flex h-[38px] items-center gap-1.5 rounded-[8px] bg-brand-dark px-4 text-xs font-semibold text-white disabled:pointer-events-none disabled:opacity-40"
              >
                Next
                <ArrowRight size={13} />
              </button>
            )}

            {step === "review" && (
              <button
                disabled={importing}
                onClick={handleConfirmImport}
                className="inline-flex h-[38px] items-center gap-1.5 rounded-[8px] bg-brand-dark px-4 text-xs font-semibold text-white disabled:opacity-60"
              >
                <Upload size={13} />
                {importing ? "Importing…" : "Import Data"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
