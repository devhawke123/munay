import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { extractImportRows } from "../inventoryCsvUtils";
import { getInventoryStatus, type InventoryStatus } from "../../../types/inventory";
import type { ColumnMapping, ImportSummary, ParsedCsv, RowValidation } from "../importTypes";
import { ImportSummaryStats } from "./ImportSummaryStats";

type ImportReviewStepProps = {
  warehouseName: string;
  csv: ParsedCsv;
  mapping: ColumnMapping;
  validations: RowValidation[];
  summary: ImportSummary;
};

const STATUS_CLASS: Record<InventoryStatus, string> = {
  "In Stock": "text-success",
  "Low Stock": "text-warning",
  "Out of Stock": "text-danger",
};

export function ImportReviewStep({
  warehouseName,
  csv,
  mapping,
  validations,
  summary,
}: ImportReviewStepProps) {
  const previewRows = extractImportRows(csv, mapping, validations).slice(0, 5);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-sm font-display font-bold text-text-primary">Review &amp; Confirm</p>
        <p className="text-xs text-text-muted">
          Review summary and data preview before importing into <strong>{warehouseName}</strong>.
        </p>
      </div>

      <ImportSummaryStats summary={summary} />

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
          Data Preview (First 5 Rows)
        </p>

        <div className="grid grid-cols-[70px_1.4fr_90px_90px_100px_90px] items-center gap-x-4 border-b border-brand-border pb-2 text-[10px] font-semibold uppercase tracking-wide text-text-muted">
          <div>SKU</div>
          <div>Product Name</div>
          <div>Category</div>
          <div>Total Stock</div>
          <div>Reorder Point</div>
          <div>Status</div>
        </div>

        <div className="flex flex-col">
          {previewRows.map((row, index) => {
            const status = getInventoryStatus(row);
            return (
              <div
                key={`${row.sku}-${index}`}
                className="grid grid-cols-[70px_1.4fr_90px_90px_100px_90px] items-center gap-x-4 border-b border-brand-border py-3 last:border-0"
              >
                <div className="text-xs text-text-muted">{row.sku}</div>
                <div className="text-[13px] font-semibold text-text-primary">{row.product}</div>
                <div className="text-xs text-text-muted">{row.category}</div>
                <div className="text-[13px] font-bold text-text-primary">{row.totalStock}</div>
                <div className="text-[13px] text-text-primary">{row.reorderPoint}</div>
                <div className={`text-[13px] font-semibold ${STATUS_CLASS[status]}`}>{status}</div>
              </div>
            );
          })}
        </div>
      </div>

      {summary.invalidRows === 0 ? (
        <div className="flex items-center gap-2 rounded-[6px] bg-success/10 px-3 py-2 text-xs font-semibold text-success">
          <CheckCircle2 size={14} />
          All rows are valid. Ready to import into {warehouseName}.
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
