import type { Item } from "../item.entity";
import type { IFindItemParams, ISortItemParams } from "./params.interface";

export interface IItemsRepository {
	updateItem: (item: Item) => Promise<Item | null>;
	createItem: (item: Item) => Promise<Item | null>;
	getItemById: (id: number) => Promise<Item | null>;
	updateItemStatus: (id: number, newStatusId: number) => Promise<Item | null>;
	deleteItem: (id: number) => Promise<Item>;
	getItems: (
		searchParams: IFindItemParams,
		sortParams: ISortItemParams,
	) => Promise<Item[] | null>;
}
