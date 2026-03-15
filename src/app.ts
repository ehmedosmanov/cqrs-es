import express from 'express';
import orderController from './orders/order.controller';

const app = express();

app.use(express.json());
app.use('/api', orderController);

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

export default app;
