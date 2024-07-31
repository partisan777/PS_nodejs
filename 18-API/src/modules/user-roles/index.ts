import { IUserRolesController } from "./interfaces/user-roles.controller.interface";
import { IUserRolesRepository } from "./interfaces/user-roles.repository.interface";
import { IUserRolesService } from "./interfaces/user-roles.service.interface";
import { UserRole } from "./user-role.entity";
import { UserRolesController } from "./user-roles.controller";
import { UserRolesRepository } from "./user-roles.repository";
import { UserRolesService } from "./user-roles.service";

export {
	IUserRolesController,
	IUserRolesRepository,
	IUserRolesService,
	UserRole,
	UserRolesController,
	UserRolesRepository,
	UserRolesService,
};
