export interface IFindItemParams {
	name?: string;
	minPrice?: number;
	maxPrice?: number;
	itemTypeId?: number[];
	objectStatusId?: number[];
}

export interface ISortItemParams {
	name?: "asc" | "desc";
	price?: "asc" | "desc";
	maxPrice?: "asc" | "desc";
	itemTypeId?: "asc" | "desc";
	objectStatusId?: "asc" | "desc";
}
