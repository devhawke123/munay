import type { Prisma, SalesChannel } from "@prisma/client";
import { parse } from "csv-parse/sync";
import { prisma } from "../../db.js";

const NON_CANCELLED = { status: { not: "CANCELLED" as const } };

interface DateRange {
  start?: Date;
  end?: Date;
}

function dateWhere({ start, end }: DateRange) {
  if (!start && !end) return undefined;
  return { gte: start, lte: end };
}

export async function getSummary(filters: { channel?: SalesChannel } & DateRange) {
  const orders = await prisma.order.findMany({
    where: {
      ...NON_CANCELLED,
      channel: filters.channel,
      createdAt: dateWhere(filters),
    },
    select: { total: true },
  });

  const revenue = orders.reduce((sum, o) => sum + Number(o.total), 0);
  const orderCount = orders.length;
  const avgOrderValue = orderCount > 0 ? revenue / orderCount : 0;

  return { revenue, orderCount, avgOrderValue };
}

export type Granularity = "daily" | "weekly" | "monthly" | "yearly";

function periodKey(date: Date, granularity: Granularity): string {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  if (granularity === "daily") return d.toISOString().slice(0, 10);
  if (granularity === "monthly") return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
  if (granularity === "yearly") return String(d.getUTCFullYear());

  // weekly: Monday-start ISO week, keyed by that Monday's date
  const day = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - day);
  return d.toISOString().slice(0, 10);
}

