import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @Post('pago')
  processPayment(@Body() pago: any) {
    return this.appService.createPago(pago);
  }

  @EventPattern('order.created.v1')
  handleOrderCreated(@Payload() data: any) {
    this.logger.log(
      `Evento recibido: order.created.v1 - Orden ${data.orderId}`,
    );

    try {
      if (data.ok) {
        this.appService.reserveInventory(data.orderId, data);
        this.logger.log(`Inventario reservado para orden ${data.orderId}`);
      } else {
        // Publicar evento reserva fallida
        this.appService.reserveFailureInventory(data);
        this.logger.warn(
          `Fallo en reserva inventario para orden ${data.orderId}`,
        );
      }
    } catch (error) {
      this.logger.error(`Error procesando orden ${data.orderId}: ${error.message}`)
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
