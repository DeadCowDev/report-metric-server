import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as xmlParser from 'express-xml-bodyparser';
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(xmlParser());
  await app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
}
bootstrap();
