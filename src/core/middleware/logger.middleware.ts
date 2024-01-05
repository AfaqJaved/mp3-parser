import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly logger: LoggerService) { }
    use(req: Request, res: Response, next: NextFunction) {
        const currentDate = new Date().toISOString();
        const requestType = req.method;
        const requestHeaders = req.headers;

        this.logger.log(`[${currentDate}] ${requestType} ${req.url}`);
        next();
    }
}
