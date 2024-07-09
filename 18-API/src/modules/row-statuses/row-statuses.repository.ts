import { inject, injectable } from 'inversify';
import { PrismaService } from '../../database/prisma.service';
import { TYPES } from '../../types';
import { IRowStatusRepository } from './row-statuses.repository.interface';
import { RowStatusModel } from '@prisma/client';

@injectable()
export class RowStatusRepository implements IRowStatusRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
	
	async getRowStatusByNumber(rowStatusNumber: number): Promise<RowStatusModel | null> {
		return this.prismaService.client.rowStatusModel.findFirst({
			where: {
				statusNumber: rowStatusNumber				
			},
		});
	};
	
	async getRowStatuses() {
		return this.prismaService.client.rowStatusModel.findMany();
	};
};
