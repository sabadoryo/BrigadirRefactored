-- AlterTable
ALTER TABLE `clanwar` ADD COLUMN `pog_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `clanwar` ADD CONSTRAINT `clanwar_pog_id_fkey` FOREIGN KEY (`pog_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
