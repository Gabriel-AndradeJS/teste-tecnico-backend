/*
  Warnings:

  - You are about to drop the column `text` on the `Option` table. All the data in the column will be lost.
  - Added the required column `name` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_pollId_fkey";

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "text",
ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Polls"("id") ON DELETE CASCADE ON UPDATE CASCADE;
