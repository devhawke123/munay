import type { ImportSummary, ParsedCsv } from "../importTypes";
import { ImportSummaryStats } from "./ImportSummaryStats";

type ImportMappingStepProps = {
  csv: ParsedCsv;
  summary: ImportSummary;
};

export function ImportMappingStep({ csv, summary }: ImportMappingStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <ImportSummaryStats summary={summary} />

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
          Data Preview (First 5 Rows)
        </p>
        <div
          className="grid gap-x-4 rounded-[6px] bg-tint-brand px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-text-muted"
          style={{ gridTemplateColumns: `repeat(${csv.headers.length}, minmax(0, 1fr))` }}
        >
          {csv.headers.map((header) => (
            <div key={header} className="truncate">
              {header}
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          {csv.rows.slice(0, 5).map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid items-center gap-x-4 border-b border-brand-border py-2.5 last:border-0 text-[13px] text-text-primary"
              style={{ gridTemplateColumns: `repeat(${csv.headers.length}, minmax(0, 1fr))` }}
            >
              {row.map((cell, cellIndex) => (
                <div key={cellIndex} className="truncate">
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
