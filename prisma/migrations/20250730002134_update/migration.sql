/*
  Warnings:

  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Size" ADD VALUE 'XXXL';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "name";
