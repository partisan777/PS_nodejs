import type { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import type { IUserService } from "../modules/users/interfaceses/users.service.interface";
import type { IMiddleware } from "./middleware.interface";

export class AuthMiddleware implements IMiddleware {
	constructor(
		private secret: string,
		private userService: IUserService,
	) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(
				req.headers.authorization.split(" ")[1],
				this.secret,
				async (err, payload: any) => {
					if (err) {
						next();
					} else if (payload && payload !== "string") {
						const authUser = await this.userService.getUserInfo(payload.email);
						if (!authUser) {
							next();
						} else {
							req.userReqData = {
								user: authUser.email,
								userRole: authUser.userRoleId,
								userReqId: authUser.id,
							};
							next();
						}
					}
				},
			);
		} else {
			next();
		}
	}
}
