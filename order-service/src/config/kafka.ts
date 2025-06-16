import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';

const getKafkaConfig = (configService: ConfigService): KafkaOptions => ({
  transport: Transport.KAFKA,
  options: {
    client: {
      // único, inclusive para escalamiento horizontal, instancias con id distinto
      clientId: configService.get<string>('KAFKA_CLIENT_ID') || '',
      brokers: [configService.get<string>('KAFKA_BROKER') || ''],
    },
    consumer: {
      // único por micro-servicio, pero sus instancias deben ser similares.
      groupId: configService.get<string>('KAFKA_GROUP_ID') || '',
    },
  },
});

export default getKafkaConfig;
