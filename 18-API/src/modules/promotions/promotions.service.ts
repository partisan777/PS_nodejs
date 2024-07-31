
import { inject, injectable } from 'inversify';
import { generateQueryParamsCondition } from '../../common/generateQueryParamsCondition';
import { generateSortParamsCondition } from '../../common/generateSortParamsCondition';
import type { IConfigService } from '../../config/config.service.interface';
import { ERowStatus, EUserRoles } from '../../enum';
import type { IQueryParams } from '../../interfaces';
import { TYPES } from '../../types';
import type { IFindItemParams, ISortItemParams } from '../items/interfaces/params.interface';
import type { UserRequestDataDto } from '../users/dto/user-data.dto';
import { queryPromotionParamDict, sortPromotionParamDict } from './dictionares/dictionares';
import type { PromotionCreateDto } from './dto/promotion-create.dto';
import type { PromotionSaveDto } from './dto/promotion-save.dto';
import type { PromotionUpdateSatusDto } from './dto/promotion-update-status.dto';
import type { IPromotionsRepository } from './interfaces/promotions.repository.interface';
import type { IPromotionService } from './interfaces/promotions.service.interface';
import { Promotion } from './promotion.entity';


@injectable()
export class PromotionService implements IPromotionService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PromotionsRepository) private promotionsRepository: IPromotionsRepository,
	) {}

	async updatePromotionStatus(updateData: PromotionUpdateSatusDto, UserRequestData: UserRequestDataDto) {
		const {id, newStatusNumber} = updateData;
		return this.promotionsRepository.updatePromotionStatus(id, newStatusNumber);
	};

    async createPromotion(createPromotionData: PromotionCreateDto, userData: UserRequestDataDto ) {
		const { name, description, discoutnPercent, objectStatusId } = createPromotionData;
		const { user, userReqId, userRole } = userData;
		const newPromotion = new Promotion(-20, name, description, discoutnPercent, ERowStatus.NEW, userReqId );
	 	return this.promotionsRepository.createPromotion(newPromotion);
	};

	async getPromotionById(id: number, userData: UserRequestDataDto ) {
		const { user, userReqId, userRole } = userData;

		const existPromotion = await this.promotionsRepository.getPromotionById(id);

		if (existPromotion?.userId === userReqId || userRole === EUserRoles.ADMIN) {
			return this.promotionsRepository.getPromotionById(id);
		} else {
			return null;
		};
	};

	async updatePromotion(savePromotionData: PromotionSaveDto,) {
		const {id, name, description, discoutnPercent, objectStatusId, userId } = savePromotionData;

		const existPromotion = this.promotionsRepository.getPromotionById(id);

		if (!existPromotion) {
			return null;
		};

		const updItem = new Promotion(id, name, description, discoutnPercent, objectStatusId, userId);
		return this.promotionsRepository.updatePromotion(updItem);
	};


	async getPromotions(searchParams: IFindItemParams, sortParams: ISortItemParams, userData: UserRequestDataDto) {
		const { user, userReqId, userRole } = userData;
		const queryParam: IQueryParams = {FIND: [], SORT: []};

		queryParam.FIND = generateQueryParamsCondition(searchParams, queryPromotionParamDict);
		queryParam.SORT = generateSortParamsCondition(sortParams, sortPromotionParamDict);


		if (userRole !== EUserRoles.ADMIN) {
			queryParam.FIND.push({userId: userReqId});
		};
		return this.promotionsRepository.getPromotions(queryParam);
	};


	async deletePromotion(id: number) {
		const existPromotion = await this.promotionsRepository.getPromotionById(id);

		if (!existPromotion || existPromotion === null) {
			return {code: 0, message: `промоакции с идентификатором ${id} не существует или ее нельзя удалить`};
		}
		try {
			await this.promotionsRepository.deletePromotion(id);
			return {code: 1, message: `промоакция ${existPromotion.name} удалена`};
		} catch(e) {
			return {code: 2, message: `ошибка при удалении промоакции ${existPromotion.name}`};
		};
	};
};
