/*
  Warnings:

  - You are about to drop the `Party` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PartyMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Party` DROP FOREIGN KEY `Party_discipline_id_fkey`;

-- DropForeignKey
ALTER TABLE `Party` DROP FOREIGN KEY `Party_leader_id_fkey`;

-- DropForeignKey
ALTER TABLE `PartyMember` DROP FOREIGN KEY `PartyMember_member_id_fkey`;

-- DropForeignKey
ALTER TABLE `PartyMember` DROP FOREIGN KEY `PartyMember_party_id_fkey`;

-- DropTable
DROP TABLE `Party`;

-- DropTable
DROP TABLE `PartyMember`;

-- CreateTable
CREATE TABLE `party` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `discipline_id` INTEGER NULL,
    `leader_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `party_members` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `member_id` INTEGER NOT NULL,
    `party_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `party` ADD CONSTRAINT `party_leader_id_fkey` FOREIGN KEY (`leader_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `party` ADD CONSTRAINT `party_discipline_id_fkey` FOREIGN KEY (`discipline_id`) REFERENCES `discipline`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `party_members` ADD CONSTRAINT `party_members_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `party_members` ADD CONSTRAINT `party_members_party_id_fkey` FOREIGN KEY (`party_id`) REFERENCES `party`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
