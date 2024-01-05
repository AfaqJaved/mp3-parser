import { Inject, MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { LoggerService } from './core/logger/logger.service';
import { LoggerMiddleware } from './core/middleware/logger.middleware';
import { LoggerModule } from './core/logger/logger.module';
import { Mp3ParserModule } from './api/mp3-parser/mp3-parser.module';
import { CustomMulterModule } from './core/multer/multer.module';

@Module({
  imports: [
    LoggerModule,
    Mp3ParserModule,
    CustomMulterModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {

  constructor(private readonly logger: LoggerService) {
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes("fileUpload")
  }

}
