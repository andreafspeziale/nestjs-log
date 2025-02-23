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
import { InjectLoggerModuleOptions } from './logger.decorators';
import { LoggerModuleOptions } from './logger.interfaces';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    @InjectLoggerModuleOptions()
    private readonly loggerModuleOptions: LoggerModuleOptions,
    @Inject(forwardRef(() => LoggerService))
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(LoggerInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const { method, originalUrl, query, body } = context
      .switchToHttp()
      .getRequest<FastifyRequest<{ Querystring: Record<string, string> }>>();

    const route = `${originalUrl.replace(/\?.*/, '')}`;

    const shouldIgnoreRoute = this.loggerModuleOptions.exclude?.some((pattern) =>
      new RegExp(`^${pattern.replace(/\//g, '\\/').replace(/\*/g, '.*')}$`).test(route),
    );

    if (!shouldIgnoreRoute) {
      this.logger.http('Incoming request...', {
        fn: this.intercept.name,
        request: {
          route: `${method} ${route}`,
          query: { ...query },
          ...(['POST', 'PUT', 'PATCH'].includes(method) ? { body } : {}),
        },
      });
    }

    return next.handle();
  }
}
