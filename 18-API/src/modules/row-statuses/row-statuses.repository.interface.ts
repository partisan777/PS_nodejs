import { RowStatusModel } from '@prisma/client';

export interface IRowStatusRepository {
	getRowStatusByNumber: (rowStatusNumber: number) => Promise<RowStatusModel | null>;
	getRowStatuses: () => Promise<RowStatusModel[] | null>;
};
