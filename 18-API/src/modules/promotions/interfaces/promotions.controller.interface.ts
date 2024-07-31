import type { NextFunction, Request, Response } from "express";

export interface IPromotionController {
	createPromotion: (req: Request, res: Response, next: NextFunction) => void;
	getPromotionById: (req: Request, res: Response, next: NextFunction) => void;
	getPromotions: (req: Request, res: Response, next: NextFunction) => void;
	updatePromotion: (req: Request, res: Response, next: NextFunction) => void;
	updatePromotionStatus: (
		req: Request,
		res: Response,
		next: NextFunction,
	) => void;
	deletePromotion: (req: Request, res: Response, next: NextFunction) => void;
}
