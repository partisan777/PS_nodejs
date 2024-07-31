import 'reflect-metadata';
import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { sign } from 'jsonwebtoken';
import { AuthGuard } from '../../common/auth.guard';
import { BaseController } from '../../common/base.controller';
import { CheckUserRole } from '../../common/checkUserRole.middleware';
import { ValidateMiddleware } from '../../common/validate.middleware';
import type { IConfigService } from '../../config/config.service.interface';
import { EUserRoles } from '../../enum';
import { HTTPError } from '../../errors/http-error.class';
import type { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserUpdateRoleDto } from './dto/user-update-role.dto';
import type { IUserController } from './interfaceses/users.controller.interface';
import type { IUserService } from './interfaceses/users.service.interface';


@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new AuthGuard()],
			},
			{
				path: '/update-user-role',
				method: 'post',
				func: this.updateUserRole,
				middlewares: [new AuthGuard(), new CheckUserRole([EUserRoles.ADMIN]), new ValidateMiddleware(UserUpdateRoleDto)],
			},
		]);
	}

	async login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(req.body);
		if (!result) {
			return next(new HTTPError(401, 'ошибка авторизации', 'login'));
		}
		const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET'));
		this.ok(res, { jwt });
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует'));
		}
		this.ok(res, { email: result.email, id: result.id });
	};

	async info(req: Request, res: Response, next: NextFunction): Promise<void> {
		const userInfo = await this.userService.getUserInfo(req.userReqData.user);
		this.ok(res, { email: userInfo?.email, id: userInfo?.id, login: userInfo?.login, userRole: userInfo?.userRoleId });
	};

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				},
			);
		});
	};

	async updateUserRole(req: Request, res: Response, next: NextFunction): Promise<void> {
		const {id, newRoleNumber} = req.body;
		const user = await this.userService.updateUserRole(id, newRoleNumber);
		this.ok(res, { email: user?.email, id: user?.id, login: user?.login, userRole: user?.userRoleId });
	};
};
