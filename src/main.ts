import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as xmlParser from 'express-xml-bodyparser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(xmlParser());

  const config = new DocumentBuilder()
    .setTitle('Report Metrics API')
    .setDescription('API to expose test results as metrics')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
}
bootstrap();
