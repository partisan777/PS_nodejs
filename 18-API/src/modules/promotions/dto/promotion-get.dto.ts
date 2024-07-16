import { IsNumber, IsString } from 'class-validator';

export class GetPromotionDto {
    FIND?: {
        name?: string;
	    rowStatusNumber?: number[];
    };
    SORT?: {
        name?: string;
	    rowStatusNumber?: number;
    }
};

export class GetRequestPromotionDto {
    getParams: {
		searchParams: {
            name?: string;
	        rowStatusNumber?: number[];
        },
        sortParams: {
            name?: string;
            rowStatusNumber: string;
        }
    }
};
