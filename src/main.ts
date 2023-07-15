import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as config from 'config';

dotenv.config({ path: './config/.env' });

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get<any>('server');
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`App is Listening on Port : ${port}`);
}
bootstrap();
