import { inject, injectable } from 'inversify';
import { PrismaService } from '../../database/prisma.service';
import { TYPES } from '../../types';
import { PromotionModel } from '@prisma/client';
import { IPromotionsRepository } from './promotions.repository.interface';
import { Promotion } from './promotion.entity';
import { IQueryParams } from '../../interfaces';


@injectable()
export class PromotionsRepository implements IPromotionsRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async createPromotion(promo: Promotion): Promise<PromotionModel> {
		return this.prismaService.client.promotionModel.create({
			data: {
				description: promo.description,
				name: promo.name,
				discoutnPercent: promo.discoutnPercent,
				rowStatusNumber: promo.rowStatusNumber,
				userId: promo.userId
			},
		});
	};

	async savePromotion(promo: Promotion): Promise<PromotionModel> {
		return this.prismaService.client.promotionModel.update({
			where: {
				id: promo.id
			},
			data: {
				description: promo.description,
				name: promo.name,
				discoutnPercent: promo.discoutnPercent,
				rowStatusNumber: promo.rowStatusNumber,
				userId: promo.userId
			}
		});
	};

	async getPromotionById(id: number): Promise<PromotionModel | null> {
		return this.prismaService.client.promotionModel.findFirst({
			where: {
				id: id
			},
		});
	};

	async updatePromotionStatus(id: number, newStatusId: number): Promise<PromotionModel> {
		return this.prismaService.client.promotionModel.update({
			where: {
				id: id
			},
			data: {
				rowStatusNumber: newStatusId,
			},
		});
	};

	async getPromotions(queryParams: IQueryParams) {
		const whereCondition = {AND: queryParams.FIND};
		const sortCondition = queryParams.SORT;
		return this.prismaService.client.promotionModel.findMany({where: whereCondition, orderBy: sortCondition});
	};

	async deletePromotion(id: number) {
		return this.prismaService.client.promotionModel.delete({where: {id: id}});
	};
};
