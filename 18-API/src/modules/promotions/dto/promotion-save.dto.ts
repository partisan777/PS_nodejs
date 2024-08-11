import { IsNumber, IsString } from "class-validator";

export class PromotionSaveDto {
	@IsNumber()
	id: number;

	@IsString({ message: "Не указано наименование акции" })
	name: string;

	@IsString({ message: "Не указано описание акции" })
	description: string;

	@IsNumber()
	discoutnPercent: number;

	@IsNumber()
	objectStatusId: number;

	@IsNumber()
	userId: number;
}
