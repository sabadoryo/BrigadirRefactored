-- DropIndex
DROP INDEX `Queue_name_key` ON `Queue`;

-- AlterTable
ALTER TABLE `Queue` MODIFY `name` VARCHAR(191) NULL DEFAULT 'null';
