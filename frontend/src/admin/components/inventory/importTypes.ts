export type ImportStep = "upload" | "mapping" | "review" | "success" | "error";

export const TARGET_FIELDS = [
  "Product SKU",
  "Product Name",
  "Category",
  "Total Stock",
  "Reorder Point",
] as const;

export type TargetField = (typeof TARGET_FIELDS)[number];

export const REQUIRED_FIELDS: TargetField[] = [...TARGET_FIELDS];

export type ParsedCsv = {
  headers: string[];
  rows: string[][];
};

export type ColumnMapping = Record<string, TargetField | "">;

export type RowValidation = {
  rowIndex: number;
  isValid: boolean;
  errors: string[];
};

export type ImportSummary = {
  totalRows: number;
  validRows: number;
  invalidRows: number;
};

export type ImportRow = {
  sku: string;
  product: string;
  category: string;
  totalStock: number;
  reorderPoint: number;
};
