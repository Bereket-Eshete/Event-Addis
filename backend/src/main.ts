import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //add the deve url to allow request from the localhost
  app.enableCors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:3000', 'https://event-addis.vercel.app'].filter(Boolean),
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
