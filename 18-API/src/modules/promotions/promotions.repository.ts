import { inject, injectable } from 'inversify';
import { PrismaService } from '../../database/prisma.service';
import { TYPES } from '../../types';
import { IPromotionsRepository } from './interfaces/promotions.repository.interface';
import { Promotion } from './promotion.entity';
import { IQueryParams } from '../../interfaces';


@injectable()
export class PromotionsRepository implements IPromotionsRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async createPromotion(promo: Promotion) {
		const createdPromo = await this.prismaService.client.promotionModel.create({
			data: {
				description: promo.description,
				name: promo.name,
				discoutnPercent: promo.discoutnPercent,
				objectStatusId: promo.objectStatusId,
				userId: promo.userId
			},
		});
		if (!createdPromo) return null;
 		return new Promotion (
			createdPromo.id,
			createdPromo.name,
			createdPromo.description,
			createdPromo.discoutnPercent,
			createdPromo.objectStatusId,
			createdPromo.userId
		);
	};

	async updatePromotion(promo: Promotion) {
		const updatedPromotion = await this.prismaService.client.promotionModel.update({
			where: {
				id: promo.id
			},
			data: {
				description: promo.description,
				name: promo.name,
				discoutnPercent: promo.discoutnPercent,
				objectStatusId: promo.objectStatusId,
				userId: promo.userId
			}
		});

		if (!updatedPromotion) return null;

		return new Promotion (
			updatedPromotion.id,
			updatedPromotion.name,
			updatedPromotion.description,
			updatedPromotion.discoutnPercent,
			updatedPromotion.objectStatusId,
			updatedPromotion.userId
		);
	};

	async getPromotionById(id: number) {
		const existPromotion = await this.prismaService.client.promotionModel.findFirst({
			where: {
				id: id
			},
		});

		if (!existPromotion) return null;

 		return new Promotion (
			existPromotion.id,
			existPromotion.name,
			existPromotion.description,
			existPromotion.discoutnPercent,
			existPromotion.objectStatusId,
			existPromotion.userId
		);
	};

	async updatePromotionStatus(id: number, newStatusId: number) {
		const existPromotion = await this.prismaService.client.promotionModel.update({
			where: {
				id: id
			},
			data: {
				objectStatusId: newStatusId,
			},
		});

		if (!existPromotion) return null;
		return new Promotion (
		   existPromotion.id,
		   existPromotion.name,
		   existPromotion.description,
		   existPromotion.discoutnPercent,
		   existPromotion.objectStatusId,
		   existPromotion.userId
	   );
	};

	async getPromotions(queryParams: IQueryParams) {
		const whereCondition = {AND: queryParams.FIND};
		const sortCondition = queryParams.SORT;
		const existsPromotion = await  this.prismaService.client.promotionModel.findMany({where: whereCondition, orderBy: sortCondition});
		if (!existsPromotion) return null;
		return existsPromotion.map(promo => {
			return new Promotion (
				promo.id,
				promo.name,
				promo.description,
				promo.discoutnPercent,
				promo.objectStatusId,
				promo.userId
			);
		});
	};

	async deletePromotion(id: number) {
		return this.prismaService.client.promotionModel.delete({where: {id: id}});
	};
};
