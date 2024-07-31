import { inject, injectable } from 'inversify';
import type { PrismaService } from '../../database/prisma.service';
import { TYPES } from '../../types';
import type { IObjectStatusRepository } from './interfaces/object-statuses.repository.interface';
import { ObjectStatus } from './object-status.entity';

@injectable()
export class ObjectStatusRepository implements IObjectStatusRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async getObjectStatusById(objectStatusId: number) {
		const existObjectStatus = await this.prismaService.client.objectStatusModel.findFirst({
			where: {
				id: objectStatusId
			},
		});
		if (!existObjectStatus) return null;

		return new ObjectStatus(
			existObjectStatus.id,
			existObjectStatus.description
		);
	};

	async getObjectStatuses() {
		const existObjectStatuses = await this.prismaService.client.objectStatusModel.findMany();
		if (!existObjectStatuses) return null;

		return existObjectStatuses.map( item => {
			return new ObjectStatus(
				item.id,
				item.description
			);
		})
	};
};
