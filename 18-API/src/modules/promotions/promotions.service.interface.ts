import { ItemModel } from '@prisma/client';
import { PromotionCreateDto } from './dto/promotion-create.dto';
import { PromotionUpdateSatusDto } from './dto/promotion-update-status.dto';
import { PromotionSaveDto } from './dto/promotion-save.dto';


export interface IPromotionService {
	createPromotion: (dto: PromotionCreateDto) => Promise<ItemModel>;
	getPromotionById: (id: number) => Promise<ItemModel | null>;
	savePromotion: (dto: PromotionSaveDto) => Promise<any>;
	updatePromotionStatus: (id: number, promoId: number) => Promise<ItemModel>;
	getPromotions: () => Promise<ItemModel[] | null >;
};
