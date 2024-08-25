import { forwardRef, Inject, Injectable, NestMiddleware } from '@nestjs/common';
// eslint-disable-next-line import/no-unresolved
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(forwardRef(() => LoggerService))
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(LoggerMiddleware.name);
  }

  use(request: Request, _: Response, next: NextFunction): void {
    const { method, baseUrl, url, query, body } = request;

    this.logger.log('Incoming request...', {
      fn: this.use.name,
      request: {
        route: `${method} ${baseUrl || url.replace(/\?.*/, '')}`,
        query,
        ...(['POST', 'PUT', 'PATCH'].includes(method) ? { body } : {}),
      },
    });

    next();
  }
}
