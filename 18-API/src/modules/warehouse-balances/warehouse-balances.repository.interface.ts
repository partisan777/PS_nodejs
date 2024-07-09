import { WarehouseBalanceModel } from '@prisma/client';
import { WarehouseBalanceCreateDto } from './dto/warehouse-balance-create.dto';

export interface IWarehouseBalancesRepository {
	create: (warehouseBalance: WarehouseBalanceCreateDto ) => Promise<WarehouseBalanceModel>;
	findById: (id: number) => Promise<WarehouseBalanceModel | null>;
	updateQuantity: (id: number, quantity: number) => Promise<WarehouseBalanceModel>;
	updateStatus: (id: number, newStatusNumber: number) => Promise<WarehouseBalanceModel>;
};

