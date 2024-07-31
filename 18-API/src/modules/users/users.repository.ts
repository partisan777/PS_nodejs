import { inject, injectable } from 'inversify';
import type { PrismaService } from '../../database/prisma.service';
import { TYPES } from '../../types';
import type { IUsersRepository } from './interfaceses/users.repository.interface';
import { User } from './user.entity';


@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create(newUser: User) {
		const createdUser = await this.prismaService.client.userModel.create({
			data: {
				email: newUser.email,
				password: newUser._password,
				login: newUser.login,
				objectStatusId:  newUser.objectStatusId,
				userRoleId: newUser.userRoleId
			}
		});

		if (!createdUser) return null;

		return new User(
			createdUser.id,
			createdUser.email,
			createdUser.login,
			createdUser.password,
			createdUser.password,
			createdUser.objectStatusId,
			createdUser.userRoleId
		);
	};

	async find(email: string) {
		const existUser =  await  this.prismaService.client.userModel.findFirst({
			where: {
				email: email,
			},
		});

		if (!existUser) return null;

		return new User(
			existUser.id,
			existUser.email,
			existUser.login,
			existUser.password,
			existUser.password,
			existUser.objectStatusId,
			existUser.userRoleId
		);
	};

	async updateUserStatus(id: number, newStatusId: number) {
		const existUser =  await this.prismaService.client.userModel.update({
			data: {
				objectStatusId: newStatusId
			},
			where: {
				id: id
			}
		});

		if (!existUser) return null;

		return new User(
			existUser.id,
			existUser.email,
			existUser.login,
			existUser.password,
			existUser.password,
			existUser.objectStatusId,
			existUser.userRoleId
		);
	};

	async updateUserRole(id: number, newRoleNumber: number): Promise<User> {
		const existUser =  await  this.prismaService.client.userModel.update({
			data: {
				userRoleId: newRoleNumber
			},
			where: {
				id: id
			}
		});
		return new User(
			existUser.id,
			existUser.email,
			existUser.login,
			existUser.password,
			existUser.password,
			existUser.objectStatusId,
			existUser.userRoleId
		);
	};
};
