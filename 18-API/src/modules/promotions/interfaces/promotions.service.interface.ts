import type { User } from "../../users";
import type { PromotionReqCreateDto } from "../dto/promotion-req-create.dto";
import type { PromotionSaveDto } from "../dto/promotion-save.dto";
import type { PromotionUpdateSatusDto } from "../dto/promotion-update-status.dto";
import type { Promotion } from "../promotion.entity";
import type {
	IFindPromotionParams,
	ISortPromotionParams,
} from "./params.interface";

export interface IPromotionService {
	createPromotion: (
		promoDto: PromotionReqCreateDto,
		userData: User,
	) => Promise<Promotion | null>;
	getPromotionById: (
		promoId: number,
		userData: User,
	) => Promise<Promotion | null>;
	updatePromotion: (dto: PromotionSaveDto) => Promise<any>;
	updatePromotionStatus: (
		updateData: PromotionUpdateSatusDto,
		userData: User,
	) => Promise<Promotion | null>;
	getPromotions: (
		searchParams: IFindPromotionParams,
		sortParams: ISortPromotionParams,
		userData: User,
	) => Promise<Promotion[] | null>;
	deletePromotion: (id: number) => Promise<Record<string, string | number>>;
}
