import { ArrowLeft, CheckCircle2, Download, FileSpreadsheet, FileText, X } from "lucide-react";
import { useEffect, useState } from "react";
import { buildCsv, buildSimplePdf, triggerDownload, type ExportScopeOption } from "./exportUtils";

type ExportReportModalProps = {
  tabLabel: string;
  startDay: string;
  endDay: string;
  scopeOptions: ExportScopeOption[];
  onClose: () => void;
};

type Step = "scope" | "format" | "done";
type Format = "PDF" | "CSV";

function slugify(startDay: string, endDay: string) {
  const [startNum] = startDay.split(" ");
  const [endNum, month] = endDay.split(" ");
  return `${startNum}-${endNum}-${(month ?? "").toLowerCase()}`;
}

export function ExportReportModal({
  tabLabel,
  startDay,
  endDay,
  scopeOptions,
  onClose,
}: ExportReportModalProps) {
  const [step, setStep] = useState<Step>("scope");
  const [scopeKey, setScopeKey] = useState(scopeOptions[0]?.key);
  const [format, setFormat] = useState<Format>("PDF");
  const [filename, setFilename] = useState("");

  const selectedOption = scopeOptions.find((option) => option.key === scopeKey) ?? scopeOptions[0];
  const dateRangeLabel = `${startDay} – ${endDay}`;

  useEffect(() => {
    if (step !== "done") return;
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [step, onClose]);

  function handleDownload() {
    const sections = selectedOption.getSections();
    const slug = slugify(startDay, endDay);
    const name = `sales-report-${slug}.${format.toLowerCase()}`;

    const blob =
      format === "CSV"
        ? new Blob([buildCsv(sections)], { type: "text/csv" })
        : buildSimplePdf("Export report", `${dateRangeLabel} · ${tabLabel}`, sections);

    triggerDownload(blob, name);
    setFilename(name);
    setStep("done");
  }

  if (step === "done") {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-[10px] bg-[#161412] px-4 py-3 shadow-card">
        <CheckCircle2 size={18} className="shrink-0 text-success" />
        <div>
          <p className="text-sm font-semibold text-info">Report downloaded</p>
          <p className="text-xs text-gray-400">{filename}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[500px] rounded-[12px] border border-brand-border bg-white p-7 shadow-card">
        {step === "scope" && (
          <>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-display font-bold text-text-primary">Export report</p>
                <p className="mt-0.5 text-xs text-text-muted">
                  {dateRangeLabel} · {tabLabel}
                </p>
              </div>
              <button type="button" onClick={onClose} className="text-text-muted hover:text-text-primary">
                <X size={18} />
              </button>
            </div>

            <p className="mb-3 mt-6 text-[10px] font-semibold uppercase tracking-wide text-text-muted">
              What to export
            </p>
          <div className="flex flex-col gap-3">
            {scopeOptions.map((option) => {
              const isSelected = option.key === scopeKey;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => {
                    setScopeKey(option.key);
                    setStep("format");
                  }}
                  className={`flex items-center gap-2 rounded-[8px] border px-4 py-3.5 text-left text-sm ${
                    isSelected
                      ? "border-brand-accent bg-brand-soft/30 font-semibold text-text-primary"
                      : "border-brand-border text-text-primary"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                      isSelected ? "border-brand-accent" : "border-brand-border"
                    }`}
                  >
                    {isSelected && <span className="h-2 w-2 rounded-full bg-brand-accent" />}
                  </span>
                  {option.label}
                </button>
              );
            })}
          </div>

          <p className="mt-6 text-[11px] text-text-muted">Step 1 of 3 — choose scope</p>
        </>
      )}

      {step === "format" && (
        <>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStep("scope")}
                className="text-text-muted hover:text-text-primary"
              >
                <ArrowLeft size={14} />
              </button>
              <div>
                <p className="text-sm font-display font-bold text-text-primary">Export report</p>
                <p className="text-xs text-text-muted">{selectedOption.label} selected</p>
              </div>
            </div>
            <button type="button" onClick={onClose} className="text-text-muted hover:text-text-primary">
              <X size={18} />
            </button>
          </div>

          <p className="mb-3 mt-6 text-[10px] font-semibold uppercase tracking-wide text-text-muted">
            Format
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormat("PDF")}
              className={`flex flex-col items-center gap-1.5 rounded-[8px] border px-4 py-5 ${
                format === "PDF" ? "border-brand-accent bg-brand-soft/30" : "border-brand-border"
              }`}
            >
              <FileText size={22} className="text-brand-accent" />
              <span className="text-sm font-semibold text-text-primary">PDF</span>
              <span className="text-[11px] text-text-muted">Visual report</span>
            </button>
            <button
              type="button"
              onClick={() => setFormat("CSV")}
              className={`flex flex-col items-center gap-1.5 rounded-[8px] border px-4 py-5 ${
                format === "CSV" ? "border-brand-accent bg-brand-soft/30" : "border-brand-border"
              }`}
            >
              <FileSpreadsheet size={22} className="text-brand-accent" />
              <span className="text-sm font-semibold text-text-primary">CSV</span>
              <span className="text-[11px] text-text-muted">Raw data</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-brand-dark text-sm font-semibold text-white"
          >
            <Download size={15} />
            Download
          </button>

          <p className="mt-4 text-[11px] text-text-muted">Step 2 of 3 — choose format</p>
        </>
      )}
      </div>
    </div>
  );
}
