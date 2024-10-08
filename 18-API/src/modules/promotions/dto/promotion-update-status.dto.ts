import { IsNumber } from "class-validator";

export class PromotionUpdateSatusDto {
	@IsNumber()
	id: number;

	@IsNumber()
	newStatusNumber: number;
}
