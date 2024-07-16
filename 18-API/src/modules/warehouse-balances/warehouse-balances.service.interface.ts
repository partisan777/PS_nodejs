import { UserRequestDataDto } from "../users/dto/user-data.dto";
import { WarehouseBalanceCreateDto } from "./dto/warehouse-balance-create.dto";
import { WarehouseBalanceModel } from "@prisma/client";

export interface IWarehouseBalancesService {
	createBalance: (balanceData: WarehouseBalanceCreateDto , userData: UserRequestDataDto) => Promise<WarehouseBalanceModel>;
	findBalanceById: (id: number, userData: UserRequestDataDto) => Promise<WarehouseBalanceModel | null>;
	updateBalanceQuantity: (id: number, quantity: number, userData: UserRequestDataDto) => Promise<WarehouseBalanceModel>;
	updateBalanceStatus: (id: number, newStatusNumber: number, userData: UserRequestDataDto) => Promise<WarehouseBalanceModel>;
};
