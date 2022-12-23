import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path'; // <-- Add this

const logger = new Logger('Main');
export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'app',
    protoPath: join(__dirname, '../proto/app.proto'),
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );
  app.listen(() => {
    logger.log('Microservice is listening...');
  });
}
bootstrap();
