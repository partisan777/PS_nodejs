import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { EUserRoles } from '../enum';

export class CheckUserRole implements IMiddleware {

	constructor(private permissions: EUserRoles[]) {}
	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (this.permissions.includes(req.userReqData.userRole as EUserRoles)) {
            return next();
        };
        res.status(403).send({error: 'Недостаточно прав'});
	};
};
