import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: 3001, retryAttempts: 5, retryDelay: 3001 },
  });

  const config = new DocumentBuilder()
    .setTitle('MS Users')
    .setDescription('API Users para o projeto Pokecenter')
    .setVersion('1.0')
    .addTag('MS Users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'MS Users',
  });

  // await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
