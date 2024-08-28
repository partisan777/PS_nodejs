import { UserModel } from "@prisma/client";

export class User {
		id: number;
		email: string;
		login: string;
		password: string;
		userRoleId: number;
		objectStatusId: number;
		telegramUserId: number;
		telegramUserName: string;
	constructor(
		userModel: UserModel
	) {
		this.id = userModel.id;
		this.email = userModel.email? userModel.email : 'empty';
		this.login = userModel.login? userModel.login : 'empty';
		this.password = userModel.password? userModel.password : 'empty';
		this.userRoleId = userModel.userRoleId;
		this.objectStatusId = userModel.objectStatusId;
		this.telegramUserId = userModel.telegramUserId? userModel.telegramUserId : 0;
		this.telegramUserName = userModel.telegramUserName? userModel.telegramUserName : 'empty';
	}
};

export type ChangeableFields = Partial<Pick<User, "userRoleId" | "objectStatusId">>;
