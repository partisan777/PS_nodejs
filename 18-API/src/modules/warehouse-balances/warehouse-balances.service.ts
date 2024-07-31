import { WarehouseBalanceModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ERowStatus } from '../../enum';
import type { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';
import type { UserRequestDataDto } from '../users/dto/user-data.dto';
import type { WarehouseBalanceCreateDto } from './dto/warehouse-balance-create.dto';
import type { IWarehouseBalancesRepository } from './interfaces/warehouse-balances.repository.interface';
import type { IWarehouseBalancesService } from './interfaces/warehouse-balances.service.interface';
import { WarehouseBalance } from './warehouse-balance.entity';


@injectable()
export class WarehouseBalancesService implements IWarehouseBalancesService {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.WarehouseBalancesRepository) private warehouseBalancesRepository: IWarehouseBalancesRepository,
	) {}

	async createBalance(balanceData: WarehouseBalanceCreateDto, userData: UserRequestDataDto ) {
		const {user, userReqId, userRole } = userData;
		const { name, description, userId, itemId, quantity } = balanceData;

		const newWarehouseBalance = new WarehouseBalance(-1, name, description, userId, itemId, quantity, ERowStatus.NEW);
		return this.warehouseBalancesRepository.createBalance(newWarehouseBalance);
	};

	async getBalanceById(id: number, userData: UserRequestDataDto) {
		return this.warehouseBalancesRepository.getBalanceById(id);
	};

	async updateBalanceQuantity(id: number, quantity: number, userData: UserRequestDataDto) {
		const {user, userReqId, userRole } = userData;
		return this.warehouseBalancesRepository.updateBalanceQuantity(id, quantity);
	};

	async updateBalanceStatus(id: number, newStatusId: number, userData: UserRequestDataDto) {
		const {user, userReqId, userRole } = userData;
		return this.warehouseBalancesRepository.updateBalanceStatus(id, newStatusId);
	}
};
