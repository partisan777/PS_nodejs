import type { UserRequestDataDto } from "../../users/dto/user-data.dto";
import type { ItemCreateDto } from "../dto/item-create.dto";
import type { ItemSaveDto } from "../dto/item-save.dto";
import type { Item } from "../item.entity";
import type { IFindItemParams, ISortItemParams } from "./params.interface";

export interface IItemService {
	createItem: (
		dto: ItemCreateDto,
		userData: UserRequestDataDto,
	) => Promise<Item | null>;
	getItemById: (
		id: number,
		userData: UserRequestDataDto,
	) => Promise<Item | null>;
	updateItem: (dto: ItemSaveDto) => Promise<Item | null>;
	updateItemStatus: (
		id: number,
		newObjectStatusId: number,
	) => Promise<Item | null>;
	deleteItem: (
		id: number,
		userData: UserRequestDataDto,
	) => Promise<Record<string, string | number>>;
	getItems: (
		searchParams: IFindItemParams,
		sortParams: ISortItemParams,
	) => Promise<Item[] | null>;
}
