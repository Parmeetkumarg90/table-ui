import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();

  const frontendUrl =
    configService.get<string>('FRONTEND_URL') || process.env.FRONTEND_URL;
  const backendUrl =
    configService.get<string>('BACKEND_URL') || process.env.BACKEND_URL;

  app.enableCors({
    origin: [frontendUrl, backendUrl],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
    }),
  );

  const port = process.env.APP_PORT ?? process.env.PORT ?? 8000;
  await app.listen(port);
}
bootstrap();
