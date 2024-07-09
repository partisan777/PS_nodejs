import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../../common/base.controller';
import { HTTPError } from '../../errors/http-error.class';
import { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';
import { IPromotionController } from './promotions.controller.interface';
import { ValidateMiddleware } from '../../common/validate.middleware';
import { IConfigService } from '../../config/config.service.interface';
import { IPromotionService } from './promotions.service.interface';
import { AuthGuard } from '../../common/auth.guard';


@injectable()
export class PromotionController extends BaseController implements IPromotionController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.PromotionService) private promotionService: IPromotionService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/createpromotion',
				method: 'post',
				func: this.createPromotion,
				middlewares: [],
			},
			{
				path: '/getpromotionbyid',
				method: 'get',
				func: this.getPromotionById,
				middlewares: [],
			},
			{
				path: '/savepromotion',
				method: 'get',
				func: this.savePromotion,
				middlewares: [],
			},
			{
				path: '/updatepromotionstatus',
				method: 'post',
				func: this.updatePromotionStatus,
				// middlewares: [new ValidateMiddleware(PromotionUpdateSatusDto)],
				middlewares: [],
			},
			{
				path: '/getpromotions',
				method: 'get',
				func: this.getPromotions,
				middlewares: [],
			}
		]);		
	}

	async createPromotion(req: Request, res: Response, next: NextFunction)  {
		const { name, description, discoutnPercent, rowStatusNumber, userId } = req.body;
		const promotion = await this.promotionService.createPromotion({ name, description, discoutnPercent, rowStatusNumber, userId});
		this.ok(res, promotion );
	};

	async getPromotionById(req: Request, res: Response, next: NextFunction) {
		const id  = req.body.id;
		const item = await this.promotionService.getPromotionById( id );
		this.ok(res,  item );	
	};
		
	async savePromotion(req: Request, res: Response, next: NextFunction) {
		const { id, name, description, discoutnPercent, rowStatusNumber, userId } = req.body;
		const item = await this.promotionService.savePromotion({ id, name, description, discoutnPercent, rowStatusNumber, userId});
		this.ok( res, item );
	};
	
	async updatePromotionStatus(req: Request, res: Response, next: NextFunction) { 
		const { id, rowStatusNumber } = req.body;
		const promotion = await this.promotionService.updatePromotionStatus( id, rowStatusNumber );
		this.ok(res, promotion );

	};

	async getPromotions(req: Request, res: Response, next: NextFunction) { 
		const promotions = await this.promotionService.getPromotions();
		this.ok(res, promotions );	
	};
};
