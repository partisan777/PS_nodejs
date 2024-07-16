
import { inject, injectable } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { TYPES } from '../../types';
import { Promotion } from './promotion.entity';
import { PromotionCreateDto } from './dto/promotion-create.dto';
import { PromotionSaveDto } from './dto/promotion-save.dto';
import { IPromotionService } from './promotions.service.interface';
import { ERowStatus, EUserRoles } from '../../enum';
import { UserRequestDataDto } from '../users/dto/user-data.dto';
import { PromotionUpdateSatusDto } from './dto/promotion-update-status.dto';
import { IPromotionsRepository } from './promotions.repository.interface';
import { generateSortParamsCondition } from '../../common/generateSortParamsCondition';
import { generateQueryParamsCondition } from '../../common/generateQueryParamsCondition';
import { IFindItemParams, IQueryParams, ISortItemParams } from '../../interfaces';
import { queryPromotionParamDict, sortPromotionParamDict } from '../../dictionares';


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
		const { name, description, discoutnPercent, rowStatusNumber } = createPromotionData;
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

	async savePromotion(savePromotionData: PromotionSaveDto, userData: UserRequestDataDto) {
		const { user, userReqId, userRole } = userData;
		const {id, name, description, discoutnPercent, rowStatusNumber, userId } = savePromotionData;

		const existPromotion = this.promotionsRepository.getPromotionById(id);

		if (!existPromotion) {
			return null;
		};

		const updItem = new Promotion(id, name, description, discoutnPercent, rowStatusNumber, userId);
		return this.promotionsRepository.savePromotion(updItem);
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


	async deletePromotion(id: number, userData: UserRequestDataDto) {
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
