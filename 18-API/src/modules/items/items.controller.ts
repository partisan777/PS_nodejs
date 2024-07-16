import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../../common/base.controller';
import { HTTPError } from '../../errors/http-error.class';
import { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';
import { IFindItemParams } from '../../interfaces';
import { IItemController } from './items.controller.interface';
import { ValidateMiddleware } from '../../common/validate.middleware';
import { IConfigService } from '../../config/config.service.interface';
import { IItemService } from './items.service.interface';
import { ItemUpdateSatusDto } from './dto/item-update-status.dto';
import { AuthGuard } from '../../common/auth.guard';
import { CheckUserRole } from '../../common/checkUserRole.middleware';
import { EUserRoles } from '../../enum';


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
				middlewares: [new AuthGuard()],
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
				middlewares: [new AuthGuard()],
			},
			{
				path: '/updateitemstatus',
				method: 'post',
				func: this.updateItemStatus,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN]), new ValidateMiddleware(ItemUpdateSatusDto)],
			},
			{
				path: '/getItems',
				method: 'get',
				func: this.getItems,
				middlewares: [new AuthGuard()],
			}
		]);

	}

	async createItem(req: Request, res: Response, next: NextFunction)  {
		const userId = req;
		const { name, description, itemTypeNumber, price } = req.body;
		const item = await this.itemService.createItem({name, description, userId, itemTypeNumber, price});
		this.ok(res,  item );
	};

	async getItemById(req: Request, res: Response, next: NextFunction) {
		const id  = req.body.id;
		const item = await this.itemService.getItemById( id );
		this.ok(res,  item );
	};

	async saveItem(req: Request, res: Response, next: NextFunction) {
		const userId = req.userId;
		const { id, name, description, price, itemTypeNumber, rowStatusNumber } = req.body;
		const item = await this.itemService.saveItem( {id, name, description, price, itemTypeNumber, rowStatusNumber} );
		this.ok( res, item );
	};

	async updateItemStatus(req: Request, res: Response, next: NextFunction) {
		const { id, rowStatusNumber, userRoleNumber } = req.body;
		const item = await this.itemService.updateItemStatus( id, rowStatusNumber );
		this.ok(res, item);

	};

	async getItems(req: Request<{}, {}, IFindItemParams>, res: Response, next: NextFunction) {
		const params: IFindItemParams = req.body;
		const items = await this.itemService.getItems(params);
		this.ok( res, items );
	};

	async deleteItem(req: Request, res: Response, next: NextFunction) {
		const {id, userId, userRoleNumber } = req;
		const message = await this.itemService.deleteItem(id, userId, userRoleNumber);
		this.ok( res, message );
	};
};
