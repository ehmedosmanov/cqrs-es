import { v4 as uuidv4 } from 'uuid';

export class OrderShippedEvent {
  eventType = 'OrderShipped';
  eventId = uuidv4();
  timestamp = new Date();

  constructor(public orderId: string, public trackingNumber: string) {}
}