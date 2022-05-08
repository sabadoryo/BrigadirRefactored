/*
  Warnings:

  - A unique constraint covering the columns `[queue_id]` on the table `clanwar` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `clanwar` ADD COLUMN `queue_id` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `clanwar_queue_id_key` ON `clanwar`(`queue_id`);

-- AddForeignKey
ALTER TABLE `clanwar` ADD CONSTRAINT `clanwar_queue_id_fkey` FOREIGN KEY (`queue_id`) REFERENCES `Queue`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
