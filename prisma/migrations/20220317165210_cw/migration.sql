/*
  Warnings:

  - A unique constraint covering the columns `[user_id,discipline_id]` on the table `clanwar_profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `clanwar_profile_user_id_discipline_id_key` ON `clanwar_profile`(`user_id`, `discipline_id`);
