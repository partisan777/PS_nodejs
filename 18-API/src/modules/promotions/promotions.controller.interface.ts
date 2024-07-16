import { NextFunction, Request, Response } from 'express';
import { PromotionUpdateSatusDto } from './dto/promotion-update-status.dto'; 
import { UserRequestDataDto } from '../users/dto/user-data.dto';
import { PromotionCreateDto } from './dto/promotion-create.dto';

export interface IPromotionController {
	createPromotion: (req: Request, res: Response, next: NextFunction) => void;
	getPromotionById: (req: Request, res: Response, next: NextFunction) => void;
	getPromotions: (req: Request, res: Response, next: NextFunction) => void;
	savePromotion: (req: Request, res: Response, next: NextFunction) => void;
	updatePromotionStatus: (req: Request, res: Response, next: NextFunction) => void;
	deletePromotion: (req: Request, res: Response, next: NextFunction) => void;
};
