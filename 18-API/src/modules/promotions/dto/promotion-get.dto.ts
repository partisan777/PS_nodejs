import { IsNumber, IsString } from 'class-validator';


export class GetPromotinDto {
    FIND?: {
        name?: string;
	    rowStatusNumber?: number[];
    };
    SORT?: {
        name?: string;
	    rowStatusNumber?: number;
    }
};

export class GetRequestPromotinDto {
    getParams: {
		searchParams: {
            name?: string;
	        rowStatusNumber?: number[];
        },
        sortParams: {
            name?: string;
            rowStatusNumber?: string;
        }
    }
};
