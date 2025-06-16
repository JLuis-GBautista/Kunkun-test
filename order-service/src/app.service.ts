import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(private client: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  reserveInventory(orderId: string, data: any) {
    try {
      this.client.emit('inventory.reserved.v1', data);
    } catch (error) {
      this.client.emit('notification.created.v1', {
        orderId,
        err: error as string,
      });
    }
  }

  reserveFailureInventory(data: any) {
    try {
      this.client.emit('inventory.reserved.failure.v1', data);
    } catch (error) {
      this.client.emit('notification.created.v1', {
        data.orderId,
        err: error as string,
      });
    }
  }

  createPago(pagoDto: any) {
    const pagoId = Math.floor(Math.random() * 1000);
    try {

      this.client.emit('pago.created.v1', {
        pagoId,
        userId: pagoDto.userId,
        items: pagoDto.items,
        total: pagoDto.total,
      });
    } catch (error) {
      this.client.emit('notification.created.v1', {
        pagoId,
        err: error as string,
      });
    }
  }
}
