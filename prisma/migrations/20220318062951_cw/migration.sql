-- DropForeignKey
ALTER TABLE `clanwar` DROP FOREIGN KEY `clanwar_winner_id_fkey`;

-- AlterTable
ALTER TABLE `clanwar` MODIFY `winner_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `clanwar` ADD CONSTRAINT `clanwar_winner_id_fkey` FOREIGN KEY (`winner_id`) REFERENCES `team`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
