import { IsNumber, IsString } from 'class-validator';

export class WarehouseBalanceCreateDto {
	@IsString()
	name: string;
  	
	@IsString()
	description: string;

	@IsNumber()
	userId: number;
	
	@IsNumber()
	itemId: number;

	@IsNumber()
	quantity: number;

	@IsNumber()
	rowStatusNumber: number;
};

	
