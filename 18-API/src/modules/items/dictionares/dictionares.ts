export const queryItemParamDict = {
	name: ["name", "contains"],
	minPrice: ["price", "gt"],
	maxPrice: ["price", "lt"],
	itemTypeId: ["itemTypeId", "in"],
	objectStatusId: ["objectStatusId", "in"],
};

export const sortItemParamDict = {
	name: ["name", "asc"],
	price: ["price", "asc"],
	itemTypeId: ["itemTypeId", "asc"],
	objectStatusId: ["objectStatusId", "asc"],
};
