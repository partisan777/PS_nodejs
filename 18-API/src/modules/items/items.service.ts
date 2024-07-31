
import { inject, injectable } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { TYPES } from '../../types';
import { IFindItemParams, ISortItemParams } from './interfaces/params.interface';
import { ItemCreateDto } from './dto/item-create.dto';
import { Item } from './item.entity';
import { IItemService } from './interfaces/items.service.interface';
import { ItemSaveDto } from './dto/item-save.dto';
import { ERowStatus, EUserRoles } from '../../enum';
import { IItemsRepository } from './interfaces/items.repository.interface';
import { UserRequestDataDto } from '../users/dto/user-data.dto';

@injectable()
export class ItemService implements IItemService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.ItemsRepository) private itemsRepository: IItemsRepository,
	) {}

	async updateItemStatus (id: number, newStatusId: number) {
		return this.itemsRepository.updateItemStatus(id, newStatusId);
	};

    async createItem({ name, description, itemTypeId, price }: ItemCreateDto, userData: UserRequestDataDto) {
	    const { userReqId  } = userData;
		const userId = userReqId;
		const newItem = new Item(-20, name, description, userId, itemTypeId, price, ERowStatus.NEW);
		return this.itemsRepository.createItem(newItem);
	};

	async updateItem (data: ItemSaveDto ) {
		const { id, name, description, userId, itemTypeId, price, objectStatusId } = data;
		const updItem = new Item(id, name, description, userId, itemTypeId, price, objectStatusId);
		return this.itemsRepository.updateItem(updItem);
	};

	async getItemById(id: number) {
	   return this.itemsRepository.getItemById(id);
	};

	async getItems(searchParams: IFindItemParams, sortParams: ISortItemParams) {
		return this.itemsRepository.getItems(searchParams, sortParams);
	};

	async deleteItem(id: number, userData: UserRequestDataDto) {
		const {user, userReqId, userRole } = userData;

		const existItem = await this.itemsRepository.getItemById(id);

		if (!existItem || existItem === null) {
			return {code: 0, message: `товар с идентификатором ${id} не существует или его нельзя удалить`};
		};

		if (existItem?.userId === userReqId || userRole === EUserRoles.ADMIN ) {
			try {
				await this.itemsRepository.deleteItem(id);
				return {code: 1, message: `товар ${existItem?.name} удален`};
			} catch(e) {
				return {code: 2, message: `ошибка при удалении товара ${existItem?.name}`};
			}
		} else {
			return {code: 2, message: `у Вас недостаточно прав для удаления товара ${existItem?.name}`};
		};
	};
};
