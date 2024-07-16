
import { inject, injectable } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { TYPES } from '../../types';
import { IFindItemParams, ISortItemParams } from '../../interfaces';
import { ItemCreateDto } from './dto/item-create.dto';
import { Item } from './item.entity';
import { IItemService } from './items.service.interface';
import { ItemSaveDto } from './dto/item-save.dto';
import { ERowStatus, EUserRoles } from '../../enum';
import { generateQueryParamsCondition } from '../../common/generateQueryParamsCondition';
import { queryItemParamDict, sortItemParamDict } from '../../dictionares';
import { IItemsRepository } from './items.repository.interface';
import { IQueryParams } from '../../interfaces';
import { generateSortParamsCondition } from '../../common/generateSortParamsCondition';
import { UserRequestDataDto } from '../users/dto/user-data.dto';

@injectable()
export class ItemService implements IItemService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.ItemsRepository) private itemsRepository: IItemsRepository,
	) {}

	async updateItemStatus (id: number, newStatusId: number, userData: UserRequestDataDto) {
		return this.itemsRepository.updateItemStatus(id, newStatusId);
	};

    async createItem({ name, description, itemTypeNumber, price }: ItemCreateDto, userData: UserRequestDataDto) {
	    const {user, userReqId, userRole } = userData;
		const userId = userReqId;
		const newItem = new Item(-20, name, description, userId, itemTypeNumber, price, ERowStatus.NEW);
		return this.itemsRepository.createItem(newItem);
	};

	async saveItem (data: ItemSaveDto, userData: UserRequestDataDto) {
		const {user, userReqId, userRole } = userData;
		const { id, name, description, userId, itemTypeNumber, price, rowStatusNumber } = data;
		const updItem = new Item(id, name, description, userId, itemTypeNumber, price, rowStatusNumber);
		return this.itemsRepository.saveItem(updItem);
	};

	async getItemById(id: number) {
	   return this.itemsRepository.getItemById(id);
	};

	async getItems(searchParams: IFindItemParams, sortParams: ISortItemParams, userData: UserRequestDataDto) {

		const queryParam: IQueryParams = {FIND: [], SORT: []};
		queryParam.FIND = generateQueryParamsCondition(searchParams, queryItemParamDict);
		queryParam.SORT = generateSortParamsCondition(sortParams, sortItemParamDict);

		return this.itemsRepository.getItems(queryParam);
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
