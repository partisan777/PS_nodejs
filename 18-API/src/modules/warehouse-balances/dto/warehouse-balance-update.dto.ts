import type { Decimal } from "@prisma/client/runtime/library";
import { IsNumber, IsString } from "class-validator";

export class UserRegisterDto {
	@IsNumber()
	id: number;

	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsNumber()
	userId: number;

	@IsNumber()
	itemId: number;

	@IsNumber()
	quantity: number | Decimal;

	@IsNumber()
	objectStatusId: number;
}
