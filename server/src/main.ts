import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ----------------- Cookie Parser ------------------
  app.use(cookieParser());

  // ----------------- CORS ------------------
  app.enableCors({
    origin: ['http://localhost:3000', process.env.FRONTEND_URL].filter(Boolean),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // ----------------- Validation Pipe ------------------
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve propiedades que no están en el DTO
      forbidNonWhitelisted: true, // Lanza error si hay propiedades no permitidas
      transform: true, // Transforma los datos a los tipos especificados
      transformOptions: {
        enableImplicitConversion: true, // <-- necesario para IsNumber
      },
    }),
  );

  // ----------------- Global prefix ------------------
  app.setGlobalPrefix('api');

  // ----------------- Swagger ------------------
  const config = new DocumentBuilder()
    .setTitle('PetCare API')
    .setDescription('API para el manejo de mascotas y recordatorios')
    .setVersion('1.0')

    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  //------------------ Start server ------------------
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}/api`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
