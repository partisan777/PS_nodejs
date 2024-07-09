import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../../common/base.controller';
import { HTTPError } from '../../errors/http-error.class';
import { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';
import { IConfigService } from '../../config/config.service.interface';
import { IUserRolesController } from './user-roles.controller.interface';
import { IUserRolesService } from './user-roles.service.interface';


@injectable()
export class UserRolesController extends BaseController implements IUserRolesController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserRolesService) private userRoleService: IUserRolesService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/getuserrolebynumber',
				method: 'get',
				func: this.getUserRoleByNumber,
				middlewares: [],
			},			
			{
				path: '/getuserroles',
				method: 'get',
				func: this.getUserRoles,
				middlewares: [],
			}
		]);		
	}

	async getUserRoleByNumber(req: Request, res: Response, next: NextFunction) {
		const roleNumber  = req.body.roleNumber;
		const userRole = await this.userRoleService.getUserRoleByNumber( roleNumber );
		this.ok( res, userRole );	
	};

	async getUserRoles(req: Request, res: Response, next: NextFunction) { 
		const userRoles = await this.userRoleService.getUserRoles();
		this.ok( res, userRoles );
	};
};
