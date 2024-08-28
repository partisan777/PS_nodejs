import { IsNumber, IsString } from "class-validator";

export class UserCreateTelegramDto {

	@IsString()
	telegramUserName: string;

	@IsNumber()
	telegramUserId: number;

	@IsNumber()
	objectStatusId: number;

	@IsNumber()
	userRoleId: number;

};
