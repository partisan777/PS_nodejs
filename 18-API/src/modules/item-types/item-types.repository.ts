import { inject, injectable } from 'inversify';
import { PrismaService } from '../../database/prisma.service';
import { TYPES } from '../../types';
import { IItemTypesRepository } from './item-types.repository.interface';
import { ItemTypeModel } from '@prisma/client';

@injectable()
export class ItemTypesRepository implements IItemTypesRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async getItemTypeByNumber(itemTypeNumber: number): Promise<ItemTypeModel | null> {
		return this.prismaService.client.itemTypeModel.findFirst({
			where: {
				itemTypeNumber: itemTypeNumber
			},
		});
	};

	async getItemTypes() {
		return this.prismaService.client.itemTypeModel.findMany();
	};
};
