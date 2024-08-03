import { inject, injectable } from 'inversify';
import type { IConfigService } from '../../config/config.service.interface';
import { EObjectStatus } from '../object-statuses/enums/enums';
import { EUserRoles } from '../user-roles/enums/enums';
import { TYPES } from '../../types';
import type { UserLoginDto } from './dto/user-login.dto';
import type { UserRegisterDto } from './dto/user-register.dto';
import type { IUsersRepository } from './interfaceses/users.repository.interface';
import type { IUserService } from './interfaceses/users.service.interface';
import { compare, hash } from "bcryptjs";
import { UserCreateDto } from './dto/user-create.dto';
import { ChangeableFields } from './user.entity';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}
	async createUser({ email, login, password }: UserRegisterDto) {
		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		}
		const salt = this.configService.get('SECRETSALT');
		const passwordHash = await hash(password, Number(salt))
		const newUser: UserCreateDto = { email, login, password: passwordHash, objectStatusId: EObjectStatus.NEW, userRoleId: EUserRoles.USER };
		return this.usersRepository.create(newUser);
	};

	async validateUser({ email, password }: UserLoginDto) {
		const existedUser = await this.usersRepository.find(email);
		if (!existedUser) {
			return false;
		}
		return compare(password, existedUser.password);
	};

	async getUserInfo(email: string) {
		return this.usersRepository.find(email);
	};

	async updateUserFields(id: number, fields: ChangeableFields) {
		return this.usersRepository.updateUserFields(id, fields );
	};
};
