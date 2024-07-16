import { NextFunction, Request, Response } from 'express';

export interface IWarehouseBalancesController {
	createBalance: (req: Request, res: Response, next: NextFunction) => void;
	findBalanceById: (req: Request, res: Response, next: NextFunction) => void;
	updateBalanceQuantity: (req: Request, res: Response, next: NextFunction) => void;
	updateBalanceStatus: (req: Request, res: Response, next: NextFunction) => void;
}
