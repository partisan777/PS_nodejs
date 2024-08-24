import { UserCreateDto } from "../dto/user-create.dto";
import { UserCreateTelegramDto } from "../dto/user-create-from-telegram.dto";
import { FindUserWhereConditionDto } from "../dto/user-where.dto";
import type { ChangeableFields, User } from "../user.entity";


export interface IUsersRepository {
	create: (newUser: UserCreateDto) => Promise<User | null>;
	find: (where: FindUserWhereConditionDto) => Promise<User | null>;
	updateUserFields: (id: number, fields: ChangeableFields) => Promise<User | null>;
	createUserFromTelegram: (data: UserCreateTelegramDto) => Promise<User | null>;
};
