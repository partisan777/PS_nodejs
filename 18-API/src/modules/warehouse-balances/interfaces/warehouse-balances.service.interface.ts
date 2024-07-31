import { UserRequestDataDto } from "../../users/dto/user-data.dto";
import { WarehouseBalanceCreateDto } from "../dto/warehouse-balance-create.dto";
import { WarehouseBalance } from "../warehouse-balance.entity";

export interface IWarehouseBalancesService {
	createBalance: (balanceData: WarehouseBalanceCreateDto , userData: UserRequestDataDto) => Promise<WarehouseBalance | null>;
	getBalanceById: (id: number, userData: UserRequestDataDto) => Promise<WarehouseBalance | null>;
	updateBalanceQuantity: (id: number, quantity: number, userData: UserRequestDataDto) => Promise<WarehouseBalance | null>;
	updateBalanceStatus: (id: number, newStatusNumber: number, userData: UserRequestDataDto) => Promise<WarehouseBalance | null>;
};
