import { WarehouseBalanceModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { TYPES } from '../../types';
import { WarehouseBalance } from './warehouse-balance.entity';
import { IWarehouseBalancesRepository } from './warehouse-balances.repository.interface';
import { IWarehouseBalancesService } from './warehouse-balances.service.interface';
import { WarehouseBalanceCreateDto } from './dto/warehouse-balance-create.dto';
import { ERowStatus } from '../../enum';


@injectable()
export class WarehouseBalancesService implements IWarehouseBalancesService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.WarehouseBalancesRepository) private warehouseBalancesRepository: IWarehouseBalancesRepository,
	) {}
	
	async create(warehouseBalance: WarehouseBalanceCreateDto): Promise<WarehouseBalanceModel> {
		const { name, description, userId, itemId, quantity } = warehouseBalance;
		const newWarehouseBalance = new WarehouseBalance(-1, name, description, userId, itemId, quantity, ERowStatus.NEW);
		return this.warehouseBalancesRepository.create(newWarehouseBalance);
	};

	async findById(id: number): Promise<WarehouseBalanceModel | null> {
		return this.warehouseBalancesRepository.findById(id);
	};

	async updateQuantity(id: number, quantity: number): Promise<WarehouseBalanceModel> {
		return this.warehouseBalancesRepository.updateQuantity(id, quantity);
	};

	async updateStatus(id: number, newStatusId: number): Promise<WarehouseBalanceModel> {
		return this.warehouseBalancesRepository.updateStatus(id, newStatusId);
	}
};
