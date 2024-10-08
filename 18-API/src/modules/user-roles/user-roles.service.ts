
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import type { IUserRolesService } from './interfaces/user-roles.service.interface';
import type { UserRolesRepository } from './user-roles.repository';


@injectable()
export class UserRolesService implements IUserRolesService {
	constructor(
		@inject(TYPES.UserRolesRepository) private userRoleRepository: UserRolesRepository,
	) {}

	async getUserRoleById(roleId: number) {
	   return this.userRoleRepository.getUserRoleById(roleId);
	};

	async getUserRoles() {
		return this.userRoleRepository.getUserRoles();
	};
};
