-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_customerId_fkey`;

-- AlterTable
ALTER TABLE `Inventory` ADD COLUMN `reorderPoint` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Order` ADD COLUMN `channel` ENUM('ONLINE', 'IN_STORE') NOT NULL DEFAULT 'ONLINE',
    ADD COLUMN `storeLocation` VARCHAR(191) NULL,
    MODIFY `customerId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Warehouse` ADD COLUMN `location` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `InventoryImport` (
    `id` VARCHAR(191) NOT NULL,
    `warehouseId` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(191) NOT NULL,
    `rowCount` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'completed',
    `importedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `importedBy` VARCHAR(191) NULL,

    INDEX `InventoryImport_warehouseId_idx`(`warehouseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Order_channel_idx` ON `Order`(`channel`);

-- CreateIndex
CREATE INDEX `Order_storeLocation_idx` ON `Order`(`storeLocation`);

-- AddForeignKey
ALTER TABLE `InventoryImport` ADD CONSTRAINT `InventoryImport_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
