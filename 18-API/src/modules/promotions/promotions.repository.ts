import { inject, injectable } from 'inversify';
import type { PrismaService } from '../../database/prisma.service';
import type { IQueryParams } from '../../interfaces';
import { TYPES } from '../../types';
import type { IPromotionsRepository } from './interfaces/promotions.repository.interface';
import { Promotion } from './promotion.entity';
import { queryPromotionParamDict, sortPromotionParamDict } from './dictionares/dictionares';
import { IFindItemParams, ISortItemParams } from '../items/interfaces/params.interface';
import { User } from '../users';
import { EUserRoles } from '../user-roles/enums/enums';
import { generateQueryParamsCondition } from '../../common/generateQueryParamsCondition';
import { generateSortParamsCondition } from '../../common/generateSortParamsCondition';
import { PromotionCreateDto } from './dto/promotion-create.dto';

@injectable()
export class PromotionsRepository implements IPromotionsRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async createPromotion(promo: PromotionCreateDto) {
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
 		return new Promotion (createdPromo);
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

		return new Promotion (updatedPromotion);
	};

	async getPromotionById(id: number) {
		const existPromotion = await this.prismaService.client.promotionModel.findFirst({
			where: {
				id: id
			},
		});

		if (!existPromotion) return null;

 		return new Promotion (existPromotion);
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
		return new Promotion (existPromotion);
	};

	async getPromotions(searchParams: IFindItemParams, sortParams: ISortItemParams, userData: User) {
		const { id,userRoleId } = userData;
		const queryParam: IQueryParams = {FIND: [], SORT: []};
		queryParam.FIND = generateQueryParamsCondition(searchParams, queryPromotionParamDict);
		queryParam.SORT = generateSortParamsCondition(sortParams, sortPromotionParamDict);

		if (userRoleId !== EUserRoles.ADMIN) {
			queryParam.FIND.push({userId: id});
		};

		const existsPromotion = await this.prismaService.client.promotionModel.findMany({where: {AND: queryParam.FIND}, orderBy: queryParam.SORT});
		if (!existsPromotion) return null;
		return existsPromotion.map(promo => {
			return new Promotion (promo);
		});
	};

	async deletePromotion(id: number) {
		return this.prismaService.client.promotionModel.delete({where: {id: id}});
	};
};
