import type { IQueryParams } from "../../../interfaces";
import { IFindItemParams, ISortItemParams } from "../../items/interfaces/params.interface";
import { User } from "../../users";
import { PromotionCreateDto } from "../dto/promotion-create.dto";
import type { Promotion } from "../promotion.entity";

export interface IPromotionsRepository {
	createPromotion: (promo: PromotionCreateDto) => Promise<Promotion | null>;
	getPromotionById: (id: number) => Promise<Promotion | null>;
	updatePromotion: (promotion: Promotion) => Promise<Promotion | null>;
	updatePromotionStatus: (
		id: number,
		newStatusId: number,
	) => Promise<Promotion | null>;
	getPromotions: (
		searchParams: IFindItemParams,
		sortParams: ISortItemParams,
		userData: User
	) => Promise<Promotion[] | null>;
	deletePromotion: (id: number) => Promise<Promotion>;
}
