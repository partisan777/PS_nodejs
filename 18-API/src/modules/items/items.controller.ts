import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../../common/base.controller';
import { HTTPError } from '../../errors/http-error.class';
import { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';
import { IFindItemParams, ISortItemParams } from '../../interfaces';
import { IItemController } from './items.controller.interface';
import { ValidateMiddleware } from '../../common/validate.middleware';
import { IConfigService } from '../../config/config.service.interface';
import { IItemService } from './items.service.interface';
import { ItemUpdateSatusDto } from './dto/item-update-status.dto';
import { AuthGuard } from '../../common/auth.guard';
import { CheckUserRole } from '../../common/checkUserRole.middleware';
import { EUserRoles } from '../../enum';
import { ItemCreateDto } from './dto/item-create.dto';
// middlewares:  [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN]), new ValidateMiddleware(PromotionUpdateSatusDto)],

@injectable()
export class ItemController extends BaseController implements IItemController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.ItemService) private itemService: IItemService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/createitem',
				method: 'post',
				func: this.createItem,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN, EUserRoles.SHIPPER]), new ValidateMiddleware(ItemCreateDto)],
			},
			{
				path: '/getitembyid',
				method: 'get',
				func: this.getItemById,
				middlewares: [new AuthGuard()],
			},
			{
				path: '/saveitem',
				method: 'post',
				func: this.saveItem,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN])],
			},
			{
				path: '/updateitemstatus',
				method: 'post',
				func: this.updateItemStatus,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN]), new ValidateMiddleware(ItemUpdateSatusDto)],
			},
			{
				path: '/getitems',
				method: 'get',
				func: this.getItems,
				middlewares: [new AuthGuard()],
			},
			{
				path: '/deleteitembyid',
				method: 'delete',
				func: this.deleteItem,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN])],
			}
		]);

	}

	async createItem(req: Request, res: Response, next: NextFunction)  {
		const {user, userReqId, userRole } = req;
		const { name, description, itemTypeNumber, price } = req.body;
		const item = await this.itemService.createItem({name, description, itemTypeNumber, price}, { user, userReqId, userRole });
		this.ok(res,  item );
	};

	async getItemById(req: Request, res: Response, next: NextFunction) {
		const {user, userReqId, userRole } = req;
		const id  = req.body.id;
		const item = await this.itemService.getItemById( id, {user, userReqId, userRole } );
		this.ok(res,  item );
	};

	async saveItem(req: Request, res: Response, next: NextFunction) {
		const {user, userReqId, userRole } = req;
		const { id, name, description, userId, price, itemTypeNumber, rowStatusNumber } = req.body;
		const item = await this.itemService.saveItem( {id, name, description, userId, price, itemTypeNumber, rowStatusNumber}, {user, userReqId, userRole } );
		this.ok( res, item );
	};

	async updateItemStatus(req: Request, res: Response, next: NextFunction) {
		const {user, userReqId, userRole } = req;
		const { id, rowStatusNumber, userRoleNumber } = req.body;
		const item = await this.itemService.updateItemStatus( id, rowStatusNumber, {user, userReqId, userRole } );
		this.ok(res, item);

	};

	async getItems(req: Request, res: Response, next: NextFunction) {
		const {user, userReqId, userRole } = req;
		let sortParams: ISortItemParams = req.body.getParams?.sortParams || {};
		let searchParams: IFindItemParams = req.body.getParams?.searchParams || {};
		const items = await this.itemService.getItems(searchParams, sortParams, {user, userReqId, userRole } );
		this.ok( res, items );
	};

	async deleteItem(req: Request, res: Response, next: NextFunction) {
		const {user, userReqId, userRole } = req;
		const id = req.body.id;
		const message = await this.itemService.deleteItem(id, {user, userReqId, userRole });
		this.ok( res, message );
	};
};
