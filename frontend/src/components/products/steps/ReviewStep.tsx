import { Check, X } from "lucide-react";
import type { ProductDraft } from "../../../types/product";
import { WIZARD_STEPS } from "../WizardStepper";

type ReviewStepProps = {
  draft: ProductDraft;
  completedSteps: boolean[];
};

function summaryFor(index: number, draft: ProductDraft) {
  switch (index) {
    case 0:
      return "Product name, description, category";
    case 1:
      return draft.images.length > 0 ? `${draft.images.length} images uploaded` : "No images yet";
    case 2:
      return draft.price ? "Price and SKU configured" : "Price not set";
    case 3:
      return draft.sizes.length > 0 && draft.colors.length > 0
        ? `${draft.sizes.length} sizes × ${draft.colors.length} colors`
        : "No variants selected";
    default:
      return "";
  }
}

export function ReviewStep({ draft, completedSteps }: ReviewStepProps) {
  const publishSteps = WIZARD_STEPS.slice(0, 4);
  const allDone = completedSteps.slice(0, 4).every(Boolean);

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-display font-bold text-text-primary">Review &amp; Publish</h2>

      <div className="flex flex-col gap-2.5">
        {publishSteps.map((step, index) => {
          const isDone = completedSteps[index];
          return (
            <div
              key={step.label}
              className={`flex items-center gap-3 rounded-panel px-4 py-3 ${
                isDone ? "bg-success/10" : "bg-danger/10"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  isDone ? "bg-success text-white" : "bg-danger text-white"
                }`}
              >
                {isDone ? <Check size={14} /> : <X size={14} />}
              </span>
              <div>
                <p className="text-sm font-semibold text-text-primary">{step.label}</p>
                <p className="text-xs text-text-muted">{summaryFor(index, draft)}</p>
              </div>
            </div>
          );
        })}
      </div>

      {!allDone && (
        <div className="rounded-panel bg-brand-soft/50 px-4 py-3">
          <p className="text-sm font-semibold text-warning">Ready to publish?</p>
          <p className="mt-0.5 text-xs text-text-muted">
            Complete every section above before publishing. You can save as a draft and finish
            later.
          </p>
        </div>
      )}
    </div>
  );
}
