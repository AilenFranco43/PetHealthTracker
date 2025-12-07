/*
  Warnings:

  - Made the column `date` on table `Reminder` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Reminder" ALTER COLUMN "date" SET NOT NULL;
