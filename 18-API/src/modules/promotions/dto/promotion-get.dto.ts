import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";

class FindParams {
	@IsString()
	name?: string;

	@IsNumber({}, { each: true })
	objectStatusId?: number[];
}

class SortParams {
	name?: "asc" | "desc";

	objectStatusId?: "asc" | "desc";
}

class GetPromotionDto {
	@ValidateNested({ each: true })
	@Type(() => FindParams)
	searchParams: FindParams;

	@ValidateNested({ each: true })
	@Type(() => SortParams)
	sortParams: SortParams;
}

export class GetPromotionParams {
	@ValidateNested({ each: true })
	@Type(() => FindParams)
	FIND?: FindParams;

	@ValidateNested({ each: true })
	@Type(() => SortParams)
	SORT?: SortParams;
}

export class GetRequestPromotionDto {
	@ValidateNested({ each: true })
	@Type(() => GetPromotionDto)
	getParams: GetPromotionDto;
}
