import { UserModel } from '@prisma/client';
import { User } from './user.entity';

export interface IUsersRepository {
	create: (user: User) => Promise<UserModel>;
	find: (email: string) => Promise<UserModel | null>;
	updateUserStatus: (id: number, newStatusId: number) => Promise<UserModel>;
	updateuserrole: (id: number, newRoleNumber: number) => Promise<UserModel>;
};

