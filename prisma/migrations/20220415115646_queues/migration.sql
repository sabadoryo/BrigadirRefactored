/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Queue` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Queue_name_key` ON `Queue`(`name`);
