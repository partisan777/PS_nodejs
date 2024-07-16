declare namespace Express {
	export interface Request {
		user: string;
		userReqId: number;
		userRole: any;
	};
};