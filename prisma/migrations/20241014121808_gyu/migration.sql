-- AlterTable
ALTER TABLE `TransferPair` MODIFY `transferDate` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `EmployeeIdCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `companyName` VARCHAR(191) NOT NULL,
    `workingArea` VARCHAR(191) NOT NULL,
    `contactNo` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `employeeIdNo` VARCHAR(191) NOT NULL,
    `employeePhoto` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `EmployeeIdCard_employeeIdNo_key`(`employeeIdNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EmployeeIdCard` ADD CONSTRAINT `EmployeeIdCard_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
