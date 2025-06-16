import { Body, Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrderCreatePayloadV1 } from './types/eventPattern';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
  ) {}

  @EventPattern('order.created.v1')
  handleOrderCreated(@Payload() data: OrderCreatePayloadV1) {
    this.logger.log(`Evento recibido: order.created.v1 - Orden ${data.id}`);

    try {
      if (data.items.length <= 0) {
        throw new Error('Tu orden no tiene productos');
      }
      this.appService.exitOrder(data);
    } catch (error) {
      this.appService.errorOrder(data.id, error);
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
