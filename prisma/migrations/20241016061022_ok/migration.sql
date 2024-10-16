/*
  Warnings:

  - Added the required column `designationType` to the `TransferRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TransferRequest` ADD COLUMN `designationType` VARCHAR(191) NOT NULL;
