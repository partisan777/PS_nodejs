import { ItemModel } from '@prisma/client';
import { ItemCreateDto } from './dto/item-create.dto';
import { ItemUpdateSatusDto } from './dto/item-update-status.dto';
import { ItemSaveDto } from './dto/item-save.dto';


export interface IItemService {
	createItem: (dto: ItemCreateDto) => Promise<ItemModel>;
	getItemById: (id: number) => Promise<ItemModel | null>;
	saveItem: (dto: ItemSaveDto) => Promise<any>;
	updateItemStatus: (id: number, promoId: number) => Promise<ItemModel>;
	getItems: () => Promise<ItemModel[] | null >;
};
