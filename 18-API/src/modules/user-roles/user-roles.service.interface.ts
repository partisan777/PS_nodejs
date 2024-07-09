import { UserRoleModel } from '@prisma/client';

export interface IUserRolesService {
	getUserRoleByNumber: (roleNumber: number) => Promise<UserRoleModel | null>;
	getUserRoles: () => Promise<UserRoleModel[] | null>;
};
