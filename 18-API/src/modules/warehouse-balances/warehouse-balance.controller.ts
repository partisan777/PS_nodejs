import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../../common/base.controller';
import type { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';
import 'reflect-metadata';
import { AuthGuard } from '../../common/auth.guard';
import { CheckUserRole } from '../../common/checkUserRole.middleware';
import { ValidateMiddleware } from '../../common/validate.middleware';
import { ERowStatus, EUserRoles } from '../../enum';
import { WarehouseBalanceCreateDto } from './dto/warehouse-balance-create.dto';
import type { IWarehouseBalancesController } from './interfaces/warehouse-balance.controller.interface';
import type { IWarehouseBalancesService } from './interfaces/warehouse-balances.service.interface';


@injectable()
export class WarehouseBalancesController extends BaseController implements IWarehouseBalancesController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.WarehouseBalancesService) private warehouseBalasncesService: IWarehouseBalancesService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/create-Balance',
				method: 'post',
				func: this.createBalance,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN, EUserRoles.STOREKEEPER]), new ValidateMiddleware(WarehouseBalanceCreateDto)],
			},
			{
				path: '/get-Balance-By-Id',
				method: 'get',
				func: this.getBalanceById,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN, EUserRoles.STOREKEEPER])],
			},
			{
				path: '/update-Quantity',
				method: 'get',
				func: this.updateBalanceQuantity,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN, EUserRoles.STOREKEEPER])],
			},
			{
				path: '/update-Balance-Status',
				method: 'post',
				func: this.updateBalanceStatus,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN])],
			},
		]);
	}

	async createBalance(req: Request, res: Response, next: NextFunction) {
		const {user, userReqId, userRole } = req.userReqData;
		const { name, description, itemId, quantity } = req.body;
		const objectStatusId = ERowStatus.NEW;
		const userId = userReqId;
		const warehouseBalance = await this.warehouseBalasncesService.createBalance({ name, description, userId, itemId, quantity, objectStatusId }, {user, userReqId, userRole });
		this.ok(res, warehouseBalance );
	};

	async getBalanceById(req: Request, res: Response, next: NextFunction) {
		const {user, userReqId, userRole } = req.userReqData;
		const id = req.body.id;
		const warehouseBalance = await this.warehouseBalasncesService.getBalanceById(id, {user, userReqId, userRole });
		this.ok(res, warehouseBalance );
	};

	async updateBalanceQuantity(req: Request, res: Response, next: NextFunction) {
		const { id, quantity } = req.body;
		const {user, userReqId, userRole } = req.userReqData;
		const warehouseBalance = await this.warehouseBalasncesService.updateBalanceQuantity(id, quantity, {user, userReqId, userRole });
		this.ok(res, warehouseBalance );
	};

	async updateBalanceStatus(req: Request, res: Response, next: NextFunction) {
		const { id, newStatusId } = req.body;
		const {user, userReqId, userRole } = req.userReqData;
		const warehouseBalance = await this.warehouseBalasncesService.updateBalanceStatus(id, newStatusId, {user, userReqId, userRole });
		this.ok(res, warehouseBalance );
	};
};
