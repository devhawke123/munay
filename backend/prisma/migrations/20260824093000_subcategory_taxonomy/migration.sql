-- DropIndex
DROP INDEX `Product_category_idx` ON `Product`;

-- DropIndex
DROP INDEX `Product_subcategory_idx` ON `Product`;

-- CreateTable
CREATE TABLE `Subcategory` (
    `id` VARCHAR(191) NOT NULL,
    `mainCategory` ENUM('MEN', 'WOMEN', 'HOME') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `group` VARCHAR(191) NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Subcategory_mainCategory_idx`(`mainCategory`),
    UNIQUE INDEX `Subcategory_mainCategory_name_key`(`mainCategory`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AlterTable
ALTER TABLE `Product`
    DROP COLUMN `category`,
    DROP COLUMN `subcategory`,
    ADD COLUMN `subcategoryId` VARCHAR(191) NOT NULL,
    ADD COLUMN `section` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Product_subcategoryId_idx` ON `Product`(`subcategoryId`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_subcategoryId_fkey` FOREIGN KEY (`subcategoryId`) REFERENCES `Subcategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
