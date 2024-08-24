-- AlterTable
ALTER TABLE "UserModel" ADD COLUMN     "telegram_user_id" INTEGER,
ADD COLUMN     "telegram_user_name" TEXT,
ALTER COLUMN "login" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;
