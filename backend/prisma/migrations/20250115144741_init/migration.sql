/*
  Warnings:

  - Added the required column `year` to the `Participation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participation" ADD COLUMN     "year" TEXT NOT NULL;
