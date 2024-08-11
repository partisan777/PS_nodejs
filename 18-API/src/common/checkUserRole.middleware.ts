import type { NextFunction, Request, Response } from "express";
import type { EUserRoles } from "../modules/user-roles/enums/enums";
import type { IMiddleware } from "./middleware.interface";

export class CheckUserRole implements IMiddleware {
	constructor(private permissions: EUserRoles[]) {}
	async execute(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		if (this.permissions.includes(req.userReqData.userRoleId as EUserRoles)) {
			return next();
		}
		res.status(403).send({ error: "Недостаточно прав" });
	}
}
