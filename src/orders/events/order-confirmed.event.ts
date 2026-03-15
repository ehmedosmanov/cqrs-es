import { v4 as uuidv4 } from 'uuid';

export class OrderConfirmedEvent {
  eventType = 'OrderConfirmed';
  eventId = uuidv4();
  timestamp = new Date();

  constructor(public orderId: string) {}
}