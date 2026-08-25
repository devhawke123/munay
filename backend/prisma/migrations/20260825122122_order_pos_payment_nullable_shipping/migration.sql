-- AlterTable
ALTER TABLE `Order` ADD COLUMN `paymentMethod` VARCHAR(191) NULL,
    ADD COLUMN `posTransactionId` VARCHAR(191) NULL,
    MODIFY `shippingCost` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    MODIFY `shippingFullName` VARCHAR(191) NULL,
    MODIFY `shippingLine1` VARCHAR(191) NULL,
    MODIFY `shippingCity` VARCHAR(191) NULL,
    MODIFY `shippingPostalCode` VARCHAR(191) NULL,
    MODIFY `shippingCountry` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Order_posTransactionId_key` ON `Order`(`posTransactionId`);

