import { IsEmail, IsNumber, IsString } from "class-validator";

export class UserCreateDto {
	@IsEmail({}, { message: "Неверно указан email" })
	email: string;

	@IsString({ message: "Не указан пароль" })
	password: string;

	@IsString({ message: "Не указано имя" })
	login: string;

	@IsNumber()
	objectStatusId: number;

	@IsNumber()
	userRoleId: number;
}
