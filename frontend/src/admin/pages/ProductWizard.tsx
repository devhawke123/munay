import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "../components/layout/AdminLayout";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { WizardStepper } from "../components/products/WizardStepper";
import { PreviewPanel } from "../components/products/PreviewPanel";
import { BasicInfoStep } from "../components/products/steps/BasicInfoStep";
import { MediaStep } from "../components/products/steps/MediaStep";
import { PricingStep } from "../components/products/steps/PricingStep";
import { VariantsStep } from "../components/products/steps/VariantsStep";
import { ReviewStep } from "../components/products/steps/ReviewStep";
import { api } from "../lib/api";
import { productsApi, useProductApi, type ApiMainCategory, type ProductVariantStockInput } from "../hooks/useProductsApi";
import { useWarehousesApi } from "../hooks/useInventoryApi";
import { apiProductToProduct, emptyProductDraft, productToDraft, variantKey, type ProductDraft } from "../types/product";

const MAIN_CATEGORIES: ApiMainCategory[] = ["MEN", "WOMEN", "HOME"];

interface ApiSubcategoryRow {
  id: string;
  mainCategory: ApiMainCategory;
  name: string;
}

async function resolveSubcategoryId(mainCategory: ApiMainCategory, name: string): Promise<string> {
  const existing = await api.get<ApiSubcategoryRow[]>(`/categories?mainCategory=${mainCategory}`);
  const match = existing.find((s) => s.name.trim().toLowerCase() === name.trim().toLowerCase());
  if (match) return match.id;
  const created = await api.post<ApiSubcategoryRow>("/categories", { mainCategory, name: name.trim() });
  return created.id;
}

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
  const { id } = useParams<{ id: string }>();
  const { data: editingApiProduct } = useProductApi(id ?? null);
  const { data: warehouses } = useWarehousesApi("PHYSICAL");
  const editingProduct = editingApiProduct ? apiProductToProduct(editingApiProduct) : undefined;
  const isEditing = Boolean(id);

  const [draft, setDraft] = useState<ProductDraft>(emptyProductDraft);
  const [draftLoadedFor, setDraftLoadedFor] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  if (editingProduct && draftLoadedFor !== editingProduct.id) {
    setDraft(productToDraft(editingProduct));
    setDraftLoadedFor(editingProduct.id);
  }

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

  async function handlePublish() {
    const mainCategory = draft.mainCategory.trim().toUpperCase() as ApiMainCategory;
    if (!MAIN_CATEGORIES.includes(mainCategory)) {
      setPublishError(`Main Category must be one of: ${MAIN_CATEGORIES.join(", ")}`);
      return;
    }

    setPublishing(true);
    setPublishError(null);
    try {
      const subcategoryId = await resolveSubcategoryId(mainCategory, draft.subcategory);
      const subcategoryIds = [subcategoryId];

      if (draft.alsoListUnderOtherGender) {
        const otherGender: ApiMainCategory = mainCategory === "WOMEN" ? "MEN" : "WOMEN";
        subcategoryIds.push(await resolveSubcategoryId(otherGender, draft.subcategory));
      }

      const stock: ProductVariantStockInput[] = draft.colors.flatMap((color) =>
        draft.sizes.map((size) => ({
          color,
          size,
          quantityOnHand: Number(draft.stockByVariant[variantKey(color, size)]) || 0,
        })),
      );
      const warehouseId = warehouses?.[0]?.id;

      const input = {
        name: draft.name,
        description: draft.description || undefined,
        subcategoryIds,
        section: draft.section || undefined,
        price: Number(draft.price) || 0,
        sku: draft.sku,
        barcode: draft.barcode || undefined,
        brand: draft.brand || undefined,
        composition: draft.composition || undefined,
        weight: draft.weight || undefined,
        dimensions: draft.dimensions || undefined,
        origin: draft.origin || undefined,
        fiber: draft.fiber || undefined,
        careInstructions: draft.careInstructions || undefined,
        tags: draft.tags,
        stock: stock.length > 0 ? stock : undefined,
        warehouseId: stock.length > 0 ? warehouseId : undefined,
      };

      if (isEditing && id) {
        await productsApi.update(id, input);
        navigate(`/admin/products/${id}`);
      } else {
        const created = await productsApi.create(input);
        navigate(`/admin/products/${created.id}`);
      }
    } catch (err) {
      setPublishError(err instanceof Error ? err.message : "Failed to publish product.");
    } finally {
      setPublishing(false);
    }
  }

  const nextLabel = ["Next: Media", "Next: Pricing", "Next: Variants", "Next: Review"][currentStep];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-ink">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h1>
            <p className="text-sm font-medium text-brand-dark">
              {isEditing
                ? "Update the details of this product"
                : "Fill in the details to publish your product"}
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              navigate(isEditing && editingProduct ? `/admin/products/${editingProduct.id}` : "/admin/products")
            }
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
                  onClick={() =>
                    navigate(
                      isEditing && editingProduct
                        ? `/admin/products/${editingProduct.id}`
                        : "/admin/products",
                    )
                  }
                  className="rounded-[10px] border border-brand-border bg-white px-5 py-2.5 text-sm font-medium text-text-primary"
                >
                  Cancel
                </button>
              )}

              {isLastStep ? (
                <div className="flex flex-col items-end gap-2">
                  {publishError && (
                    <p className="rounded-[6px] bg-danger/10 px-3 py-2 text-xs font-medium text-danger">
                      {publishError}
                    </p>
                  )}
                  <div className="flex gap-3">
                    {!isEditing && (
                      <button
                        type="button"
                        onClick={() => navigate("/admin/products")}
                        className="rounded-[10px] border border-brand-border bg-white px-5 py-2.5 text-sm font-medium text-text-primary"
                      >
                        Save Draft
                      </button>
                    )}
                    <PrimaryButton
                      type="button"
                      onClick={handlePublish}
                      disabled={!completedSteps.every(Boolean) || publishing}
                    >
                      {publishing ? "Saving…" : isEditing ? "Save Changes" : "Publish Product"}
                    </PrimaryButton>
                  </div>
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
