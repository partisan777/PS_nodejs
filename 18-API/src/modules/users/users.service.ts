import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { TYPES } from '../../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';
import { IUserService } from './users.service.interface';
import { ERowStatus, EUserRoles } from '../../enum';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}
	async createUser({ email, login, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, login, '', ERowStatus.NEW);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		}
		return this.usersRepository.create(newUser);
	};

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.usersRepository.find(email);
		if (!existedUser) {
			return false;
		}
		const newUser = new User(existedUser.email, existedUser.login, existedUser.password, ERowStatus.NEW);
		return newUser.comparePassword(password);
	};

	async getUserInfo(email: string): Promise<UserModel | null> {
		return this.usersRepository.find(email);
	};

	async updateUserStatus(id: number, newStatusId: number): Promise<UserModel> {
		return this.usersRepository.updateUserStatus(id, newStatusId);
	};

	async updateuserrole(id: number, newRoleNumber: number): Promise<UserModel> {
		return this.usersRepository.updateuserrole(id, newRoleNumber);
	};
};
