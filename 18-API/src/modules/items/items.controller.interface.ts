import { NextFunction, Request, Response } from 'express';
import { ItemModel } from '@prisma/client';

export interface IItemController {
	createItem: (req: Request, res: Response, next: NextFunction) => void;	
	getItemById: (req: Request, res: Response, next: NextFunction) => void;
	getItems: (req: Request, res: Response, next: NextFunction) => void;
	saveItem: (req: Request, res: Response, next: NextFunction) => void;	
	updateItemStatus: (req: Request, res: Response, next: NextFunction) => void;		
};
