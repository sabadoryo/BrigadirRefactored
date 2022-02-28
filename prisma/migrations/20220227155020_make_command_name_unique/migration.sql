/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `commands` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `commands_name_key` ON `commands`(`name`);
