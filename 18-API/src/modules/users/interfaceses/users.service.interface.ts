import type { UserLoginDto } from "../dto/user-login.dto";
import type { UserRegisterDto } from "../dto/user-register.dto";
import { FindUserWhereConditionDto } from "../dto/user-where.dto";
import type { ChangeableFields, User } from "../user.entity";

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<User | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
	getUserInfo: (where: FindUserWhereConditionDto) => Promise<User | null>;
	updateUserFields: (id: number, fields: ChangeableFields) => Promise<User | null>;
	createUserFromTelegram: (telegramUserId: number, telegramUserName: string) => Promise<User | null>;
};
