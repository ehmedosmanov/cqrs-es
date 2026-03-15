import {
  OrderPlacedEvent,
  OrderConfirmedEvent,
  OrderShippedEvent,
} from './events/index';

export class OrderAggregate {
  private orderId: string;
  private customerName: string = '';
  private items: any[] = [];
  private totalAmount: number = 0;
  private status: string = 'PENDING';
  private trackingNumber?: string;

  constructor(orderId: string) {
    this.orderId = orderId;
  }

  placeOrder(customerName: string, items: any[]) {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    return new OrderPlacedEvent(this.orderId, customerName, items, total);
  }

  confirm() {
    if (this.status !== 'PENDING') {
      throw new Error('Can only confirm pending orders');
    }
    return new OrderConfirmedEvent(this.orderId);
  }

  ship(trackingNumber: string) {
    if (this.status !== 'CONFIRMED') {
      throw new Error('Can only ship confirmed orders');
    }
    return new OrderShippedEvent(this.orderId, trackingNumber);
  }

  apply(event: any) {
    if (event.eventType === 'OrderPlaced') {
      this.customerName = event.customerName;
      this.items = event.items;
      this.totalAmount = event.totalAmount;
      this.status = 'PENDING';
    } else if (event.eventType === 'OrderConfirmed') {
      this.status = 'CONFIRMED';
    } else if (event.eventType === 'OrderShipped') {
      this.status = 'SHIPPED';
      this.trackingNumber = event.trackingNumber;
    }
  }

  static async fromEvents(events: any[]): Promise<OrderAggregate> {
    const order = new OrderAggregate(events[0]?.orderId);
    events.forEach((event) => order.apply(event));
    return order;
  }
}
