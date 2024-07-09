import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../../common/base.controller';
import { HTTPError } from '../../errors/http-error.class';
import { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';
import { IConfigService } from '../../config/config.service.interface';
import { IRowStatusController } from './row-statuses.controller.interface';
import { IRowStatusService } from './row-statuses.service.interface';

@injectable()
export class RowStatusesController extends BaseController implements IRowStatusController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.RowStatusService) private rowStatusService: IRowStatusService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/getrowstatusbynumber',
				method: 'get',
				func: this.getRowStatusByNumber,
				middlewares: [],
			},			
			{
				path: '/getrowstatuses',
				method: 'get',
				func: this.getRowStatuses,
				middlewares: [],
			}
		]);		
	}

	async getRowStatusByNumber(req: Request, res: Response, next: NextFunction) {
		const rowStatusNumber  = req.body.rowStatusNumber;
		const rowStatus = await this.rowStatusService.getRowStatusByNumber( rowStatusNumber );
		this.ok( res, rowStatus );	
	};

	async getRowStatuses(req: Request, res: Response, next: NextFunction) { 
		const rowStatuses = await this.rowStatusService.getRowStatuses();
		this.ok( res, rowStatuses );
	};
};
