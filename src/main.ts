import { environmentSchema } from '@/validation/environment.schema';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import config from './config';

const logger = new Logger('Main');

async function bootstrap() {
  const { error } = environmentSchema.validate(process.env);
  if (error) {
    throw error;
  }

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    config().grpc.server,
  );
  app.enableShutdownHooks();

  await app.listen();
}

bootstrap()
  .then(() => logger.log(`App started and listening on: ${config().grpc.server.options.url}`))
  .catch((e) => logger.error(e));
