import { IsNumber, IsString } from "class-validator";

export class ItemReqCreateDto {
	@IsString({ message: "Не указано наименование товара" })
	name: string;

	@IsString({ message: "Не указано описание товара" })
	description: string;

	@IsNumber()
	price: number;

	@IsNumber()
	itemTypeId: number;
};