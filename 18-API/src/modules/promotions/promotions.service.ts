
import { inject, injectable } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { TYPES } from '../../types';
import { Promotion } from './promotion.entity';
import { PromotionCreateDto } from './dto/promotion-create.dto';
import { PromotionSaveDto } from './dto/promotion-save.dto';
import { IPromotionService } from './promotions.service.interface';
import { ERowStatus } from '../../enum';


@injectable()
export class PromotionService implements IPromotionService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PromotionsRepository) private promotionsRepository: IPromotionService,
	) {}
	
	async updatePromotionStatus (id: number, newStatusId: number) {
		return this.promotionsRepository.updatePromotionStatus(id, newStatusId);		
	};	
    
    async createPromotion({  name, description, discoutnPercent, rowStatusNumber, userId }: PromotionCreateDto) {	    
		const newPromotion = new Promotion(-20,  name, description, discoutnPercent, ERowStatus.NEW, userId );		
	 	return this.promotionsRepository.createPromotion(newPromotion);
	};

	async getPromotionById(promoId: number) { 
		return this.promotionsRepository.getPromotionById(promoId);
	};

	async savePromotion ({id,  name, description, discoutnPercent, rowStatusNumber, userId }: PromotionSaveDto) {
		const updItem = new Promotion(id, name, description, discoutnPercent, rowStatusNumber, userId);
		return this.promotionsRepository.savePromotion(updItem);
	};

	async getPromotions() {
		return this.promotionsRepository.getPromotions();
	 };
	
};
