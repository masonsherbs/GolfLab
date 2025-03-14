import prisma from '../prisma.js';

export const createPayment = async (req, res, next) => {
  try {
    const payment = await prisma.payment.create({
      data: req.body,
    });
    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
};

export const getAllPayments = async (req, res, next) => {
  try {
    const payments = await prisma.payment.findMany();
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

export const getPaymentById = async (req, res, next) => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (payment) {
      res.status(200).json(payment);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const updatePayment = async (req, res, next) => {
  try {
    const updatedPayment = await prisma.payment.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.status(200).json(updatedPayment);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Payment not found' });
    } else {
      next(error);
    }
  }
};

export const deletePayment = async (req, res, next) => {
  try {
    await prisma.payment.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).json({ message: 'Payment deleted' });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Payment not found' });
    } else {
      next(error);
    }
  }
};

export const getPaymentsByUserId = async (req, res, next) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { userId: parseInt(req.params.userId) },
    });
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

export const getPaymentsBySubscriptionId = async (req, res, next) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { subscriptionId: parseInt(req.params.subscriptionId) },
    });
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

export const getPaymentsByAppointmentId = async (req, res, next) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { appointmentId: parseInt(req.params.appointmentId) },
    });
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

export const updatePaymentStatus = async (req, res, next) => {
  try {
    const updatedPayment = await prisma.payment.update({
      where: { id: parseInt(req.params.id) },
      data: { status: req.body.status },
    });
    res.status(200).json(updatedPayment);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Payment not found' });
    } else {
      next(error);
    }
  }
};