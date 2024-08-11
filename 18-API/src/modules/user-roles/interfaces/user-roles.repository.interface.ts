import type { UserRole } from "../user-role.entity";

export interface IUserRolesRepository {
	getUserRoleById: (roleId: number) => Promise<UserRole | null>;
	getUserRoles: () => Promise<UserRole[] | null>;
}
