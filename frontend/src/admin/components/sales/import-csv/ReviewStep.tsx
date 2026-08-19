import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { REQUIRED_FIELDS, type ColumnMapping, type ImportSummary, type ParsedCsv, type RowValidation } from "./types";

type ReviewStepProps = {
  csv: ParsedCsv;
  mapping: ColumnMapping;
  validations: RowValidation[];
  summary: ImportSummary;
};

export function ReviewStep({ csv, mapping, validations, summary }: ReviewStepProps) {
  const previewFields = REQUIRED_FIELDS;
  const headerForField = (field: string) =>
    Object.keys(mapping).find((header) => mapping[header] === field);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
          Review Import Summary
        </p>
        <div className="grid grid-cols-4 gap-3">
          <SummaryStat label="Total Rows" value={String(summary.totalRows)} />
          <SummaryStat label="Valid Rows" value={String(summary.validRows)} tone="success" />
          <SummaryStat
            label="Invalid Rows"
            value={String(summary.invalidRows)}
            tone={summary.invalidRows > 0 ? "danger" : undefined}
          />
          <SummaryStat
            label="Duplicate Rows"
            value={String(summary.duplicateRows)}
            tone={summary.duplicateRows > 0 ? "warning" : undefined}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-[8px] border border-brand/10 bg-white p-3">
          <p className="text-[11px] text-text-muted">Date Range</p>
          <p className="text-sm font-semibold text-text-primary">{summary.dateRangeLabel}</p>
        </div>
        <div className="rounded-[8px] border border-brand/10 bg-white p-3">
          <p className="text-[11px] text-text-muted">Stores</p>
          <p className="text-sm font-semibold text-text-primary">{summary.storeCount}</p>
        </div>
        <div className="rounded-[8px] border border-brand/10 bg-white p-3">
          <p className="text-[11px] text-text-muted">Total Sales Amount</p>
          <p className="text-sm font-semibold text-text-primary">{summary.totalSalesAmount}</p>
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
          Data Preview (First 5 Rows)
        </p>
        <div className="overflow-x-auto rounded-[8px] border border-brand/10">
          <table className="w-full text-left text-[12px]">
            <thead className="bg-surface-muted text-text-muted">
              <tr>
                {previewFields.map((field) => (
                  <th key={field} className="whitespace-nowrap px-3 py-2 font-medium">
                    {field}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csv.rows.slice(0, 5).map((row, rowIndex) => {
                const validation = validations[rowIndex];
                return (
                  <tr
                    key={rowIndex}
                    className={`border-t border-brand/10 ${
                      validation && !validation.isValid ? "bg-danger/5" : ""
                    }`}
                  >
                    {previewFields.map((field) => {
                      const header = headerForField(field);
                      const value = header ? row[csv.headers.indexOf(header)] : "";
                      return (
                        <td key={field} className="whitespace-nowrap px-3 py-2 text-text-primary">
                          {value || "—"}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {summary.invalidRows === 0 ? (
        <div className="flex items-center gap-2 rounded-[6px] bg-success/10 px-3 py-2 text-xs font-semibold text-success">
          <CheckCircle2 size={14} />
          All rows are valid. Ready to import.
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-[6px] bg-danger/10 px-3 py-2 text-xs font-semibold text-danger">
          <AlertTriangle size={14} />
          {summary.invalidRows} row{summary.invalidRows === 1 ? "" : "s"} have issues and won't be
          imported.
        </div>
      )}
    </div>
  );
}

function SummaryStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "success" | "danger" | "warning";
}) {
  const toneClass =
    tone === "success"
      ? "text-success"
      : tone === "danger"
        ? "text-danger"
        : tone === "warning"
          ? "text-warning"
          : "text-text-primary";

  return (
    <div className="rounded-[8px] border border-brand/10 bg-white p-3">
      <p className="text-[11px] text-text-muted">{label}</p>
      <p className={`text-base font-bold ${toneClass}`}>{value}</p>
    </div>
  );
}
