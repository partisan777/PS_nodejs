import { Promotion } from "../promotion.entity";
import { IQueryParams } from "../../../interfaces";

export interface IPromotionsRepository {
	createPromotion: (item: Promotion) => Promise<Promotion | null>;
	getPromotionById: (id: number) => Promise<Promotion | null>;
	updatePromotion: (promotion: Promotion) => Promise<Promotion | null>;
	updatePromotionStatus: (id: number, newStatusId: number) => Promise<Promotion | null>;
	getPromotions: (queryParams: IQueryParams) => Promise<Promotion[] | null>;
	deletePromotion: (id: number) => Promise<Promotion>;
};
