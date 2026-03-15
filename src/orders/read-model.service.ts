import { AppDataSource } from '../database/data-source';
import { OrderViewEntity } from '../database/entities/order-view.entity';

export class ReadModelService {
  private orderViewRepo = AppDataSource.getRepository(OrderViewEntity);

  async handleEvent(event: any) {
    if (event.eventType === 'OrderPlaced') {
      await this.orderViewRepo.save({
        orderId: event.orderId,
        customerName: event.customerName,
        totalAmount: event.totalAmount,
        status: 'PENDING',
        items: event.items,
        createdAt: event.timestamp,
      });
      console.log(`Read model updated: OrderPlaced`);
    }

    if (event.eventType === 'OrderConfirmed') {
      await this.orderViewRepo.update(event.orderId, { status: 'CONFIRMED' });
      console.log(`Read model updated: OrderConfirmed`);
    }

    if (event.eventType === 'OrderShipped') {
      await this.orderViewRepo.update(event.orderId, {
        status: 'SHIPPED',
        trackingNumber: event.trackingNumber,
      });
      console.log(`Read model updated: OrderShipped`);
    }
  }

  async getOrder(orderId: string) {
    return await this.orderViewRepo.findOne({ where: { orderId } });
  }

  async getOrders(status?: string) {
    if (status) {
      return await this.orderViewRepo.find({ where: { status } });
    }
    return await this.orderViewRepo.find();
  }
}
