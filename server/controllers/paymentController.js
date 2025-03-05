import db from '../models/index.js';
const { Payment } = db;

export const createPayment = async (req, res, next) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
};

export const getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

export const getPaymentById = async (req, res, next) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
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
    const [updated] = await Payment.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedPayment = await Payment.findByPk(req.params.id);
      res.status(200).json(updatedPayment);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const deletePayment = async (req, res, next) => {
  try {
    const deleted = await Payment.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Payment deleted' });
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const getPaymentsByUserId = async (req, res, next) => {
  try {
    const payments = await Payment.findAll({
      where: { userId: req.params.userId }
    });
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

export const getPaymentsBySubscriptionId = async (req, res, next) => {
  try {
    const payments = await Payment.findAll({
      where: { subscriptionId: req.params.subscriptionId }
    });
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

export const getPaymentsByAppointmentId = async (req, res, next) => {
  try {
    const payments = await Payment.findAll({
      where: { appointmentId: req.params.appointmentId }
    });
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

export const updatePaymentStatus = async (req, res, next) => {
  try {
    const [updated] = await Payment.update(
      { status: req.body.status },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedPayment = await Payment.findByPk(req.params.id);
      res.status(200).json(updatedPayment);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    next(error);
  }
};