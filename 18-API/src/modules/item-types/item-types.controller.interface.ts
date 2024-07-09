import { NextFunction, Request, Response } from 'express';

export interface IItemTypesController {
	getItemTypeByNumber: (req: Request, res: Response, next: NextFunction) => void;
	getItemTypes: (req: Request, res: Response, next: NextFunction) => void;
};
