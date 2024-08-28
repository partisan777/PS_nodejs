import 'reflect-metadata';
import type { Server } from 'http';
import { json } from 'body-parser';
import express, { type Express } from 'express';
import { inject, injectable } from 'inversify';
import { AuthMiddleware } from './common/auth.middleware';
import type { IConfigService } from './config/config.service.interface';
import type { PrismaService } from './database/prisma.service';
import type { IExeptionFilter } from './errors/exeption.filter.interface';
import type { ILogger } from './logger/logger.interface';
import type { ItemController } from './modules/items';
import type { ObjectStatusController } from './modules/object-statuses';
import type { PromotionController } from './modules/promotions';
import type { UserRolesController } from './modules/user-roles';
import type { UserController } from './modules/users';
import type { UserService } from './modules/users';
import type { WarehouseBalancesController } from './modules/warehouse-balances/warehouse-balance.controller';
import { TYPES } from './types';
import { TelegramBot } from './modules/telegram/telegram.bot';


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
		@inject(TYPES.ObjectStatusController) private objectStatusesController: ObjectStatusController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.UserRolesController) private userRolesController: UserRolesController,
		@inject(TYPES.WarehouseBalancesController) private warehoseBalancesController: WarehouseBalancesController,
		@inject(TYPES.TelegramBot) private telegramBot: TelegramBot
	) {
		this.app = express();
		this.port = Number(this.configService.get('PORT'));
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
		this.app.use('/item-types', this.itemTypesController.router);
		this.app.use('/object-statuses', this.objectStatusesController.router);
		this.app.use('/user-roles', this.userRolesController.router);
		this.app.use('/warehose-balances', this.warehoseBalancesController.router);
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
		this.telegramBot.start();
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}

	public close(): void {
		this.server.close();
	}
}
