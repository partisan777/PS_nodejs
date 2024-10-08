import type { NextFunction, Request, Response } from "express";

export interface IUserController {
	login: (req: Request, res: Response, next: NextFunction) => void;
	register: (req: Request, res: Response, next: NextFunction) => void;
	info: (req: Request, res: Response, next: NextFunction) => void;
	updateUserRole: (req: Request, res: Response, next: NextFunction) => void;
	updateUserStatus: (req: Request, res: Response, next: NextFunction) => void;
}
