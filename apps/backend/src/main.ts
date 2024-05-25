import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocsService } from './docs/docs.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({ origin: '*' });
  app.enableVersioning({ type: VersioningType.URI });
  const logger = new Logger('Bootstrap');
  // Load docs
  const docs = await app.resolve(DocsService).catch(() => {});
  docs?.setup(app);
  // Listen
  const configService = await app.resolve(ConfigService);
  const port = configService.getOrThrow('port');
  await app.listen(port);
  logger.log(`Listening on ${port}`);
}
bootstrap();
