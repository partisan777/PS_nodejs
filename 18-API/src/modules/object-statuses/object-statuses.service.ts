
import { inject, injectable } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { TYPES } from '../../types';
import { IObjectStatusService } from './interfaces/object-statuses.service.interface';
import { ObjectStatusRepository } from './object-statuses.repository';

@injectable()
export class ObjectStatusService implements IObjectStatusService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.ObjectStatusRepository) private objectStatusRepository: ObjectStatusRepository,
	) {}

	async getObjectStatusById(objectStatusId: number) {
	   return this.objectStatusRepository.getObjectStatusById(objectStatusId);
	};

	async getObjectStatuses() {
		return this.objectStatusRepository.getObjectStatuses();
	};
};
