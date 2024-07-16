/*
  Warnings:

  - Added the required column `user_id` to the `ItemModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemModel" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ItemModel" ADD CONSTRAINT "ItemModel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
