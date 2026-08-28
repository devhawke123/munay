import {
  REQUIRED_FIELDS,
  TARGET_FIELDS,
  type ColumnMapping,
  type ImportRow,
  type ImportSummary,
  type ParsedCsv,
  type RowValidation,
  type TargetField,
} from "./importTypes";

const TEMPLATE_CSV = `Product SKU,Product Name,Category,Total Stock,Reorder Point
W-SS-001,Silk Scarf — Geometric,Women,145,20
M-OW-001,Alpaca Overcoat,Men,42,30
`;

export function downloadTemplateCsv() {
  const blob = new Blob([TEMPLATE_CSV], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "inventory-template.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function isCsvFile(file: File): boolean {
  const name = file.name.toLowerCase();
  if (name.endsWith(".csv")) return true;
  return file.type === "text/csv" || file.type === "application/vnd.ms-excel";
}

function parseLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      cells.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current.trim());
  return cells;
}

export function parseCsv(text: string): ParsedCsv {
  const lines = text.split(/\r\n|\n|\r/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) return { headers: [], rows: [] };

  const headers = parseLine(lines[0]);
  const rows = lines.slice(1).map(parseLine);
  return { headers, rows };
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const FIELD_ALIASES: Record<TargetField, string[]> = {
  "Product SKU": ["productsku", "sku", "productcode", "code"],
  "Product Name": ["productname", "product", "name"],
  Category: ["category"],
  "Total Stock": ["totalstock", "stock", "quantity", "qty"],
  "Reorder Point": ["reorderpoint", "reorder", "reorderlevel", "reorderthreshold"],
};

export function autoMapColumns(headers: string[]): ColumnMapping {
  const mapping: ColumnMapping = {};
  headers.forEach((header) => {
    const norm = normalize(header);
    const match = TARGET_FIELDS.find((field) => FIELD_ALIASES[field].includes(norm));
    mapping[header] = match ?? "";
  });
  return mapping;
}

export function mappedFieldCount(mapping: ColumnMapping): number {
  const mappedTargets = new Set(Object.values(mapping).filter(Boolean));
  return REQUIRED_FIELDS.filter((field) => mappedTargets.has(field)).length;
}

function columnIndexFor(headers: string[], mapping: ColumnMapping, field: TargetField): number {
  const header = Object.keys(mapping).find((key) => mapping[key] === field);
  if (!header) return -1;
  return headers.indexOf(header);
}

export function validateRows(csv: ParsedCsv, mapping: ColumnMapping): RowValidation[] {
  const skuIdx = columnIndexFor(csv.headers, mapping, "Product SKU");
  const nameIdx = columnIndexFor(csv.headers, mapping, "Product Name");
  const categoryIdx = columnIndexFor(csv.headers, mapping, "Category");
  const stockIdx = columnIndexFor(csv.headers, mapping, "Total Stock");
  const reorderIdx = columnIndexFor(csv.headers, mapping, "Reorder Point");

  return csv.rows.map((row, rowIndex) => {
    const errors: string[] = [];

    if (skuIdx === -1 || !(row[skuIdx] ?? "").trim()) errors.push("Missing SKU");
    if (nameIdx === -1 || !(row[nameIdx] ?? "").trim()) errors.push("Missing product name");
    if (categoryIdx === -1 || !(row[categoryIdx] ?? "").trim()) errors.push("Missing category");
    if (stockIdx === -1 || !Number.isFinite(Number(row[stockIdx])))
      errors.push("Invalid total stock");
    if (reorderIdx === -1 || !Number.isFinite(Number(row[reorderIdx])))
      errors.push("Invalid reorder point");

    return { rowIndex, isValid: errors.length === 0, errors };
  });
}

export function buildSummary(csv: ParsedCsv, validations: RowValidation[]): ImportSummary {
  const validRows = validations.filter((v) => v.isValid);
  const invalidRows = validations.filter((v) => !v.isValid);
  return { totalRows: csv.rows.length, validRows: validRows.length, invalidRows: invalidRows.length };
}

function csvField(value: string): string {
  return /[,"\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

// Re-serializes the uploaded CSV under the sku/quantityOnHand/reorderPoint headers the
// backend expects, applying the user's column mapping (source headers may differ).
export function buildCanonicalCsv(csv: ParsedCsv, mapping: ColumnMapping): string {
  const skuIdx = columnIndexFor(csv.headers, mapping, "Product SKU");
  const stockIdx = columnIndexFor(csv.headers, mapping, "Total Stock");
  const reorderIdx = columnIndexFor(csv.headers, mapping, "Reorder Point");

  const lines = ["sku,quantityOnHand,reorderPoint"];
  csv.rows.forEach((row) => {
    lines.push(
      [skuIdx, stockIdx, reorderIdx]
        .map((idx) => csvField(idx !== -1 ? (row[idx] ?? "") : ""))
        .join(","),
    );
  });
  return lines.join("\n");
}

export function extractImportRows(
  csv: ParsedCsv,
  mapping: ColumnMapping,
  validations: RowValidation[],
): ImportRow[] {
  const skuIdx = columnIndexFor(csv.headers, mapping, "Product SKU");
  const nameIdx = columnIndexFor(csv.headers, mapping, "Product Name");
  const categoryIdx = columnIndexFor(csv.headers, mapping, "Category");
  const stockIdx = columnIndexFor(csv.headers, mapping, "Total Stock");
  const reorderIdx = columnIndexFor(csv.headers, mapping, "Reorder Point");

  return validations
    .filter((v) => v.isValid)
    .map((v) => {
      const row = csv.rows[v.rowIndex];
      return {
        sku: row[skuIdx].trim(),
        product: row[nameIdx].trim(),
        category: row[categoryIdx].trim(),
        totalStock: Number(row[stockIdx]),
        reorderPoint: Number(row[reorderIdx]),
      };
    });
}
