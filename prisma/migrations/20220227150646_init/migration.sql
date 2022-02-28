/*
  Warnings:

  - You are about to drop the column `bet_amount` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `bet_for` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `have_bet` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `steam_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Halyava` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HalyavaClicker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `call_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `calls` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Halyava` DROP FOREIGN KEY `Halyava_looterId_fkey`;

-- DropForeignKey
ALTER TABLE `call_user` DROP FOREIGN KEY `call_user_callId_fkey`;

-- DropForeignKey
ALTER TABLE `call_user` DROP FOREIGN KEY `call_user_userId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `bet_amount`,
    DROP COLUMN `bet_for`,
    DROP COLUMN `have_bet`,
    DROP COLUMN `steam_id`;

-- DropTable
DROP TABLE `Halyava`;

-- DropTable
DROP TABLE `HalyavaClicker`;

-- DropTable
DROP TABLE `call_user`;

-- DropTable
DROP TABLE `calls`;
