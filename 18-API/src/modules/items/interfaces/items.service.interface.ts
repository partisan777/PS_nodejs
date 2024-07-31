import { ItemCreateDto } from '../dto/item-create.dto';
import { ItemSaveDto } from '../dto/item-save.dto';
import { IFindItemParams, ISortItemParams } from '../../../interfaces';
import { UserRequestDataDto } from '../../users/dto/user-data.dto';
import { Item } from '../item.entity';

export interface IItemService {
	createItem: (dto: ItemCreateDto, userData: UserRequestDataDto) => Promise<Item | null>;
	getItemById: (id: number, userData: UserRequestDataDto) => Promise<Item | null>;
	updateItem: (dto: ItemSaveDto) => Promise<Item | null>;
	updateItemStatus: (id: number, newObjectStatusId: number) => Promise<Item | null>;
	deleteItem: (id: number, userData: UserRequestDataDto) => Promise<Record<string, string | number>>;
	getItems: (searchParams: IFindItemParams,sortParams: ISortItemParams ) => Promise<Item[] | null >;
};
