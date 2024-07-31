import { compare, hash } from "bcryptjs";

export class User {
	id: number;
	email: string;
	login: string;
	password: string;
	_password: string;
	userRoleId: number;
	objectStatusId: number;
	constructor(
		id: number,
		email: string,
		login: string,
		password: string,
		passwordHash: string,
		objectStatusId: number,
		userRoleId: number,
	) {
		(this.id = id),
			(this.email = email),
			(this.login = login),
			(this.password = password),
			(this.userRoleId = userRoleId),
			(this.objectStatusId = objectStatusId);
	}
	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}

	public async comparePassword(pass: string): Promise<boolean> {
		return compare(pass, this._password);
	}
}
