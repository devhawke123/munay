import { CheckCircle2, XCircle } from "lucide-react";

type SuccessResultProps = {
  variant: "success";
  warehouseName: string;
  rowsAdded: number;
  onViewInventory: () => void;
};

type ErrorResultProps = {
  variant: "error";
  invalidRows: number;
  onCancelImport: () => void;
  onReviewFlaggedRows: () => void;
};

type ImportResultStepProps = SuccessResultProps | ErrorResultProps;

export function ImportResultStep(props: ImportResultStepProps) {
  if (props.variant === "success") {
    return (
      <div className="flex flex-col items-center gap-3 px-6 py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 size={28} className="text-success" />
        </div>
        <h2 className="text-lg font-bold text-text-primary">Import complete.</h2>
        <p className="text-sm font-semibold text-success">{props.rowsAdded} rows added.</p>
        <p className="max-w-xs text-xs text-text-muted">
          Your inventory data has been imported successfully into {props.warehouseName}.
        </p>
        <button
          onClick={props.onViewInventory}
          className="mt-2 inline-flex h-[38px] items-center rounded-[8px] bg-brand-dark px-5 text-xs font-semibold text-white"
        >
          View Inventory
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 px-6 py-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger/10">
        <XCircle size={28} className="text-danger" />
      </div>
      <h2 className="text-lg font-bold text-text-primary">Invalid entry.</h2>
      <p className="text-sm font-semibold text-danger">
        {props.invalidRows} row{props.invalidRows === 1 ? "" : "s"} couldn't be read.
      </p>
      <p className="max-w-xs text-xs text-text-muted">
        Some fields are missing required values or use an unsupported format. Review the flagged
        rows and try again.
      </p>
      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={props.onCancelImport}
          className="inline-flex h-[38px] items-center rounded-[8px] border border-brand/10 bg-white px-4 text-xs font-semibold text-text-primary"
        >
          Cancel Import
        </button>
        <button
          onClick={props.onReviewFlaggedRows}
          className="inline-flex h-[38px] items-center rounded-[8px] bg-brand-dark px-4 text-xs font-semibold text-white"
        >
          Review Flagged Rows
        </button>
      </div>
    </div>
  );
}
