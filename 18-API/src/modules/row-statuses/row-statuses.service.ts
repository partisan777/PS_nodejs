
import { inject, injectable } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { TYPES } from '../../types';
import { IRowStatusService } from './row-statuses.service.interface';
import { RowStatusRepository } from './row-statuses.repository';

@injectable()
export class RowStatusService implements IRowStatusService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.RowStatusRepository) private rowStatusRepository: RowStatusRepository,
	) {}
	
	async getRowStatusByNumber(rowStatusNumber: number) {
	   return this.rowStatusRepository.getRowStatusByNumber(rowStatusNumber);
	};

	async getRowStatuses() {
		return this.rowStatusRepository.getRowStatuses();
	};	
};
