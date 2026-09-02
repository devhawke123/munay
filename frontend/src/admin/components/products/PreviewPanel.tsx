import { Check, ImageIcon } from "lucide-react";
import type { ProductDraft } from "../../types/product";
import { WIZARD_STEPS } from "./WizardStepper";

type PreviewPanelProps = {
  draft: ProductDraft;
  completedSteps: boolean[];
  currentStep: number;
};

export function PreviewPanel({ draft, completedSteps, currentStep }: PreviewPanelProps) {
  const publishSteps = WIZARD_STEPS.slice(0, 4);
  const doneCount = completedSteps.slice(0, 4).filter(Boolean).length;
  const mainImage = draft.images[0];
  const price = Number(draft.price) || 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-card border border-brand-border bg-white p-4 shadow-card">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
          Preview
        </p>
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-panel bg-brand-soft/40">
          {mainImage ? (
            <img src={mainImage.url} alt={draft.name} className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="text-text-muted" size={32} />
          )}
        </div>
        <p className="mt-3 text-sm font-display font-bold text-text-primary">
          {draft.name || "Untitled Product"}
        </p>
        <p className="text-xs text-text-muted">
          {draft.mainCategory || "Category"}
          {draft.sku ? ` · ${draft.sku}` : ""}
        </p>
        <p className="mt-1 text-lg font-display font-extrabold text-brand-dark">
          CHF {price.toFixed(2)}
        </p>
      </div>

      <div className="rounded-card border border-brand-border bg-white p-4 shadow-card">
        <p className="mb-3 text-sm font-display font-bold text-text-primary">Completion</p>
        <div className="flex flex-col gap-2.5">
          {publishSteps.map((step, index) => {
            const isDone = completedSteps[index];
            const isActive = index === currentStep;
            return (
              <div key={step.label} className="flex items-center gap-2.5">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    isDone
                      ? "bg-success text-white"
                      : isActive
                        ? "bg-brand-dark text-white"
                        : "bg-brand-soft text-text-muted"
                  }`}
                >
                  {isDone ? <Check size={12} /> : index + 1}
                </span>
                <span
                  className={`text-sm ${isActive ? "font-semibold text-text-primary" : "text-text-muted"}`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-3 h-1.5 w-full rounded-full bg-brand-soft">
          <div
            className="h-1.5 rounded-full bg-brand-dark transition-all"
            style={{ width: `${(doneCount / publishSteps.length) * 100}%` }}
          />
        </div>
        <p className="mt-1.5 text-right text-xs text-text-muted">
          {doneCount} / {publishSteps.length} steps done
        </p>
      </div>
    </div>
  );
}
