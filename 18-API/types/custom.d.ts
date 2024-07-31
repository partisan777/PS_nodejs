declare namespace Express {
	export interface Request {
		userReqData:  {
			user: string;
			userReqId: number;
			userRole: any;
		};
	};
};