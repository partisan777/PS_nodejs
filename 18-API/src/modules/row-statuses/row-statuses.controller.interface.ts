import { NextFunction, Request, Response } from 'express';

export interface IRowStatusController {
	getRowStatusByNumber: (req: Request, res: Response, next: NextFunction) => void;
	getRowStatuses: (req: Request, res: Response, next: NextFunction) => void;
};
