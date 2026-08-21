import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { extractImportRows } from "../inventoryCsvUtils";
import { getInventoryStatus, type InventoryStatus } from "../../../types/inventory";
import type { ColumnMapping, ImportSummary, ParsedCsv, RowValidation } from "../importTypes";

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

      <div className="grid grid-cols-3 gap-3">
        <SummaryStat label="Total Rows" value={String(summary.totalRows)} />
        <SummaryStat
          label="Invalid Rows"
          value={String(summary.invalidRows)}
          tone={summary.invalidRows > 0 ? "danger" : undefined}
        />
        <SummaryStat label="Valid Rows" value={String(summary.validRows)} tone="success" />
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
          Data Preview (First 5 Rows)
        </p>
        <div className="overflow-x-auto rounded-[8px] border border-brand/10">
          <table className="w-full text-left text-[12px]">
            <thead className="bg-surface-muted text-text-muted">
              <tr>
                <th className="whitespace-nowrap px-3 py-2 font-medium">SKU</th>
                <th className="whitespace-nowrap px-3 py-2 font-medium">Product Name</th>
                <th className="whitespace-nowrap px-3 py-2 font-medium">Category</th>
                <th className="whitespace-nowrap px-3 py-2 font-medium">Total Stock</th>
                <th className="whitespace-nowrap px-3 py-2 font-medium">Reorder Point</th>
                <th className="whitespace-nowrap px-3 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {previewRows.map((row, index) => {
                const status = getInventoryStatus(row);
                return (
                  <tr key={`${row.sku}-${index}`} className="border-t border-brand/10">
                    <td className="whitespace-nowrap px-3 py-2 font-mono text-brand">{row.sku}</td>
                    <td className="whitespace-nowrap px-3 py-2 font-medium text-text-primary">
                      {row.product}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-text-muted">{row.category}</td>
                    <td className="whitespace-nowrap px-3 py-2 font-semibold text-text-primary">
                      {row.totalStock}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-text-primary">
                      {row.reorderPoint}
                    </td>
                    <td className={`whitespace-nowrap px-3 py-2 font-semibold ${STATUS_CLASS[status]}`}>
                      {status}
                    </td>
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

function SummaryStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "success" | "danger";
}) {
  const toneClass = tone === "success" ? "text-success" : tone === "danger" ? "text-danger" : "text-text-primary";

  return (
    <div className="rounded-[8px] border border-brand/10 bg-white p-3 text-center">
      <p className={`text-lg font-bold ${toneClass}`}>{value}</p>
      <p className="text-[11px] text-text-muted">{label}</p>
    </div>
  );
}
