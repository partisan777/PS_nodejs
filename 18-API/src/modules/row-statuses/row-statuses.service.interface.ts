import { RowStatusModel } from '@prisma/client';

export interface IRowStatusService {
	getRowStatusByNumber: (rowStatusNumber: number) => Promise<RowStatusModel | null>;
	getRowStatuses: () => Promise<RowStatusModel[] | null>;
};
