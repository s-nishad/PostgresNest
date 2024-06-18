/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {ClassSerializerInterceptor, Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory, Reflector} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

import {AppModule} from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('PostgresNest API')
    .setDescription('PostgresNest API Service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);


  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
