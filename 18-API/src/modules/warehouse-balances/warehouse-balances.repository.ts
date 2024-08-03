import { inject, injectable } from 'inversify';
import type { PrismaService } from '../../database/prisma.service';
import { TYPES } from '../../types';
import type { IWarehouseBalancesRepository } from './interfaces/warehouse-balances.repository.interface';
import { WarehouseBalance } from './warehouse-balance.entity';
import { WarehouseBalanceCreateDto } from './dto/warehouse-balance-create.dto';

@injectable()
export class WarehouseBalancesRepository implements IWarehouseBalancesRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async createBalance(balanceData: WarehouseBalanceCreateDto) {
		const newBalance = await this.prismaService.client.warehouseBalanceModel.create({
			data: balanceData
		});
		if (!newBalance) return null;
		return new WarehouseBalance (newBalance);
	};

	async getBalanceById(id: number) {
		const existBalance = await this.prismaService.client.warehouseBalanceModel.findFirst({
			where: {
				id: id
			},
		})
		if (!existBalance) return null;
		return new WarehouseBalance (existBalance);
	};

	async updateBalanceQuantity(id: number, quantity: number) {
		const existBalance = await this.prismaService.client.warehouseBalanceModel.update({
			data: {
				quantity: quantity
			},
			where: {
				id: id
			}
		})
		if (!existBalance) return null;
		return new WarehouseBalance (existBalance);
	};

	async updateBalanceStatus(id: number, newStatusNumber: number) {
		const existBalance = await this.prismaService.client.warehouseBalanceModel.update({
			data: {
				objectStatusId: newStatusNumber
			},
			where: {
				id: id
			}
		})
		if (!existBalance) return null;
		return new WarehouseBalance (existBalance);
	};
};
