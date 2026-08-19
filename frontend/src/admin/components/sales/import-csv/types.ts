export type ImportStep = "upload" | "mapping" | "review" | "success" | "error";

export const TARGET_FIELDS = [
  "Date",
  "Store / Event Exhibition",
  "Transaction ID",
  "Sales Amount",
  "Payment Mode",
  "Product Code",
] as const;

export type TargetField = (typeof TARGET_FIELDS)[number];

export const REQUIRED_FIELDS: TargetField[] = [
  "Date",
  "Store / Event Exhibition",
  "Transaction ID",
  "Sales Amount",
  "Payment Mode",
];

export type ParsedCsv = {
  headers: string[];
  rows: string[][];
};

export type ColumnMapping = Record<string, TargetField | "">;

export type RowValidation = {
  rowIndex: number;
  isValid: boolean;
  isDuplicate: boolean;
  errors: string[];
};

export type ImportSummary = {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  duplicateRows: number;
  dateRangeLabel: string;
  storeCount: number;
  totalSalesAmount: string;
};

export type StoreEventType = "Store" | "Event Exhibition" | "Both";
