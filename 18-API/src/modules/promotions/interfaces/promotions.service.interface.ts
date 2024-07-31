import { PromotionCreateDto } from '../dto/promotion-create.dto';
import { PromotionUpdateSatusDto } from '../dto/promotion-update-status.dto';
import { PromotionSaveDto } from '../dto/promotion-save.dto';
import { UserRequestDataDto } from '../../users/dto/user-data.dto';
import { IFindPromotionParams, ISortPromotionParams } from './params.interface';
import { Promotion } from '../promotion.entity';

export interface IPromotionService {
	createPromotion: (promoDto: PromotionCreateDto, userData: UserRequestDataDto) => Promise<Promotion | null>;
	getPromotionById: (id: number, userData: UserRequestDataDto) => Promise<Promotion | null>;
	updatePromotion: (dto: PromotionSaveDto ) => Promise<any>;
	updatePromotionStatus: (updateData: PromotionUpdateSatusDto, userData: UserRequestDataDto) => Promise<Promotion | null >;
	getPromotions: (searchParams: IFindPromotionParams, sortParams: ISortPromotionParams, userData: UserRequestDataDto) => Promise<Promotion[] | null >;
	deletePromotion: ( id: number ) => Promise<Record<string, string | number>>;
};
