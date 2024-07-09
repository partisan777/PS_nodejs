import { WarehouseBalanceModel } from '.prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../../database/prisma.service';
import { TYPES } from '../../types';
import { EUserRoles, ERowStatus } from '../../enum';
import { IWarehouseBalancesRepository } from './warehouse-balances.repository.interface';
import { WarehouseBalanceCreateDto } from './dto/warehouse-balance-create.dto';

@injectable()
export class WarehouseBalancesRepository implements IWarehouseBalancesRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ id, name, description, userId, itemId, quantity }: WarehouseBalanceCreateDto): Promise<WarehouseBalanceModel> {
		const rowStatusNumber = ERowStatus.NEW;		
		return this.prismaService.client.warehouseBalanceModel.create({
			data: {
				name,
				description,
				userId,
				itemId,
				quantity,
				rowStatusNumber
			}
		});
	};

	async findById(id: number): Promise<WarehouseBalanceModel | null> {
		return this.prismaService.client.warehouseBalanceModel.findFirst({
			where: {
				id: id
			},
		});
	};

	async updateQuantity(id: number, quantity: number): Promise<WarehouseBalanceModel> {
		return this.prismaService.client.warehouseBalanceModel.update({
			data: {
				quantity: quantity
			},
			where: {
				id: id
			}
		});
	};

	async updateStatus(id: number, newStatusNumber: number): Promise<WarehouseBalanceModel> {
		return this.prismaService.client.warehouseBalanceModel.update({
			data: {
				rowStatusNumber: newStatusNumber
			},
			where: {
				id: id
			}
		});
	};	
};
