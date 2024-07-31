import { ItemType } from "../item-type.entity";

export interface IItemTypesService {
	getItemTypeById: (itemTypeId: number) => Promise<ItemType | null>;
	getItemTypes: () => Promise<ItemType[] | null>;
};
