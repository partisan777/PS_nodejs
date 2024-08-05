import { inject, injectable } from 'inversify';
import type { PrismaService } from '../../database/prisma.service';
import { TYPES } from '../../types';
import type { IItemTypesRepository } from './interfaces/item-types.repository.interface';
import { ItemType } from './item-type.entity';

@injectable()
export class ItemTypesRepository implements IItemTypesRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async getItemTypeById(itemTypeId: number) {
		const obj = await this.prismaService.client.itemTypeModel.findFirst({
			where: {
				id: itemTypeId
			},
		});
		if (!obj) return null;

		return new ItemType(obj);
	};

	async getItemTypes() {
		const itemTypes = await this.prismaService.client.itemTypeModel.findMany();
		if (!itemTypes) return null;
		return itemTypes.map(obj => new ItemType(obj));
	};
};
