-- AlterTable
ALTER TABLE `clanwar` ADD COLUMN `discipline_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `clanwar` ADD CONSTRAINT `clanwar_discipline_id_fkey` FOREIGN KEY (`discipline_id`) REFERENCES `discipline`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
