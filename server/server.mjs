'use strict';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { PrismaClient } from '@prisma/client';

import subscriptionRoutes from './routes/subscriptionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import accessCodeRoutes from './routes/accessCodeRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 3001;

// Initialize Prisma Client
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/access-codes', accessCodeRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);

// Test the database connection
async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testDatabaseConnection();
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from GolfLab server!' });
});

// Example route using Prisma to fetch users
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export { app };  