import { User } from "../../users";
import type { WarehouseBalanceReqCreateDto } from "../dto/warehouse-balance-req-create.dto";
import type { WarehouseBalance } from "../warehouse-balance.entity";

export interface IWarehouseBalancesService {
	createBalance: (
		balanceData: WarehouseBalanceReqCreateDto,
		userData: User,
	) => Promise<WarehouseBalance | null>;
	getBalanceById: (
		id: number,
		userData: User,
	) => Promise<WarehouseBalance | null>;
	updateBalanceQuantity: (
		id: number,
		quantity: number,
		userData: User,
	) => Promise<WarehouseBalance | null>;
	updateBalanceStatus: (
		id: number,
		newStatusNumber: number,
		userData: User,
	) => Promise<WarehouseBalance | null>;
}
