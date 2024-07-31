import { WarehouseBalanceCreateDto } from '../dto/warehouse-balance-create.dto';
import { WarehouseBalance } from '../warehouse-balance.entity';


export interface IWarehouseBalancesRepository {
	createBalance: (warehouseBalance: WarehouseBalanceCreateDto ) => Promise<WarehouseBalance | null>;
	getBalanceById: (id: number) => Promise<WarehouseBalance | null>;
	updateBalanceQuantity: (id: number, quantity: number) => Promise<WarehouseBalance | null>;
	updateBalanceStatus: (id: number, newStatusNumber: number) => Promise<WarehouseBalance | null>;
};

