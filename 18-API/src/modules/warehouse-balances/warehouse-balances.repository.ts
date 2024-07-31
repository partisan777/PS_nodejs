import { WarehouseBalanceModel } from '.prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../../database/prisma.service';
import { TYPES } from '../../types';
import { ERowStatus } from '../../enum';
import { IWarehouseBalancesRepository } from './interfaces/warehouse-balances.repository.interface';
import { WarehouseBalanceCreateDto } from './dto/warehouse-balance-create.dto';
import { WarehouseBalance } from './warehouse-balance.entity';

@injectable()
export class WarehouseBalancesRepository implements IWarehouseBalancesRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async createBalance({ name, description, userId, itemId, quantity }: WarehouseBalanceCreateDto) {
		const newBalance = await this.prismaService.client.warehouseBalanceModel.create({
			data: {
				name,
				description,
				userId,
				itemId,
				quantity,
				objectStatusId: ERowStatus.NEW
			}
		});
		if (!newBalance) return null;
		return new WarehouseBalance (
			newBalance.id,
			newBalance.name,
			newBalance.description,
			newBalance.userId,
			newBalance.itemId,
			newBalance.quantity,
			newBalance.objectStatusId
		);
	};

	async getBalanceById(id: number) {
		const existBalance = await this.prismaService.client.warehouseBalanceModel.findFirst({
			where: {
				id: id
			},
		})
		if (!existBalance) return null;
		return new WarehouseBalance (
			existBalance.id,
			existBalance.name,
			existBalance.description,
			existBalance.userId,
			existBalance.itemId,
			existBalance.quantity,
			existBalance.objectStatusId
		);
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
		return new WarehouseBalance (
			existBalance.id,
			existBalance.name,
			existBalance.description,
			existBalance.userId,
			existBalance.itemId,
			existBalance.quantity,
			existBalance.objectStatusId
		);
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
		return new WarehouseBalance (
			existBalance.id,
			existBalance.name,
			existBalance.description,
			existBalance.userId,
			existBalance.itemId,
			existBalance.quantity,
			existBalance.objectStatusId
		);
	};
};
