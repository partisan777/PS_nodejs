import { ItemModel } from '@prisma/client';
import { Item } from './item.entity';
import { IQueryParams } from '../../interfaces';

export interface IItemsRepository {
	saveItem: (item: Item) => Promise<ItemModel>;
	createItem: (item: Item) => Promise<ItemModel>;
	getItemById: (id: number) => Promise<ItemModel | null>;
	updateItemStatus: (id: number, newStatusId: number) => Promise<ItemModel>;
	deleteItem: (id: number) => Promise<ItemModel>;
	getItems: (queryParams: IQueryParams) => Promise<ItemModel[] | null>;
};
