export interface IFindPromotionParams {
	name?: string;
	objectStatusId?: number[];
};

export interface ISortPromotionParams {
	name?: "asc" | "desc";
	objectStatusId?: "asc" | "desc";
};
