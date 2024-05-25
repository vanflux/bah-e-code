import { INestApplication, Injectable, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { createAutoAuthorizePlugin } from './plugins/auto-authorize.plugin';

@Injectable()
export class DocsService {
  private logger = new Logger('DocsService');

  setup(app: INestApplication) {
    const options: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
        plugins: [createAutoAuthorizePlugin()],
      },
    };
    const config = new DocumentBuilder().setTitle('TechRS API').setDescription('TechRS API').setVersion('1.0.0').addBearerAuth().build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document, options);
    this.logger.log('Docs loaded');
  }
}
