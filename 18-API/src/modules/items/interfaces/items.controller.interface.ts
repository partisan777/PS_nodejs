import { NextFunction, Request, Response } from 'express';

export interface IItemController {
	createItem: (req: Request, res: Response, next: NextFunction) => void;
	getItemById: (req: Request, res: Response, next: NextFunction) => void;
	getItems: (req: Request, res: Response, next: NextFunction) => void;
	updateItem: (req: Request, res: Response, next: NextFunction) => void;
	updateItemStatus: (req: Request, res: Response, next: NextFunction) => void;
	deleteItem: (req: Request, res: Response, next: NextFunction) => void;
};
