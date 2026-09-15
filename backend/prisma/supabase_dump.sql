-- Munay schema + seed for Supabase (PostgreSQL)
-- Generated from backend/prisma/schema.prisma (MySQL → Postgres)
--
-- How to apply:
--   1. Supabase Dashboard → SQL Editor → paste & run this file, OR
--   2. Ask the agent to apply_migration against a Munay project
--
-- Access model: your Node/Prisma backend connects with the DB URL
-- (bypasses RLS). RLS is enabled with NO anon/authenticated policies
-- so the Data API cannot read/write these tables by default.

BEGIN;

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
CREATE TYPE "ProductStatus" AS ENUM ('ACTIVE', 'ARCHIVED', 'DRAFT');
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');
CREATE TYPE "FulfillmentStatus" AS ENUM ('UNFULFILLED', 'FULFILLED', 'CANCELLED');
CREATE TYPE "Carrier" AS ENUM ('DHL', 'DPD', 'LA_POSTE');
CREATE TYPE "SalesChannel" AS ENUM ('ONLINE', 'IN_STORE');
CREATE TYPE "MainCategory" AS ENUM ('MEN', 'WOMEN', 'HOME');
CREATE TYPE "WarehouseType" AS ENUM ('PHYSICAL', 'ONLINE');
CREATE TYPE "StockMovementReason" AS ENUM ('MANUAL_ADJUSTMENT', 'ORDER_DEDUCTION', 'CSV_IMPORT');
CREATE TYPE "EventType" AS ENUM ('FAIR_EXPO', 'IN_STORE', 'POP_UP', 'ONLINE');
CREATE TYPE "EventStatus" AS ENUM ('PUBLISHED', 'SCHEDULED', 'DRAFT');
CREATE TYPE "EventImageRole" AS ENUM ('POSTER', 'HERO', 'GALLERY');

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
CREATE TABLE "Subcategory" (
    "id" TEXT NOT NULL,
    "mainCategory" "MainCategory" NOT NULL,
    "name" TEXT NOT NULL,
    "group" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sku" TEXT NOT NULL,
    "section" TEXT,
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "barcode" TEXT,
    "brand" TEXT,
    "composition" TEXT,
    "weight" TEXT,
    "dimensions" TEXT,
    "origin" TEXT,
    "fiber" TEXT,
    "careInstructions" TEXT,
    "tags" JSONB,
    "status" "ProductStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ProductSubcategory" (
    "productId" TEXT NOT NULL,
    "subcategoryId" TEXT NOT NULL,
    CONSTRAINT "ProductSubcategory_pkey" PRIMARY KEY ("productId", "subcategoryId")
);

CREATE TABLE "ProductImage" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "compareAtPrice" DECIMAL(10,2),
    "status" "ProductStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Warehouse" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "WarehouseType" NOT NULL DEFAULT 'PHYSICAL',
    "location" TEXT,
    "address" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Inventory" (
    "variantId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "quantityOnHand" INTEGER NOT NULL DEFAULT 0,
    "quantityReserved" INTEGER NOT NULL DEFAULT 0,
    "reorderPoint" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("variantId", "warehouseId")
);

CREATE TABLE "InventoryImport" (
    "id" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "rowCount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'completed',
    "importedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "importedBy" TEXT,
    CONSTRAINT "InventoryImport_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "StockMovement" (
    "id" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "quantityDelta" INTEGER NOT NULL,
    "reason" "StockMovementReason" NOT NULL,
    "reference" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StockMovement_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "orderNumber" SERIAL NOT NULL,
    "customerId" TEXT,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "channel" "SalesChannel" NOT NULL DEFAULT 'ONLINE',
    "storeLocation" TEXT,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "shippingCost" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "tax" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "total" DECIMAL(10,2) NOT NULL,
    "paymentMethod" TEXT,
    "posTransactionId" TEXT,
    "shippingFullName" TEXT,
    "shippingPhone" TEXT,
    "shippingLine1" TEXT,
    "shippingLine2" TEXT,
    "shippingCity" TEXT,
    "shippingState" TEXT,
    "shippingPostalCode" TEXT,
    "shippingCountry" TEXT,
    "carrier" "Carrier",
    "trackingId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "OrderStatusEvent" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OrderStatusEvent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "variantId" TEXT,
    "productId" TEXT,
    "sku" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "variantLabel" TEXT,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "lineTotal" DECIMAL(10,2) NOT NULL,
    "warehouseId" TEXT,
    "fulfillmentStatus" "FulfillmentStatus" NOT NULL DEFAULT 'UNFULFILLED',
    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "standSubtitle" TEXT,
    "venueCallout" TEXT,
    "bulletPoints" JSONB,
    "type" "EventType" NOT NULL DEFAULT 'FAIR_EXPO',
    "status" "EventStatus" NOT NULL DEFAULT 'DRAFT',
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "EventImage" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "role" "EventImageRole" NOT NULL DEFAULT 'GALLERY',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EventImage_pkey" PRIMARY KEY ("id")
);

