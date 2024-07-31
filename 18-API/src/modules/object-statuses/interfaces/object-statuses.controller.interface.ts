import { NextFunction, Request, Response } from 'express';

export interface IObjectStatusController {
	getObjectStatusById: (req: Request, res: Response, next: NextFunction) => void;
	getObjectStatuses: (req: Request, res: Response, next: NextFunction) => void;
};
