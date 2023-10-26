import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { config } from 'src/config/env';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const configDoc = new DocumentBuilder()
    .setTitle('API Painel de Risco')
    .setDescription('API para uso no painel de risco')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .setExternalDoc('Postman Collection', '/api-docs-json')
    .build();
  const document = SwaggerModule.createDocument(app, configDoc);
  SwaggerModule.setup('api-docs', app, document);

  await app.startAllMicroservices();

  app.enableCors();
  await app.listen(config.api.port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
