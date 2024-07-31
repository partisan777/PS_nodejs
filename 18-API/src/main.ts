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
import { IUserController, IUsersRepository, IUserService, UserController, UsersRepository, UserService } from './modules/users';
import { ItemTypesController, ItemTypesRepository, ItemTypesService, IItemTypesController, IItemTypesRepository, IItemTypesService } from './modules/item-types';
import { IWarehouseBalancesController, IWarehouseBalancesRepository, IWarehouseBalancesService, WarehouseBalancesController, WarehouseBalancesRepository, WarehouseBalancesService } from './modules/warehouse-balances';
import { IItemController, IItemsRepository, IItemService, ItemController, ItemsRepository, ItemService } from './modules/items';
import { IObjectStatusController, IObjectStatusRepository, IObjectStatusService, ObjectStatusController, ObjectStatusRepository, ObjectStatusService } from './modules/object-statuses'
import { IPromotionController, IPromotionsRepository, IPromotionService, PromotionController, PromotionsRepository, PromotionService } from './modules/promotions';
import { IUserRolesController, IUserRolesRepository, IUserRolesService, UserRolesController, UserRolesRepository, UserRolesService } from './modules/user-roles';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
};

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
	bind<IItemTypesController>(TYPES.ItemTypesController).to(ItemTypesController);
	bind<IItemTypesService>(TYPES.ItemTypesService).to(ItemTypesService);
	bind<IItemTypesRepository>(TYPES.ItemTypesRepository).to(ItemTypesRepository).inSingletonScope();
	bind<IPromotionController>(TYPES.PromotionController).to(PromotionController);
	bind<IPromotionService>(TYPES.PromotionService).to(PromotionService);
	bind<IPromotionsRepository>(TYPES.PromotionsRepository).to(PromotionsRepository).inSingletonScope();
	bind<IItemController>(TYPES.ItemController).to(ItemController);
	bind<IItemService>(TYPES.ItemService).to(ItemService);
	bind<IItemsRepository>(TYPES.ItemsRepository).to(ItemsRepository).inSingletonScope();
	bind<IObjectStatusController>(TYPES.ObjectStatusController).to(ObjectStatusController);
	bind<IObjectStatusService>(TYPES.ObjectStatusService).to(ObjectStatusService);
	bind<IObjectStatusRepository>(TYPES.ObjectStatusRepository).to(ObjectStatusRepository).inSingletonScope();
	bind<IUserRolesController>(TYPES.UserRolesController).to(UserRolesController);
	bind<IUserRolesService>(TYPES.UserRolesService).to(UserRolesService);
	bind<IUserRolesRepository>(TYPES.UserRolesRepository).to(UserRolesRepository).inSingletonScope();
	bind<IWarehouseBalancesController>(TYPES.WarehouseBalancesController).to(WarehouseBalancesController);
	bind<IWarehouseBalancesService>(TYPES.WarehouseBalancesService).to(WarehouseBalancesService);
	bind<IWarehouseBalancesRepository>(TYPES.WarehouseBalancesRepository).to(WarehouseBalancesRepository).inSingletonScope();
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
