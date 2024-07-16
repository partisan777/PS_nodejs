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
import { ERowStatus, EUserRoles } from '../../enum';
import { CheckUserRole } from '../../common/checkUserRole.middleware';
import { WarehouseBalanceCreateDto } from './dto/warehouse-balance-create.dto';


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
				path: '/createBalance',
				method: 'post',
				func: this.createBalance,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN, EUserRoles.STOREKEEPER]), new ValidateMiddleware(WarehouseBalanceCreateDto)],
			},
			{
				path: '/findBalanceById',
				method: 'get',
				func: this.findBalanceById,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN, EUserRoles.STOREKEEPER])],
			},
			{
				path: '/updateQuantity',
				method: 'get',
				func: this.updateBalanceQuantity,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN, EUserRoles.STOREKEEPER])],
				// middlewares: [new AuthGuard(), new CheckUserRole()],
				// middlewares: [new AuthGuard(), new AuthMiddleware(this.configService.get('SECRET'))],
			},
			{
				path: '/updateBalanceStatus',
				method: 'post',
				func: this.updateBalanceStatus,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN])],
				// middlewares: [new AuthGuard(), new CheckUserRole()],
			},
		]);
	}

	async createBalance(req: Request, res: Response, next: NextFunction): Promise<void> {
		const {user, userReqId, userRole } = req;
		const { name, description, itemId, quantity } = req.body;
		const rowStatusNumber = ERowStatus.NEW;
		const userId = userReqId;
		const warehouseBalance = this.warehouseBalasncesService.createBalance({ name, description, userId, itemId, quantity, rowStatusNumber }, {user, userReqId, userRole });
		this.ok(res, warehouseBalance );
	};

	async findBalanceById(req: Request, res: Response, next: NextFunction): Promise<void> {
		const {user, userReqId, userRole } = req;
		const id = req.body.id;
		const warehouseBalance = this.warehouseBalasncesService.findBalanceById(id, {user, userReqId, userRole });
		this.ok(res, warehouseBalance );
	};

	async updateBalanceQuantity(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id, quantity } = req.body;
		const {user, userReqId, userRole } = req;
		const warehouseBalance = this.warehouseBalasncesService.updateBalanceQuantity(id, quantity, {user, userReqId, userRole });
		this.ok(res, warehouseBalance );
	};

	async updateBalanceStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id, newStatusId } = req.body;
		const {user, userReqId, userRole } = req;
		const warehouseBalance = this.warehouseBalasncesService.updateBalanceStatus(id, newStatusId, {user, userReqId, userRole });
		this.ok(res, warehouseBalance );
	};

};
