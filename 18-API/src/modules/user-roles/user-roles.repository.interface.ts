import { UserRoleModel } from '@prisma/client';

export interface IUserRolesRepository {
	getUserRoleByNumber: (roleNumber: number) => Promise<UserRoleModel | null>;
	getUserRoles: () => Promise<UserRoleModel[] | null>;
};
