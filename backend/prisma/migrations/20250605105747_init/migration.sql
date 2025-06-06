/*
  Warnings:

  - You are about to drop the column `attendees` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `purpose` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `Name` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "attendees",
DROP COLUMN "date",
DROP COLUMN "purpose",
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "detail" TEXT;
