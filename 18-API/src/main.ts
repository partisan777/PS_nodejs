import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { ExeptionFilter } from './errors/exeption.filter';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UserController } from './modules/users/users.controller';
import { IUserController } from './modules/users/users.controller.interface';
import { UsersRepository } from './modules/users/users.repository';
import { IUsersRepository } from './modules/users/users.repository.interface';
import { UserService } from './modules/users/users.service';
import { IUserService } from './modules/users/users.service.interface';
import { IItemController } from './modules/items/items.controller.interface';
import { ItemController } from './modules/items/items.controller';
import { IItemService } from './modules/items/items.service.interface';
import { ItemService } from './modules/items/items.service';
import { IItemsRepository } from './modules/items/items.repository.interface';
import { ItemsRepository } from './modules/items/items.repository'; 
import { IPromotionService } from './modules/promotions/promotions.service.interface';
import { IPromotionController } from './modules/promotions/promotions.controller.interface';
import { IPromotionsRepository } from './modules/promotions/promotions.repository.interface';
import { PromotionController } from './modules/promotions/promotions.controller';
import { PromotionService } from './modules/promotions/promotions.service';
import { PromotionsRepository } from './modules/promotions/promotions.repository';
import { IItemTypesController } from './modules/item-types/item-types.controller.interface';
import { IItemTypesService } from './modules/item-types/item-types.service.interface';
import { IItemTypesRepository } from './modules/item-types/item-types.repository.interface';
import { ItemTypesController } from './modules/item-types/item-types.controller';
import { ItemTypesService } from './modules/item-types/item-types.service';
import { ItemTypesRepository } from './modules/item-types/item-types.repository';
import { IRowStatusService } from './modules/row-statuses/row-statuses.service.interface';
import { RowStatusService } from './modules/row-statuses/row-statuses.service';
import { IRowStatusController } from './modules/row-statuses/row-statuses.controller.interface';
import { RowStatusesController } from './modules/row-statuses/row-statuses.controller';
import { RowStatusRepository } from './modules/row-statuses/row-statuses.repository';
import { IRowStatusRepository } from './modules/row-statuses/row-statuses.repository.interface';
import { IUserRolesRepository } from './modules/user-roles/user-roles.repository.interface';
import { UserRolesRepository } from './modules/user-roles/user-roles.repository';
import { IUserRolesService } from './modules/user-roles/user-roles.service.interface';
import { IUserRolesController } from './modules/user-roles/user-roles.controller.interface';
import { UserRolesService } from './modules/user-roles/user-roles.service';
import { UserRolesController } from './modules/user-roles/user-roles.controller';
import { IWarehouseBalancesRepository } from './modules/warehouse-balances/warehouse-balances.repository.interface';
import { WarehouseBalancesRepository } from './modules/warehouse-balances/warehouse-balances.repository';
import { IWarehouseBalancesService } from './modules/warehouse-balances/warehouse-balances.service.interface';
import { WarehouseBalancesService } from './modules/warehouse-balances/warehouse-balances.service';
import { IWarehouseBalancesController } from './modules/warehouse-balances/warehouse-balance.controller.interface';
import { WarehouseBalancesController } from './modules/warehouse-balances/warehouse-balance.controller';


export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IItemTypesController>(TYPES.ItemTypesController).to(ItemTypesController);
	bind<IPromotionController>(TYPES.PromotionController).to(PromotionController);
	bind<IItemController>(TYPES.ItemController).to(ItemController);
	bind<IRowStatusController>(TYPES.RowStatusController).to(RowStatusesController);
	bind<IPromotionService>(TYPES.PromotionService).to(PromotionService);
	bind<IItemService>(TYPES.ItemService).to(ItemService);
	bind<IItemTypesService>(TYPES.ItemTypesService).to(ItemTypesService);
	bind<IRowStatusService>(TYPES.RowStatusService).to(RowStatusService);
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
	bind<IItemsRepository>(TYPES.ItemsRepository).to(ItemsRepository).inSingletonScope();
	bind<IItemTypesRepository>(TYPES.ItemTypesRepository).to(ItemTypesRepository).inSingletonScope();
	bind<IPromotionsRepository>(TYPES.PromotionsRepository).to(PromotionsRepository).inSingletonScope();
	bind<IRowStatusRepository>(TYPES.RowStatusRepository).to(RowStatusRepository).inSingletonScope();
	bind<IUserRolesRepository>(TYPES.UserRolesRepository).to(UserRolesRepository).inSingletonScope();
	bind<IUserRolesService>(TYPES.UserRolesService).to(UserRolesService);
	bind<IUserRolesController>(TYPES.UserRolesController).to(UserRolesController);
	bind<IWarehouseBalancesRepository>(TYPES.WarehouseBalancesRepository).to(WarehouseBalancesRepository).inSingletonScope();
	bind<IWarehouseBalancesService>(TYPES.UserRolesService).to(WarehouseBalancesService);
	bind<IWarehouseBalancesController>(TYPES.UserRolesController).to(WarehouseBalancesController);
	bind<App>(TYPES.Application).to(App);
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { appContainer, app };
}

export const boot = bootstrap();
