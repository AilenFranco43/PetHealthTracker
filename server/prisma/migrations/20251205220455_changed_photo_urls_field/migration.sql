/*
  Warnings:

  - You are about to drop the column `photo_urls` on the `Pet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "photo_urls",
ADD COLUMN     "photo_url" TEXT;
