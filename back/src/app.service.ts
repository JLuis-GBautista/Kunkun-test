import { Inject, Injectable } from '@nestjs/common';
import { ClientKafkaProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('KAFKA_CLIENT') private client: ClientKafkaProxy) {}

  createOrder(data: unknown) {
    console.log('aq');
    console.log(this.client);
    this.client.emit('order.created.v1', data);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
