import { Promotion } from "./promotion.entity";
import { PromotionModel } from "@prisma/client";
import { IQueryParams } from "../../interfaces";

export interface IPromotionsRepository {
	createPromotion: (item: Promotion) => Promise<PromotionModel>;
	getPromotionById: (id: number) => Promise<PromotionModel | null>;
	savePromotion: (item: Promotion) => Promise<PromotionModel>;
	updatePromotionStatus: (id: number, newStatusId: number) => Promise<PromotionModel>;
	getPromotions: (queryParams: IQueryParams) => Promise<PromotionModel[] | null>;
	deletePromotion: (id: number) => Promise<PromotionModel>;
};
