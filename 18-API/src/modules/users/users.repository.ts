import { UserModel } from '.prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../../database/prisma.service';
import { TYPES } from '../../types';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';
import { EUserRoles, ERowStatus } from '../../enum';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ email, password, login }: User): Promise<UserModel> {
		const rowStatusNumber = ERowStatus.NEW;
		const userRoleNumber = EUserRoles.USER;
		return this.prismaService.client.userModel.create({
			data: {
				email,
				password,
				login,
				rowStatusNumber,
				userRoleNumber
			}
		});
	};

	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email: email,
			},
		});
	};

	async updateUserStatus(id: number, newStatusId: number): Promise<UserModel> {
		return this.prismaService.client.userModel.update({
			data: {
				rowStatusNumber: newStatusId
			},
			where: {
				id: id
			}
		});
	};

	
}
