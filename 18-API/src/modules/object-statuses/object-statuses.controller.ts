import 'reflect-metadata';
import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../../common/base.controller';
import type { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';
import type { IObjectStatusController } from './interfaces/object-statuses.controller.interface';
import type { IObjectStatusService } from './interfaces/object-statuses.service.interface';

@injectable()
export class ObjectStatusController extends BaseController implements IObjectStatusController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.ObjectStatusService) private objectStatusService: IObjectStatusService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/get-object-status-by-id',
				method: 'get',
				func: this.getObjectStatusById,
				middlewares: [],
			},
			{
				path: '/get-object-statuses',
				method: 'get',
				func: this.getObjectStatuses,
				middlewares: [],
			}
		]);
	}

	async getObjectStatusById(req: Request, res: Response, next: NextFunction) {
		const objectStatusId  = req.body.objectStatusId;
		const objectStatus = await this.objectStatusService.getObjectStatusById( objectStatusId );
		this.ok( res, objectStatus );
	};

	async getObjectStatuses(req: Request, res: Response, next: NextFunction) {
		const objectStatus = await this.objectStatusService.getObjectStatuses();
		this.ok( res, objectStatus );
	};
};
