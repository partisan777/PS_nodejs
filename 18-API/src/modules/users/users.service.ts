import { inject, injectable } from 'inversify';
import type { IConfigService } from '../../config/config.service.interface';
import { ERowStatus, EUserRoles } from '../../enum';
import { TYPES } from '../../types';
import type { UserLoginDto } from './dto/user-login.dto';
import type { UserRegisterDto } from './dto/user-register.dto';
import type { IUsersRepository } from './interfaceses/users.repository.interface';
import type { IUserService } from './interfaceses/users.service.interface';
import { User } from './user.entity';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}
	async createUser({ email, login, password }: UserRegisterDto) {
		const newUser = new User(-1, email, login, password, '', ERowStatus.NEW, EUserRoles.USER);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		}
		return this.usersRepository.create(newUser);
	};

	async validateUser({ email, password }: UserLoginDto) {
		const existedUser = await this.usersRepository.find(email);
		if (!existedUser) {
			return false;
		}
		const newUser = new User(-1, existedUser.email, existedUser.login, existedUser.password, existedUser.password, ERowStatus.NEW, EUserRoles.USER);
		return newUser.comparePassword(password);
	};

	async getUserInfo(email: string) {
		return this.usersRepository.find(email);
	};

	async updateUserStatus(id: number, newStatusId: number) {
		return this.usersRepository.updateUserStatus(id, newStatusId);
	};

	async updateUserRole(id: number, newRoleNumber: number) {
		return this.usersRepository.updateUserRole(id, newRoleNumber);
	};
};
