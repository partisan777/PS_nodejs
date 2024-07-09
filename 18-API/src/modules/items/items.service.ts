
import { inject, injectable } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { TYPES } from '../../types';
import { ItemCreateDto } from './dto/item-create.dto';
import { Item } from './item.entity';
import { IItemService } from './items.service.interface';
import { ItemSaveDto } from './dto/item-save.dto';

@injectable()
export class ItemService implements IItemService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.ItemsRepository) private itemsRepository: IItemService,
	) {}
	
	async updateItemStatus (id: number, newStatusId: number) {
		return this.itemsRepository.updateItemStatus(id, newStatusId);		
	};	
    
    async createItem({ name, description, price, }: ItemCreateDto) {
	    const newItem = new Item(-20, name, description, price, 1);
		return this.itemsRepository.createItem(newItem);
	};

	async saveItem ({ id, name, description, price, rowStatusNumber }: ItemSaveDto) {
		const updItem = new Item(id, name, description, price, rowStatusNumber);
		return this.itemsRepository.saveItem(updItem);
	};

	async getItemById(id: number) {
	   return this.itemsRepository.getItemById(id);
	};

	async getItems() {
		return this.itemsRepository.getItems();
	 };
};
