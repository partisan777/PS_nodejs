import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../../common/base.controller';
import { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';
import { IFindItemParams, ISortItemParams } from './interfaces/params.interface';
import { IItemController } from './interfaces/items.controller.interface';
import { ValidateMiddleware } from '../../common/validate.middleware';
import { IConfigService } from '../../config/config.service.interface';
import { IItemService } from './interfaces/items.service.interface';
import { ItemUpdateSatusDto } from './dto/item-update-status.dto';
import { AuthGuard } from '../../common/auth.guard';
import { CheckUserRole } from '../../common/checkUserRole.middleware';
import { EUserRoles } from '../../enum';
import { ItemCreateDto } from './dto/item-create.dto';
import { GetItemDto } from './dto/item-get.dto';

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
				path: '/create-item',
				method: 'post',
				func: this.createItem,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN, EUserRoles.SHIPPER]), new ValidateMiddleware(ItemCreateDto)],
			},
			{
				path: '/get-item-by-id',
				method: 'get',
				func: this.getItemById,
				middlewares: [new AuthGuard()],
			},
			{
				path: '/update-item',
				method: 'post',
				func: this.updateItem,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN])],
			},
			{
				path: '/update-item-status',
				method: 'post',
				func: this.updateItemStatus,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN]), new ValidateMiddleware(ItemUpdateSatusDto)],
			},
			{
				path: '/get-items',
				method: 'get',
				func: this.getItems,
				middlewares: [new AuthGuard(), new ValidateMiddleware(GetItemDto)],
			},
			{
				path: '/delete-item-by-id',
				method: 'delete',
				func: this.deleteItem,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN])],
			}
		]);
	}

	async createItem(req: Request, res: Response, next: NextFunction)  {
		const { name, description, itemTypeId, price } = req.body;
		const item = await this.itemService.createItem({name, description, itemTypeId, price}, req.userReqData);
		this.ok(res, item );
	};

	async getItemById(req: Request, res: Response, next: NextFunction) {
		const id = req.body.id;
		const item = await this.itemService.getItemById( id, req.userReqData);
		this.ok(res, item );
	};

	async updateItem(req: Request, res: Response, next: NextFunction) {
		const { id, name, description, userId, price, itemTypeId, objectStatusId } = req.body;
		const item = await this.itemService.updateItem( {id, name, description, userId, price, itemTypeId, objectStatusId});
		this.ok( res, item );
	};

	async updateItemStatus(req: Request, res: Response, next: NextFunction) {
		const { id, objectStatusId } = req.body;
		const item = await this.itemService.updateItemStatus( id, objectStatusId );
		this.ok(res, item);
	};

	async getItems(req: Request, res: Response, next: NextFunction) {
		let sortParams: ISortItemParams = req.body.getParams?.sortParams || {};
		let searchParams: IFindItemParams = req.body.getParams?.searchParams || {};
		const items = await this.itemService.getItems(searchParams, sortParams );
		this.ok( res, items );
	};

	async deleteItem(req: Request, res: Response, next: NextFunction) {
		const message = await this.itemService.deleteItem(req.body.id, req.userReqData);
		this.ok( res, message );
	};
};
