/*
  Warnings:

  - You are about to drop the column `amount` on the `QueueMember` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Queue` ADD COLUMN `amount` INTEGER NULL;

-- AlterTable
ALTER TABLE `QueueMember` DROP COLUMN `amount`;
