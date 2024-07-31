import 'reflect-metadata';
import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { AuthGuard } from '../../common/auth.guard';
import { BaseController } from '../../common/base.controller';
import { CheckUserRole } from '../../common/checkUserRole.middleware';
import { EUserRoles } from '../../enum';
import type { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';
import type { IUserRolesController } from './interfaces/user-roles.controller.interface';
import type { IUserRolesService } from './interfaces/user-roles.service.interface';


@injectable()
export class UserRolesController extends BaseController implements IUserRolesController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserRolesService) private userRoleService: IUserRolesService
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/get-user-role-by-id',
				method: 'get',
				func: this.getUserRoleById,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN])],
			},
			{
				path: '/get-user-roles',
				method: 'get',
				func: this.getUserRoles,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN])],
			}
		]);
	}

	async getUserRoleById(req: Request, res: Response, next: NextFunction) {
		const roleId  = req.body.roleId;
		const userRole = await this.userRoleService.getUserRoleById( roleId );
		this.ok( res, userRole );
	};

	async getUserRoles(req: Request, res: Response, next: NextFunction) {
		const userRoles = await this.userRoleService.getUserRoles();
		this.ok( res, userRoles );
	};
};
