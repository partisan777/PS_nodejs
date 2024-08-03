import type { Decimal } from "@prisma/client/runtime/library";
import { IsNumber, IsString } from "class-validator";

export class WarehouseBalanceReqCreateDto {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsNumber()
	itemId: number;

	@IsNumber()
	quantity: number | Decimal;

};
