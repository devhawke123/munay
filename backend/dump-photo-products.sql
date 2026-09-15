-- PostgreSQL dump: product data for folders with real images
-- Source: frontend/src/assets/productImages (18 products)
-- Run against a DB that already has Prisma schema applied
BEGIN;

-- Subcategories
INSERT INTO "Subcategory" (id, "mainCategory", name, "group", "sortOrder", "createdAt", "updatedAt")
VALUES ('sub_MEN_Pullovers_8594b6b521de1381', 'MEN'::"MainCategory", 'Pullovers', 'Ready to Wear', 0, NOW(), NOW())
ON CONFLICT ("mainCategory", name) DO UPDATE SET "group" = EXCLUDED."group";
INSERT INTO "Subcategory" (id, "mainCategory", name, "group", "sortOrder", "createdAt", "updatedAt")
VALUES ('sub_WOMEN_Pullovers_e2db7e576d8af72c', 'WOMEN'::"MainCategory", 'Pullovers', 'Ready to Wear', 0, NOW(), NOW())
ON CONFLICT ("mainCategory", name) DO UPDATE SET "group" = EXCLUDED."group";
INSERT INTO "Subcategory" (id, "mainCategory", name, "group", "sortOrder", "createdAt", "updatedAt")
VALUES ('sub_WOMEN_Shawls / Scarfs_999d7e9d537c3a69', 'WOMEN'::"MainCategory", 'Shawls / Scarfs', 'Accessories', 0, NOW(), NOW())
ON CONFLICT ("mainCategory", name) DO UPDATE SET "group" = EXCLUDED."group";
INSERT INTO "Subcategory" (id, "mainCategory", name, "group", "sortOrder", "createdAt", "updatedAt")
VALUES ('sub_WOMEN_Capes_d4939efd71447160', 'WOMEN'::"MainCategory", 'Capes', 'Ready to Wear', 0, NOW(), NOW())
ON CONFLICT ("mainCategory", name) DO UPDATE SET "group" = EXCLUDED."group";
INSERT INTO "Subcategory" (id, "mainCategory", name, "group", "sortOrder", "createdAt", "updatedAt")
VALUES ('sub_MEN_Shawls / Scarfs_3ccfc80e87d380cf', 'MEN'::"MainCategory", 'Shawls / Scarfs', 'Accessories', 0, NOW(), NOW())
ON CONFLICT ("mainCategory", name) DO UPDATE SET "group" = EXCLUDED."group";
INSERT INTO "Subcategory" (id, "mainCategory", name, "group", "sortOrder", "createdAt", "updatedAt")
VALUES ('sub_HOME_Throws & Blankets_3d30d7d5dee3e4e7', 'HOME'::"MainCategory", 'Throws & Blankets', 'Home', 0, NOW(), NOW())
ON CONFLICT ("mainCategory", name) DO UPDATE SET "group" = EXCLUDED."group";
INSERT INTO "Subcategory" (id, "mainCategory", name, "group", "sortOrder", "createdAt", "updatedAt")
VALUES ('sub_HOME_Alpaca Toys_7d8c7fdbd81a46fc', 'HOME'::"MainCategory", 'Alpaca Toys', 'Home', 0, NOW(), NOW())
ON CONFLICT ("mainCategory", name) DO UPDATE SET "group" = EXCLUDED."group";
INSERT INTO "Subcategory" (id, "mainCategory", name, "group", "sortOrder", "createdAt", "updatedAt")
VALUES ('sub_WOMEN_Coats_4236455b661bad99', 'WOMEN'::"MainCategory", 'Coats', 'Ready to Wear', 0, NOW(), NOW())
ON CONFLICT ("mainCategory", name) DO UPDATE SET "group" = EXCLUDED."group";
INSERT INTO "Subcategory" (id, "mainCategory", name, "group", "sortOrder", "createdAt", "updatedAt")
VALUES ('sub_MEN_Coats_7f99bfbc310551b4', 'MEN'::"MainCategory", 'Coats', 'Ready to Wear', 0, NOW(), NOW())
ON CONFLICT ("mainCategory", name) DO UPDATE SET "group" = EXCLUDED."group";
INSERT INTO "Subcategory" (id, "mainCategory", name, "group", "sortOrder", "createdAt", "updatedAt")
VALUES ('sub_WOMEN_Tops_3edb9c3d8ff61316', 'WOMEN'::"MainCategory", 'Tops', 'Ready to Wear', 0, NOW(), NOW())
ON CONFLICT ("mainCategory", name) DO UPDATE SET "group" = EXCLUDED."group";
INSERT INTO "Subcategory" (id, "mainCategory", name, "group", "sortOrder", "createdAt", "updatedAt")
VALUES ('sub_WOMEN_Cardigans_20e54fab365cdf7a', 'WOMEN'::"MainCategory", 'Cardigans', 'Ready to Wear', 0, NOW(), NOW())
ON CONFLICT ("mainCategory", name) DO UPDATE SET "group" = EXCLUDED."group";
INSERT INTO "Subcategory" (id, "mainCategory", name, "group", "sortOrder", "createdAt", "updatedAt")
VALUES ('sub_MEN_Headwears_aceb60655b4d08fe', 'MEN'::"MainCategory", 'Headwears', 'Accessories', 0, NOW(), NOW())
ON CONFLICT ("mainCategory", name) DO UPDATE SET "group" = EXCLUDED."group";
INSERT INTO "Subcategory" (id, "mainCategory", name, "group", "sortOrder", "createdAt", "updatedAt")
VALUES ('sub_WOMEN_Headwears_9da3bc5075a3676a', 'WOMEN'::"MainCategory", 'Headwears', 'Accessories', 0, NOW(), NOW())
ON CONFLICT ("mainCategory", name) DO UPDATE SET "group" = EXCLUDED."group";

