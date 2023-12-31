import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('social')
    .setDescription('The social API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  const serverConfig = config.get('server');
  const port = serverConfig.port;
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(port);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
      skipMissingProperties: true,
    }),
  );
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
