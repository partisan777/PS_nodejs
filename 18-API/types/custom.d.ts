declare namespace Express {
	import { User } from "../src/modules/users";
	export interface Request {
		userReqData: User;
		};
	};
