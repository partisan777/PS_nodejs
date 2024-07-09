import { ItemTypeModel } from '@prisma/client';

export interface IItemTypesService {
	getItemTypeByNumber: (itemTypeNumber: number) => Promise<ItemTypeModel | null>;	
	getItemTypes: () => Promise<ItemTypeModel[] | null>;	
};
