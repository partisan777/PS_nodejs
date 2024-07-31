import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../../common/base.controller';
import { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';
import { IPromotionController } from './interfaces/promotions.controller.interface';
import { ValidateMiddleware } from '../../common/validate.middleware';
import { IPromotionService } from './interfaces/promotions.service.interface';
import { AuthGuard } from '../../common/auth.guard';
import { PromotionSaveDto } from './dto/promotion-save.dto';
import { PromotionCreateDto } from './dto/promotion-create.dto';
import { CheckUserRole } from '../../common/checkUserRole.middleware';
import { EUserRoles } from '../../enum';
import { PromotionUpdateSatusDto } from './dto/promotion-update-status.dto';
import { GetRequestPromotionDto } from './dto/promotion-get.dto';
import { IFindPromotionParams, ISortPromotionParams } from './interfaces/params.interface';

@injectable()
export class PromotionController extends BaseController implements IPromotionController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.PromotionService) private promotionService: IPromotionService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/create-promotion',
				method: 'post',
				func: this.createPromotion,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN, EUserRoles.SHIPPER]), new ValidateMiddleware(PromotionCreateDto)],
			},
			{
				path: '/get-promotion-by-id',
				method: 'get',
				func: this.getPromotionById,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN, EUserRoles.SHIPPER])],
			},
			{
				path: '/update-promotion',
				method: 'post',
				func: this.updatePromotion,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN]), new ValidateMiddleware(PromotionSaveDto)],
			},
			{
				path: '/update-promotion-status',
				method: 'post',
				func: this.updatePromotionStatus,
				middlewares:  [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN]), new ValidateMiddleware(PromotionUpdateSatusDto)],
			},
			{
				path: '/get-promotions',
				method: 'get',
				func: this.getPromotions,
				middlewares:  [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN, EUserRoles.SHIPPER]), new ValidateMiddleware(GetRequestPromotionDto)],
			},
			{
				path: '/delete-promotion',
				method: 'delete',
				func: this.deletePromotion,
				middlewares:  [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN])],
			},
		]);
	}

	async createPromotion(req: Request<{}, {}, PromotionCreateDto>, res: Response, next: NextFunction)  {
		const { name, description, discoutnPercent, objectStatusId} = req.body;
		const promotion = await this.promotionService.createPromotion({ name, description, discoutnPercent, objectStatusId}, req.userReqData);
		this.ok(res, promotion );
	};

	async getPromotionById(req: Request, res: Response, next: NextFunction) {
		const id  = req.body.id;
		const item = await this.promotionService.getPromotionById( id, req.userReqData );
		this.ok(res, item );
	};

	async updatePromotion(req: Request<{}, {}, PromotionSaveDto>, res: Response, next: NextFunction) {
		const { id, name, description, discoutnPercent, objectStatusId, userId } = req.body;
		const item = await this.promotionService.updatePromotion({ id, name, description, discoutnPercent, objectStatusId, userId });
		this.ok( res, item );
	};

	async updatePromotionStatus(req: Request<{}, {}, PromotionUpdateSatusDto>, res: Response, next: NextFunction) {
		const { id, newStatusNumber } = req.body;
		const promotion = await this.promotionService.updatePromotionStatus( { id, newStatusNumber }, req.userReqData );
		this.ok(res, promotion );

	};

	async getPromotions(req: Request, res: Response, next: NextFunction) {
		let sortParams: ISortPromotionParams = req.body.getParams?.sortParams || {};
		let searchParams: IFindPromotionParams = req.body.getParams?.searchParams || {};
		const promotions = await this.promotionService.getPromotions(searchParams, sortParams, req.userReqData );
		this.ok(res, promotions );
	};

	async deletePromotion(req: Request, res: Response, next: NextFunction) {
		const { id } = req.body;
		const deletedPromotion = await this.promotionService.deletePromotion( id );
		this.ok(res, deletedPromotion );
	};
};
