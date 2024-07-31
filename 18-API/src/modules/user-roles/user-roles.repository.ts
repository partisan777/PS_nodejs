import { inject, injectable } from 'inversify';
import type { PrismaService } from '../../database/prisma.service';
import { TYPES } from '../../types';
import type { IUserRolesRepository } from './interfaces/user-roles.repository.interface';
import { UserRole } from './user-role.entity';

@injectable()
export class UserRolesRepository implements IUserRolesRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async getUserRoleById(roleId: number) {
		const existUserRole = await this.prismaService.client.userRoleModel.findFirst({
			where: {
				id: roleId
			},
		});
		if(!existUserRole) return null;
		return new UserRole(
			existUserRole.id,
			existUserRole.description
		)
	};

	async getUserRoles() {
		const existUsersRoles = await this.prismaService.client.userRoleModel.findMany();

		if(!existUsersRoles) return null;

		return existUsersRoles.map(role => {
				return new UserRole(
					role.id,
					role.description
				);
			}
		);
	}
}
