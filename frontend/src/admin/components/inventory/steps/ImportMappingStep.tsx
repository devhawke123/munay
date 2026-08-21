import { CheckCircle2 } from "lucide-react";
import { mappedFieldCount } from "../inventoryCsvUtils";
import { REQUIRED_FIELDS, TARGET_FIELDS, type ColumnMapping, type ParsedCsv } from "../importTypes";

type ImportMappingStepProps = {
  csv: ParsedCsv;
  mapping: ColumnMapping;
  onMappingChange: (mapping: ColumnMapping) => void;
};

export function ImportMappingStep({ csv, mapping, onMappingChange }: ImportMappingStepProps) {
  const mapped = mappedFieldCount(mapping);

  return (
    <div className="grid grid-cols-[1fr_1fr] gap-6">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
          Map Columns
        </p>
        <div className="grid grid-cols-[1fr_1fr] gap-x-4 gap-y-1 pb-2 text-[11px] uppercase tracking-wide text-text-muted">
          <div>CSV Column</div>
          <div>Map to Field</div>
        </div>

        <div className="flex flex-col gap-2">
          {csv.headers.map((header) => (
            <div key={header} className="grid grid-cols-[1fr_1fr] items-center gap-4">
              <span className="truncate text-[13px] font-medium text-text-primary">{header}</span>
              <select
                value={mapping[header] ?? ""}
                onChange={(e) =>
                  onMappingChange({ ...mapping, [header]: e.target.value as ColumnMapping[string] })
                }
                className="h-[32px] rounded-[6px] border border-brand/10 bg-white px-2 text-xs text-text-primary"
              >
                <option value="">Do not map</option>
                {TARGET_FIELDS.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium">
          <CheckCircle2
            size={14}
            className={mapped === REQUIRED_FIELDS.length ? "text-success" : "text-text-muted"}
          />
          <span className={mapped === REQUIRED_FIELDS.length ? "text-success" : "text-text-muted"}>
            {mapped} of {REQUIRED_FIELDS.length} columns mapped
          </span>
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
          Preview Data (First 5 Rows)
        </p>
        <div className="overflow-x-auto rounded-[8px] border border-brand/10">
          <table className="w-full text-left text-[12px]">
            <thead className="bg-surface-muted text-text-muted">
              <tr>
                {csv.headers.map((header) => (
                  <th key={header} className="whitespace-nowrap px-3 py-2 font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csv.rows.slice(0, 5).map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-brand/10">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="whitespace-nowrap px-3 py-2 text-text-primary">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
