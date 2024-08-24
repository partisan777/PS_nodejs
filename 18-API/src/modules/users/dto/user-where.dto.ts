import { IsEmail, IsNumber, IsString } from "class-validator";

export class FindUserWhereConditionDto {
    @IsEmail({}, { message: "Неверно указан email" })
	email?: string;

    @IsNumber()
    telegramUserId?: number;

    @IsString()
    telegramUserName?: string;
};
