import { ItemModel } from '@prisma/client';
import { ItemCreateDto } from './dto/item-create.dto';
import { ItemUpdateSatusDto } from './dto/item-update-status.dto';
import { ItemSaveDto } from './dto/item-save.dto';
import { IFindItemParams } from '../../interfaces';


export interface IItemService {
	createItem: (dto: ItemCreateDto) => Promise<ItemModel>;
	getItemById: (id: number) => Promise<ItemModel | null>;
	saveItem: (dto: ItemSaveDto) => Promise<any>;
	updateItemStatus: (id: number, newRowStatusId: number) => Promise<ItemModel>;
	deleteItem: (id: number, userId: number, userRoleNumber: number) => Promise<Record<string, string>>;
	getItems: (searchParams: IFindItemParams) => Promise<ItemModel[] | null >;
};
