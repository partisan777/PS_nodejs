import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { json } from 'body-parser';
import 'reflect-metadata';
import { IConfigService } from './config/config.service.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { UserController } from './modules/users/users.controller';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/auth.middleware';
import { ItemController } from './modules/items/items.controller';
import { PromotionController } from './modules/promotions/promotions.controller';
import { RowStatusesController } from './modules/row-statuses/row-statuses.controller';
import { UserRolesController } from './modules/user-roles/user-roles.controller';
import { UserService } from './modules/users/users.service';
import { WarehouseBalancesController } from './modules/warehouse-balances/warehouse-balance.controller';


@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.UserService) private userService: UserService,
		@inject(TYPES.ItemController) private itemController: ItemController,
		@inject(TYPES.PromotionController) private promotionController: PromotionController,
		@inject(TYPES.ItemTypesController) private itemTypesController: ItemController,
		@inject(TYPES.RowStatusController) private rowStatusesController: RowStatusesController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.UserRolesController) private userRolesController: UserRolesController,
		@inject(TYPES.WarehouseBalancesController) private warehoseBalancesController: WarehouseBalancesController
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'), this.userService);
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
		this.app.use('/items', this.itemController.router);
		this.app.use('/promotions', this.promotionController.router);
		this.app.use('/itemtypes', this.itemTypesController.router);
		this.app.use('/rowstatuses', this.rowStatusesController.router);
		this.app.use('/userroles', this.userRolesController.router);
		this.app.use('/warehosesbalances', this.warehoseBalancesController.router);
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}

	public close(): void {
		this.server.close();
	}
}
