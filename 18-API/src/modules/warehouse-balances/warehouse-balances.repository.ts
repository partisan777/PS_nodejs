import { inject, injectable } from 'inversify';
import type { PrismaService } from '../../database/prisma.service';
import { ERowStatus } from '../../enum';
import { TYPES } from '../../types';
import type { WarehouseBalanceCreateDto } from './dto/warehouse-balance-create.dto';
import type { IWarehouseBalancesRepository } from './interfaces/warehouse-balances.repository.interface';
import { WarehouseBalance } from './warehouse-balance.entity';
import { WarehouseBalanceModel } from '.prisma/client';

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
