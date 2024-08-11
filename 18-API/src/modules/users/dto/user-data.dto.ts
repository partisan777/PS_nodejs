import { IsEmail, IsNumber } from "class-validator";

export class UserRequestDataDto {
	@IsEmail({}, { message: "Неверно указан email" })
	user: string;

	@IsNumber()
	userReqId: number;

	@IsNumber()
	userRole: number;
}
