import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const hashedPassword1 = await bcrypt.hash('password123', 10);
  const hashedPassword2 = await bcrypt.hash('password456', 10);

  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      username: 'johnny_test',
      password: hashedPassword1,
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      accessLevel: 1,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane@example.com',
      username: 'jane_test',
      password: hashedPassword2,
      firstName: 'Jane',
      lastName: 'Doe',
      phoneNumber: '0987654321',
      accessLevel: 2,
    },
  });

  // Seed Appointments
  const appointment1 = await prisma.appointment.create({
    data: {
      userId: user1.id,
      dateTime: new Date(new Date().setDate(new Date().getDate() + 7)),
      duration: 60,
      status: 'scheduled',
    },
  });

  const appointment2 = await prisma.appointment.create({
    data: {
      userId: user2.id,
      dateTime: new Date(new Date().setDate(new Date().getDate() + 14)),
      duration: 90,
      status: 'scheduled',
    },
  });

  // Seed Subscriptions
  const subscription1 = await prisma.subscription.create({
    data: {
      userId: user1.id,
      planType: 'monthly',
      currentSubscriptionPrice: 49.99,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      status: 'active',
      stripeCustomerId: 'cus_123456789',
      stripeSubscriptionId: 'sub_987654321',
      nextPaymentDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      lastPaymentDate: new Date(),
      lastPaymentAmount: 49.99,
    },
  });

  const subscription2 = await prisma.subscription.create({
    data: {
      userId: user2.id,
      planType: 'payPerUse',
      currentSubscriptionPrice: 10.00,
      startDate: new Date(),
      status: 'active',
      stripeCustomerId: 'cus_987654321',
      stripeSubscriptionId: null,
      nextPaymentDate: null,
      lastPaymentDate: new Date(),
      lastPaymentAmount: 10.00,
    },
  });

  // Seed Payments
  await prisma.payment.create({
    data: {
      userId: user1.id,
      subscriptionId: subscription1.id,
      appointmentId: appointment1.id,
      amount: 50.00,
      paymentDate: new Date(),
      paymentMethod: 'credit_card',
      status: 'completed',
    },
  });

  await prisma.payment.create({
    data: {
      userId: user2.id,
      subscriptionId: subscription2.id,
      appointmentId: appointment2.id,
      amount: 75.00,
      paymentDate: new Date(),
      paymentMethod: 'paypal',
      status: 'completed',
    },
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });