
import { inject, injectable } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { TYPES } from '../../types';
import type { IItemTypesService } from './interfaces/item-types.service.interface';

@injectable()
export class ItemTypesService implements IItemTypesService {
	constructor(
		@inject(TYPES.ItemTypesRepository) private itemsTypesRepository: IItemTypesService,
	) {}

	async getItemTypeById(itemTypeId: number) {
	   return this.itemsTypesRepository.getItemTypeById(itemTypeId);
	};

	async getItemTypes() {
		return this.itemsTypesRepository.getItemTypes();
	};
};
