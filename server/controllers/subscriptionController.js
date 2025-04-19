import prisma from '../prisma.js';
import { body, param, validationResult } from 'express-validator';
import { NotFoundError, ValidationError } from '../utils/customErrors.js';

// Validation middleware
export const validateSubscription = [
  body('userId').isInt().withMessage('User ID must be an integer'),
  body('planType').isIn(['basic', 'premium', 'pro']).withMessage('Invalid plan type'),
  body('status').isIn(['active', 'inactive', 'cancelled']).withMessage('Invalid status'),
  body('startDate').isISO8601().toDate().withMessage('Invalid start date'),
  body('endDate').isISO8601().toDate().withMessage('Invalid end date'),
];

export const validateId = [
  param('id').isInt().withMessage('ID must be an integer'),
];

export const validateUserId = [
  param('userId').isInt().withMessage('User ID must be an integer'),
];

export const validatePlanType = [
  param('planType').isIn(['basic', 'premium', 'pro']).withMessage('Invalid plan type'),
];

export const validateStatus = [
  body('status').isIn(['active', 'inactive', 'cancelled']).withMessage('Invalid status'),
];

export const createSubscription = [
  validateSubscription,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const subscription = await prisma.subscription.create({
        data: req.body,
      });
      res.status(201).json(subscription);
    } catch (error) {
      next(error);
    }
  }
];

export const getLatestSubscription = async (req, res, next) => {
  try {
    const subscription = await prisma.subscription.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (!subscription) {
      throw new NotFoundError('No subscriptions found');
    }
    res.json(subscription);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const subscriptions = await prisma.subscription.findMany();
    res.status(200).json(subscriptions);
  } catch (error) {
    next(error);
  }
};

export const getById = [
  validateId,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const subscription = await prisma.subscription.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      if (!subscription) {
        throw new NotFoundError('Subscription not found');
      }
      res.status(200).json(subscription);
    } catch (error) {
      next(error);
    }
  }
];

export const update = [
  validateId,
  validateSubscription,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const updatedSubscription = await prisma.subscription.update({
        where: { id: parseInt(req.params.id) },
        data: req.body,
      });
      res.status(200).json(updatedSubscription);
    } catch (error) {
      if (error.code === 'P2025') {
        next(new NotFoundError('Subscription not found'));
      } else {
        next(error);
      }
    }
  }
];

export const deleteSubscription = [
  validateId,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      await prisma.subscription.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.status(204).send();
    } catch (error) {
      if (error.code === 'P2025') {
        next(new NotFoundError('Subscription not found'));
      } else {
        next(error);
      }
    }
  }
];

export const getByUserId = [
  validateUserId,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const subscriptions = await prisma.subscription.findMany({
        where: { userId: parseInt(req.params.userId) },
      });
      res.status(200).json(subscriptions);
    } catch (error) {
      next(error);
    }
  }
];

export const getByPlanType = [
  validatePlanType,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const subscriptions = await prisma.subscription.findMany({
        where: { planType: req.params.planType },
      });
      res.status(200).json(subscriptions);
    } catch (error) {
      next(error);
    }
  }
];

export const getActiveSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      where: { status: 'active' },
    });
    res.status(200).json(subscriptions);
  } catch (error) {
    next(error);
  }
};

export const updateStatus = [
  validateId,
  validateStatus,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const updatedSubscription = await prisma.subscription.update({
        where: { id: parseInt(req.params.id) },
        data: { status: req.body.status },
      });
      res.status(200).json(updatedSubscription);
    } catch (error) {
      if (error.code === 'P2025') {
        next(new NotFoundError('Subscription not found'));
      } else {
        next(error);
      }
    }
  }
];