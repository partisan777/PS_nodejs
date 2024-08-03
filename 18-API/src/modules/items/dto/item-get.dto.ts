import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

class FindParams {
	@IsString()
	name?: string;

	@IsNumber()
	minPrice?: number;

	@IsNumber()
	maxPrice?: number;

	@IsNumber({}, { each: true })
	itemTypeId?: number[];

	@IsNumber({}, { each: true })
	objectStatusId?: number[];
};

class SortParams {
	name?: "asc" | "desc";
	price?: "asc" | "desc";
	maxPrice?: "asc" | "desc";
	itemTypeId?: "asc" | "desc";
	objectStatusId?: "asc" | "desc";
};

class GetItemParams {
	@ValidateNested({ each: true })
	@Type(() => FindParams)
	searchParams: FindParams;

	@ValidateNested({ each: true })
	@Type(() => SortParams)
	sortParams: SortParams;
};

export class GetRequestItemDto {
	@ValidateNested({ each: true })
	@Type(() => FindParams)
	FIND?: FindParams;

	@ValidateNested({ each: true })
	@Type(() => SortParams)
	SORT?: SortParams;
};

export class GetItemDto {
	@ValidateNested({ each: true })
	@Type(() => GetItemParams)
	getParams: GetItemParams;
};
