import { v4 as uuidv4 } from 'uuid';

export class OrderPlacedEvent {
  eventType = 'OrderPlaced';
  eventId = uuidv4();
  timestamp = new Date();

  constructor(
    public orderId: string,
    public customerName: string,
    public items: Array<{ product: string; quantity: number; price: number }>,
    public totalAmount: number
  ) {}
}