import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../../common/base.controller';
import { HTTPError } from '../../errors/http-error.class';
import { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';
import { IConfigService } from '../../config/config.service.interface';
import { IItemTypesController } from './item-types.controller.interface';
import { IItemTypesService } from './item-types.service.interface';

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
				path: '/getitemtypesbynumber',
				method: 'get',
				func: this.getItemTypeByNumber,
				middlewares: [],
			},			
			{
				path: '/getitemtypes',
				method: 'get',
				func: this.getItemTypes,
				middlewares: [],
			}
		]);		
	}

	async getItemTypeByNumber(req: Request, res: Response, next: NextFunction) {
		const itemTypeNumber  = req.body.itemTypeNumber;
		const itemType = await this.itemTypesService.getItemTypeByNumber( itemTypeNumber );
		this.ok( res, itemType );	
	};

	async getItemTypes(req: Request, res: Response, next: NextFunction) { 
		const itemTypes = await this.itemTypesService.getItemTypes();
		this.ok( res, itemTypes );
	};
};
