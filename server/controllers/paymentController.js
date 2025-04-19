import prisma from '../prisma.js';
import { body, param, validationResult } from 'express-validator';
import { NotFoundError, ValidationError } from '../utils/customErrors.js';

// Validation middleware
export const validatePayment = [
  body('userId').isInt().withMessage('User ID must be an integer'),
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  body('paymentMethod').isIn(['credit_card', 'debit_card', 'paypal']).withMessage('Invalid payment method'),
  body('status').isIn(['pending', 'completed', 'failed']).withMessage('Invalid status'),
  body('subscriptionId').optional().isInt().withMessage('Subscription ID must be an integer'),
  body('appointmentId').optional().isInt().withMessage('Appointment ID must be an integer'),
];

export const validateId = [
  param('id').isInt().withMessage('ID must be an integer'),
];

export const validateUserId = [
  param('userId').isInt().withMessage('User ID must be an integer'),
];

export const validateSubscriptionId = [
  param('subscriptionId').isInt().withMessage('Subscription ID must be an integer'),
];

export const validateAppointmentId = [
  param('appointmentId').isInt().withMessage('Appointment ID must be an integer'),
];

export const validateStatus = [
  body('status').isIn(['pending', 'completed', 'failed']).withMessage('Invalid status'),
];

export const createPayment = [
  validatePayment,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const payment = await prisma.payment.create({
        data: req.body,
      });
      res.status(201).json(payment);
    } catch (error) {
      next(error);
    }
  }
];

export const getAllPayments = async (req, res, next) => {
  try {
    const payments = await prisma.payment.findMany();
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

export const getPaymentById = [
  validateId,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const payment = await prisma.payment.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      if (!payment) {
        throw new NotFoundError('Payment not found');
      }
      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  }
];

export const updatePayment = [
  validateId,
  validatePayment,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const updatedPayment = await prisma.payment.update({
        where: { id: parseInt(req.params.id) },
        data: req.body,
      });
      res.status(200).json(updatedPayment);
    } catch (error) {
      if (error.code === 'P2025') {
        next(new NotFoundError('Payment not found'));
      } else {
        next(error);
      }
    }
  }
];

export const deletePayment = [
  validateId,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      await prisma.payment.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.status(204).send();
    } catch (error) {
      if (error.code === 'P2025') {
        next(new NotFoundError('Payment not found'));
      } else {
        next(error);
      }
    }
  }
];

export const getPaymentsByUserId = [
  validateUserId,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const payments = await prisma.payment.findMany({
        where: { userId: parseInt(req.params.userId) },
      });
      res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  }
];

export const getPaymentsBySubscriptionId = [
  validateSubscriptionId,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const payments = await prisma.payment.findMany({
        where: { subscriptionId: parseInt(req.params.subscriptionId) },
      });
      res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  }
];

export const getPaymentsByAppointmentId = [
  validateAppointmentId,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const payments = await prisma.payment.findMany({
        where: { appointmentId: parseInt(req.params.appointmentId) },
      });
      res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  }
];

export const updatePaymentStatus = [
  validateId,
  validateStatus,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const updatedPayment = await prisma.payment.update({
        where: { id: parseInt(req.params.id) },
        data: { status: req.body.status },
      });
      res.status(200).json(updatedPayment);
    } catch (error) {
      if (error.code === 'P2025') {
        next(new NotFoundError('Payment not found'));
      } else {
        next(error);
      }
    }
  }
];