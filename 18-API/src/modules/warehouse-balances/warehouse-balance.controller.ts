import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../../common/base.controller';
import { HTTPError } from '../../errors/http-error.class';
import { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';
import 'reflect-metadata';
import { ValidateMiddleware } from '../../common/validate.middleware';
import { IConfigService } from '../../config/config.service.interface';
import { IWarehouseBalancesService } from './warehouse-balances.service.interface';
import { IWarehouseBalancesController } from './warehouse-balance.controller.interface';
import { AuthGuard } from '../../common/auth.guard';
import { AuthMiddleware } from '../../common/auth.middleware';
import { ERowStatus } from '../../enum';


@injectable()
export class WarehouseBalancesController extends BaseController implements IWarehouseBalancesController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.WarehouseBalancesService) private warehouseBalasncesService: IWarehouseBalancesService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/create',
				method: 'post',
				func: this.create,
				middlewares: [],
			},
			{
				path: '/findById',
				method: 'get',
				func: this.findById,
				middlewares: [],
			},
			{
				path: '/updateQuantity',
				method: 'get',
				func: this.updateQuantity,
				middlewares: [],
				// middlewares: [new AuthGuard(), new CheckUserRole()],
				// middlewares: [new AuthGuard(), new AuthMiddleware(this.configService.get('SECRET'))],
			},
			{
				path: '/updateStatus',
				method: 'post',
				func: this.updateStatus,
				middlewares: [new AuthGuard()],
				// middlewares: [new AuthGuard(), new CheckUserRole()],
				// middlewares: [new AuthGuard(), new AuthMiddleware(this.configService.get('SECRET'))],
			},
		]);
	}

	async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { name, description, userId, itemId, quantity } = req.body;
		const rowStatusNumber = ERowStatus.NEW;
		const warehouseBalance = this.warehouseBalasncesService.create({ name, description, userId, itemId, quantity, rowStatusNumber });
		this.ok(res, warehouseBalance );
	};

	async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
		const id = req.body.id;
		const warehouseBalance = this.warehouseBalasncesService.findById(id);
	};
	
	async updateQuantity(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id, quantity } = req.body;
		const warehouseBalance = this.warehouseBalasncesService.updateQuantity(id, quantity);
		this.ok(res, warehouseBalance );
	};
	
	async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id, newStatusId } = req.body;
		const warehouseBalance = this.warehouseBalasncesService.updateStatus(id, newStatusId);
		this.ok(res, warehouseBalance );
	};
	
};
