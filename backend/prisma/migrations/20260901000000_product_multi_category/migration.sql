-- CreateTable
CREATE TABLE `ProductSubcategory` (
    `productId` VARCHAR(191) NOT NULL,
    `subcategoryId` VARCHAR(191) NOT NULL,

    INDEX `ProductSubcategory_subcategoryId_idx`(`subcategoryId`),
    PRIMARY KEY (`productId`, `subcategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductSubcategory` ADD CONSTRAINT `ProductSubcategory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductSubcategory` ADD CONSTRAINT `ProductSubcategory_subcategoryId_fkey` FOREIGN KEY (`subcategoryId`) REFERENCES `Subcategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- Backfill: one membership row per existing product, from its current subcategoryId,
-- BEFORE the column is dropped below — so no product ever has zero memberships.
INSERT INTO `ProductSubcategory` (`productId`, `subcategoryId`)
SELECT `id`, `subcategoryId` FROM `Product`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_subcategoryId_fkey`;

-- DropIndex
DROP INDEX `Product_subcategoryId_idx` ON `Product`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `subcategoryId`;
