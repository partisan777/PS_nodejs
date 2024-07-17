import { IsNumber } from 'class-validator';

export class UserUpdateRoleDto {
	@IsNumber()
	id: number;

	@IsNumber()
	newRoleNumber: number;
}
