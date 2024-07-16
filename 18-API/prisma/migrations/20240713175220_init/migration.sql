-- CreateTable
CREATE TABLE "UserModel" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "row_status_number" INTEGER NOT NULL,
    "user_role_number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRoleModel" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "role_number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRoleModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RowStatusModel" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "status_number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RowStatusModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "item_type_number" INTEGER NOT NULL,
    "row_status_number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItemModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemTypeModel" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "item_type_number" INTEGER NOT NULL,
    "row_status_number" INTEGER NOT NULL,
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
    "row_status_number" INTEGER NOT NULL,
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
    "row_status_number" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WarehouseBalanceModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRoleModel_role_number_key" ON "UserRoleModel"("role_number");

-- CreateIndex
CREATE UNIQUE INDEX "RowStatusModel_status_number_key" ON "RowStatusModel"("status_number");

-- CreateIndex
CREATE UNIQUE INDEX "ItemTypeModel_item_type_number_key" ON "ItemTypeModel"("item_type_number");

-- CreateIndex
CREATE UNIQUE INDEX "WarehouseBalanceModel_item_id_key" ON "WarehouseBalanceModel"("item_id");

-- AddForeignKey
ALTER TABLE "UserModel" ADD CONSTRAINT "UserModel_row_status_number_fkey" FOREIGN KEY ("row_status_number") REFERENCES "RowStatusModel"("status_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserModel" ADD CONSTRAINT "UserModel_user_role_number_fkey" FOREIGN KEY ("user_role_number") REFERENCES "UserRoleModel"("role_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemModel" ADD CONSTRAINT "ItemModel_item_type_number_fkey" FOREIGN KEY ("item_type_number") REFERENCES "ItemTypeModel"("item_type_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemModel" ADD CONSTRAINT "ItemModel_row_status_number_fkey" FOREIGN KEY ("row_status_number") REFERENCES "RowStatusModel"("status_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemTypeModel" ADD CONSTRAINT "ItemTypeModel_row_status_number_fkey" FOREIGN KEY ("row_status_number") REFERENCES "RowStatusModel"("status_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionModel" ADD CONSTRAINT "PromotionModel_row_status_number_fkey" FOREIGN KEY ("row_status_number") REFERENCES "RowStatusModel"("status_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionModel" ADD CONSTRAINT "PromotionModel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseBalanceModel" ADD CONSTRAINT "WarehouseBalanceModel_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "ItemModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseBalanceModel" ADD CONSTRAINT "WarehouseBalanceModel_row_status_number_fkey" FOREIGN KEY ("row_status_number") REFERENCES "RowStatusModel"("status_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseBalanceModel" ADD CONSTRAINT "WarehouseBalanceModel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
