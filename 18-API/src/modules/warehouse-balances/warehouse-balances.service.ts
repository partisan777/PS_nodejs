import { inject, injectable } from 'inversify';
import { EObjectStatus } from '../object-statuses/enums/enums';
import { TYPES } from '../../types';
import type { WarehouseBalanceCreateDto } from './dto/warehouse-balance-create.dto';
import type { IWarehouseBalancesRepository } from './interfaces/warehouse-balances.repository.interface';
import type { IWarehouseBalancesService } from './interfaces/warehouse-balances.service.interface';
import { WarehouseBalanceReqCreateDto } from './dto/warehouse-balance-req-create.dto';
import { User } from '../users';


@injectable()
export class WarehouseBalancesService implements IWarehouseBalancesService {
	constructor(
		@inject(TYPES.WarehouseBalancesRepository) private warehouseBalancesRepository: IWarehouseBalancesRepository,
	) {}

	async createBalance(balanceData: WarehouseBalanceReqCreateDto, userData: User ) {
		const { id } = userData;

		const newWarehouseBalance: WarehouseBalanceCreateDto  = {...balanceData, userId: id, objectStatusId: EObjectStatus.NEW};
		return this.warehouseBalancesRepository.createBalance(newWarehouseBalance);
	};

	async getBalanceById(id: number) {
		return this.warehouseBalancesRepository.getBalanceById(id);
	};

	async updateBalanceQuantity(id: number, quantity: number, userData: User) {
		return this.warehouseBalancesRepository.updateBalanceQuantity(id, quantity);
	};

	async updateBalanceStatus(id: number, newStatusId: number) {
		return this.warehouseBalancesRepository.updateBalanceStatus(id, newStatusId);
	}
};
