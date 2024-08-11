import { UserModel } from "@prisma/client";

export class User {
		id: number;
		email: string;
		login: string;
		password: string;
		userRoleId: number;
		objectStatusId: number;
	constructor(
		userModel: UserModel
	) {
		this.id = userModel.id;
		this.email = userModel.email;
		this.login = userModel.login;
		this.password = userModel.password;
		this.userRoleId = userModel.userRoleId;
		this.objectStatusId = userModel.objectStatusId;
	}
};

export type ChangeableFields = Partial<Pick<User, "userRoleId" | "objectStatusId">>;
