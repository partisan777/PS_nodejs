import type { NextFunction, Request, Response } from "express";

export interface IItemTypesController {
	getItemTypeById: (req: Request, res: Response, next: NextFunction) => void;
	getItemTypes: (req: Request, res: Response, next: NextFunction) => void;
}
