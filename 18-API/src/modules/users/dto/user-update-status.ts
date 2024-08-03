import { IsNumber } from "class-validator";

export class UserUpdateStatusDto {
	@IsNumber()
	id: number;

	@IsNumber()
	newUserStatusId: number;
}
