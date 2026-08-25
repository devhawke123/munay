-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `country` VARCHAR(191) NULL,
    ADD COLUMN `state` VARCHAR(191) NULL;

-- RedefineIndex
CREATE UNIQUE INDEX `Order_orderNumber_key` ON `Order`(`orderNumber`);
DROP INDEX `orderNumber` ON `Order`;

