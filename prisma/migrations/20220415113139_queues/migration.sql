-- CreateTable
CREATE TABLE `Queue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `discipline_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QueueMember` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `member_id` INTEGER NOT NULL,
    `queue_id` INTEGER NOT NULL,
    `amount` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Queue` ADD CONSTRAINT `Queue_discipline_id_fkey` FOREIGN KEY (`discipline_id`) REFERENCES `discipline`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QueueMember` ADD CONSTRAINT `QueueMember_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QueueMember` ADD CONSTRAINT `QueueMember_queue_id_fkey` FOREIGN KEY (`queue_id`) REFERENCES `Queue`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