-- ---------------------------------------------------------------------------
-- Unique constraints & indexes
-- ---------------------------------------------------------------------------
CREATE UNIQUE INDEX "Subcategory_mainCategory_name_key" ON "Subcategory"("mainCategory", "name");
CREATE INDEX "Subcategory_mainCategory_idx" ON "Subcategory"("mainCategory");

CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

CREATE INDEX "ProductSubcategory_subcategoryId_idx" ON "ProductSubcategory"("subcategoryId");

CREATE INDEX "ProductImage_productId_idx" ON "ProductImage"("productId");

CREATE UNIQUE INDEX "ProductVariant_sku_key" ON "ProductVariant"("sku");
CREATE INDEX "ProductVariant_productId_idx" ON "ProductVariant"("productId");

CREATE INDEX "Inventory_warehouseId_idx" ON "Inventory"("warehouseId");
CREATE INDEX "InventoryImport_warehouseId_idx" ON "InventoryImport"("warehouseId");
CREATE INDEX "StockMovement_warehouseId_idx" ON "StockMovement"("warehouseId");
CREATE INDEX "StockMovement_variantId_idx" ON "StockMovement"("variantId");

CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");
CREATE UNIQUE INDEX "Order_posTransactionId_key" ON "Order"("posTransactionId");
CREATE INDEX "Order_customerId_idx" ON "Order"("customerId");
CREATE INDEX "Order_channel_idx" ON "Order"("channel");
CREATE INDEX "Order_storeLocation_idx" ON "Order"("storeLocation");

CREATE INDEX "OrderStatusEvent_orderId_idx" ON "OrderStatusEvent"("orderId");
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");
CREATE INDEX "OrderItem_variantId_idx" ON "OrderItem"("variantId");
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");
CREATE INDEX "OrderItem_warehouseId_idx" ON "OrderItem"("warehouseId");

CREATE INDEX "EventImage_eventId_idx" ON "EventImage"("eventId");

-- ---------------------------------------------------------------------------
-- Foreign keys
-- ---------------------------------------------------------------------------
ALTER TABLE "ProductSubcategory"
  ADD CONSTRAINT "ProductSubcategory_productId_fkey"
  FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ProductSubcategory"
  ADD CONSTRAINT "ProductSubcategory_subcategoryId_fkey"
  FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "ProductImage"
  ADD CONSTRAINT "ProductImage_productId_fkey"
  FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "ProductVariant"
  ADD CONSTRAINT "ProductVariant_productId_fkey"
  FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Inventory"
  ADD CONSTRAINT "Inventory_variantId_fkey"
  FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Inventory"
  ADD CONSTRAINT "Inventory_warehouseId_fkey"
  FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "InventoryImport"
  ADD CONSTRAINT "InventoryImport_warehouseId_fkey"
  FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "StockMovement"
  ADD CONSTRAINT "StockMovement_variantId_fkey"
  FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "StockMovement"
  ADD CONSTRAINT "StockMovement_warehouseId_fkey"
  FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Order"
  ADD CONSTRAINT "Order_customerId_fkey"
  FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "OrderStatusEvent"
  ADD CONSTRAINT "OrderStatusEvent_orderId_fkey"
  FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "OrderItem"
  ADD CONSTRAINT "OrderItem_orderId_fkey"
  FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "OrderItem"
  ADD CONSTRAINT "OrderItem_variantId_fkey"
  FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "OrderItem"
  ADD CONSTRAINT "OrderItem_productId_fkey"
  FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "OrderItem"
  ADD CONSTRAINT "OrderItem_warehouseId_fkey"
  FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "EventImage"
  ADD CONSTRAINT "EventImage_eventId_fkey"
  FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ---------------------------------------------------------------------------