-- Product: Yuraq Pullover
INSERT INTO "Product" (
  id, name, description, sku, section, price, composition, fiber, "careInstructions", tags, status, "createdAt", "updatedAt"
) VALUES (
  'prod_Yuraq Pullover_eec03013fd73dfc4',
  'Yuraq Pullover',
  'A polo-neck sweater built on Munay''s smooth-knit foundation that keeps the focus on the fiber. Woven entirely from 100% Baby Alpaca, it carries the soft, insulating warmth alpaca is prized for, without any added weight. A quiet essential for cooler days, equally at home under a coat or worn alone.',
  'PU-YURAQ',
  NULL,
  230.00,
  '100% Baby Alpaca',
  'Baby Alpaca',
  'Hand wash in cold water (max 30°C) or dry clean. Use a mild detergent, no bleach. Do not wring; dry flat, away from direct heat and sunlight. Iron on low heat if needed, inside out, with a pressing cloth. Store flat or on a wide hanger to preserve shape.',
  '["White"]'::jsonb,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  sku = EXCLUDED.sku,
  price = EXCLUDED.price,
  composition = EXCLUDED.composition,
  fiber = EXCLUDED.fiber,
  "careInstructions" = EXCLUDED."careInstructions",
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'MEN'::"MainCategory" AND s.name = 'Pullovers'
WHERE p.name = 'Yuraq Pullover'
ON CONFLICT DO NOTHING;
INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'WOMEN'::"MainCategory" AND s.name = 'Pullovers'
WHERE p.name = 'Yuraq Pullover'
ON CONFLICT DO NOTHING;

INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_PU-YURAQ-CAM-S_e61a14dcfbbd20ba',
  p.id,
  'PU-YURAQ-CAM-S',
  'Camel',
  'S',
  230.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Yuraq Pullover'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_PU-YURAQ-CAM-M_249df68784490af3',
  p.id,
  'PU-YURAQ-CAM-M',
  'Camel',
  'M',
  230.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Yuraq Pullover'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_PU-YURAQ-CAM-L_56504c4771e85258',
  p.id,
  'PU-YURAQ-CAM-L',
  'Camel',
  'L',
  230.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Yuraq Pullover'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_PU-YURAQ-OFFWHI-S_b0ad895cd95f52c7',
  p.id,
  'PU-YURAQ-OFFWHI-S',
  'Off-White',
  'S',
  230.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Yuraq Pullover'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_PU-YURAQ-OFFWHI-M_a85d5d4a448e71ac',
  p.id,
  'PU-YURAQ-OFFWHI-M',
  'Off-White',
  'M',
  230.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Yuraq Pullover'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_PU-YURAQ-OFFWHI-L_b3edae2883fd6119',
  p.id,
  'PU-YURAQ-OFFWHI-L',
  'Off-White',
  'L',
  230.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Yuraq Pullover'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

-- Product: Tikay Scarf
INSERT INTO "Product" (
  id, name, description, sku, section, price, composition, fiber, "careInstructions", tags, status, "createdAt", "updatedAt"
) VALUES (
  'prod_Tikay Scarf_f65717aca1e39c43',
  'Tikay Scarf',
  'A blossoming, lightweight scarf designed for the in-between seasons, when a little warmth is welcome but nothing heavy. Woven from 70% Baby Alpaca and 30% Silk, it drapes with a soft sheen and gentle structure. An easy finishing touch for spring and summer evenings.',
  'ECH-TIKAY',
  'Scarfs',
  155.00,
  '70% Baby Alpaca, 30% Silk',
  'Baby Alpaca / Silk',
  'Hand wash only in cold water. Use a mild detergent, no bleach. Do not wring; dry flat, away from direct heat and sunlight. Iron on low heat if needed, inside out, with a pressing cloth. Store flat or on a wide hanger to preserve shape. Handle with care: silk is delicate, avoid contact with perfume and chemical products.',
  '["To bloom","blossoming"]'::jsonb,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  sku = EXCLUDED.sku,
  price = EXCLUDED.price,
  composition = EXCLUDED.composition,
  fiber = EXCLUDED.fiber,
  "careInstructions" = EXCLUDED."careInstructions",
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'WOMEN'::"MainCategory" AND s.name = 'Shawls / Scarfs'
WHERE p.name = 'Tikay Scarf'
ON CONFLICT DO NOTHING;

INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_ECH-TIKAY-TUR-180X30 CM_f74c1c2b9862735c',
  p.id,
  'ECH-TIKAY-TUR-180X30 CM',
  'Turquoise',
  '180x30 cm',
  155.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Tikay Scarf'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_ECH-TIKAY-ORADAR-180X30 CM_5fe92716228dd55b',
  p.id,
  'ECH-TIKAY-ORADAR-180X30 CM',
  'Orange & Dark Blue',
  '180x30 cm',
  155.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Tikay Scarf'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_ECH-TIKAY-FUCDAR-180X30 CM_e5472151497af936',
  p.id,
  'ECH-TIKAY-FUCDAR-180X30 CM',
  'Fuchsia & Dark Blue',
  '180x30 cm',
  155.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Tikay Scarf'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_ECH-TIKAY-LIGBLU-180X30 CM_e530063f3b7c3576',
  p.id,
  'ECH-TIKAY-LIGBLU-180X30 CM',
  'Light Blue & Royal Blue',
  '180x30 cm',
  155.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Tikay Scarf'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_ECH-TIKAY-YELDAR-180X30 CM_7dadf49289e1dc1e',
  p.id,
  'ECH-TIKAY-YELDAR-180X30 CM',
  'Yellow & Dark Blue',
  '180x30 cm',
  155.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Tikay Scarf'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_ECH-TIKAY-WISPUR-180X30 CM_0807e4244eb51943',
  p.id,
  'ECH-TIKAY-WISPUR-180X30 CM',
  'Wisteria Purple',
  '180x30 cm',
  155.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Tikay Scarf'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_ECH-TIKAY-RED-180X30 CM_b70e860349ba9c66',
  p.id,
  'ECH-TIKAY-RED-180X30 CM',
  'Red',
  '180x30 cm',
  155.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Tikay Scarf'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_ECH-TIKAY-REDORA-180X30CM_427c23247da061eb',
  p.id,
  'ECH-TIKAY-REDORA-180X30CM',
  'Red & Orange',
  '180x30cm',
  155.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Tikay Scarf'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

-- Product: Iskay Cape
INSERT INTO "Product" (
  id, name, description, sku, section, price, composition, fiber, "careInstructions", tags, status, "createdAt", "updatedAt"
) VALUES (
  'prod_Iskay Cape_8b22103d1110d94e',
  'Iskay Cape',
  'Named for the number two, this cape is woven in two tones on a double-faced construction, giving one piece two distinct looks. Made from 100% Baby Alpaca, it''s soft, warm, and reversible in spirit. A versatile layer that adapts to the mood of the day.',
  'CAP-ISKAY',
  NULL,
  290.00,
  '100% Baby Alpaca',
  'Baby Alpaca',
  'Hand wash in cold water (max 30°C) or dry clean. Use a mild detergent, no bleach. Do not wring; dry flat, away from direct heat and sunlight. Iron on low heat if needed, inside out, with a pressing cloth. Store flat or on a wide hanger to preserve shape.',
  '["Two"]'::jsonb,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  sku = EXCLUDED.sku,
  price = EXCLUDED.price,
  composition = EXCLUDED.composition,
  fiber = EXCLUDED.fiber,
  "careInstructions" = EXCLUDED."careInstructions",
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'WOMEN'::"MainCategory" AND s.name = 'Capes'
WHERE p.name = 'Iskay Cape'
ON CONFLICT DO NOTHING;

INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_CAP-ISKAY-PINGRE-TU_42dd8d2c607491af',
  p.id,
  'CAP-ISKAY-PINGRE-TU',
  'Pink, Grey',
  'One Size',
  290.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Iskay Cape'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

-- Product: Pachakuti Scarf
INSERT INTO "Product" (
  id, name, description, sku, section, price, composition, fiber, "careInstructions", tags, status, "createdAt", "updatedAt"
) VALUES (
  'prod_Pachakuti Scarf_c97e8377fde16e85',
  'Pachakuti Scarf',
  'Named for the one who transforms time, this scarf pairs two tones in a simple, considered weave. Made from 100% Baby Alpaca, it offers soft, natural warmth with quiet visual depth. A timeless accessory that transforms a plain coat into a finished look.',
  'ECH-PACHAKUTI',
  'Scarfs',
  140.00,
  '100% Baby Alpaca',
  'Baby Alpaca',
  'Hand wash in cold water (max 30°C) or dry clean. Use a mild detergent, no bleach. Do not wring; dry flat, away from direct heat and sunlight. Iron on low heat if needed, inside out, with a pressing cloth. Store flat or on a wide hanger to preserve shape.',
  '["One who transforms time and the world"]'::jsonb,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  sku = EXCLUDED.sku,
  price = EXCLUDED.price,
  composition = EXCLUDED.composition,
  fiber = EXCLUDED.fiber,
  "careInstructions" = EXCLUDED."careInstructions",
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'MEN'::"MainCategory" AND s.name = 'Shawls / Scarfs'
WHERE p.name = 'Pachakuti Scarf'
ON CONFLICT DO NOTHING;
INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'WOMEN'::"MainCategory" AND s.name = 'Shawls / Scarfs'
WHERE p.name = 'Pachakuti Scarf'
ON CONFLICT DO NOTHING;

INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_ECH-PACHAKUTI-BLUGRE-180X30 CM_af788da9b5b6be03',
  p.id,
  'ECH-PACHAKUTI-BLUGRE-180X30 CM',
  'Blue-Grey & Oatmeal',
  '180x30 cm',
  140.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Pachakuti Scarf'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_ECH-PACHAKUTI-DENBLU-180X30 CM_94ddf4c7b7d17252',
  p.id,
  'ECH-PACHAKUTI-DENBLU-180X30 CM',
  'Denim Blue & Oatmeal',
  '180x30 cm',
  140.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Pachakuti Scarf'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_ECH-PACHAKUTI-RICCAM-180X30 CM_d5e94156047ff233',
  p.id,
  'ECH-PACHAKUTI-RICCAM-180X30 CM',
  'Rich Camel Brown & Sand',
  '180x30 cm',
  140.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Pachakuti Scarf'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_ECH-PACHAKUTI-CORRED-180X30 CM_c1a6f736a814e70b',
  p.id,
  'ECH-PACHAKUTI-CORRED-180X30 CM',
  'Coral Red & Oatmeal',
  '180x30 cm',
  140.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Pachakuti Scarf'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_ECH-PACHAKUTI-PASGRE-180X30 CM_faa52fcdb436ca37',
  p.id,
  'ECH-PACHAKUTI-PASGRE-180X30 CM',
  'Pastel Green & Oatmeal',
  '180x30 cm',
  140.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Pachakuti Scarf'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_ECH-PACHAKUTI-CHALIG-180X30 CM_805156e37cb8100e',
  p.id,
  'ECH-PACHAKUTI-CHALIG-180X30 CM',
  'Charcoal & Light Heather Grey',
  '180x30 cm',
  140.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Pachakuti Scarf'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

-- Product: Couverture Kusik
INSERT INTO "Product" (
  id, name, description, sku, section, price, composition, fiber, "careInstructions", tags, status, "createdAt", "updatedAt"
) VALUES (
  'prod_Couverture Kusik_a3358028e208f78e',
  'Couverture Kusik',
  'A happiness-named throw, woven to be soft and lightweight rather than heavy, for warmth that never feels like a burden. Made from 100% Baby Alpaca, it''s gentle against the skin and naturally insulating. Perfect draped over a sofa or the foot of a bed.',
  'COU-KUSIK',
  NULL,
  210.00,
  '100% Baby Alpaca',
  'Baby Alpaca',
  'Hand wash in cold water (max 30°C) or dry clean. Use a mild detergent, no bleach. Do not wring; dry flat, away from direct heat and sunlight. Iron on low heat if needed, inside out, with a pressing cloth. Store flat or on a wide hanger to preserve shape.',
  '["Happy"]'::jsonb,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  sku = EXCLUDED.sku,
  price = EXCLUDED.price,
  composition = EXCLUDED.composition,
  fiber = EXCLUDED.fiber,
  "careInstructions" = EXCLUDED."careInstructions",
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'HOME'::"MainCategory" AND s.name = 'Throws & Blankets'
WHERE p.name = 'Couverture Kusik'
ON CONFLICT DO NOTHING;

INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_COU-KUSIK-TAU-180X130CM_508a6ccadc91ff57',
  p.id,
  'COU-KUSIK-TAU-180X130CM',
  'Taupe',
  '180x130cm',
  210.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Couverture Kusik'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_COU-KUSIK-GRA-180X130CM_e2cf34a2302d35f8',
  p.id,
  'COU-KUSIK-GRA-180X130CM',
  'Graphite',
  '180x130cm',
  210.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Couverture Kusik'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_COU-KUSIK-FORGRE-180X130CM_4560c68957e718df',
  p.id,
  'COU-KUSIK-FORGRE-180X130CM',
  'Forest Green',
  '180x130cm',
  210.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Couverture Kusik'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

-- Product: Couverture Warmisqa
INSERT INTO "Product" (
  id, name, description, sku, section, price, composition, fiber, "careInstructions", tags, status, "createdAt", "updatedAt"
) VALUES (
  'prod_Couverture Warmisqa_662a56177c61d346',
  'Couverture Warmisqa',
  'A feminine, refined throw finished in a herringbone weave that reads as quietly luxurious in any room. Made from 100% Premium Baby Alpaca, it offers exceptional softness beyond our standard alpaca pieces. An elevated addition to a considered, comfortable home.',
  'COU-WARMISQA',
  NULL,
  290.00,
  '100% Baby Alpaca Premium',
  'Premium Baby Alpaca',
  'Hand wash in cold water (max 30°C) or dry clean. Use a mild detergent, no bleach. Do not wring; dry flat, away from direct heat and sunlight. Iron on low heat if needed, inside out, with a pressing cloth. Store flat or on a wide hanger to preserve shape.',
  '["Feminine"]'::jsonb,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  sku = EXCLUDED.sku,
  price = EXCLUDED.price,
  composition = EXCLUDED.composition,
  fiber = EXCLUDED.fiber,
  "careInstructions" = EXCLUDED."careInstructions",
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'HOME'::"MainCategory" AND s.name = 'Throws & Blankets'
WHERE p.name = 'Couverture Warmisqa'
ON CONFLICT DO NOTHING;

INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_COU-WARMISQA-FORGRE-180X130CM_ce1cdf80b9d5cb00',
  p.id,
  'COU-WARMISQA-FORGRE-180X130CM',
  'Forest Green',
  '180x130cm',
  290.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Couverture Warmisqa'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_COU-WARMISQA-TUR-180X130CM_9a9b401ddf2fde55',
  p.id,
  'COU-WARMISQA-TUR-180X130CM',
  'Turquoise',
  '180x130cm',
  290.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Couverture Warmisqa'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_COU-WARMISQA-CARRED-180X130CM_fd17840db296dac9',
  p.id,
  'COU-WARMISQA-CARRED-180X130CM',
  'Cardinal Red',
  '180x130cm',
  290.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Couverture Warmisqa'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

-- Product: Couverture Allin
INSERT INTO "Product" (
  id, name, description, sku, section, price, composition, fiber, "careInstructions", tags, status, "createdAt", "updatedAt"
) VALUES (
  'prod_Couverture Allin_bcf94c4f5059bfe1',
  'Couverture Allin',
  'Meaning good, this throw is woven in an elegant herringbone pattern that brings texture and warmth in equal measure. Made from 100% Baby Alpaca, it''s soft, substantial, and built to last. A versatile home piece for cool evenings in.',
  'COU-ALLIN',
  NULL,
  250.00,
  '100% Baby Alpaca',
  'Baby Alpaca',
  'Hand wash in cold water (max 30°C) or dry clean. Use a mild detergent, no bleach. Do not wring; dry flat, away from direct heat and sunlight. Iron on low heat if needed, inside out, with a pressing cloth. Store flat or on a wide hanger to preserve shape.',
  '["Good"]'::jsonb,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  sku = EXCLUDED.sku,
  price = EXCLUDED.price,
  composition = EXCLUDED.composition,
  fiber = EXCLUDED.fiber,
  "careInstructions" = EXCLUDED."careInstructions",
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'HOME'::"MainCategory" AND s.name = 'Throws & Blankets'
WHERE p.name = 'Couverture Allin'
ON CONFLICT DO NOTHING;

INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_COU-ALLIN-NAVBLU-180X130CM_40ae8ded26bf2d1f',
  p.id,
  'COU-ALLIN-NAVBLU-180X130CM',
  'Navy Blue & Oatmeal',
  '180x130cm',
  250.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Couverture Allin'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_COU-ALLIN-TAUBRO-180X130CM_9667688e177dd038',
  p.id,
  'COU-ALLIN-TAUBRO-180X130CM',
  'Taupe Brown',
  '180x130cm',
  250.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Couverture Allin'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_COU-ALLIN-CHAGRE-180X130CM_125e51899e8a69c4',
  p.id,
  'COU-ALLIN-CHAGRE-180X130CM',
  'Charcoal Grey',
  '180x130cm',
  250.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Couverture Allin'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

-- Product: Warmi Wasi Pullover
INSERT INTO "Product" (
  id, name, description, sku, section, price, composition, fiber, "careInstructions", tags, status, "createdAt", "updatedAt"
) VALUES (
  'prod_Warmi Wasi Pullover_072eea6037e7ccfb',
  'Warmi Wasi Pullover',
  'The women''s counterpart to Wasi, finished in the same braided knit and rounded neckline for a soft, grounded feel. Made from 100% Baby Alpaca, it offers gentle warmth that only gets softer with time. A homely, comforting piece for everyday wear.',
  'PU-WASIF',
  NULL,
  240.00,
  '100% Baby Alpaca',
  'Baby Alpaca',
  'Hand wash in cold water (max 30°C) or dry clean. Use a mild detergent, no bleach. Do not wring; dry flat, away from direct heat and sunlight. Iron on low heat if needed, inside out, with a pressing cloth. Store flat or on a wide hanger to preserve shape.',
  '["Light"]'::jsonb,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  sku = EXCLUDED.sku,
  price = EXCLUDED.price,
  composition = EXCLUDED.composition,
  fiber = EXCLUDED.fiber,
  "careInstructions" = EXCLUDED."careInstructions",
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'WOMEN'::"MainCategory" AND s.name = 'Pullovers'
WHERE p.name = 'Warmi Wasi Pullover'
ON CONFLICT DO NOTHING;

INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_PU-WASIF-OFFWHI-S_c01326a92d91eac5',
  p.id,
  'PU-WASIF-OFFWHI-S',
  'Off-White',
  'S',
  240.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Warmi Wasi Pullover'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_PU-WASIF-OFFWHI-M_6c7cb6c984bb0ae9',
  p.id,
  'PU-WASIF-OFFWHI-M',
  'Off-White',
  'M',
  240.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Warmi Wasi Pullover'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_PU-WASIF-OFFWHI-L_ad522a73640a0df1',
  p.id,
  'PU-WASIF-OFFWHI-L',
  'Off-White',
  'L',
  240.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Warmi Wasi Pullover'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_PU-WASIF-POWPIN-S_3fe5d8d73d2dbe6d',
  p.id,
  'PU-WASIF-POWPIN-S',
  'Powder Pink',
  'S',
  240.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Warmi Wasi Pullover'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_PU-WASIF-POWPIN-M_bdf16b8175208886',
  p.id,
  'PU-WASIF-POWPIN-M',
  'Powder Pink',
  'M',
  240.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Warmi Wasi Pullover'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_PU-WASIF-POWPIN-L_e42413551f21ab05',
  p.id,
  'PU-WASIF-POWPIN-L',
  'Powder Pink',
  'L',
  240.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Warmi Wasi Pullover'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_PU-WASIF-FORGRE-S_2dcf69d8fe907295',
  p.id,
  'PU-WASIF-FORGRE-S',
  'Forest Green',
  'S',
  240.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Warmi Wasi Pullover'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_PU-WASIF-FORGRE-M_ca64b51fa4b8fe9c',
  p.id,
  'PU-WASIF-FORGRE-M',
  'Forest Green',
  'M',
  240.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Warmi Wasi Pullover'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_PU-WASIF-FORGRE-L_e5e1143a5d010247',
  p.id,
  'PU-WASIF-FORGRE-L',
  'Forest Green',
  'L',
  240.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Warmi Wasi Pullover'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

-- Product: Uchuy Huacaya
INSERT INTO "Product" (
  id, name, description, sku, section, price, composition, fiber, "careInstructions", tags, status, "createdAt", "updatedAt"
) VALUES (
  'prod_Uchuy Huacaya_67c76fff9b834157',
  'Uchuy Huacaya',
  'A small plush companion modeled on the fluffy Huacaya alpaca, handcrafted with quiet artisanal care. Made from 100% Baby Alpaca fiber, it''s remarkably soft to the touch and gently weighted in the hand. A charming keepsake, perfect for gifting.',
  'ACC-UCHUYHUACAYA',
  NULL,
  69.00,
  '100% Baby Alpaca',
  'Baby Alpaca',
  'Hand wash in cold water (max 30°C) or dry clean. Use a mild detergent, no bleach. Do not wring; dry flat, away from direct heat and sunlight. Iron on low heat if needed, inside out, with a pressing cloth. Store flat or on a wide hanger to preserve shape.',
  '["Small Huacaya"]'::jsonb,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  sku = EXCLUDED.sku,
  price = EXCLUDED.price,
  composition = EXCLUDED.composition,
  fiber = EXCLUDED.fiber,
  "careInstructions" = EXCLUDED."careInstructions",
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'HOME'::"MainCategory" AND s.name = 'Alpaca Toys'
WHERE p.name = 'Uchuy Huacaya'
ON CONFLICT DO NOTHING;

INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_ACC-UCHUYHUACAYA-WHI-20CM_86bc0477571445ae',
  p.id,
  'ACC-UCHUYHUACAYA-WHI-20CM',
  'White',
  '20cm',
  69.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Uchuy Huacaya'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_ACC-UCHUYHUACAYA-BEI-20CM_488d82770138a351',
  p.id,
  'ACC-UCHUYHUACAYA-BEI-20CM',
  'Beige',
  '20cm',
  69.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Uchuy Huacaya'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_ACC-UCHUYHUACAYA-BRO-20CM_f51cc493ea85dd70',
  p.id,
  'ACC-UCHUYHUACAYA-BRO-20CM',
  'Brown',
  '20cm',
  69.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Uchuy Huacaya'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

-- Product: Uchuy Suri
INSERT INTO "Product" (
  id, name, description, sku, section, price, composition, fiber, "careInstructions", tags, status, "createdAt", "updatedAt"
) VALUES (
  'prod_Uchuy Suri_3943b9b46f4db51d',
  'Uchuy Suri',
  'A small plush figure inspired by the silky-coated Suri alpaca, handmade with the same artisanal attention as its Huacaya sibling. Crafted from 100% Baby Alpaca fiber, it has a soft, tactile finish that invites touch. A delicate gift for alpaca lovers of any age.',
  'ACC-UCHUYSURI',
  NULL,
  79.00,
  '100% Baby Alpaca',
  'Baby Alpaca',
  'Hand wash in cold water (max 30°C) or dry clean. Use a mild detergent, no bleach. Do not wring; dry flat, away from direct heat and sunlight. Iron on low heat if needed, inside out, with a pressing cloth. Store flat or on a wide hanger to preserve shape.',
  '["Small Suri"]'::jsonb,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  sku = EXCLUDED.sku,
  price = EXCLUDED.price,
  composition = EXCLUDED.composition,
  fiber = EXCLUDED.fiber,
  "careInstructions" = EXCLUDED."careInstructions",
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'HOME'::"MainCategory" AND s.name = 'Alpaca Toys'
WHERE p.name = 'Uchuy Suri'
ON CONFLICT DO NOTHING;

INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_ACC-UCHUYSURI-WHI-20CM_2d60c08f940b41e4',
  p.id,
  'ACC-UCHUYSURI-WHI-20CM',
  'White',
  '20cm',
  79.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Uchuy Suri'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_ACC-UCHUYSURI-WHI-20CM-02_3e3c8192196853d6',
  p.id,
  'ACC-UCHUYSURI-WHI-20CM-02',
  'White',
  '20cm',
  79.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Uchuy Suri'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_ACC-UCHUYSURI-WHI-20CM-03_24ffeb8d4f5ad628',
  p.id,
  'ACC-UCHUYSURI-WHI-20CM-03',
  'White',
  '20cm',
  79.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Uchuy Suri'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

-- Product: Chaska Coat
INSERT INTO "Product" (
  id, name, description, sku, section, price, composition, fiber, "careInstructions", tags, status, "createdAt", "updatedAt"
) VALUES (
  'prod_Chaska Coat_95fdcb8af91db0ef',
  'Chaska Coat',
  'Named for a star, this suri alpaca coat is defined by a structured stand collar and a considered four-button front. Made from 40% Suri Alpaca, 55% Wool, and 5% Nylon, it holds its shape while offering a silky-warm hand. A polished outer layer with quiet presence.',
  'MAN-CHASKA',
  NULL,
  730.00,
  '40% Suri Alpaca, 55% Wool, 5% Nylon',
  'Suri Alpaca / Wool / Nylon',
  'Hand wash in cold water (max 30°C) or dry clean. Use a mild detergent, no bleach. Do not wring; dry flat, away from direct heat and sunlight. Iron on low heat if needed, inside out, with a pressing cloth. Store flat or on a wide hanger to preserve shape. Avoid repeated rubbing to limit pilling. Avoid ironing directly on synthetic fibers.',
  '["Star"]'::jsonb,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  sku = EXCLUDED.sku,
  price = EXCLUDED.price,
  composition = EXCLUDED.composition,
  fiber = EXCLUDED.fiber,
  "careInstructions" = EXCLUDED."careInstructions",
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'WOMEN'::"MainCategory" AND s.name = 'Coats'
WHERE p.name = 'Chaska Coat'
ON CONFLICT DO NOTHING;

INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_MAN-CHASKA-MIDBLA-XS_e5b69a4ee104298e',
  p.id,
  'MAN-CHASKA-MIDBLA-XS',
  'Midnight Black',
  'XS',
  730.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Chaska Coat'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_MAN-CHASKA-MIDBLA-S_a1a2ad94f63366e7',
  p.id,
  'MAN-CHASKA-MIDBLA-S',
  'Midnight Black',
  'S',
  730.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Chaska Coat'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_MAN-CHASKA-MIDBLA-M_0b77a6b3c6a014a7',
  p.id,
  'MAN-CHASKA-MIDBLA-M',
  'Midnight Black',
  'M',
  730.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Chaska Coat'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_MAN-CHASKA-MIDBLA-L_213db34b02f87e06',
  p.id,
  'MAN-CHASKA-MIDBLA-L',
  'Midnight Black',
  'L',
  730.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Chaska Coat'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

-- Product: Kallpa Pullover
INSERT INTO "Product" (
  id, name, description, sku, section, price, composition, fiber, "careInstructions", tags, status, "createdAt", "updatedAt"
) VALUES (
  'prod_Kallpa Pullover_24ae2993a2a01e22',
  'Kallpa Pullover',
  'Named for strength and energy, this men''s sweater is finished with a half-zip and stand collar for a sharper, more structured neckline. Made from 100% Baby Alpaca, it offers substantial warmth in a refined silhouette. A versatile piece for both active days and smart-casual wear.',
  'PU-KALLPA',
  NULL,
  250.00,
  '100% Baby Alpaca',
  'Baby Alpaca',
  'Hand wash in cold water (max 30°C) or dry clean. Use a mild detergent, no bleach. Do not wring; dry flat, away from direct heat and sunlight. Iron on low heat if needed, inside out, with a pressing cloth. Store flat or on a wide hanger to preserve shape.',
  '["Strength","energy"]'::jsonb,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  sku = EXCLUDED.sku,
  price = EXCLUDED.price,
  composition = EXCLUDED.composition,
  fiber = EXCLUDED.fiber,
  "careInstructions" = EXCLUDED."careInstructions",
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'MEN'::"MainCategory" AND s.name = 'Pullovers'
WHERE p.name = 'Kallpa Pullover'
ON CONFLICT DO NOTHING;

INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_PU-KALLPA-NAVBLU-S_99d68228a291cc3c',
  p.id,
  'PU-KALLPA-NAVBLU-S',
  'Navy Blue',
  'S',
  250.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Kallpa Pullover'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_PU-KALLPA-NAVBLU-M_693ce7f3d1f07801',
  p.id,
  'PU-KALLPA-NAVBLU-M',
  'Navy Blue',
  'M',
  250.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Kallpa Pullover'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_PU-KALLPA-NAVBLU-L_4ddfdc8f4596b796',
  p.id,
  'PU-KALLPA-NAVBLU-L',
  'Navy Blue',
  'L',
  250.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Kallpa Pullover'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_PU-KALLPA-NAVBLU-XL_61600223047f8edd',
  p.id,
  'PU-KALLPA-NAVBLU-XL',
  'Navy Blue',
  'XL',
  250.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Kallpa Pullover'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

-- Product: Mayu Shawl
INSERT INTO "Product" (
  id, name, description, sku, section, price, composition, fiber, "careInstructions", tags, status, "createdAt", "updatedAt"
) VALUES (
  'prod_Mayu Shawl_3539ffb5a28d9c3e',
  'Mayu Shawl',
  'Named for the river, this shawl moves with a fluid, lightweight drape that echoes flowing water. Made from 70% Baby Alpaca and 30% Silk, it combines warmth with a soft, silken sheen. An elegant wrap for evenings that call for a little more polish.',
  'CHA-MAYU',
  'Shawls',
  160.00,
  '70% Baby Alpaca, 30% Silk',
  'Baby Alpaca',
  'Hand wash in cold water (max 30°C) or dry clean. Use a mild detergent, no bleach. Do not wring; dry flat, away from direct heat and sunlight. Iron on low heat if needed, inside out, with a pressing cloth. Store flat or on a wide hanger to preserve shape. Handle with care: silk is delicate, avoid contact with perfume and chemical products.',
  '["River"]'::jsonb,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  sku = EXCLUDED.sku,
  price = EXCLUDED.price,
  composition = EXCLUDED.composition,
  fiber = EXCLUDED.fiber,
  "careInstructions" = EXCLUDED."careInstructions",
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'WOMEN'::"MainCategory" AND s.name = 'Shawls / Scarfs'
WHERE p.name = 'Mayu Shawl'
ON CONFLICT DO NOTHING;

INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_CHA-MAYU-NAVBLU-200184X70 CM_f6251cdf660424f2',
  p.id,
  'CHA-MAYU-NAVBLU-200184X70 CM',
  'Navy Blue',
  '200/184x70 cm',
  160.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Mayu Shawl'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_CHA-MAYU-CAM-200184X70 CM_49dd267442370182',
  p.id,
  'CHA-MAYU-CAM-200184X70 CM',
  'Camel',
  '200/184x70 cm',
  160.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Mayu Shawl'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_CHA-MAYU-MIDBLA-200184X70 CM_75e1c61641cf8faa',
  p.id,
  'CHA-MAYU-MIDBLA-200184X70 CM',
  'Midnight Black',
  '200/184x70 cm',
  160.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Mayu Shawl'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_CHA-MAYU-SILGRE-200184X70 CM_6049ecb2d38fcbd9',
  p.id,
  'CHA-MAYU-SILGRE-200184X70 CM',
  'Silver Grey',
  '200/184x70 cm',
  160.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Mayu Shawl'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

-- Product: Manteau Uma
INSERT INTO "Product" (
  id, name, description, sku, section, price, composition, fiber, "careInstructions", tags, status, "createdAt", "updatedAt"
) VALUES (
  'prod_Manteau Uma_aa69c498e0783524',
  'Manteau Uma',
  'Named for the head, this tailored coat commands attention with a structured cut and a considered silhouette. Made from 74% Suri Alpaca, 24% Wool, and 2% Nylon, it combines the sheen of Suri fiber with lasting warmth. An investment coat built to anchor a wardrobe.',
  'MAN-UMA',
  NULL,
  1200.00,
  '74% Suri Alpaca, 24% Wool, 2% Nylon',
  'Baby Alpaca',
  'Hand wash in cold water (max 30°C) or dry clean. Use a mild detergent, no bleach. Do not wring; dry flat, away from direct heat and sunlight. Iron on low heat if needed, inside out, with a pressing cloth. Store flat or on a wide hanger to preserve shape. Avoid ironing directly on synthetic fibers.',
  '["Head"]'::jsonb,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  sku = EXCLUDED.sku,
  price = EXCLUDED.price,
  composition = EXCLUDED.composition,
  fiber = EXCLUDED.fiber,
  "careInstructions" = EXCLUDED."careInstructions",
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'WOMEN'::"MainCategory" AND s.name = 'Coats'
WHERE p.name = 'Manteau Uma'
ON CONFLICT DO NOTHING;

INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_MAN-UMA-IVO-XS_5542134cfd9da30e',
  p.id,
  'MAN-UMA-IVO-XS',
  'Ivory',
  'XS',
  1200.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Manteau Uma'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_MAN-UMA-IVO-S_e592b920995aefa6',
  p.id,
  'MAN-UMA-IVO-S',
  'Ivory',
  'S',
  1200.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Manteau Uma'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_MAN-UMA-IVO-M_ed2d29e4fcf2bd17',
  p.id,
  'MAN-UMA-IVO-M',
  'Ivory',
  'M',
  1200.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Manteau Uma'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_MAN-UMA-IVO-L_5b2a845f4a4758a4',
  p.id,
  'MAN-UMA-IVO-L',
  'Ivory',
  'L',
  1200.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Manteau Uma'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_MAN-UMA-CAM-XS_e4ac22f2661c72f1',
  p.id,
  'MAN-UMA-CAM-XS',
  'Camel',
  'XS',
  1200.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Manteau Uma'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_MAN-UMA-CAM-S_fed636ce6b40bdec',
  p.id,
  'MAN-UMA-CAM-S',
  'Camel',
  'S',
  1200.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Manteau Uma'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_MAN-UMA-CAM-M_525787d12b0c2cc0',
  p.id,
  'MAN-UMA-CAM-M',
  'Camel',
  'M',
  1200.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Manteau Uma'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_MAN-UMA-CAM-L_fa0c0b1effb6c1b1',
  p.id,
  'MAN-UMA-CAM-L',
  'Camel',
  'L',
  1200.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Manteau Uma'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_MAN-UMA-BLA-XS_f3f4fd387b54a4aa',
  p.id,
  'MAN-UMA-BLA-XS',
  'Black',
  'XS',
  1200.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Manteau Uma'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_MAN-UMA-BLA-S_ef6bb3e59c98a665',
  p.id,
  'MAN-UMA-BLA-S',
  'Black',
  'S',
  1200.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Manteau Uma'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_MAN-UMA-BLA-M_644e1246efd92e23',
  p.id,
  'MAN-UMA-BLA-M',
  'Black',
  'M',
  1200.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Manteau Uma'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_MAN-UMA-BLA-L_f30c4dd98d00e1c6',
  p.id,
  'MAN-UMA-BLA-L',
  'Black',
  'L',
  1200.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Manteau Uma'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

-- Product: Kuntur Coat
INSERT INTO "Product" (
  id, name, description, sku, section, price, composition, fiber, "careInstructions", tags, status, "createdAt", "updatedAt"
) VALUES (
  'prod_Kuntur Coat_4bcf7f10c53b0eeb',
  'Kuntur Coat',
  'Named for the condor, this men''s coat is cut with a tailored, structured silhouette befitting its namesake. Made from 67% Baby Alpaca, 31% Wool, and 2% Nylon, it offers substantial warmth with a refined drape. A commanding outer layer for cold-weather days.',
  'MAN-KUNTUR',
  NULL,
  700.00,
  '67% Baby Alpaca, 31% Wool, 2% Nylon',
  'Baby Alpaca',
  'Hand wash in cold water (max 30°C) or dry clean. Use a mild detergent, no bleach. Do not wring; dry flat, away from direct heat and sunlight. Iron on low heat if needed, inside out, with a pressing cloth. Store flat or on a wide hanger to preserve shape. Avoid ironing directly on synthetic fibers.',
  '["Condor"]'::jsonb,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  sku = EXCLUDED.sku,
  price = EXCLUDED.price,
  composition = EXCLUDED.composition,
  fiber = EXCLUDED.fiber,
  "careInstructions" = EXCLUDED."careInstructions",
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'MEN'::"MainCategory" AND s.name = 'Coats'
WHERE p.name = 'Kuntur Coat'
ON CONFLICT DO NOTHING;

INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_MAN-KUNTUR-CAM-S_a711785be615cece',
  p.id,
  'MAN-KUNTUR-CAM-S',
  'Camel',
  'S',
  700.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Kuntur Coat'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_MAN-KUNTUR-CAM-M_e91a2e9800f17f65',
  p.id,
  'MAN-KUNTUR-CAM-M',
  'Camel',
  'M',
  700.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Kuntur Coat'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_MAN-KUNTUR-CAM-L_fc205bdc4b74aca6',
  p.id,
  'MAN-KUNTUR-CAM-L',
  'Camel',
  'L',
  700.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Kuntur Coat'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

-- Product: Top Kancha
INSERT INTO "Product" (
  id, name, description, sku, section, price, composition, fiber, "careInstructions", tags, status, "createdAt", "updatedAt"
) VALUES (
  'prod_Top Kancha_e6fb63c033227741',
  'Top Kancha',
  'Named for filtered light and clarity, this top is cut in a lightweight, fluid silhouette that lets the fabric move freely. Made from a 50% Cotton, 50% Viscose blend, it offers soft, breathable comfort. An easy layering piece for warm-weather days.',
  'TOP-KANCHA',
  NULL,
  99.00,
  '50% Cotton, 50% Viscose',
  'Organic Cotton',
  'Machine wash at 30°C, delicate cycle, with similar colors. Do not use bleach. Dry flat or line dry in shade; avoid the tumble dryer. Iron on low-medium heat if needed.',
  '["Filtered light","clarity"]'::jsonb,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  sku = EXCLUDED.sku,
  price = EXCLUDED.price,
  composition = EXCLUDED.composition,
  fiber = EXCLUDED.fiber,
  "careInstructions" = EXCLUDED."careInstructions",
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'WOMEN'::"MainCategory" AND s.name = 'Tops'
WHERE p.name = 'Top Kancha'
ON CONFLICT DO NOTHING;

INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_TOP-KANCHA-ECR-S_673bdea3227b6868',
  p.id,
  'TOP-KANCHA-ECR-S',
  'Ecru',
  'S',
  99.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Top Kancha'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_TOP-KANCHA-ECR-M_2b740a39aeb58d35',
  p.id,
  'TOP-KANCHA-ECR-M',
  'Ecru',
  'M',
  99.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Top Kancha'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_TOP-KANCHA-ECR-L_7b778ed5a3bb73ae',
  p.id,
  'TOP-KANCHA-ECR-L',
  'Ecru',
  'L',
  99.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Top Kancha'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_TOP-KANCHA-PALGRE-S_7faf803a2337da88',
  p.id,
  'TOP-KANCHA-PALGRE-S',
  'Pale Green',
  'S',
  99.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Top Kancha'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_TOP-KANCHA-PALGRE-M_b820da1c4b622b84',
  p.id,
  'TOP-KANCHA-PALGRE-M',
  'Pale Green',
  'M',
  99.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Top Kancha'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_TOP-KANCHA-PALGRE-L_415aef3f5283bbb9',
  p.id,
  'TOP-KANCHA-PALGRE-L',
  'Pale Green',
  'L',
  99.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Top Kancha'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_TOP-KANCHA-RASPUR-S_94381637e50032ac',
  p.id,
  'TOP-KANCHA-RASPUR-S',
  'Raspberry Purple',
  'S',
  99.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Top Kancha'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_TOP-KANCHA-RASPUR-M_1a5f8ad5c54bec4c',
  p.id,
  'TOP-KANCHA-RASPUR-M',
  'Raspberry Purple',
  'M',
  99.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Top Kancha'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_TOP-KANCHA-RASPUR-L_9665852b62ffc0cd',
  p.id,
  'TOP-KANCHA-RASPUR-L',
  'Raspberry Purple',
  'L',
  99.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Top Kancha'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_TOP-KANCHA-BABBLU-S_3eab6eb898972273',
  p.id,
  'TOP-KANCHA-BABBLU-S',
  'Baby Blue',
  'S',
  99.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Top Kancha'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_TOP-KANCHA-BABBLU-M_7bb17dffd2afdf31',
  p.id,
  'TOP-KANCHA-BABBLU-M',
  'Baby Blue',
  'M',
  99.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Top Kancha'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_TOP-KANCHA-BABBLU-L_f0f193c915bb2eb5',
  p.id,
  'TOP-KANCHA-BABBLU-L',
  'Baby Blue',
  'L',
  99.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Top Kancha'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

-- Product: Cardigan Punchaw
INSERT INTO "Product" (
  id, name, description, sku, section, price, composition, fiber, "careInstructions", tags, status, "createdAt", "updatedAt"
) VALUES (
  'prod_Cardigan Punchaw_3bcf31d64d1457e0',
  'Cardigan Punchaw',
  'Named for the day and the sun''s gentle warmth, this cardigan is knit in a light, easy-to-layer silhouette. Made from a 50% Cotton, 50% Viscose blend, it offers a soft drape without added weight. A gentle layer for mild days and cool evenings alike.',
  'CAR-PUNCHAW',
  NULL,
  150.00,
  '50% Cotton, 50% Viscose',
  'Organic Cotton',
  'Machine wash at 30°C, delicate cycle, with similar colors. Do not use bleach. Dry flat or line dry in shade; avoid the tumble dryer. Iron on low-medium heat if needed.',
  '["The day","the gentle warmth of the sun"]'::jsonb,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  sku = EXCLUDED.sku,
  price = EXCLUDED.price,
  composition = EXCLUDED.composition,
  fiber = EXCLUDED.fiber,
  "careInstructions" = EXCLUDED."careInstructions",
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'WOMEN'::"MainCategory" AND s.name = 'Cardigans'
WHERE p.name = 'Cardigan Punchaw'
ON CONFLICT DO NOTHING;

INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_CAR-PUNCHAW-ECR-S_26807510450e321a',
  p.id,
  'CAR-PUNCHAW-ECR-S',
  'Ecru',
  'S',
  150.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Cardigan Punchaw'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_CAR-PUNCHAW-ECR-M_e8d6f8689010a20f',
  p.id,
  'CAR-PUNCHAW-ECR-M',
  'Ecru',
  'M',
  150.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Cardigan Punchaw'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_CAR-PUNCHAW-ECR-L_6bed3d4119ae2e30',
  p.id,
  'CAR-PUNCHAW-ECR-L',
  'Ecru',
  'L',
  150.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Cardigan Punchaw'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_CAR-PUNCHAW-PALGRE-S_df2c5ad7444f8b12',
  p.id,
  'CAR-PUNCHAW-PALGRE-S',
  'Pale Green',
  'S',
  150.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Cardigan Punchaw'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_CAR-PUNCHAW-PALGRE-M_d783680a70178d88',
  p.id,
  'CAR-PUNCHAW-PALGRE-M',
  'Pale Green',
  'M',
  150.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Cardigan Punchaw'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_CAR-PUNCHAW-PALGRE-L_3fc531dc7800f729',
  p.id,
  'CAR-PUNCHAW-PALGRE-L',
  'Pale Green',
  'L',
  150.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Cardigan Punchaw'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_CAR-PUNCHAW-RASPUR-S_864e52cfff6f2bc1',
  p.id,
  'CAR-PUNCHAW-RASPUR-S',
  'Raspberry Purple',
  'S',
  150.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Cardigan Punchaw'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_CAR-PUNCHAW-RASPUR-M_de50d317a4ae508d',
  p.id,
  'CAR-PUNCHAW-RASPUR-M',
  'Raspberry Purple',
  'M',
  150.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Cardigan Punchaw'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_CAR-PUNCHAW-RASPUR-L_defb0791162a61dd',
  p.id,
  'CAR-PUNCHAW-RASPUR-L',
  'Raspberry Purple',
  'L',
  150.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Cardigan Punchaw'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_CAR-PUNCHAW-BABBLU-S_1f3872f9c59cca4c',
  p.id,
  'CAR-PUNCHAW-BABBLU-S',
  'Baby Blue',
  'S',
  150.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Cardigan Punchaw'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_CAR-PUNCHAW-BABBLU-M_ecf0c06ecbbfcd5b',
  p.id,
  'CAR-PUNCHAW-BABBLU-M',
  'Baby Blue',
  'M',
  150.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Cardigan Punchaw'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_CAR-PUNCHAW-BABBLU-L_18c2e7d72b6b9875',
  p.id,
  'CAR-PUNCHAW-BABBLU-L',
  'Baby Blue',
  'L',
  150.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Cardigan Punchaw'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

-- Product: Chanka Hat
INSERT INTO "Product" (
  id, name, description, sku, section, price, composition, fiber, "careInstructions", tags, status, "createdAt", "updatedAt"
) VALUES (
  'prod_Chanka Hat_a2b3bb77d80a4dd3',
  'Chanka Hat',
  'Named for a pre-Inca people from the Ayacucho region, this hat holds a structured, considered silhouette. Made from 100% Baby Alpaca, it offers substantial warmth in a refined shape. A hat with history woven into its very name.',
  'BON-CHANKA',
  NULL,
  375.00,
  '100% Baby Alpaca',
  'Baby Alpaca',
  'Hand wash in cold water (max 30°C) or dry clean. Use a mild detergent, no bleach. Do not wring; dry flat, away from direct heat and sunlight. Iron on low heat if needed, inside out, with a pressing cloth. Store flat or on a wide hanger to preserve shape.',
  '["A pre-Inca ethnic group from the Ayacucho region"]'::jsonb,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  sku = EXCLUDED.sku,
  price = EXCLUDED.price,
  composition = EXCLUDED.composition,
  fiber = EXCLUDED.fiber,
  "careInstructions" = EXCLUDED."careInstructions",
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'MEN'::"MainCategory" AND s.name = 'Headwears'
WHERE p.name = 'Chanka Hat'
ON CONFLICT DO NOTHING;
INSERT INTO "ProductSubcategory" ("productId", "subcategoryId")
SELECT p.id, s.id
FROM "Product" p
JOIN "Subcategory" s ON s."mainCategory" = 'WOMEN'::"MainCategory" AND s.name = 'Headwears'
WHERE p.name = 'Chanka Hat'
ON CONFLICT DO NOTHING;

INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_BON-CHANKA-56_c23b712de77f975e',
  p.id,
  'BON-CHANKA-56',
  'Beige',
  '56',
  375.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Chanka Hat'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_BON-CHANKA-57_36a6b7807f2cd6e5',
  p.id,
  'BON-CHANKA-57',
  'Beige',
  '57',
  375.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Chanka Hat'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_BON-CHANKA-58_97f6a20eae44313d',
  p.id,
  'BON-CHANKA-58',
  'Beige',
  '58',
  375.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Chanka Hat'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();
INSERT INTO "ProductVariant" (
  id, "productId", sku, color, size, price, status, "createdAt", "updatedAt"
)
SELECT
  'var_BON-CHANKA-59_c355901e56b10c03',
  p.id,
  'BON-CHANKA-59',
  'Beige',
  '59',
  375.00,
  'ACTIVE'::"ProductStatus",
  NOW(),
  NOW()
FROM "Product" p
WHERE p.name = 'Chanka Hat'
ON CONFLICT (sku) DO UPDATE SET
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  status = EXCLUDED.status,
  "updatedAt" = NOW();

COMMIT;