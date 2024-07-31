import 'reflect-metadata';
import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../../common/base.controller';
import type { IConfigService } from '../../config/config.service.interface';
import type { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';
import type { IItemTypesController } from './interfaces/item-types.controller.interface';
import type { IItemTypesService } from './interfaces/item-types.service.interface';

@injectable()
export class ItemTypesController extends BaseController implements IItemTypesController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.ItemTypesService) private itemTypesService: IItemTypesService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/get-item-type-by-id',
				method: 'get',
				func: this.getItemTypeById,
				middlewares: [],
			},
			{
				path: '/get-item-types',
				method: 'get',
				func: this.getItemTypes,
				middlewares: [],
			}
		]);
	}

	async getItemTypeById(req: Request, res: Response, next: NextFunction) {
		const itemTypeId  = req.body.itemTypeId;
		const itemType = await this.itemTypesService.getItemTypeById( itemTypeId );
		this.ok( res, itemType );
	};

	async getItemTypes(req: Request, res: Response, next: NextFunction) {
		const itemTypes = await this.itemTypesService.getItemTypes();
		this.ok( res, itemTypes );
	};
};
