import { NextFunction, Request, Response } from 'express';


export interface IPromotionController {
	createPromotion: (req: Request, res: Response, next: NextFunction) => void;
	getPromotionById: (req: Request, res: Response, next: NextFunction) => void;
	getPromotions: (req: Request, res: Response, next: NextFunction) => void;
	savePromotion: (req: Request, res: Response, next: NextFunction) => void;	
	updatePromotionStatus: (req: Request, res: Response, next: NextFunction) => void;
};
