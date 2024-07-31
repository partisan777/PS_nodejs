import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../../common/base.controller';
import { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';
import 'reflect-metadata';
import { ValidateMiddleware } from '../../common/validate.middleware';
import { IWarehouseBalancesService } from './interfaces/warehouse-balances.service.interface';
import { IWarehouseBalancesController } from './interfaces/warehouse-balance.controller.interface';
import { AuthGuard } from '../../common/auth.guard';
import { ERowStatus, EUserRoles } from '../../enum';
import { CheckUserRole } from '../../common/checkUserRole.middleware';
import { WarehouseBalanceCreateDto } from './dto/warehouse-balance-create.dto';


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
