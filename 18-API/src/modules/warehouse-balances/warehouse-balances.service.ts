import { WarehouseBalanceModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { TYPES } from '../../types';
import { WarehouseBalance } from './warehouse-balance.entity';
import { IWarehouseBalancesRepository } from './warehouse-balances.repository.interface';
import { IWarehouseBalancesService } from './warehouse-balances.service.interface';
import { WarehouseBalanceCreateDto } from './dto/warehouse-balance-create.dto';
import { ERowStatus } from '../../enum';
import { UserRequestDataDto } from '../users/dto/user-data.dto';


@injectable()
export class WarehouseBalancesService implements IWarehouseBalancesService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.WarehouseBalancesRepository) private warehouseBalancesRepository: IWarehouseBalancesRepository,
	) {}

	async createBalance(balanceData: WarehouseBalanceCreateDto, userData: UserRequestDataDto ): Promise<WarehouseBalanceModel> {
		const {user, userReqId, userRole } = userData;
		const { name, description, userId, itemId, quantity } = balanceData;

		const newWarehouseBalance = new WarehouseBalance(-1, name, description, userId, itemId, quantity, ERowStatus.NEW);
		return this.warehouseBalancesRepository.createBalance(newWarehouseBalance);
	};

	async findBalanceById(id: number, userData: UserRequestDataDto): Promise<WarehouseBalanceModel | null> {
		const {user, userReqId, userRole } = userData;
		return this.warehouseBalancesRepository.findBalanceById(id);
	};

	async updateBalanceQuantity(id: number, quantity: number, userData: UserRequestDataDto): Promise<WarehouseBalanceModel> {
		const {user, userReqId, userRole } = userData;
		return this.warehouseBalancesRepository.updateBalanceQuantity(id, quantity);
	};

	async updateBalanceStatus(id: number, newStatusId: number, userData: UserRequestDataDto): Promise<WarehouseBalanceModel> {
		const {user, userReqId, userRole } = userData;
		return this.warehouseBalancesRepository.updateBalanceStatus(id, newStatusId);
	}
};
