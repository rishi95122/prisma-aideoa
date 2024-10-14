-- CreateTable
CREATE TABLE `TransferRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `aideoaIdNo` VARCHAR(191) NOT NULL,
    `mobileNumber` VARCHAR(191) NOT NULL,
    `currentSubsidiary` VARCHAR(191) NOT NULL,
    `currentMinesName` VARCHAR(191) NOT NULL,
    `grade` VARCHAR(191) NOT NULL,
    `preferredTransferSubsidiary` VARCHAR(191) NOT NULL,
    `preferredTransferMine` VARCHAR(191) NOT NULL,
    `preferredTransferArea` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TransferRequest` ADD CONSTRAINT `TransferRequest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
