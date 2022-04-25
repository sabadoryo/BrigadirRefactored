/*
  Warnings:

  - You are about to drop the column `host_id` on the `Queue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Queue` DROP FOREIGN KEY `Queue_host_id_fkey`;

-- AlterTable
ALTER TABLE `Queue` DROP COLUMN `host_id`;
