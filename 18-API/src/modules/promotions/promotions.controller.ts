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
import { PromotionSaveDto } from './dto/promotion-save.dto';
import { PromotionCreateDto } from './dto/promotion-create.dto';
import { CheckUserRole } from '../../common/checkUserRole.middleware';
import { EUserRoles } from '../../enum';
import { UserRequestDataDto } from '../users/dto/user-data.dto';
import { PromotionUpdateSatusDto } from './dto/promotion-update-status.dto';
import { IFindItemParams, ISortItemParams } from '../../interfaces';
import { GetPromotinDto, GetRequestPromotinDto } from './dto/promotion-get.dto';


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
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN, EUserRoles.SHIPPER]), new ValidateMiddleware(PromotionCreateDto)],
			},
			{
				path: '/getpromotionbyid',
				method: 'get',
				func: this.getPromotionById,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN, EUserRoles.SHIPPER])],
			},
			{
				path: '/savepromotion',
				method: 'post',
				func: this.savePromotion,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN]), new ValidateMiddleware(PromotionSaveDto)],
			},
			{
				path: '/updatepromotionstatus',
				method: 'post',
				func: this.updatePromotionStatus,
				middlewares:  [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN]), new ValidateMiddleware(PromotionUpdateSatusDto)],
			},
			{
				path: '/getpromotions',
				method: 'get',
				func: this.getPromotions,
				middlewares:  [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN, EUserRoles.SHIPPER]), new ValidateMiddleware(GetRequestPromotinDto)],
			},
			{
				path: '/deletepromotion',
				method: 'delete',
				func: this.deletePromotion,
				middlewares:  [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN])],
			},
		]);
	}

	async createPromotion(req: Request<{}, {}, PromotionCreateDto>, res: Response, next: NextFunction)  {
		const { user, userReqId, userRole } = req;
		const { name, description, discoutnPercent, rowStatusNumber} = req.body;
		const promotion = await this.promotionService.createPromotion({ name, description, discoutnPercent, rowStatusNumber}, { user, userReqId, userRole });
		this.ok(res, promotion );
	};

	async getPromotionById(req: Request, res: Response, next: NextFunction) {
		const { user, userReqId, userRole } = req;
		const id  = req.body.id;
		const item = await this.promotionService.getPromotionById( id, { user, userReqId, userRole }  );
		this.ok(res,  item );
	};

	async savePromotion(req: Request<{}, {}, PromotionSaveDto>, res: Response, next: NextFunction) {
		const { user, userRole, userReqId } = req;
		const { id, name, description, discoutnPercent, rowStatusNumber, userId } = req.body;
		const item = await this.promotionService.savePromotion({ id, name, description, discoutnPercent, rowStatusNumber, userId }, { user, userReqId, userRole });
		this.ok( res, item );
	};

	async updatePromotionStatus(req: Request<{}, {}, PromotionUpdateSatusDto>, res: Response, next: NextFunction) {
		const { user, userRole, userReqId } = req;
		const { id, newStatusNumber } = req.body;
		const promotion = await this.promotionService.updatePromotionStatus( {id, newStatusNumber}, { user, userReqId, userRole } );
		this.ok(res, promotion );

	};

	async getPromotions(req: Request, res: Response, next: NextFunction) {
		let sortParams: ISortItemParams = req.body.getParams?.sortParams || {};
		let searchParams: IFindItemParams = req.body.getParams?.searchParams || {};
		const { user, userRole, userReqId } = req;
		const promotions = await this.promotionService.getPromotions(searchParams, sortParams, { user, userRole, userReqId } );
		this.ok(res, promotions );
	};

	async deletePromotion(req: Request, res: Response, next: NextFunction) {
		const { user, userRole, userReqId } = req;
		const { id } = req.body;
		const deletedPromotion = await this.promotionService.deletePromotion( id, { user, userReqId, userRole } )
		this.ok(res, deletedPromotion );
	};
};
