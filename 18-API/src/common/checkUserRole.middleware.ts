import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IUserService } from '../modules/users/users.service.interface';
import { UserService } from '../modules/users/users.service';

export class CheckUserRole implements IMiddleware {
	
	constructor() {}
	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
        const user = await new UserService.getUserInfo(req.user);
        if (user) {
            console.log(user)
            req.userRole = user;
            next();  
        };
        next();
	};
};