export async function getRevenueOverview(
  filters: { channel?: SalesChannel; granularity: Granularity } & DateRange,
) {
  const orders = await prisma.order.findMany({
    where: {
      ...NON_CANCELLED,
      channel: filters.channel,
      createdAt: dateWhere(filters),
    },
    select: { total: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const buckets = new Map<string, { periodStart: string; revenue: number; orders: number }>();
  for (const order of orders) {
    const key = periodKey(order.createdAt, filters.granularity);
    const bucket = buckets.get(key) ?? { periodStart: key, revenue: 0, orders: 0 };
    bucket.revenue += Number(order.total);
    bucket.orders += 1;
    buckets.set(key, bucket);
  }

  return Array.from(buckets.values()).sort((a, b) => a.periodStart.localeCompare(b.periodStart));
}

export async function getChannelBreakdown(filters: DateRange = {}) {
  const orders = await prisma.order.findMany({
    where: { ...NON_CANCELLED, createdAt: dateWhere(filters) },
    select: { channel: true, total: true },
  });

  const totals = { ONLINE: 0, IN_STORE: 0 } as Record<SalesChannel, number>;
  for (const order of orders) totals[order.channel] += Number(order.total);
  const grandTotal = totals.ONLINE + totals.IN_STORE;

  return (["ONLINE", "IN_STORE"] as SalesChannel[]).map((channel) => ({
    channel,
    revenue: totals[channel],
    percent: grandTotal > 0 ? (totals[channel] / grandTotal) * 100 : 0,
  }));
}

export async function getTopProducts(filters: DateRange & { limit?: number } = {}) {
  const { start, end, limit = 10 } = filters;

  const items = await prisma.orderItem.findMany({
    where: { order: { ...NON_CANCELLED, createdAt: dateWhere({ start, end }) } },
    select: { productId: true, productName: true, quantity: true, lineTotal: true },
  });

  const byProduct = new Map<string, { name: string; revenue: number; units: number }>();
  for (const item of items) {
    const key = item.productId ?? item.productName;
    const row = byProduct.get(key) ?? { name: item.productName, revenue: 0, units: 0 };
    row.revenue += Number(item.lineTotal);
    row.units += item.quantity;
    byProduct.set(key, row);
  }

  let previousByProduct: Map<string, number> | null = null;
  if (start && end) {
    const spanMs = end.getTime() - start.getTime();
    const prevEnd = new Date(start.getTime() - 1);
    const prevStart = new Date(start.getTime() - spanMs);
    const prevItems = await prisma.orderItem.findMany({
      where: { order: { ...NON_CANCELLED, createdAt: { gte: prevStart, lte: prevEnd } } },
      select: { productId: true, productName: true, lineTotal: true },
    });
    previousByProduct = new Map();
    for (const item of prevItems) {
      const key = item.productId ?? item.productName;
      previousByProduct.set(key, (previousByProduct.get(key) ?? 0) + Number(item.lineTotal));
    }
  }

  const totalRevenue = Array.from(byProduct.values()).reduce((sum, r) => sum + r.revenue, 0);

  const ranked = Array.from(byProduct.entries())
    .map(([key, row]) => {
      const previous = previousByProduct?.get(key) ?? null;
      const growthPercent = previous && previous > 0 ? ((row.revenue - previous) / previous) * 100 : null;
      return {
        name: row.name,
        revenue: row.revenue,
        units: row.units,
        share: totalRevenue > 0 ? (row.revenue / totalRevenue) * 100 : 0,
        growthPercent,
      };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit)
    .map((row, index) => ({ rank: index + 1, ...row }));

  return ranked;
}

export async function getSalesByStore(filters: DateRange = {}) {
  const orders = await prisma.order.findMany({
    where: { ...NON_CANCELLED, channel: "IN_STORE", createdAt: dateWhere(filters) },
    select: { storeLocation: true, total: true },
  });

  const byStore = new Map<string, { transactions: number; revenue: number }>();
  for (const order of orders) {
    const key = order.storeLocation ?? "Unknown";
    const row = byStore.get(key) ?? { transactions: 0, revenue: 0 };
    row.transactions += 1;
    row.revenue += Number(order.total);
    byStore.set(key, row);
  }

  const grandTotal = Array.from(byStore.values()).reduce((sum, r) => sum + r.revenue, 0);

  return Array.from(byStore.entries())
    .map(([store, row]) => ({
      store,
      transactions: row.transactions,
      revenue: row.revenue,
      avgOrderValue: row.transactions > 0 ? row.revenue / row.transactions : 0,
      share: grandTotal > 0 ? (row.revenue / grandTotal) * 100 : 0,
    }))
    .sort((a, b) => b.revenue - a.revenue);
}

// --- In-store CSV import ---

interface InStoreSalesCsvRow {
  Date: string;
  "Store / Event Exhibition": string;
  "Transaction ID": string;
  "Sales Amount": string;
  "Payment Mode": string;
  "Product Code"?: string;
}

interface RowValidation {
  rowIndex: number;
  isValid: boolean;
  isDuplicate: boolean;
  errors: string[];
}

export interface ImportSummary {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  duplicateRows: number;
  dateRangeStart: string | null;
  dateRangeEnd: string | null;
  storeCount: number;
  totalSalesAmount: number;
  rows: RowValidation[];
}

function parseAmount(value: string | undefined): number | null {
  if (!value) return null;
  const cleaned = value.replace(/[$,]/g, "").trim();
  if (!cleaned || !Number.isFinite(Number(cleaned))) return null;
  return Number(cleaned);
}

export async function importInStoreSalesFromCsv(csv: string): Promise<ImportSummary> {
  const rows: InStoreSalesCsvRow[] = parse(csv, { columns: true, skip_empty_lines: true, trim: true });

  const seenInFile = new Set<string>();
  const existingTxnIds = new Set(
    (
      await prisma.order.findMany({
        where: { posTransactionId: { not: null } },
        select: { posTransactionId: true },
      })
    ).map((o) => o.posTransactionId as string),
  );

  const validations: RowValidation[] = [];
  const validDates: Date[] = [];
  const storeSet = new Set<string>();
  let totalSalesAmount = 0;

  const toCreate: {
    date: Date;
    store: string;
    txnId: string;
    amount: number;
    paymentMode: string;
    productCode?: string;
  }[] = [];

  async function resolveProduct(tx: Prisma.TransactionClient, code: string | undefined) {
    if (!code) return null;
    // Product.sku is no longer unique (only Product.name and ProductVariant.sku are), so this is a findFirst.
    const byStyleSku = await tx.product.findFirst({ where: { sku: code }, select: { id: true, name: true } });
    if (byStyleSku) return byStyleSku;
    const variant = await tx.productVariant.findUnique({
      where: { sku: code },
      select: { product: { select: { id: true, name: true } } },
    });
    return variant?.product ?? null;
  }

  rows.forEach((row, rowIndex) => {
    const errors: string[] = [];

    const dateValue = row["Date"];
    const date = dateValue ? new Date(dateValue) : null;
    if (!dateValue || !date || Number.isNaN(date.getTime())) errors.push("Invalid or missing date");

    const store = row["Store / Event Exhibition"]?.trim();
    if (!store) errors.push("Missing store / exhibition");

    const txnId = row["Transaction ID"]?.trim();
    if (!txnId) errors.push("Missing transaction ID");

    const amount = parseAmount(row["Sales Amount"]);
    if (amount === null) errors.push("Invalid sales amount");

    const paymentMode = row["Payment Mode"]?.trim();
    if (!paymentMode) errors.push("Missing payment mode");

    const isDuplicate = !!txnId && (seenInFile.has(txnId) || existingTxnIds.has(txnId));
    if (txnId) seenInFile.add(txnId);

    const isValid = errors.length === 0;
    validations.push({ rowIndex, isValid, isDuplicate, errors });

    if (isValid && !isDuplicate) {
      validDates.push(date!);
      storeSet.add(store!);
      totalSalesAmount += amount!;
      toCreate.push({
        date: date!,
        store: store!,
        txnId: txnId!,
        amount: amount!,
        paymentMode: paymentMode!,
        productCode: row["Product Code"]?.trim() || undefined,
      });
    }
  });

  if (toCreate.length > 0) {
    await prisma.$transaction(async (tx) => {
      for (const row of toCreate) {
        const product = await resolveProduct(tx, row.productCode);
        await tx.order.create({
          data: {
            channel: "IN_STORE",
            status: "DELIVERED",
            storeLocation: row.store,
            subtotal: row.amount,
            total: row.amount,
            paymentMethod: row.paymentMode,
            posTransactionId: row.txnId,
            createdAt: row.date,
            items: {
              create: [
                {
                  productId: product?.id,
                  sku: row.productCode ?? "",
                  productName: product?.name ?? "In-Store Sale",
                  unitPrice: row.amount,
                  quantity: 1,
                  lineTotal: row.amount,
                },
              ],
            },
          },
        });
      }
    });
  }

  validDates.sort((a, b) => a.getTime() - b.getTime());

  return {
    totalRows: rows.length,
    validRows: toCreate.length,
    invalidRows: validations.filter((v) => !v.isValid).length,
    duplicateRows: validations.filter((v) => v.isDuplicate).length,
    dateRangeStart: validDates[0]?.toISOString() ?? null,
    dateRangeEnd: validDates[validDates.length - 1]?.toISOString() ?? null,
    storeCount: storeSet.size,
    totalSalesAmount,
    rows: validations,
  };
}
