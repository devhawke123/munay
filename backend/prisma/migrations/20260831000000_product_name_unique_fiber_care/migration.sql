-- DropIndex
DROP INDEX `Product_sku_key` ON `Product`;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `careInstructions` VARCHAR(191) NULL,
    ADD COLUMN `fiber` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Product_name_key` ON `Product`(`name`);
