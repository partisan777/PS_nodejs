import { IsNumber, IsString } from "class-validator";

export class PromotionCreateDto {
	@IsString({ message: "Не указано наименование акции" })
	name: string;

	@IsString({ message: "Не указано описание акции" })
	description: string;

	@IsNumber()
	discoutnPercent: number;

	@IsNumber()
	itemId: number;

	@IsNumber()
	userId: number;

	@IsNumber()
	objectStatusId: number;
};
