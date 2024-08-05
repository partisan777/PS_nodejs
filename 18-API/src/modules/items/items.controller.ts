import 'reflect-metadata';
import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { AuthGuard } from '../../common/auth.guard';
import { BaseController } from '../../common/base.controller';
import { CheckUserRole } from '../../common/checkUserRole.middleware';
import { ValidateMiddleware } from '../../common/validate.middleware';
import type { IConfigService } from '../../config/config.service.interface';
import { EUserRoles } from '../user-roles/enums/enums';
import type { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';
import { ItemReqCreateDto } from './dto/item-req-create.dto';
import { GetItemDto } from './dto/item-get.dto';
import { ItemUpdateSatusDto } from './dto/item-update-status.dto';
import type { IItemController } from './interfaces/items.controller.interface';
import type { IItemService } from './interfaces/items.service.interface';
import type { IFindItemParams, ISortItemParams } from './interfaces/params.interface';
import { ItemCreateDto } from './dto/item-create.dto';

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
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN, EUserRoles.SHIPPER]), new ValidateMiddleware(ItemReqCreateDto)],
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
		const createItem: ItemReqCreateDto = req.body;
		const item = await this.itemService.createItem(createItem, req.userReqData);
		this.ok(res, item );
	};

	async getItemById(req: Request, res: Response, next: NextFunction) {
		const id = req.body.id;
		const item = await this.itemService.getItemById( id, req.userReqData);
		this.ok(res, item );
	};

	async updateItem(req: Request, res: Response, next: NextFunction) {
		const { id, name, description, userId, price, itemTypeId, objectStatusId } = req.body;
		const item = await this.itemService.updateItem( {id, name, description, userId, price, itemTypeId, objectStatusId} );
		this.ok( res, item );
	};

	async updateItemStatus(req: Request, res: Response, next: NextFunction) {
		const { id, objectStatusId } = req.body;
		const item = await this.itemService.updateItemStatus( id, objectStatusId );
		this.ok(res, item);
	};

	async getItems(req: Request, res: Response, next: NextFunction) {
		const sortParams: ISortItemParams = req.body.getParams?.sortParams || {};
		const searchParams: IFindItemParams = req.body.getParams?.searchParams || {};
		const items = await this.itemService.getItems(searchParams, sortParams );
		this.ok( res, items );
	};

	async deleteItem(req: Request, res: Response, next: NextFunction) {
		const message = await this.itemService.deleteItem(req.body.id, req.userReqData);
		this.ok( res, message );
	};
};
