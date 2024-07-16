import { WarehouseBalanceModel } from '@prisma/client';
import { WarehouseBalanceCreateDto } from './dto/warehouse-balance-create.dto';

export interface IWarehouseBalancesRepository {
	createBalance: (warehouseBalance: WarehouseBalanceCreateDto ) => Promise<WarehouseBalanceModel>;
	findBalanceById: (id: number) => Promise<WarehouseBalanceModel | null>;
	updateBalanceQuantity: (id: number, quantity: number) => Promise<WarehouseBalanceModel>;
	updateBalanceStatus: (id: number, newStatusNumber: number) => Promise<WarehouseBalanceModel>;
};