-- RLS (backend uses DB URL / service role — bypasses RLS)
-- ---------------------------------------------------------------------------
ALTER TABLE "Subcategory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProductSubcategory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProductImage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProductVariant" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Warehouse" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Inventory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "InventoryImport" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "StockMovement" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Customer" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "OrderStatusEvent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "OrderItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Event" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "EventImage" ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- Seed data (from prisma/seed.ts)
-- ---------------------------------------------------------------------------
INSERT INTO "Warehouse" ("id", "name", "type", "location", "address", "isActive") VALUES
  ('seed-warehouse-main', 'Main Warehouse', 'PHYSICAL', 'Lima, Peru', NULL, true);

INSERT INTO "Customer" ("id", "email", "name", "phone", "city", "state", "country", "createdAt") VALUES
  ('seed-cust-1', 'michael@example.com', 'Michael Brown', '+1 202-555-0143', 'Austin', 'TX', 'USA', CURRENT_TIMESTAMP),
  ('seed-cust-2', 'sofia.mendez@example.com', 'Sofia Mendez', '+1 415-555-0118', 'San Francisco', 'CA', 'USA', CURRENT_TIMESTAMP),
  ('seed-cust-3', 'marie.dupont@example.com', 'Marie Dupont', '+33 1 42 68 53 00', 'Paris', NULL, 'France', CURRENT_TIMESTAMP),
  ('seed-cust-4', 'yuki.tanaka@example.com', 'Yuki Tanaka', '+81 3-1234-5678', 'Tokyo', NULL, 'Japan', CURRENT_TIMESTAMP),
  ('seed-cust-5', 'clara.hoffmann@example.com', 'Clara Hoffmann', '+49 30 12345678', 'Berlin', NULL, 'Germany', CURRENT_TIMESTAMP),
  ('seed-cust-6', 'amara.osei@example.com', 'Amara Osei', '+233 24 123 4567', 'Accra', NULL, 'Ghana', CURRENT_TIMESTAMP),
  ('seed-cust-7', 'liam.oconnor@example.com', 'Liam O''Connor', '+353 1 234 5678', 'Dublin', NULL, 'Ireland', CURRENT_TIMESTAMP);

