/*
  Warnings:

  - You are about to drop the `Halyava` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[winner_id]` on the table `clanwar` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `winner_id` to the `clanwar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Halyava` DROP FOREIGN KEY `Halyava_looterId_fkey`;

-- AlterTable
ALTER TABLE `clanwar` ADD COLUMN `winner_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Halyava`;

-- CreateTable
CREATE TABLE `discipline` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `discipline_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clanwar_profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `discipline_id` INTEGER NOT NULL,
    `points` INTEGER NOT NULL DEFAULT 1000,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `halyava` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `looterId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `clanwar_winner_id_key` ON `clanwar`(`winner_id`);

-- AddForeignKey
ALTER TABLE `clanwar_profile` ADD CONSTRAINT `clanwar_profile_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clanwar_profile` ADD CONSTRAINT `clanwar_profile_discipline_id_fkey` FOREIGN KEY (`discipline_id`) REFERENCES `discipline`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `halyava` ADD CONSTRAINT `halyava_looterId_fkey` FOREIGN KEY (`looterId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clanwar` ADD CONSTRAINT `clanwar_winner_id_fkey` FOREIGN KEY (`winner_id`) REFERENCES `team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
