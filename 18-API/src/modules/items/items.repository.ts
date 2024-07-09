import { inject, injectable } from 'inversify';
import { PrismaService } from '../../database/prisma.service';
import { TYPES } from '../../types';
import { Item } from './item.entity';
import { IItemsRepository } from './items.repository.interface';
import { ItemModel } from '@prisma/client';

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

	async updateStatus(id: number, newStatusId: number): Promise<ItemModel> {
		return this.prismaService.client.itemModel.update({
			where: {
				id: id
			},
			data: {
				rowStatusNumber: newStatusId,
			},
		});
	};
 
	async getItems() {
		return this.prismaService.client.itemModel.findMany();    
	};
};
