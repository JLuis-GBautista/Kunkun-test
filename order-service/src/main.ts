import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import getKafkaConfig from './config/kafka';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);
  const kafkaOptions = getKafkaConfig(configService);

  const app = await NestFactory.createMicroservice(AppModule, kafkaOptions);
  await app.listen();
}
bootstrap().catch((e) => console.log(e));
