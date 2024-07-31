import type { UserLoginDto } from "../dto/user-login.dto";
import type { UserRegisterDto } from "../dto/user-register.dto";
import type { User } from "../user.entity";

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<User | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
	getUserInfo: (email: string) => Promise<User | null>;
	updateUserRole: (id: number, newRoleId: number) => Promise<User | null>;
}