INSERT INTO "Subcategory" ("id", "mainCategory", "name", "group", "sortOrder", "createdAt", "updatedAt") VALUES
  ('seed-sub-shawls', 'WOMEN', 'Shawls / Scarfs', 'Accessories', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-sub-pullovers', 'WOMEN', 'Pullovers', 'Ready to Wear', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-sub-cardigans', 'WOMEN', 'Cardigans', 'Ready to Wear', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-sub-coats', 'WOMEN', 'Coats', 'Ready to Wear', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-sub-capes', 'WOMEN', 'Capes', 'Ready to Wear', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-sub-headwears', 'WOMEN', 'Headwears', 'Accessories', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-sub-gloves', 'WOMEN', 'Gloves & Mittens', 'Accessories', 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-sub-snoods', 'WOMEN', 'Snoods & Hoods', 'Accessories', 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO "Product" ("id", "name", "description", "sku", "section", "price", "composition", "weight", "dimensions", "origin", "status", "createdAt", "updatedAt") VALUES
  ('seed-1', 'Pachakuti Scarf', 'PACHAKUTI takes its name from the Quechua word for transformation, a scarf woven to move easily between seasons and settings.', 'SC-001', 'Scarfs', 140.00, '70% Baby Alpaca 30% Silk', '130 g', '180 x 30 cm', 'Made in Peru', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-2', 'Quri Scarf', NULL, 'SC-002', 'Scarfs', 130.00, NULL, NULL, NULL, NULL, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-3', 'Yachay Scarf', NULL, 'SC-003', 'Scarfs', 210.00, NULL, NULL, NULL, NULL, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-3b', 'Scarf T''ikay', NULL, 'SC-004', 'Scarfs', 190.00, '70% Baby Alpaca 30% Silk', '100 g', '180 x 30 cm', 'Peru', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-3c', 'Lianpu Scarf', NULL, 'SC-005', 'Scarfs', 130.00, NULL, NULL, NULL, NULL, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-3d', 'Tinkuy Scarf', NULL, 'SC-006', 'Scarfs', 149.00, NULL, NULL, NULL, NULL, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-3e', 'Tawa Scarf', NULL, 'SC-007', 'Scarfs', 190.00, NULL, NULL, NULL, NULL, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-3f', 'Ñahua Scarf', NULL, 'SC-008', 'Scarfs', 500.00, NULL, NULL, NULL, NULL, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-4', 'Q''uñi Shawl', NULL, 'SH-001', 'Shawls', 190.00, NULL, NULL, NULL, NULL, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-5', 'Sinchi Shawl', NULL, 'SH-002', 'Shawls', 190.00, NULL, NULL, NULL, NULL, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-5b', 'Sumaq Shawl', NULL, 'SH-003', 'Shawls', 170.00, NULL, NULL, NULL, NULL, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-5c', 'Sayri Shawl', NULL, 'SH-004', 'Shawls', 160.00, NULL, NULL, NULL, NULL, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-6', 'Soft Pullover', NULL, 'PL-001', NULL, 210.00, NULL, NULL, NULL, NULL, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-7', 'Cream Cardigan', NULL, 'CG-001', NULL, 240.00, NULL, NULL, NULL, NULL, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-8', 'Alpaca Coat', NULL, 'CT-001', NULL, 480.00, NULL, NULL, NULL, NULL, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-9', 'Wool Cape', NULL, 'CP-001', NULL, 320.00, NULL, NULL, NULL, NULL, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-10', 'Knit Beanie', NULL, 'HW-001', NULL, 95.00, NULL, NULL, NULL, NULL, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-11', 'Alpaca Mittens', NULL, 'GM-001', NULL, 70.00, NULL, NULL, NULL, NULL, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-12', 'Alpaca Snood', NULL, 'SN-001', NULL, 110.00, NULL, NULL, NULL, NULL, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO "ProductSubcategory" ("productId", "subcategoryId") VALUES
  ('seed-1', 'seed-sub-shawls'),
  ('seed-2', 'seed-sub-shawls'),
  ('seed-3', 'seed-sub-shawls'),
  ('seed-3b', 'seed-sub-shawls'),
  ('seed-3c', 'seed-sub-shawls'),
  ('seed-3d', 'seed-sub-shawls'),
  ('seed-3e', 'seed-sub-shawls'),
  ('seed-3f', 'seed-sub-shawls'),
  ('seed-4', 'seed-sub-shawls'),
  ('seed-5', 'seed-sub-shawls'),
  ('seed-5b', 'seed-sub-shawls'),
  ('seed-5c', 'seed-sub-shawls'),
  ('seed-6', 'seed-sub-pullovers'),
  ('seed-7', 'seed-sub-cardigans'),
  ('seed-8', 'seed-sub-coats'),
  ('seed-9', 'seed-sub-capes'),
  ('seed-10', 'seed-sub-headwears'),
  ('seed-11', 'seed-sub-gloves'),
  ('seed-12', 'seed-sub-snoods');

INSERT INTO "ProductVariant" ("id", "productId", "sku", "color", "size", "price", "status", "createdAt", "updatedAt") VALUES
  ('seed-var-1', 'seed-1', 'SC-001-DEF', 'Fuchsia & Blue', 'One Size', 140.00, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-var-2', 'seed-2', 'SC-002-DEF', 'Default', 'One Size', 130.00, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-var-3', 'seed-3', 'SC-003-DEF', 'Default', 'One Size', 210.00, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-var-3b', 'seed-3b', 'SC-004-DEF', 'Fuchsia & Blue', 'One Size', 190.00, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-var-3c', 'seed-3c', 'SC-005-DEF', 'Default', 'One Size', 130.00, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-var-3d', 'seed-3d', 'SC-006-DEF', 'Default', 'One Size', 149.00, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-var-3e', 'seed-3e', 'SC-007-DEF', 'Default', 'One Size', 190.00, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-var-3f', 'seed-3f', 'SC-008-DEF', 'Default', 'One Size', 500.00, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-var-4', 'seed-4', 'SH-001-DEF', 'Default', 'One Size', 190.00, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-var-5', 'seed-5', 'SH-002-DEF', 'Default', 'One Size', 190.00, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-var-5b', 'seed-5b', 'SH-003-DEF', 'Default', 'One Size', 170.00, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-var-5c', 'seed-5c', 'SH-004-DEF', 'Default', 'One Size', 160.00, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-var-6', 'seed-6', 'PL-001-DEF', 'Default', 'One Size', 210.00, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-var-7', 'seed-7', 'CG-001-DEF', 'Default', 'One Size', 240.00, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-var-8', 'seed-8', 'CT-001-DEF', 'Default', 'One Size', 480.00, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-var-9', 'seed-9', 'CP-001-DEF', 'Default', 'One Size', 320.00, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-var-10', 'seed-10', 'HW-001-DEF', 'Default', 'One Size', 95.00, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-var-11', 'seed-11', 'GM-001-DEF', 'Default', 'One Size', 70.00, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-var-12', 'seed-12', 'SN-001-DEF', 'Default', 'One Size', 110.00, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO "Inventory" ("variantId", "warehouseId", "quantityOnHand", "quantityReserved", "reorderPoint", "updatedAt") VALUES
  ('seed-var-1', 'seed-warehouse-main', 145, 0, 10, CURRENT_TIMESTAMP),
  ('seed-var-2', 'seed-warehouse-main', 145, 0, 10, CURRENT_TIMESTAMP),
  ('seed-var-3', 'seed-warehouse-main', 145, 0, 10, CURRENT_TIMESTAMP),
  ('seed-var-3b', 'seed-warehouse-main', 145, 0, 10, CURRENT_TIMESTAMP),
  ('seed-var-3c', 'seed-warehouse-main', 145, 0, 10, CURRENT_TIMESTAMP),
  ('seed-var-3d', 'seed-warehouse-main', 145, 0, 10, CURRENT_TIMESTAMP),
  ('seed-var-3e', 'seed-warehouse-main', 145, 0, 10, CURRENT_TIMESTAMP),
  ('seed-var-3f', 'seed-warehouse-main', 145, 0, 10, CURRENT_TIMESTAMP),
  ('seed-var-4', 'seed-warehouse-main', 145, 0, 10, CURRENT_TIMESTAMP),
  ('seed-var-5', 'seed-warehouse-main', 145, 0, 10, CURRENT_TIMESTAMP),
  ('seed-var-5b', 'seed-warehouse-main', 145, 0, 10, CURRENT_TIMESTAMP),
  ('seed-var-5c', 'seed-warehouse-main', 145, 0, 10, CURRENT_TIMESTAMP),
  ('seed-var-6', 'seed-warehouse-main', 80, 0, 10, CURRENT_TIMESTAMP),
  ('seed-var-7', 'seed-warehouse-main', 60, 0, 10, CURRENT_TIMESTAMP),
  ('seed-var-8', 'seed-warehouse-main', 35, 0, 10, CURRENT_TIMESTAMP),
  ('seed-var-9', 'seed-warehouse-main', 42, 0, 10, CURRENT_TIMESTAMP),
  ('seed-var-10', 'seed-warehouse-main', 120, 0, 10, CURRENT_TIMESTAMP),
  ('seed-var-11', 'seed-warehouse-main', 150, 0, 10, CURRENT_TIMESTAMP),
  ('seed-var-12', 'seed-warehouse-main', 70, 0, 10, CURRENT_TIMESTAMP);

-- Orders 12340–12347 (subtotal + 9.99 shipping + 8% tax)
INSERT INTO "Order" (
  "id", "orderNumber", "customerId", "status", "channel",
  "subtotal", "shippingCost", "tax", "total",
  "shippingFullName", "shippingCountry", "carrier", "trackingId",
  "createdAt", "updatedAt"
) VALUES
  ('seed-ord-1', 12340, 'seed-cust-1', 'SHIPPED', 'ONLINE', 189.50, 9.99, 15.16, 214.65, 'Michael Brown', 'USA', 'DHL', 'DH000000001CH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-ord-2', 12341, 'seed-cust-2', 'PENDING', 'ONLINE', 259.00, 9.99, 20.72, 289.71, 'Sofia Mendez', 'USA', NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-ord-3', 12342, 'seed-cust-3', 'SHIPPED', 'ONLINE', 342.00, 9.99, 27.36, 379.35, 'Marie Dupont', 'France', 'DPD', 'DP000000003CH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-ord-4', 12343, 'seed-cust-4', 'DELIVERED', 'ONLINE', 120.00, 9.99, 9.60, 139.59, 'Yuki Tanaka', 'Japan', 'LA_POSTE', 'LA000000004CH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-ord-5', 12344, 'seed-cust-5', 'PROCESSING', 'ONLINE', 258.50, 9.99, 20.68, 289.17, 'Clara Hoffmann', 'Germany', 'DHL', 'DH000000005CH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-ord-6', 12345, 'seed-cust-6', 'CANCELLED', 'ONLINE', 85.00, 9.99, 6.80, 101.79, 'Amara Osei', 'Ghana', 'DPD', 'DP000000006CH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-ord-7', 12346, 'seed-cust-7', 'DELIVERED', 'ONLINE', 510.00, 9.99, 40.80, 560.79, 'Liam O''Connor', 'Ireland', 'LA_POSTE', 'LA000000007CH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-ord-8', 12347, 'seed-cust-1', 'DELIVERED', 'ONLINE', 149.00, 9.99, 11.92, 170.91, 'Michael Brown', 'USA', 'DHL', 'DH000000008CH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO "OrderItem" ("id", "orderId", "sku", "productName", "variantLabel", "unitPrice", "quantity", "lineTotal", "fulfillmentStatus") VALUES
  ('seed-oi-1', 'seed-ord-1', 'OV-001', 'Oversized Coat', 'Size: M  Color: Ivory', 189.50, 1, 189.50, 'UNFULFILLED'),
  ('seed-oi-2', 'seed-ord-2', 'AL-002', 'Alpaca Silk Scarf', 'Size: M  Color: Ivory', 259.00, 1, 259.00, 'UNFULFILLED'),
  ('seed-oi-3', 'seed-ord-3', 'AL-003', 'Alpaca Overcoat', 'Size: M  Color: Ivory', 342.00, 1, 342.00, 'UNFULFILLED'),
  ('seed-oi-4', 'seed-ord-4', 'AL-004', 'Alpaca Knit Sweater', 'Size: M  Color: Ivory', 120.00, 1, 120.00, 'UNFULFILLED'),
  ('seed-oi-5', 'seed-ord-5', 'WO-005', 'Women''s Alpaca Cardigan', 'Size: M  Color: Ivory', 258.50, 1, 258.50, 'UNFULFILLED'),
  ('seed-oi-6', 'seed-ord-6', 'OV-006', 'Oversized Coat', 'Size: M  Color: Ivory', 85.00, 1, 85.00, 'UNFULFILLED'),
  ('seed-oi-7', 'seed-ord-7', 'AL-007', 'Alpaca Silk Scarf', 'Size: M  Color: Ivory', 510.00, 1, 510.00, 'UNFULFILLED'),
  ('seed-oi-8', 'seed-ord-8', 'AL-008', 'Alpaca Overcoat', 'Size: M  Color: Ivory', 149.00, 1, 149.00, 'UNFULFILLED');

INSERT INTO "OrderStatusEvent" ("id", "orderId", "status", "occurredAt") VALUES
  ('seed-ose-1', 'seed-ord-1', 'SHIPPED', CURRENT_TIMESTAMP),
  ('seed-ose-2', 'seed-ord-2', 'PENDING', CURRENT_TIMESTAMP),
  ('seed-ose-3', 'seed-ord-3', 'SHIPPED', CURRENT_TIMESTAMP),
  ('seed-ose-4', 'seed-ord-4', 'DELIVERED', CURRENT_TIMESTAMP),
  ('seed-ose-5', 'seed-ord-5', 'PROCESSING', CURRENT_TIMESTAMP),
  ('seed-ose-6', 'seed-ord-6', 'CANCELLED', CURRENT_TIMESTAMP),
  ('seed-ose-7', 'seed-ord-7', 'DELIVERED', CURRENT_TIMESTAMP),
  ('seed-ose-8', 'seed-ord-8', 'DELIVERED', CURRENT_TIMESTAMP);

INSERT INTO "Event" (
  "id", "title", "description", "location", "standSubtitle", "venueCallout",
  "bulletPoints", "type", "status", "startsAt", "endsAt", "createdAt", "updatedAt"
) VALUES
  (
    'seed-event-1',
    'Les Automnales — Geneva',
    'Munay is delighted to be part of Les Automnales Geneva 2025, from November 7 to 10 at Palexpo.',
    'Palexpo, Geneva, Switzerland',
    'Munay Stand : D51',
    'Here''s where you''ll find us inside Les Automnales: Stand D51 in the Market Area.',
    '["Step into Munay''s world — a space inspired by the landscapes of Peru and the softness of baby alpaca.","Touch and feel our natural fibres.","Discover new pieces from our 2025 collection.","Meet Shalie, Munay''s founder, and hear the story behind the brand."]'::jsonb,
    'FAIR_EXPO', 'PUBLISHED',
    '2025-11-07 00:00:00', '2025-11-10 00:00:00',
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
  ),
  (
    'seed-event-2',
    'An Evening of Empowerment & Elegance',
    'An intimate evening at our Lima flagship celebrating the women behind Munay''s craft.',
    'Munay Flagship, Lima, Peru',
    NULL,
    'Join us in-store for an evening of stories, craft, and community.',
    '["Meet the artisans behind our alpaca weaves.","Preview new arrivals before they launch online.","Enjoy refreshments and live music."]'::jsonb,
    'IN_STORE', 'PUBLISHED',
    '2025-06-14 00:00:00', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
  ),
  (
    'seed-event-3',
    'Munay Winter Collection Preview',
    'A first look at Munay''s Winter Collection, showcased at the Grand Palais.',
    'Grand Palais, Paris, France',
    NULL,
    'Find our showcase near the east entrance of the Grand Palais.',
    '["See the full Winter Collection before it drops.","Learn about our sourcing from Andean alpaca farms."]'::jsonb,
    'FAIR_EXPO', 'PUBLISHED',
    '2024-12-03 00:00:00', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
  ),
  (
    'seed-event-4',
    'Alpaca Pop-up — Larco Mar',
    'A weekend pop-up overlooking the Miraflores coastline.',
    'Larco Mar, Miraflores, Lima',
    NULL,
    'Look for the Munay kiosk on the ocean-view terrace.',
    '["Shop limited-run pieces not available online.","Get accessories made to order on-site."]'::jsonb,
    'POP_UP', 'DRAFT',
    '2025-11-20 00:00:00', '2025-11-23 00:00:00',
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
  ),
  (
    'seed-event-5',
    'Maison & Objet — Paris',
    'Munay returns to Maison & Objet to present our latest home and accessory lines.',
    'Paris Nord Villepinte, France',
    NULL,
    'Visit our booth in the Craft & Origins hall.',
    '["Meet our team for wholesale and press inquiries.","Preview our new home accessories line."]'::jsonb,
    'FAIR_EXPO', 'SCHEDULED',
    '2025-09-04 00:00:00', '2025-09-08 00:00:00',
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
  );

-- Keep orderNumber sequence ahead of seeded values
SELECT setval(pg_get_serial_sequence('"Order"', 'orderNumber'), (SELECT MAX("orderNumber") FROM "Order"));

COMMIT;
