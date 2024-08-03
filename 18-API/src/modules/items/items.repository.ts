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
import { ItemCreateDto } from './dto/item-create.dto';


@injectable()
export class ItemsRepository implements IItemsRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async createItem(item: ItemCreateDto) {
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

		return new Item (createdItem);
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

		return new Item(updatedItem);
	};

	async getItemById(itemId: number) {
		const existItem = await this.prismaService.client.itemModel.findFirst({
			include: {
				itemBalance: true,
			},
			where: {
				id: itemId
			},
		});
		if(!existItem) return null;

		return new Item(existItem);
	};

	async updateItemStatus(itemId: number, newStatusId: number) {
		const existItem = await this.prismaService.client.itemModel.update({
			where: {
				id: itemId
			},
			data: {
				objectStatusId: newStatusId,
			},
		});

		if(!existItem) return null;
		return new Item(existItem);
	};

	async getItems(searchParams: IFindItemParams, sortParams: ISortItemParams) {
		const queryParam: IQueryParams = {FIND: [], SORT: []};
		queryParam.FIND = generateQueryParamsCondition(searchParams, queryItemParamDict);
		queryParam.SORT = generateSortParamsCondition(sortParams, sortItemParamDict);
		queryParam.FIND.push({itemBalance:{quantity: {gt: 0}}});
		const whereCondition = {AND: queryParam.FIND};
		const sortCondition = queryParam.SORT;
		const existsItems = await this.prismaService.client.itemModel.findMany({
			include: {
				itemBalance: true,
			},
			where: whereCondition, orderBy: sortCondition
		});
		if(!existsItems) return null;
		return  existsItems.map(item => new Item(item));
	};


	async deleteItem(id: number) {
		return this.prismaService.client.itemModel.delete({where: {id: id}});
	}
};
