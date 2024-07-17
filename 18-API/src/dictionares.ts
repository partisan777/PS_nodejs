export const queryItemParamDict = {
	name: ["name", "contains"],
	minPrice: ["price", "gt"],
	maxPrice: ["price", "lt"],
	itemTypeNumber: ["itemTypeNumber", "in"],
	rowStatusNumber: ["rowStatusNumber", "in"]
};

export const sortItemParamDict = {
	name: ["name", "asc"],
	price: ["price", "asc"],
	itemTypeNumber: ["itemTypeNumber", "asc"],
	rowStatusNumber: ["rowStatusNumber", "asc"]
};

export const queryPromotionParamDict = {
	name: ["name", "contains"],
	rowStatusNumber: ["rowStatusNumber", "in"]
};

export const sortPromotionParamDict = {
	name: ["name", "desc"],
	rowStatusNumber: ["rowStatusNumber", "asc"]
};
