import { ItemModel } from '@prisma/client';
import { ItemCreateDto } from './dto/item-create.dto';
import { ItemUpdateSatusDto } from './dto/item-update-status.dto';
import { ItemSaveDto } from './dto/item-save.dto';
import { IFindItemParams, ISortItemParams } from '../../interfaces';
import { UserRequestDataDto } from '../users/dto/user-data.dto';

export interface IItemService {
	createItem: (dto: ItemCreateDto, userData: UserRequestDataDto) => Promise<ItemModel>;
	getItemById: (id: number, userData: UserRequestDataDto) => Promise<ItemModel | null>;
	saveItem: (dto: ItemSaveDto, userData: UserRequestDataDto) => Promise<any>;
	updateItemStatus: (id: number, newRowStatusId: number, userData: UserRequestDataDto) => Promise<ItemModel>;
	deleteItem: (id: number, userData: UserRequestDataDto) => Promise<Record<string, string | number>>;
	getItems: (searchParams: IFindItemParams,sortParams: ISortItemParams, userData: UserRequestDataDto) => Promise<ItemModel[] | null >;
};
