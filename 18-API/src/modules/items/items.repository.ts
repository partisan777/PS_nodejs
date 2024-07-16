import { inject, injectable } from 'inversify';
import { PrismaService } from '../../database/prisma.service';
import { TYPES } from '../../types';
import { Item } from './item.entity';
import { IItemsRepository } from './items.repository.interface';
import { ItemModel } from '@prisma/client';
import { IQueryParams } from '../../interfaces';

@injectable()
export class ItemsRepository implements IItemsRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async createItem(item: Item): Promise<ItemModel> {
		return this.prismaService.client.itemModel.create({
			data: {
				description: item.description,
				name: item.name,
				price: item.price,
				itemTypeNumber: item.itemTypeNumber,
				rowStatusNumber: item.rowStatusNumber
			},
		});
	};

	async saveItem(item: Item): Promise<ItemModel> {
		return this.prismaService.client.itemModel.update({
			where: {
				id: item.id
			},
			data: {
				description: item.description,
				name: item.name,
				price: item.price,
				itemTypeNumber: item.itemTypeNumber,
				rowStatusNumber: item.rowStatusNumber
			}
		});
	};

	async getItemById(id: number): Promise<ItemModel | null> {
		return this.prismaService.client.itemModel.findFirst({
			where: {
				id: id
			},
		});
	};

	async updateItemStatus(id: number, newStatusId: number): Promise<ItemModel> {
		return this.prismaService.client.itemModel.update({
			where: {
				id: id
			},
			data: {
				rowStatusNumber: newStatusId,
			},
		});
	};
 
	async getItems(queryParams: IQueryParams) {
		const whereCondition = {AND: queryParams.FIND};
		const sortCondition = queryParams.SORT;
		return this.prismaService.client.itemModel.findMany({where: whereCondition, orderBy: sortCondition});
	};

	async deleteItem(id: number) {
		return this.prismaService.client.itemModel.delete({where: {id: id}});
	}
};
