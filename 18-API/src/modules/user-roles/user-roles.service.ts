
import { inject, injectable } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { TYPES } from '../../types';
import { IUserRolesService } from './user-roles.service.interface';
import { UserRolesRepository } from './user-roles.repository';


@injectable()
export class UserRolesService implements IUserRolesService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserRolesRepository) private userRoleRepository: UserRolesRepository,
	) {}
	
	async getUserRoleByNumber(roleNumber: number) {
	   return this.userRoleRepository.getUserRoleByNumber(roleNumber);
	};

	async getUserRoles() {
		return this.userRoleRepository.getUserRoles();
	};	
};
