-- AlterTable
ALTER TABLE "Reminder" ADD COLUMN     "times" TEXT[],
ALTER COLUMN "date" DROP NOT NULL;
