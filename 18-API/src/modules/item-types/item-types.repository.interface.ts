import { ItemTypeModel } from '@prisma/client';

export interface IItemTypesRepository {
	getItemTypeByNumber: (itemTypeNumber: number) => Promise<ItemTypeModel | null>;
	getItemTypes: () => Promise<ItemTypeModel[] | null>;
};
