-- AlterTable
ALTER TABLE `Party` ADD COLUMN `leader_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Party` ADD CONSTRAINT `Party_leader_id_fkey` FOREIGN KEY (`leader_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
