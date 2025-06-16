import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatePayloadV1 } from './types/eventPattern';

@Injectable()
export class AppService {
  constructor(@Inject('KAFKA_CLIENT') private client: ClientKafka) {}

  getHello(): string {
    return 'Hello World!';
  }

  exitOrder(data: OrderCreatePayloadV1) {
    console.log('OrderService: order created', data);
    this.client.emit('order_confirmed', data);
  }

  errorOrder(id: string, error: unknown) {
    if (error instanceof Error) {
      console.error('OrderService: error', error.message);
      this.client.emit('order_failed', { orderId: id, reason: error.message });
    } else {
      console.error('OrderService: error', error);
      this.client.emit('order_failed', { orderId: id, reason: error });
    }
  }
}
