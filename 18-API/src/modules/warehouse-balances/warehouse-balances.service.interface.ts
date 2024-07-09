import { WarehouseBalanceCreateDto } from "./dto/warehouse-balance-create.dto";
import { WarehouseBalanceModel } from "@prisma/client";

export interface IWarehouseBalancesService {
	create: (dto: WarehouseBalanceCreateDto ) => Promise<WarehouseBalanceModel>;
	findById: (id: number) => Promise<WarehouseBalanceModel | null>;
	updateQuantity: (id: number, quantity: number) => Promise<WarehouseBalanceModel>;
	updateStatus: (id: number, newStatusNumber: number) => Promise<WarehouseBalanceModel>;
};
