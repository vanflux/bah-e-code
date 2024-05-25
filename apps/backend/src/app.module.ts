import { isDevelopment, loadConfig } from './config/config';
import { DatabaseModule } from './database/database.module';
import { DevModule } from './dev/dev.module';
import { DocsModule } from './docs/docs.module';
import { StatusModule } from './status/status.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { DynamicModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadConfig],
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    DatabaseModule,
    isDevelopment && DevModule,
    DocsModule,
    StatusModule,
  ].filter(Boolean) as DynamicModule[],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
