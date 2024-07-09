
import { inject, injectable } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { TYPES } from '../../types';
import { IItemTypesService } from './item-types.service.interface';

@injectable()
export class ItemTypesService implements IItemTypesService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.ItemTypesRepository) private itemsTypesRepository: IItemTypesService,
	) {}
	
	async getItemTypeByNumber(itemTypeNumber: number) {
	   return this.itemsTypesRepository.getItemTypeByNumber(itemTypeNumber);
	};

	async getItemTypes() {
		return this.itemsTypesRepository.getItemTypes();
	};	
};
