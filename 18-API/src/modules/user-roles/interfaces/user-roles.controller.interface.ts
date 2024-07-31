import { NextFunction, Request, Response } from 'express';

export interface IUserRolesController {
	getUserRoleById: (req: Request, res: Response, next: NextFunction) => void;
	getUserRoles: (req: Request, res: Response, next: NextFunction) => void;
};
