/*
  Warnings:

  - You are about to alter the column `score` on the `UserFavoriteGenres` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `UserFavoriteGenres` MODIFY `score` INTEGER NOT NULL DEFAULT 0;
