import { IsNumber, IsString } from "class-validator";

export class ItemUpdateDto {
	@IsNumber()
	id: number;

	@IsString({ message: "Не указано наименование товара" })
	name: string;

	@IsString({ message: "Не указано описание товара" })
	description: string;

	@IsNumber()
	price: number;

	@IsNumber()
	userId: number;

	@IsNumber()
	itemTypeId: number;

	@IsNumber()
	objectStatusId: number;
}
