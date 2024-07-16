import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { IUserService } from '../modules/users/users.service.interface';


export class AuthMiddleware implements IMiddleware {
	
	constructor(private secret: string, private userService: IUserService) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, async (err, payload: any) => {
				if (err) {
					next();
				} else if (payload && payload !== 'string') {
					const authUser = await this.userService.getUserInfo(payload.email)
					//console.log(authUser);
					if (!authUser) {
						next();
					} else {
						req.user = authUser.email;
						req.userRole = authUser.userRoleNumber;
						req.userReqId = authUser.id;
						next();
					}
				}
			});
		} else {
			next();
		}
	}
}
