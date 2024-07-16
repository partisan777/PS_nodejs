

export class GetRequestItemDto {
    FIND?: {
        name?: string;
        minPrice?: number;
        maxPrice?: number;
        itemTypeNumber?: number[];
        rowStatusNumber?: number[];
    };
    SORT?: {
        name?: string;
        minPrice?: string;
        maxPrice?: string;
        itemTypeNumber?: string;
        rowStatusNumber?: string;
    }
};

export class GetItemDto {
    getParams: {
		searchParams: {
            name?: string;
            minPrice?: number;
            maxPrice?: number;
            itemTypeNumber?: number[];
            rowStatusNumber?: number[];
        },
        sortParams: {
            name?: string;
            minPrice?: string;
            maxPrice?: string;
            itemTypeNumber?: string;
            rowStatusNumber?: string;
        }
    }
};
