import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';

const getKafkaConfig = (configService: ConfigService): KafkaOptions => {
  const clientId = configService.get<string>('KAFKA_CLIENT_ID');
  const brokers = configService.get<string>('KAFKA_BROKER');
  const groupId = configService.get<string>('KAFKA_GROUP_ID');

  if (!clientId) throw new Error('KAFKA_CLIENT_ID is required');
  if (!brokers) throw new Error('KAFKA_BROKER is required');
  if (!groupId) throw new Error('KAFKA_GROUP_ID is required');

  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId,
        brokers: [brokers],
      },
      consumer: {
        groupId,
      },
    },
  };
};

export default getKafkaConfig;
