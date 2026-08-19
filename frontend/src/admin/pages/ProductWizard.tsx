import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "../components/layout/AdminLayout";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { WizardStepper } from "../components/products/WizardStepper";
import { PreviewPanel } from "../components/products/PreviewPanel";
import { BasicInfoStep } from "../components/products/steps/BasicInfoStep";
import { MediaStep } from "../components/products/steps/MediaStep";
import { PricingStep } from "../components/products/steps/PricingStep";
import { VariantsStep } from "../components/products/steps/VariantsStep";
import { ReviewStep } from "../components/products/steps/ReviewStep";
import { useProducts } from "../context/ProductsContext";
import { emptyProductDraft, draftToProduct, type ProductDraft } from "../types/product";

function isStepValid(index: number, draft: ProductDraft) {
  switch (index) {
    case 0:
      return draft.name.trim() !== "" && draft.mainCategory.trim() !== "";
    case 1:
      return draft.images.length > 0;
    case 2:
      return (Number(draft.price) || 0) > 0;
    case 3:
      return draft.sizes.length > 0 && draft.colors.length > 0;
    default:
      return true;
  }
}

export function ProductWizard() {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const [draft, setDraft] = useState<ProductDraft>(emptyProductDraft);
  const [currentStep, setCurrentStep] = useState(0);

  const completedSteps = [0, 1, 2, 3].map((index) => isStepValid(index, draft));
  const isLastStep = currentStep === 4;

  function patchDraft(patch: Partial<ProductDraft>) {
    setDraft((prev) => ({ ...prev, ...patch }));
  }

  function goNext() {
    setCurrentStep((step) => Math.min(step + 1, 4));
  }

  function goBack() {
    setCurrentStep((step) => Math.max(step - 1, 0));
  }

  function handlePublish() {
    addProduct(draftToProduct(draft));
    navigate("/admin/products");
  }

  const nextLabel = ["Next: Media", "Next: Pricing", "Next: Variants", "Next: Review"][currentStep];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-ink">Add New Product</h1>
            <p className="text-sm font-medium text-brand-dark">
              Fill in the details to publish your product
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="rounded-[10px] border border-brand-border bg-white px-5 py-2 text-sm font-medium text-text-primary"
          >
            Cancel
          </button>
        </div>

        <WizardStepper currentStep={currentStep} completedSteps={completedSteps} />

        <div className="grid grid-cols-[1fr_320px] gap-5 items-start">
          <div className="rounded-card border border-brand-border bg-white p-6 shadow-card">
            {currentStep === 0 && <BasicInfoStep draft={draft} onChange={patchDraft} />}
            {currentStep === 1 && <MediaStep draft={draft} onChange={patchDraft} />}
            {currentStep === 2 && <PricingStep draft={draft} onChange={patchDraft} />}
            {currentStep === 3 && <VariantsStep draft={draft} onChange={patchDraft} />}
            {currentStep === 4 && (
              <ReviewStep draft={draft} completedSteps={completedSteps} />
            )}

            <div className="mt-6 flex items-center justify-between border-t border-brand-border pt-5">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="rounded-[10px] border border-brand-border bg-white px-5 py-2.5 text-sm font-medium text-text-primary"
                >
                  ← Back
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate("/admin/products")}
                  className="rounded-[10px] border border-brand-border bg-white px-5 py-2.5 text-sm font-medium text-text-primary"
                >
                  Cancel
                </button>
              )}

              {isLastStep ? (
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/admin/products")}
                    className="rounded-[10px] border border-brand-border bg-white px-5 py-2.5 text-sm font-medium text-text-primary"
                  >
                    Save Draft
                  </button>
                  <PrimaryButton
                    type="button"
                    onClick={handlePublish}
                    disabled={!completedSteps.every(Boolean)}
                  >
                    Publish Product
                  </PrimaryButton>
                </div>
              ) : (
                <PrimaryButton type="button" onClick={goNext}>
                  {nextLabel} →
                </PrimaryButton>
              )}
            </div>
          </div>

          <PreviewPanel draft={draft} completedSteps={completedSteps} currentStep={currentStep} />
        </div>
      </div>
    </AdminLayout>
  );
}
