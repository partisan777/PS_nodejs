import { UserCreateDto } from "../dto/user-create.dto";
import type { ChangeableFields, User } from "../user.entity";


export interface IUsersRepository {
	create: (newUser: UserCreateDto) => Promise<User | null>;
	find: (email: string) => Promise<User | null>;
	updateUserFields: (id: number, fields: ChangeableFields) => Promise<User | null>;
};
