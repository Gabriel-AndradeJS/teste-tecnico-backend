/*
  Warnings:

  - Added the required column `category` to the `Polls` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Polls" ADD COLUMN     "category" TEXT NOT NULL;
