
import { inject, injectable } from 'inversify';
import { EUserRoles } from '../user-roles/enums/enums';
import { TYPES } from '../../types';
import type { IItemsRepository } from './interfaces/items.repository.interface';
import type { IItemService } from './interfaces/items.service.interface';
import type { IFindItemParams, ISortItemParams } from './interfaces/params.interface';
import { User } from '../users';
import { ItemUpdateDto } from './dto/item-update.dto';
import { ItemCreateDto } from './dto/item-create.dto';
import { ItemReqCreateDto } from './dto/item-req-create.dto';
import { EObjectStatus } from '../object-statuses/enums/enums';
import { ILogger } from '../../logger/logger.interface';


@injectable()
export class ItemService implements IItemService {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.ItemsRepository) private itemsRepository: IItemsRepository,
	) {}

	async updateItemStatus (id: number, newStatusId: number) {
		return this.itemsRepository.updateItemStatus(id, newStatusId);
	};

    async createItem(item: ItemReqCreateDto, userData: User) {
	    const {id} = userData;
		const newItem: ItemCreateDto = {...item, userId: id, objectStatusId: EObjectStatus.NEW}
		return this.itemsRepository.createItem(newItem);
	};

	async updateItem (data: ItemUpdateDto ) {
		return this.itemsRepository.updateItem(data);
	};

	async getItemById(id: number) {
	   return this.itemsRepository.getItemById(id);
	};

	async getItems(searchParams: IFindItemParams, sortParams: ISortItemParams) {
		return this.itemsRepository.getItems(searchParams, sortParams);
	};

	async deleteItem(itemId: number, userData: User) {
		const { id, userRoleId } = userData;

		const existItem = await this.itemsRepository.getItemById(itemId);

		if (!existItem || existItem === null) {
			return {code: 0, message: `товар с идентификатором ${itemId} не существует или его нельзя удалить`};
		};

		if (existItem?.userId === id || userRoleId === EUserRoles.ADMIN ) {
			try {
				await this.itemsRepository.deleteItem(itemId);
				return {code: 1, message: `товар ${existItem?.name} удален`};
			} catch(e) {
				this.loggerService.error(e)
				let errorMessage: string = '';
				if (e instanceof Error) errorMessage = e?.message;
				return {code: 2, message: `ошибка при удалении товара ${existItem?.name}: ${errorMessage}`};
			}
		} else {
			return {code: 2, message: `у Вас недостаточно прав для удаления товара ${existItem?.name}`};
		};
	};
};
