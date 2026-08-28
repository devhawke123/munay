import {
  REQUIRED_FIELDS,
  TARGET_FIELDS,
  type ColumnMapping,
  type ImportSummary,
  type ParsedCsv,
  type RowValidation,
  type TargetField,
} from "./types";

const SAMPLE_CSV = `Date,Store / Event Exhibition,Transaction ID,Sales Amount,Payment Mode,Product Code
2024-05-19,Downtown Store,TXN1001,120.00,Cash,P001
2024-05-19,Mall Store,TXN1002,85.50,Card,P002
2024-05-19,Airport Store,TXN1003,45.00,Cash,P003
2024-05-19,Downtown Store,TXN1004,60.00,Card,P004
2024-05-19,Mall Store,TXN1005,110.00,Card,P005
`;

export function downloadSampleCsv() {
  const blob = new Blob([SAMPLE_CSV], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "in-store-sales-sample.csv";
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

export function autoMapColumns(headers: string[]): ColumnMapping {
  const mapping: ColumnMapping = {};
  headers.forEach((header) => {
    const norm = normalize(header);
    const match = TARGET_FIELDS.find((field) => normalize(field) === norm);
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

function isValidDate(value: string): boolean {
  if (!value.trim()) return false;
  return !Number.isNaN(new Date(value).getTime());
}

function isValidAmount(value: string): boolean {
  const cleaned = value.replace(/[$,]/g, "").trim();
  if (!cleaned) return false;
  return Number.isFinite(Number(cleaned));
}

export function validateRows(csv: ParsedCsv, mapping: ColumnMapping): RowValidation[] {
  const dateIdx = columnIndexFor(csv.headers, mapping, "Date");
  const storeIdx = columnIndexFor(csv.headers, mapping, "Store / Event Exhibition");
  const txnIdx = columnIndexFor(csv.headers, mapping, "Transaction ID");
  const amountIdx = columnIndexFor(csv.headers, mapping, "Sales Amount");
  const paymentIdx = columnIndexFor(csv.headers, mapping, "Payment Mode");

  const seenTransactionIds = new Set<string>();

  return csv.rows.map((row, rowIndex) => {
    const errors: string[] = [];

    if (dateIdx === -1 || !isValidDate(row[dateIdx] ?? "")) errors.push("Invalid or missing date");
    if (storeIdx === -1 || !(row[storeIdx] ?? "").trim()) errors.push("Missing store / exhibition");
    if (txnIdx === -1 || !(row[txnIdx] ?? "").trim()) errors.push("Missing transaction ID");
    if (amountIdx === -1 || !isValidAmount(row[amountIdx] ?? "")) errors.push("Invalid sales amount");
    if (paymentIdx === -1 || !(row[paymentIdx] ?? "").trim()) errors.push("Missing payment mode");

    const txnId = txnIdx !== -1 ? (row[txnIdx] ?? "").trim() : "";
    let isDuplicate = false;
    if (txnId) {
      if (seenTransactionIds.has(txnId)) {
        isDuplicate = true;
      } else {
        seenTransactionIds.add(txnId);
      }
    }

    return { rowIndex, isValid: errors.length === 0, isDuplicate, errors };
  });
}

export function buildSummary(
  csv: ParsedCsv,
  mapping: ColumnMapping,
  validations: RowValidation[],
): ImportSummary {
  const dateIdx = columnIndexFor(csv.headers, mapping, "Date");
  const storeIdx = columnIndexFor(csv.headers, mapping, "Store / Event Exhibition");
  const amountIdx = columnIndexFor(csv.headers, mapping, "Sales Amount");

  const validRows = validations.filter((v) => v.isValid && !v.isDuplicate);
  const duplicateRows = validations.filter((v) => v.isDuplicate);
  const invalidRows = validations.filter((v) => !v.isValid);

  const dates = validRows
    .map((v) => (dateIdx !== -1 ? csv.rows[v.rowIndex][dateIdx] : ""))
    .filter(Boolean)
    .map((d) => new Date(d))
    .filter((d) => !Number.isNaN(d.getTime()))
    .sort((a, b) => a.getTime() - b.getTime());

  const dateRangeLabel =
    dates.length > 0
      ? `${formatDate(dates[0])} – ${formatDate(dates[dates.length - 1])}`
      : "—";

  const storeSet = new Set(
    validRows
      .map((v) => (storeIdx !== -1 ? csv.rows[v.rowIndex][storeIdx] : ""))
      .filter(Boolean),
  );

  const totalAmount = validRows.reduce((sum, v) => {
    if (amountIdx === -1) return sum;
    const raw = csv.rows[v.rowIndex][amountIdx]?.replace(/[$,]/g, "") ?? "0";
    const num = Number(raw);
    return sum + (Number.isFinite(num) ? num : 0);
  }, 0);

  return {
    totalRows: csv.rows.length,
    validRows: validRows.length,
    invalidRows: invalidRows.length,
    duplicateRows: duplicateRows.length,
    dateRangeLabel,
    storeCount: storeSet.size,
    totalSalesAmount: `$${totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  };
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function csvField(value: string): string {
  return /[,"\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

// Re-serializes the uploaded CSV under the canonical TARGET_FIELDS headers the
// backend expects, applying the user's column mapping (source headers may differ).
export function buildCanonicalCsv(csv: ParsedCsv, mapping: ColumnMapping): string {
  const indices = TARGET_FIELDS.map((field) => columnIndexFor(csv.headers, mapping, field));
  const lines = [TARGET_FIELDS.map(csvField).join(",")];
  csv.rows.forEach((row) => {
    lines.push(indices.map((idx) => csvField(idx !== -1 ? (row[idx] ?? "") : "")).join(","));
  });
  return lines.join("\n");
}
