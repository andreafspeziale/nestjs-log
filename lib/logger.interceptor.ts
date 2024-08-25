import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    @Inject(forwardRef(() => LoggerService))
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(LoggerInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const { method, originalUrl, query, body } = context
      .switchToHttp()
      .getRequest<FastifyRequest>();

    this.logger.http('Incoming request...', {
      fn: this.intercept.name,
      request: {
        route: `${method} ${originalUrl.replace(/\?.*/, '')}`,
        query,
        ...(['POST', 'PUT', 'PATCH'].includes(method) ? { body } : {}),
      },
    });

    return next.handle();
  }
}
