import { CheckCircle2, Download, FileSpreadsheet, FileText, Table2, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  buildCsv,
  buildExcelWorkbook,
  buildSimplePdf,
  triggerDownload,
  type ExportScopeOption,
} from "./exportUtils";

type ExportReportModalProps = {
  tabLabel: string;
  startDay: string;
  endDay: string;
  scopeOptions: ExportScopeOption[];
  onClose: () => void;
};

type Format = "CSV" | "Excel" | "PDF";

const FORMAT_OPTIONS: { key: Format; label: string; description: string; icon: typeof Table2 }[] = [
  { key: "CSV", label: "CSV", description: "Raw rows for spreadsheets", icon: Table2 },
  { key: "Excel", label: "Excel", description: "Formatted workbook", icon: FileSpreadsheet },
  { key: "PDF", label: "PDF", description: "Print-ready report", icon: FileText },
];

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
  const [format, setFormat] = useState<Format>("Excel");
  const [done, setDone] = useState(false);
  const [filename, setFilename] = useState("");

  const fullReport = scopeOptions.find((option) => option.key === "full") ?? scopeOptions[0];
  const dateRangeLabel = `${startDay} – ${endDay}`;

  useEffect(() => {
    if (!done) return;
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [done, onClose]);

  function handleGenerate() {
    const sections = fullReport.getSections();
    const slug = slugify(startDay, endDay);

    let blob: Blob;
    let extension: string;
    if (format === "CSV") {
      blob = new Blob([buildCsv(sections)], { type: "text/csv" });
      extension = "csv";
    } else if (format === "Excel") {
      blob = buildExcelWorkbook(sections);
      extension = "xls";
    } else {
      blob = buildSimplePdf("Export report", `${dateRangeLabel} · ${tabLabel}`, sections);
      extension = "pdf";
    }

    const name = `sales-report-${slug}.${extension}`;
    triggerDownload(blob, name);
    setFilename(name);
    setDone(true);
  }

  if (done) {
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
      <div className="w-full max-w-[420px] overflow-hidden rounded-[12px] bg-white shadow-card">
        <div className="flex items-center justify-between bg-brand-dark px-5 py-4">
          <div className="flex items-center gap-3">
            <Download size={18} className="text-white" />
            <div>
              <p className="text-sm font-display font-bold text-white">Export report</p>
              <p className="text-xs text-white/70">
                Sales &amp; Analytics · {tabLabel}
              </p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="text-white/80 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-3 px-5 py-5">
          {FORMAT_OPTIONS.map((option) => {
            const isSelected = option.key === format;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setFormat(option.key)}
                className={`flex items-center gap-3 rounded-[8px] border px-4 py-3 text-left transition-colors ${
                  isSelected ? "border-brand-accent bg-brand-soft/20" : "border-brand-border"
                }`}
              >
                {isSelected && <span className="h-8 w-1 shrink-0 rounded-full bg-brand-accent" />}
                <div>
                  <p className="text-sm font-semibold text-text-primary">{option.label}</p>
                  <p className="text-xs text-text-muted">{option.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-brand-border px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[10px] border border-brand-border bg-white px-5 py-2.5 text-sm font-medium text-text-primary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            className="inline-flex h-10 items-center gap-2 rounded-[8px] bg-brand-dark px-5 text-sm font-semibold text-white"
          >
            <Download size={14} />
            Generate {format}
          </button>
        </div>
      </div>
    </div>
  );
}
