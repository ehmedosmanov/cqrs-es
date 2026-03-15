export class PlaceOrderCommand {
  constructor(
    public orderId: string,
    public customerName: string,
    public items: Array<{ product: string; quantity: number; price: number }>
  ) {}
}