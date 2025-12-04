/*
  Warnings:

  - The values [DESPARASITACION_INTERNA,DESPARASITACION_EXTERNA,VISITA,ANALISIS,OTRO] on the enum `HealthRecordType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "HealthRecordType_new" AS ENUM ('VACUNA', 'CHEQUEO', 'TRATAMIENTO');
ALTER TABLE "HealthRecord" ALTER COLUMN "type" TYPE "HealthRecordType_new" USING ("type"::text::"HealthRecordType_new");
ALTER TYPE "HealthRecordType" RENAME TO "HealthRecordType_old";
ALTER TYPE "HealthRecordType_new" RENAME TO "HealthRecordType";
DROP TYPE "public"."HealthRecordType_old";
COMMIT;

-- AlterEnum
ALTER TYPE "ReminderType" ADD VALUE 'TRATAMIENTO';

-- AlterTable
ALTER TABLE "Reminder" ADD COLUMN     "is_urgent" BOOLEAN NOT NULL DEFAULT false;
