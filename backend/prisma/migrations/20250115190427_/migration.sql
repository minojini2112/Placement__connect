/*
  Warnings:

  - Made the column `batch` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "batch" SET NOT NULL,
ALTER COLUMN "image" SET DEFAULT 'null';
