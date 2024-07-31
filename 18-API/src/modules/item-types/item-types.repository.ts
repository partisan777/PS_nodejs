import { inject, injectable } from 'inversify';
import { PrismaService } from '../../database/prisma.service';
import { TYPES } from '../../types';
import { IItemTypesRepository } from './interfaces/item-types.repository.interface';
import { ItemTypeModel } from '@prisma/client';
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

		return new ItemType(obj.id,  obj.description , obj.objectStatusId);
	};

	async getItemTypes() {
		const itemTypes = await this.prismaService.client.itemTypeModel.findMany();

		if (!itemTypes) return null;

		return itemTypes.map(obj => {
			return new ItemType(obj.id,  obj.description , obj.objectStatusId)
		});
	};
};
