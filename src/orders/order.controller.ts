import { Router } from 'express';
import { EventStoreService } from './event-store.service';
import { ReadModelService } from './read-model.service';
import { OrderAggregate } from './order.aggregate';
import {
  PlaceOrderCommand,
  ConfirmOrderCommand,
  ShipOrderCommand,
} from './commands';
import { GetOrderQuery, GetOrdersQuery } from './queries';

const router = Router();
const eventStore = new EventStoreService();
const readModel = new ReadModelService();

// COMMANDS (Write)
router.post('/orders', async (req, res) => {
  try {
    const { orderId, customerName, items } = req.body;
    const command = new PlaceOrderCommand(orderId, customerName, items);

    const order = new OrderAggregate(command.orderId);
    const event = order.placeOrder(command.customerName, command.items);

    await eventStore.save(event);
    await readModel.handleEvent(event);

    res.status(201).json({ orderId });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/orders/:id/confirm', async (req, res) => {
  try {
    const command = new ConfirmOrderCommand(req.params.id);

    const events = await eventStore.getEvents(command.orderId);
    const order = await OrderAggregate.fromEvents(events);
    const event = order.confirm();

    await eventStore.save(event);
    await readModel.handleEvent(event);

    res.json({ message: 'Order confirmed' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/orders/:id/ship', async (req, res) => {
  try {
    const { trackingNumber } = req.body;
    const command = new ShipOrderCommand(req.params.id, trackingNumber);

    const events = await eventStore.getEvents(command.orderId);
    const order = await OrderAggregate.fromEvents(events);
    const event = order.ship(command.trackingNumber);

    await eventStore.save(event);
    await readModel.handleEvent(event);

    res.json({ message: 'Order shipped' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// QUERIES (Read)
router.get('/orders/:id', async (req, res) => {
  try {
    const query = new GetOrderQuery(req.params.id);
    const order = await readModel.getOrder(query.orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const { status } = req.query;
    const query = new GetOrdersQuery(status as string);
    const orders = await readModel.getOrders(query.status);

    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// EVENT SOURCING
router.get('/orders/:id/history', async (req, res) => {
  try {
    const events = await eventStore.getEvents(req.params.id);
    res.json({ events }); 
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
