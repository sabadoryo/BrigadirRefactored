-- DropIndex
DROP INDEX `Queue_name_key` ON `Queue`;

-- AlterTable
ALTER TABLE `Queue` ADD COLUMN `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `name` VARCHAR(191) NULL DEFAULT 'null';
