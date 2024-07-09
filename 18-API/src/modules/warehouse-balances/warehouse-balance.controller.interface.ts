import { NextFunction, Request, Response } from 'express';

export interface IWarehouseBalancesController {
	create: (req: Request, res: Response, next: NextFunction) => void;
	findById: (req: Request, res: Response, next: NextFunction) => void;
	updateQuantity: (req: Request, res: Response, next: NextFunction) => void;
	updateStatus: (req: Request, res: Response, next: NextFunction) => void;
}
