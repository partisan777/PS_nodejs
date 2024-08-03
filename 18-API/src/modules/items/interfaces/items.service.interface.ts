import { User } from "../../users";
import { ItemReqCreateDto } from "../dto/item-req-create.dto";
import type { ItemUpdateDto } from "../dto/item-update.dto";
import type { Item } from "../item.entity";
import type { IFindItemParams, ISortItemParams } from "./params.interface";

export interface IItemService {
	createItem: (
		dto: ItemReqCreateDto,
		userData: User,
	) => Promise<Item | null>;
	getItemById: (
		itemId: number,
		userData: User,
	) => Promise<Item | null>;
	updateItem: (dto: ItemUpdateDto) => Promise<Item | null>;
	updateItemStatus: (
		itemId: number,
		newObjectStatusId: number,
	) => Promise<Item | null>;
	deleteItem: (
		itemId: number,
		userData: User,
	) => Promise<Record<string, string | number>>;
	getItems: (
		searchParams: IFindItemParams,
		sortParams: ISortItemParams,
	) => Promise<Item[] | null>;
}
