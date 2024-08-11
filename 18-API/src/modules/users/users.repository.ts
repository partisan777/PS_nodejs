import { inject, injectable } from 'inversify';
import type { PrismaService } from '../../database/prisma.service';
import { TYPES } from '../../types';
import type { IUsersRepository } from './interfaceses/users.repository.interface';
import { ChangeableFields, User } from './user.entity';
import { UserCreateDto } from './dto/user-create.dto';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create(newUser: UserCreateDto) {
		const createdUser = await this.prismaService.client.userModel.create({
			data: {
				email: newUser.email,
				password: newUser.password,
				login: newUser.login,
				objectStatusId:  newUser.objectStatusId,
				userRoleId: newUser.userRoleId
			}
		});

		if (!createdUser) return null;
		return new User(createdUser);
	};

	async find(email: string) {
		const existUser =  await  this.prismaService.client.userModel.findFirst({
			where: {
				email: email,
			},
		});

		if (!existUser) return null;

		return new User(existUser);
	};

	async updateUserFields(id: number, fields: ChangeableFields) {
		const existUser =  await this.prismaService.client.userModel.update({
			data: fields,
			where: {
				id: id
			}
		});
		if (!existUser) return null;
		return new User(existUser);
	};
};
