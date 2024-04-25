/*
  Warnings:

  - You are about to drop the column `substation_id` on the `feeder` table. All the data in the column will be lost.
  - Added the required column `substation` to the `feeder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "feeder" DROP CONSTRAINT "feeder_substation_id_fkey";

-- AlterTable
ALTER TABLE "feeder" DROP COLUMN "substation_id",
ADD COLUMN     "substation" VARCHAR(100) NOT NULL;
