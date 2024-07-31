import { ObjectStatus } from "../object-status.entity";

export interface IObjectStatusRepository {
	getObjectStatusById: (objectStatusId: number) => Promise<ObjectStatus | null>;
	getObjectStatuses: () => Promise<ObjectStatus[] | null>;
};
