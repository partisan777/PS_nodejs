
import { inject, injectable } from 'inversify';
import { EObjectStatus } from '../object-statuses/enums/enums';
import { EUserRoles } from '../user-roles/enums/enums';
import { TYPES } from '../../types';
import type { IFindItemParams, ISortItemParams } from '../items/interfaces/params.interface';
import type { PromotionSaveDto } from './dto/promotion-save.dto';
import type { PromotionUpdateSatusDto } from './dto/promotion-update-status.dto';
import type { IPromotionsRepository } from './interfaces/promotions.repository.interface';
import type { IPromotionService } from './interfaces/promotions.service.interface';
import type { Promotion } from './promotion.entity';
import { User } from '../users';
import { PromotionReqCreateDto } from './dto/promotion-req-create.dto';
import { PromotionCreateDto } from './dto/promotion-create.dto';
import { ILogger } from '../../logger/logger.interface';


@injectable()
export class PromotionService implements IPromotionService {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.PromotionsRepository) private promotionsRepository: IPromotionsRepository,
	) {}

	async updatePromotionStatus(updateData: PromotionUpdateSatusDto) {
		const {id, newStatusNumber} = updateData;
		return this.promotionsRepository.updatePromotionStatus(id, newStatusNumber);
	};

    async createPromotion(createPromotionData: PromotionReqCreateDto, userData: User ) {
		const { id } = userData;
		const newPromotion: PromotionCreateDto = {...createPromotionData, objectStatusId: EObjectStatus.NEW, userId: id };
	 	return this.promotionsRepository.createPromotion(newPromotion);
	};

	async getPromotionById(promoId: number, userData: User ) {
		const { id, userRoleId } = userData;

		const existPromotion = await this.promotionsRepository.getPromotionById(promoId);

		if (existPromotion?.userId === id || userRoleId === EUserRoles.ADMIN) {
			return this.promotionsRepository.getPromotionById(promoId);
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
		const updItem: Promotion = {id, name, description, discoutnPercent, objectStatusId, userId};
		return this.promotionsRepository.updatePromotion(updItem);
	};


	async getPromotions(searchParams: IFindItemParams, sortParams: ISortItemParams, userData: User) {
		return this.promotionsRepository.getPromotions(searchParams, sortParams, userData);
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
			this.loggerService.error(e);
			let errorMessage: string = '';
			if (e instanceof Error) errorMessage = e?.message;
			return {code: 2, message: `ошибка при удалении промоакции ${existPromotion.name}: ${errorMessage}`};
		};
	};
};
