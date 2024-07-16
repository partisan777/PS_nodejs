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
	name?: string;
	price?: string;
	maxPrice?: string;
	itemTypeNumber?: string;
	rowStatusNumber?: string;
};

export interface ISortPromotionParams {
	name?: string;
	rowStatusNumber?: string;
};

