export interface IQueryParams {
	FIND?: Record<string, unknown>[];
	SORT?: Record<string, unknown>[];
};

export interface IFindItemParams {
	name?: string;
	minPrice?: number;
	maxPrice?: number;
	itemTypeNumber?: number[];
	rowStatusNumber?: number[];
};

export interface IFindPromotionParams {
	name?: string;
	rowStatusNumber?: number[];
};

export interface ISortItemParams {
	name?: "asc" | "desc";
	price?: "asc" | "desc";
	maxPrice?: "asc" | "desc";
	itemTypeNumber?: "asc" | "desc";
	rowStatusNumber?: "asc" | "desc";
};

export interface ISortPromotionParams {
	name?: "asc" | "desc";
	rowStatusNumber?: "asc" | "desc";
};

