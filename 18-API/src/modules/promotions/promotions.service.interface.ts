import { PromotionModel } from '@prisma/client';
import { PromotionCreateDto } from './dto/promotion-create.dto';
import { PromotionUpdateSatusDto } from './dto/promotion-update-status.dto';
import { PromotionSaveDto } from './dto/promotion-save.dto';
import { UserRequestDataDto } from '../users/dto/user-data.dto';
import { IFindItemParams, ISortItemParams } from '../../interfaces';

export interface IPromotionService {
	createPromotion: (promoDto: PromotionCreateDto, userData: UserRequestDataDto) => Promise<PromotionModel>;
	getPromotionById: (id: number, userData: UserRequestDataDto) => Promise<PromotionModel | null>;
	savePromotion: (dto: PromotionSaveDto, userData: UserRequestDataDto) => Promise<any>;
	updatePromotionStatus: (updateData: PromotionUpdateSatusDto, userData: UserRequestDataDto) => Promise<PromotionModel>;
	getPromotions: (searchParams: IFindItemParams, sortParams: ISortItemParams, userData: UserRequestDataDto) => Promise<PromotionModel[] | null >;
	deletePromotion: (id: number, userData: UserRequestDataDto) => Promise<Record<string, string | number>>;
};
