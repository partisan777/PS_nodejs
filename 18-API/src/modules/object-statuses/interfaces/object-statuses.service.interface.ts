import { ObjectStatus } from "../object-status.entity";

export interface IObjectStatusService {
	getObjectStatusById: (objectStatusId: number) => Promise<ObjectStatus | null>;
	getObjectStatuses: () => Promise<ObjectStatus[] | null>;
};
