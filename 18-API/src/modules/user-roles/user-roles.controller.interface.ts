import { NextFunction, Request, Response } from 'express';

export interface IUserRolesController {
	getUserRoleByNumber: (req: Request, res: Response, next: NextFunction) => void;
	getUserRoles: (req: Request, res: Response, next: NextFunction) => void;
};
