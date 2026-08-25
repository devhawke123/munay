-- DropIndex
DROP INDEX `Product_categoryId_idx` ON `Product`;

-- AlterTable
ALTER TABLE `Product`
    DROP COLUMN `categoryId`,
    ADD COLUMN `sku` VARCHAR(191) NOT NULL,
    ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `subcategory` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ProductVariant`
    DROP COLUMN `variantName`,
    ADD COLUMN `color` VARCHAR(191) NOT NULL,
    ADD COLUMN `size` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Product_sku_key` ON `Product`(`sku`);

-- CreateIndex
CREATE INDEX `Product_category_idx` ON `Product`(`category`);

-- CreateIndex
CREATE INDEX `Product_subcategory_idx` ON `Product`(`subcategory`);
