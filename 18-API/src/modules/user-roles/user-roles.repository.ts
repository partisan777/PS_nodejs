import { inject, injectable } from 'inversify';
import { PrismaService } from '../../database/prisma.service';
import { TYPES } from '../../types';
import { UserRoleModel } from '@prisma/client';
import { IUserRolesRepository } from './user-roles.repository.interface';

@injectable()
export class UserRolesRepository implements IUserRolesRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
	
	async getUserRoleByNumber(roleNumber: number): Promise<UserRoleModel | null> {
		return this.prismaService.client.userRoleModel.findFirst({
			where: {
				roleNumber: roleNumber				
			},
		});
	};
	
	async getUserRoles() {
		return this.prismaService.client.userRoleModel.findMany();
	};
};
