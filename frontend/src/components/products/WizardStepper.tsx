import { Check } from "lucide-react";

export type WizardStep = {
  label: string;
  subtitle: string;
};

export const WIZARD_STEPS: WizardStep[] = [
  { label: "Basic Info", subtitle: "Name, description, category" },
  { label: "Media", subtitle: "Photos and videos" },
  { label: "Pricing", subtitle: "Price and SKU" },
  { label: "Variants", subtitle: "Sizes, colors, stock" },
  { label: "Review", subtitle: "Final review" },
];

type WizardStepperProps = {
  currentStep: number;
  completedSteps: boolean[];
};

export function WizardStepper({ currentStep, completedSteps }: WizardStepperProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {WIZARD_STEPS.map((step, index) => {
        const isActive = index === currentStep;
        const isDone = completedSteps[index];

        return (
          <div
            key={step.label}
            className={`flex items-center gap-2.5 rounded-panel px-4 py-2.5 ${
              isActive
                ? "bg-brand-dark text-white"
                : isDone
                  ? "bg-success/10 text-success"
                  : "bg-brand-soft text-text-primary"
            }`}
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                isActive
                  ? "bg-white/20 text-white"
                  : isDone
                    ? "bg-success text-white"
                    : "bg-white/60 text-text-muted"
              }`}
            >
              {isDone && !isActive ? <Check size={14} /> : index + 1}
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">{step.label}</p>
              <p
                className={`text-xs ${isActive ? "text-white/70" : isDone ? "text-success/70" : "text-text-muted"}`}
              >
                {step.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
