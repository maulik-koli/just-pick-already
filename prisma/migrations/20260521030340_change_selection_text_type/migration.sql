/*
  Warnings:

  - Made the column `selectedOptionText` on table `answers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "answers" ALTER COLUMN "selectedOptionText" SET NOT NULL;
