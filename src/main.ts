import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Gastos api')
    .setDescription('The gastos API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('user')
    .addTag('rol')
    .addTag('Statud')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  const PORT = process.env.PORT || 3000;
  //add
  await app.listen(PORT, "0.0.0.0");
}
bootstrap();
