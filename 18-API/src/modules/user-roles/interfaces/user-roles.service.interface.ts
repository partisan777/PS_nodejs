import type { UserRole } from "../user-role.entity";

export interface IUserRolesService {
	getUserRoleById: (roleNumber: number) => Promise<UserRole | null>;
	getUserRoles: () => Promise<UserRole[] | null>;
}
