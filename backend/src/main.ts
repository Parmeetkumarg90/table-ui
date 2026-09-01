import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService()

  app.enableCors({
    origin: [configService.get<string>('FRONTEND_URL'), configService.get<string>('BACKEND_URL')],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidUnknownValues: true
  }))

  const port = process.env.APP_PORT ?? process.env.PORT ?? 8000;
  await app.listen(port);
}
bootstrap();
