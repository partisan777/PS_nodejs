import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string;
	private userRoleNumber: number;
	private rowStatusNumber?: number;
	constructor(
		private readonly _email: string,
		private readonly _login: string,
		passwordHash?: string,
		rowStatusNumber?: number
	) {
		if (passwordHash) {
			this._password = passwordHash;
		}
	}

	get email(): string {
		return this._email;
	};

	get login(): string {
		return this._login;
	};

	get password(): string {
		return this._password;
	};

	get userRole(): number {
		return this.userRoleNumber;
	};

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	};

	public async comparePassword(pass: string): Promise<boolean> {
		return compare(pass, this._password);
	};
}

/*
model User {
	id
	login
	email
	password
	rowStatusNumber
	userRole
  }
*/
