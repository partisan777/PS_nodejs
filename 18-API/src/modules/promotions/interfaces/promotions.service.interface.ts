import type { UserRequestDataDto } from "../../users/dto/user-data.dto";
import type { PromotionCreateDto } from "../dto/promotion-create.dto";
import type { PromotionSaveDto } from "../dto/promotion-save.dto";
import type { PromotionUpdateSatusDto } from "../dto/promotion-update-status.dto";
import type { Promotion } from "../promotion.entity";
import type {
	IFindPromotionParams,
	ISortPromotionParams,
} from "./params.interface";

export interface IPromotionService {
	createPromotion: (
		promoDto: PromotionCreateDto,
		userData: UserRequestDataDto,
	) => Promise<Promotion | null>;
	getPromotionById: (
		id: number,
		userData: UserRequestDataDto,
	) => Promise<Promotion | null>;
	updatePromotion: (dto: PromotionSaveDto) => Promise<any>;
	updatePromotionStatus: (
		updateData: PromotionUpdateSatusDto,
		userData: UserRequestDataDto,
	) => Promise<Promotion | null>;
	getPromotions: (
		searchParams: IFindPromotionParams,
		sortParams: ISortPromotionParams,
		userData: UserRequestDataDto,
	) => Promise<Promotion[] | null>;
	deletePromotion: (id: number) => Promise<Record<string, string | number>>;
}
