import { ItemModel } from '@prisma/client';
import { Item } from './item.entity';

export interface IItemsRepository {
	saveItem: (item: Item) => Promise<ItemModel>;
	createItem: (item: Item) => Promise<ItemModel>;
	getItemById: (id: number) => Promise<ItemModel | null>;
	updateStatus: (id: number, newStatusId: number) => Promise<ItemModel>;
	getItems: () => Promise<ItemModel[] | null>;	
};
