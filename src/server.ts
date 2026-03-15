import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { AppDataSource } from './database/data-source';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });
