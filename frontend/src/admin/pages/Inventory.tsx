import { Boxes, Globe, PackageCheck, PackageMinus, PackageX, Store, Upload, Warehouse as WarehouseIcon, X } from "lucide-react";
import { useState } from "react";
import { AdminLayout } from "../components/layout/AdminLayout";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { StatCard } from "../components/ui/StatCard";
import { SearchBar } from "../components/ui/SearchBar";
import { StatusBadge, type StatusTone } from "../components/ui/StatusBadge";
import { Pagination } from "../components/ui/Pagination";
import { usePagination } from "../hooks/usePagination";
import { ImportInventoryModal } from "../components/inventory/ImportInventoryModal";
import { BulkAdjustStockModal } from "../components/inventory/BulkAdjustStockModal";
import { ProductVariantDetail } from "../components/inventory/ProductVariantDetail";
import { AdjustOnlineStockModal } from "../components/inventory/AdjustOnlineStockModal";
import { OnlineInventoryView } from "../components/inventory/OnlineInventoryView";
import { getColorSwatch } from "../components/inventory/colorSwatches";
import { inventoryApi, useOnlineDeductionsApi, useOnlineInventoryApi, useWarehousesApi } from "../hooks/useInventoryApi";
import { getInventoryStatus, type InventoryItem, type InventoryStatus } from "../types/inventory";

const STATUS_TONE: Record<InventoryStatus, StatusTone> = {
  "In Stock": "success",
  "Low Stock": "warning",
  "Out of Stock": "danger",
};

const STATUS_BAR_COLOR: Record<InventoryStatus, string> = {
  "In Stock": "bg-success",
  "Low Stock": "bg-warning",
  "Out of Stock": "bg-danger/40",
};

const FILTERS = ["All", "In Stock", "Low Stock", "Out of Stock"] as const;
type Filter = (typeof FILTERS)[number];

const STOCK_BAR_SCALE = 150;
const VISIBLE_VARIANTS = 3;

function AdjustStockModal({
  items,
  initialItemId,
  onCancel,
  onSave,
}: {
  items: InventoryItem[];
  initialItemId: string;
  onCancel: () => void;
  onSave: (itemId: string, totalStock: number) => void;
}) {
  const [itemId, setItemId] = useState(initialItemId);
  const item = items.find((i) => i.id === itemId) ?? items[0];
  const [value, setValue] = useState(String(item.totalStock));

  function handleItemChange(nextId: string) {
    setItemId(nextId);
    const nextItem = items.find((i) => i.id === nextId);
    setValue(String(nextItem?.totalStock ?? 0));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[380px] rounded-[12px] bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-brand-border px-6 py-4">
          <h2 className="text-base font-display font-bold text-text-primary">Adjust Stock</h2>
          <button type="button" onClick={onCancel} className="text-text-muted hover:text-text-primary">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-6 py-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Product
            </span>
            <select
              value={itemId}
              onChange={(e) => handleItemChange(e.target.value)}
              className="w-full rounded-[10px] border border-brand-border bg-white px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand/40"
            >
              {items.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.product} ({option.sku})
                </option>
              ))}
            </select>
          </label>

          <p className="-mt-2 text-xs text-text-muted">
            {item.category} / {item.subcategory}
          </p>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Total Stock
            </span>
            <input
              type="number"
              min="0"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full rounded-[10px] border border-brand-border bg-white px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand/40"
            />
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-brand-border px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-[10px] border border-brand-border bg-white px-5 py-2.5 text-sm font-medium text-text-primary"
          >
            Cancel
          </button>
          <PrimaryButton
            type="button"
            onClick={() => onSave(itemId, Math.max(0, Number(value) || 0))}
            className="!h-10 !py-0 !pl-5 !pr-5 text-sm"
          >
            Save
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export function Inventory() {
  const { data: warehousesData, loading, error, refetch: refetchWarehouses } = useWarehousesApi("PHYSICAL");
  const { data: onlineWarehouse, refetch: refetchOnline } = useOnlineInventoryApi();
  const { data: deductionsData, refetch: refetchDeductions } = useOnlineDeductionsApi(20);

  const warehouses = warehousesData ?? [];
  const onlineItems = onlineWarehouse?.items ?? [];
  const deductions = deductionsData ?? [];

  const [activeWarehouseId, setActiveWarehouseId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [adjustingItemId, setAdjustingItemId] = useState<string | null>(null);
  const [adjustError, setAdjustError] = useState<string | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showBulkAdjustModal, setShowBulkAdjustModal] = useState(false);
  const [inventoryMode, setInventoryMode] = useState<"offline" | "online">("offline");
  const [viewingItemId, setViewingItemId] = useState<string | null>(null);
  const [showOnlineAdjustModal, setShowOnlineAdjustModal] = useState(false);
  const [onlineViewingItemId, setOnlineViewingItemId] = useState<string | null>(null);
  const [simulating, setSimulating] = useState(false);

  // Computed before the early returns below (hooks can't follow a conditional return) — the
  // real `activeWarehouse` (used everywhere else) is recomputed once warehouses.length is known non-zero.
  const activeWarehouseForPaging = warehouses.find((w) => w.id === activeWarehouseId) ?? warehouses[0];
  const visibleItemsForPaging = activeWarehouseForPaging
    ? activeWarehouseForPaging.items.filter((item) => {
        if (activeFilter !== "All" && getInventoryStatus(item) !== activeFilter) return false;
        const query = searchQuery.trim().toLowerCase();
        if (!query) return true;
        return (
          item.product.toLowerCase().includes(query) ||
          item.sku.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.subcategory.toLowerCase().includes(query)
        );
      })
    : [];
  const { page, setPage, pageItems, totalItems, pageSize } = usePagination(visibleItemsForPaging);

  if (loading) return <AdminLayout><p className="p-6 text-sm text-text-muted">Loading…</p></AdminLayout>;
  if (error)
    return (
      <AdminLayout>
        <p className="p-6 rounded-[6px] bg-danger/10 text-sm font-medium text-danger">{error.message}</p>
      </AdminLayout>
    );
  if (warehouses.length === 0)
    return (
      <AdminLayout>
        <p className="p-6 text-sm text-text-muted">No warehouses yet.</p>
      </AdminLayout>
    );

  const activeWarehouse = warehouses.find((w) => w.id === activeWarehouseId) ?? warehouses[0];
  const viewingItem = activeWarehouse.items.find((i) => i.id === viewingItemId) ?? null;
  const onlineViewingItem = onlineItems.find((i) => i.id === onlineViewingItemId) ?? null;

  const inStockCount = activeWarehouse.items.filter((i) => getInventoryStatus(i) === "In Stock").length;
  const lowStockCount = activeWarehouse.items.filter((i) => getInventoryStatus(i) === "Low Stock").length;
  const outOfStockCount = activeWarehouse.items.filter(
    (i) => getInventoryStatus(i) === "Out of Stock",
  ).length;
  const totalUnits = activeWarehouse.items.reduce((sum, i) => sum + i.totalStock, 0);

  // Same filtering logic as visibleItemsForPaging above, now against the guaranteed-defined
  // activeWarehouse (recomputing here rather than trusting the pre-guard version).
  const visibleItems = activeWarehouse.items.filter((item) => {
    if (activeFilter !== "All" && getInventoryStatus(item) !== activeFilter) return false;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      item.product.toLowerCase().includes(query) ||
      item.sku.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.subcategory.toLowerCase().includes(query)
    );
  });

  async function saveAdjustedStock(itemId: string, totalStock: number) {
    setAdjustError(null);
    try {
      await inventoryApi.adjustProductStock(activeWarehouse.id, itemId, totalStock);
      await refetchWarehouses();
      setAdjustingItemId(null);
    } catch (err) {
      setAdjustError(err instanceof Error ? err.message : "Failed to adjust stock.");
    }
  }

  async function saveBulkAdjustedStock(updates: { id: string; totalStock: number }[]) {
    setAdjustError(null);
    try {
      await inventoryApi.bulkAdjustStock(
        activeWarehouse.id,
        updates.map((u) => ({ productId: u.id, totalStock: u.totalStock })),
      );
      await refetchWarehouses();
      setShowBulkAdjustModal(false);
    } catch (err) {
      setAdjustError(err instanceof Error ? err.message : "Failed to adjust stock.");
    }
  }

  async function saveOnlineAdjustedStock(updates: { id: string; totalStock: number }[]) {
    if (!onlineWarehouse) return;
    setAdjustError(null);
    try {
      await inventoryApi.bulkAdjustStock(
        onlineWarehouse.id,
        updates.map((u) => ({ productId: u.id, totalStock: u.totalStock })),
      );
      await refetchOnline();
      setShowOnlineAdjustModal(false);
    } catch (err) {
      setAdjustError(err instanceof Error ? err.message : "Failed to adjust stock.");
    }
  }

  async function handleSimulateOrder() {
    setSimulating(true);
    setAdjustError(null);
    try {
      await inventoryApi.simulateOnlineOrder();
      await Promise.all([refetchOnline(), refetchDeductions()]);
    } catch (err) {
      setAdjustError(err instanceof Error ? err.message : "Failed to simulate order.");
    } finally {
      setSimulating(false);
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-[24px]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-ink">Inventory</h1>
            <p className="text-[15px] font-medium text-brand-dark">
              Monitor stock levels across warehouses and import via spreadsheet.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {inventoryMode === "offline" && (
              <button
                onClick={() => setShowImportModal(true)}
                className="inline-flex h-[38px] items-center gap-2 rounded-[8px] border border-brand/10 bg-white px-4 text-xs font-semibold text-text-primary"
              >
                <Upload size={13} />
                Import CSV
              </button>
            )}
            {inventoryMode === "offline" && (
              <PrimaryButton
                icon={<Boxes size={15} />}
                className="!h-[38px] !py-0 !pl-4 !pr-4 text-xs"
                onClick={() => setShowBulkAdjustModal(true)}
              >
                Adjust Stock
              </PrimaryButton>
            )}
          </div>
        </div>

        <div className="flex w-fit items-center gap-1 rounded-panel bg-brand-bg p-1">
          <button
            type="button"
            onClick={() => setInventoryMode("offline")}
            className={`flex flex-col items-start rounded-md px-4 py-2 text-left transition-colors ${
              inventoryMode === "offline" ? "bg-brand-dark text-white" : "text-text-muted"
            }`}
          >
            <span className="flex items-center gap-1.5 text-[13px] font-display font-semibold">
              <Store size={13} />
              Offline Inventory
            </span>
            <span
              className={`text-[10px] ${inventoryMode === "offline" ? "text-white/70" : "text-text-muted/70"}`}
            >
              Warehouses · manual &amp; CSV
            </span>
          </button>
          <button
            type="button"
            onClick={() => setInventoryMode("online")}
            className={`flex flex-col items-start rounded-md px-4 py-2 text-left transition-colors ${
              inventoryMode === "online" ? "bg-brand-dark text-white" : "text-text-muted"
            }`}
          >
            <span className="flex items-center gap-1.5 text-[13px] font-display font-semibold">
              <Globe size={13} />
              Online Inventory
            </span>
            <span
              className={`text-[10px] ${inventoryMode === "online" ? "text-white/70" : "text-text-muted/70"}`}
            >
              Website · auto-tracked
            </span>
          </button>
        </div>

        {inventoryMode === "online" && onlineViewingItem && (
          <ProductVariantDetail
            item={onlineViewingItem}
            onBack={() => setOnlineViewingItemId(null)}
          />
        )}

        {inventoryMode === "online" && !onlineViewingItem && (
          <OnlineInventoryView
            items={onlineItems}
            deductions={deductions}
            onOpenAdjust={() => setShowOnlineAdjustModal(true)}
            onSimulateOrder={handleSimulateOrder}
            onSelectItem={setOnlineViewingItemId}
            simulating={simulating}
          />
        )}

        {adjustError && (
          <p className="rounded-[6px] bg-danger/10 px-4 py-2 text-sm font-medium text-danger">{adjustError}</p>
        )}

        {inventoryMode === "offline" && viewingItem && (
          <ProductVariantDetail item={viewingItem} onBack={() => setViewingItemId(null)} />
        )}

        {inventoryMode === "offline" && !viewingItem && (
        <>
        <div className="flex w-fit items-center gap-2 rounded-panel bg-brand-bg p-1">
          {warehouses.map((warehouse) => {
            const isActive = warehouse.id === activeWarehouseId;
            return (
              <button
                key={warehouse.id}
                type="button"
                onClick={() => {
                  setActiveWarehouseId(warehouse.id);
                  setActiveFilter("All");
                  setSearchQuery("");
                  setViewingItemId(null);
                }}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-[13px] font-display font-medium transition-colors ${
                  isActive ? "bg-white text-text-primary shadow-card" : "text-text-muted"
                }`}
              >
                <WarehouseIcon size={14} />
                {warehouse.name}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-4 gap-[10px]">
          <StatCard
            label="In Stock"
            value={String(inStockCount)}
            icon={PackageCheck}
            iconBgClassName="bg-tint-success"
            iconClassName="text-success"
            valueClassName="text-success"
          />
          <StatCard
            label="Low Stock"
            value={String(lowStockCount)}
            icon={PackageMinus}
            iconBgClassName="bg-tint-brand"
            iconClassName="text-warning"
            valueClassName="text-warning"
          />
          <StatCard
            label="Out of Stock"
            value={String(outOfStockCount)}
            icon={PackageX}
            iconBgClassName="bg-tint-danger"
            iconClassName="text-danger"
            valueClassName="text-danger"
          />
          <StatCard
            label="Total Units"
            value={String(totalUnits)}
            icon={Boxes}
            iconBgClassName="bg-tint-brand"
            iconClassName="text-brand"
            valueClassName="text-brand-dark"
          />
        </div>

        <div className="rounded-[7px] bg-white px-[14px] pb-9 pt-[17px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[11px]">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={`Search ${activeWarehouse.name} products...`}
                className="w-[300px]"
              />
              <div className="flex items-center gap-1 rounded-panel bg-brand-bg p-1">
                {FILTERS.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-md px-3 py-1.5 text-xs font-display font-medium transition-colors ${
                      activeFilter === filter
                        ? "bg-white text-text-primary shadow-card"
                        : "text-text-muted"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <span className="text-[13px] text-text-muted">{visibleItems.length} products</span>
          </div>

          <div className="mt-[18px] rounded bg-surface-muted px-[22px] py-3">
            <div className="grid grid-cols-[minmax(160px,1fr)_90px_minmax(120px,1fr)_130px_100px_minmax(220px,2.2fr)_100px_90px] items-center gap-x-4 text-xs uppercase tracking-wide text-text-primary/70">
              <div>Product</div>
              <div>SKU</div>
              <div>Category</div>
              <div>Total Stock</div>
              <div className="pr-3 text-center">Reorder Point</div>
              <div>Variants</div>
              <div>Status</div>
              <div />
            </div>
          </div>

          <div className="mt-[10px] flex flex-col px-[18px]">
            {pageItems.map((item) => {
              const status = getInventoryStatus(item);
              const barWidth = Math.min(100, (item.totalStock / STOCK_BAR_SCALE) * 100);
              const sortedVariants = [...item.variants].sort((a, b) => b.qty - a.qty);
              const shownVariants = sortedVariants.slice(0, VISIBLE_VARIANTS);
              const remainingVariants = sortedVariants.length - shownVariants.length;
              return (
                <div
                  key={item.id}
                  onClick={() => setViewingItemId(item.id)}
                  className="grid cursor-pointer grid-cols-[minmax(160px,1fr)_90px_minmax(120px,1fr)_130px_100px_minmax(220px,2.2fr)_100px_90px] items-center gap-x-4 border-b border-brand-border py-4 last:border-0 hover:bg-surface-muted/60"
                >
                  <div className="text-sm font-display font-semibold text-text-primary">
                    {item.product}
                  </div>

                  <div className="flex h-[23px] w-fit items-center justify-center rounded-[6px] bg-surface-tan px-2 font-mono text-[11px] font-medium text-brand">
                    {item.sku}
                  </div>

                  <div className="flex items-center gap-1 text-xs leading-[18px]">
                    <span className="font-display font-semibold text-text-primary">
                      {item.category}
                    </span>
                    <span className="text-brand/30">/</span>
                    <span className="text-text-muted">{item.subcategory}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-display font-bold text-text-primary">
                      {item.totalStock}
                    </span>
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-muted">
                      <div
                        className={`h-full rounded-full ${STATUS_BAR_COLOR[status]}`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>

                  <div className="pr-3 text-center text-[13px] text-text-primary">
                    {item.reorderPoint}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {shownVariants.map((variant) => (
                      <span
                        key={`${variant.color}-${variant.size}`}
                        className="flex items-center gap-1.5 rounded-full bg-surface-tan px-3 py-1.5 text-xs font-medium text-text-primary"
                      >
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: getColorSwatch(variant.color) }}
                        />
                        {variant.color} {variant.qty}
                      </span>
                    ))}
                    {remainingVariants > 0 && (
                      <span className="rounded-full bg-surface-tan px-3 py-1.5 text-xs font-medium text-text-muted">
                        +{remainingVariants}
                      </span>
                    )}
                  </div>

                  <StatusBadge label={status} tone={STATUS_TONE[status]} />

                  <div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAdjustingItemId(item.id);
                      }}
                      className="rounded-[8px] bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand-dark"
                    >
                      Adjust
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <Pagination
            page={page}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={setPage}
            className="mt-4 px-[18px]"
          />
        </div>
        </>
        )}
      </div>

      {adjustingItemId && (
        <AdjustStockModal
          items={activeWarehouse.items}
          initialItemId={adjustingItemId}
          onCancel={() => setAdjustingItemId(null)}
          onSave={saveAdjustedStock}
        />
      )}

      {showImportModal && (
        <ImportInventoryModal
          warehouseId={activeWarehouse.id}
          warehouseName={activeWarehouse.name}
          onClose={() => setShowImportModal(false)}
          onImported={() => {
            setShowImportModal(false);
            refetchWarehouses();
          }}
        />
      )}

      {showBulkAdjustModal && (
        <BulkAdjustStockModal
          warehouseName={activeWarehouse.name}
          items={activeWarehouse.items}
          onCancel={() => setShowBulkAdjustModal(false)}
          onSave={saveBulkAdjustedStock}
        />
      )}

      {showOnlineAdjustModal && (
        <AdjustOnlineStockModal
          warehouseName={activeWarehouse.name}
          items={onlineItems}
          onCancel={() => setShowOnlineAdjustModal(false)}
          onSave={saveOnlineAdjustedStock}
        />
      )}
    </AdminLayout>
  );
}
