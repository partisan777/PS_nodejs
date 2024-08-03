import type { NextFunction, Request, Response } from "express";
import type { IMiddleware } from "./middleware.interface";

export class AuthGuard implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.userReqData.email) {
			return next();
		}
		res.status(401).send({ error: "Вы не авторизован" });
	}
}
