'use strict';
import express from 'express';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import subscriptionRoutes from './routes/subscriptionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import accessCodeRoutes from './routes/accessCodeRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';

import db from './models/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 3001;

// Import config dynamically
const configModule = await import(join(__dirname, 'config', 'config.json'), {
  assert: { type: 'json' }
});
const config = configModule.default[process.env.NODE_ENV || 'development'];
app.use(cors());
app.use(express.json());

app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/access-codes', accessCodeRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);

// Database connection
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Test the connection
try {
  await sequelize.authenticate();
  console.log('Connected to MySQL database');
} catch (err) {
  console.error('Unable to connect to the database:', err);
}
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from GolfLab server!' });
});

// Example route using the User model
app.get('/api/users', async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});