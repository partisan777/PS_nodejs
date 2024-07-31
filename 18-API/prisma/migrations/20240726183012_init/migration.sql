-- CreateTable
CREATE TABLE "UserModel" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "object_status_id" INTEGER NOT NULL,
    "user_role_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRoleModel" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRoleModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObjectStatusModel" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ObjectStatusModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "item_type_id" INTEGER NOT NULL,
    "object_status_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItemModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemTypeModel" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "object_status_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItemTypeModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "discoutn_percent" DECIMAL(65,30) NOT NULL,
    "object_status_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromotionModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WarehouseBalanceModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "item_id" INTEGER NOT NULL,
    "object_status_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WarehouseBalanceModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WarehouseBalanceModel_item_id_key" ON "WarehouseBalanceModel"("item_id");

-- AddForeignKey
ALTER TABLE "UserModel" ADD CONSTRAINT "UserModel_object_status_id_fkey" FOREIGN KEY ("object_status_id") REFERENCES "ObjectStatusModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserModel" ADD CONSTRAINT "UserModel_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "UserRoleModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemModel" ADD CONSTRAINT "ItemModel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemModel" ADD CONSTRAINT "ItemModel_item_type_id_fkey" FOREIGN KEY ("item_type_id") REFERENCES "ItemTypeModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemModel" ADD CONSTRAINT "ItemModel_object_status_id_fkey" FOREIGN KEY ("object_status_id") REFERENCES "ObjectStatusModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemTypeModel" ADD CONSTRAINT "ItemTypeModel_object_status_id_fkey" FOREIGN KEY ("object_status_id") REFERENCES "ObjectStatusModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionModel" ADD CONSTRAINT "PromotionModel_object_status_id_fkey" FOREIGN KEY ("object_status_id") REFERENCES "ObjectStatusModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionModel" ADD CONSTRAINT "PromotionModel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseBalanceModel" ADD CONSTRAINT "WarehouseBalanceModel_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "ItemModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseBalanceModel" ADD CONSTRAINT "WarehouseBalanceModel_object_status_id_fkey" FOREIGN KEY ("object_status_id") REFERENCES "ObjectStatusModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseBalanceModel" ADD CONSTRAINT "WarehouseBalanceModel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
