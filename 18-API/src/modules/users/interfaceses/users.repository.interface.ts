import { User } from '../user.entity';

export interface IUsersRepository {
	create: (user: User) => Promise<User | null>;
	find: (email: string) => Promise<User | null>;
	updateUserStatus: (id: number, newStatusId: number) => Promise<User | null>;
	updateUserRole: (id: number, newRoleId: number) => Promise<User | null>;
};

