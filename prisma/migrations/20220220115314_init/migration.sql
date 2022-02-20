-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `discord_score` INTEGER NOT NULL DEFAULT 0,
    `discord_id` VARCHAR(191) NOT NULL DEFAULT '',
    `steam_id` VARCHAR(191) NOT NULL DEFAULT '',
    `have_bet` BOOLEAN NOT NULL DEFAULT false,
    `bet_amount` INTEGER NOT NULL DEFAULT 0,
    `bet_for` VARCHAR(191) NOT NULL DEFAULT '',

    UNIQUE INDEX `users_discord_id_key`(`discord_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `calls` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `user_amount_limit` INTEGER NOT NULL DEFAULT 0,
    `cur_user_amount` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Halyava` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `looterId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `call_user` (
    `callId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`callId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HalyavaClicker` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `total_clicks` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Halyava` ADD CONSTRAINT `Halyava_looterId_fkey` FOREIGN KEY (`looterId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `call_user` ADD CONSTRAINT `call_user_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `call_user` ADD CONSTRAINT `call_user_callId_fkey` FOREIGN KEY (`callId`) REFERENCES `calls`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
