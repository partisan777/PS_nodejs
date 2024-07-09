import { Promotion } from "./promotion.entity";
import { PromotionModel } from "@prisma/client";

export interface IPromotionsRepository {
	createPromotion: (item: Promotion) => Promise<PromotionModel>;
	savePromotion: (item: Promotion) => Promise<PromotionModel>;	
	getPromotionById: (id: number) => Promise<PromotionModel | null>;
	updateStatus: (id: number, newStatusId: number) => Promise<PromotionModel>;
	getPromotions: () => Promise<PromotionModel[] | null>;
};
