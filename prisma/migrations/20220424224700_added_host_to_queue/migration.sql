-- AlterTable
ALTER TABLE `Queue` ADD COLUMN `host_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Queue` ADD CONSTRAINT `Queue_host_id_fkey` FOREIGN KEY (`host_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
