import type { ItemType } from "../item-type.entity";

export interface IItemTypesRepository {
	getItemTypeById: (itemTypeId: number) => Promise<ItemType | null>;
	getItemTypes: () => Promise<ItemType[] | null>;
}
