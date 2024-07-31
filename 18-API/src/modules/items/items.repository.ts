import { inject, injectable } from 'inversify';
import { generateQueryParamsCondition } from '../../common/generateQueryParamsCondition';
import { generateSortParamsCondition } from '../../common/generateSortParamsCondition';
import type { PrismaService } from '../../database/prisma.service';
import type { IQueryParams } from '../../interfaces';
import { TYPES } from '../../types';
import { queryItemParamDict, sortItemParamDict } from './dictionares/dictionares'
import type { IItemsRepository } from './interfaces/items.repository.interface';
import type { IFindItemParams, ISortItemParams } from './interfaces/params.interface';
import { Item } from './item.entity';

@injectable()
export class ItemsRepository implements IItemsRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async createItem(item: Item) {
		const createdItem = await this.prismaService.client.itemModel.create({
			data: {
				description: item.description,
				name: item.name,
				userId: item.userId,
				price: item.price,
				itemTypeId: item.itemTypeId,
				objectStatusId: item.objectStatusId
			},
		});

		if(!createdItem) return null;

		return new Item (
			createdItem.id,
			createdItem.name,
			createdItem.description,
			createdItem.userId,
			createdItem.itemTypeId,
			createdItem.price,
			createdItem.objectStatusId
		);
	};

	async updateItem(item: Item) {
		const updatedItem = await this.prismaService.client.itemModel.update({
			where: {
				id: item.id
			},
			data: {
				description: item.description,
				name: item.name,
				price: item.price,
				itemTypeId: item.itemTypeId,
				objectStatusId: item.objectStatusId
			}
		});
		if(!updatedItem) return null;

		return new Item (
			updatedItem.id,
			updatedItem.name,
			updatedItem.description,
			updatedItem.userId,
			updatedItem.itemTypeId,
			updatedItem.price,
			updatedItem.objectStatusId
		);
	};

	async getItemById(id: number) {
		return this.prismaService.client.itemModel.findFirst({
			include: {
				itemBalance: true,
			},
			where: {
				id: id
			},
		});
	};

	async updateItemStatus(id: number, newStatusId: number) {
		return this.prismaService.client.itemModel.update({
			where: {
				id: id
			},
			data: {
				objectStatusId: newStatusId,
			},
		});
	};

	async getItems(searchParams: IFindItemParams, sortParams: ISortItemParams) {
		const queryParam: IQueryParams = {FIND: [], SORT: []};
		queryParam.FIND = generateQueryParamsCondition(searchParams, queryItemParamDict);
		queryParam.SORT = generateSortParamsCondition(sortParams, sortItemParamDict);
		queryParam.FIND.push({itemBalance:{quantity: {gt: 0}}});
		const whereCondition = {AND: queryParam.FIND};
		const sortCondition = queryParam.SORT;
		return this.prismaService.client.itemModel.findMany({
			include: {
				itemBalance: true,
			},
			where: whereCondition, orderBy: sortCondition
		});
	};

	async deleteItem(id: number) {
		return this.prismaService.client.itemModel.delete({where: {id: id}});
	}
};
