import prisma from '../prisma.js';
import { body, param, validationResult } from 'express-validator';
import { NotFoundError, ValidationError } from '../utils/customErrors.js';

// Validation middleware
export const validateAccessCode = [
  body('userId').isInt().withMessage('User ID must be an integer'),
  body('appointmentId').isInt().withMessage('Appointment ID must be an integer'),
  body('code').isString().isLength({ min: 6, max: 12 }).withMessage('Code must be between 6 and 12 characters'),
  body('expiresAt').isISO8601().toDate().withMessage('Invalid expiration date'),
  body('isUsed').isBoolean().withMessage('isUsed must be a boolean'),
];

export const validateId = [
  param('id').isInt().withMessage('ID must be an integer'),
];

export const validateUserId = [
  param('userId').isInt().withMessage('User ID must be an integer'),
];

export const validateAppointmentId = [
  param('appointmentId').isInt().withMessage('Appointment ID must be an integer'),
];

export const validateCode = [
  body('code').isString().isLength({ min: 6, max: 12 }).withMessage('Code must be between 6 and 12 characters'),
];

export const createAccessCode = [
  validateAccessCode,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const accessCode = await prisma.accessCode.create({
        data: req.body,
      });
      res.status(201).json(accessCode);
    } catch (error) {
      next(error);
    }
  }
];

export const getAllAccessCodes = async (req, res, next) => {
  try {
    const accessCodes = await prisma.accessCode.findMany();
    res.status(200).json(accessCodes);
  } catch (error) {
    next(error);
  }
};

export const getAccessCodeById = [
  validateId,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const accessCode = await prisma.accessCode.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      if (!accessCode) {
        throw new NotFoundError('Access code not found');
      }
      res.status(200).json(accessCode);
    } catch (error) {
      next(error);
    }
  }
];

export const updateAccessCode = [
  validateId,
  validateAccessCode,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const updatedAccessCode = await prisma.accessCode.update({
        where: { id: parseInt(req.params.id) },
        data: req.body,
      });
      res.status(200).json(updatedAccessCode);
    } catch (error) {
      if (error.code === 'P2025') {
        next(new NotFoundError('Access code not found'));
      } else {
        next(error);
      }
    }
  }
];

export const deleteAccessCode = [
  validateId,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      await prisma.accessCode.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.status(204).send();
    } catch (error) {
      if (error.code === 'P2025') {
        next(new NotFoundError('Access code not found'));
      } else {
        next(error);
      }
    }
  }
];

export const getAccessCodesByUserId = [
  validateUserId,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const accessCodes = await prisma.accessCode.findMany({
        where: { userId: parseInt(req.params.userId) },
      });
      res.status(200).json(accessCodes);
    } catch (error) {
      next(error);
    }
  }
];

export const getAccessCodesByAppointmentId = [
  validateAppointmentId,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const accessCodes = await prisma.accessCode.findMany({
        where: { appointmentId: parseInt(req.params.appointmentId) },
      });
      res.status(200).json(accessCodes);
    } catch (error) {
      next(error);
    }
  }
];

export const verifyAccessCode = [
  validateCode,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const { code } = req.body;
      const accessCode = await prisma.accessCode.findFirst({
        where: { code, isUsed: false },
      });
      if (accessCode) {
        if (new Date() > accessCode.expiresAt) {
          res.status(400).json({ message: 'Access code has expired' });
        } else {
          await prisma.accessCode.update({
            where: { id: accessCode.id },
            data: { isUsed: true },
          });
          res.status(200).json({ message: 'Access code verified successfully' });
        }
      } else {
        throw new NotFoundError('Invalid or used access code');
      }
    } catch (error) {
      next(error);
    }
  }
];

export const generateAccessCode = [
  body('userId').isInt().withMessage('User ID must be an integer'),
  body('appointmentId').isInt().withMessage('Appointment ID must be an integer'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const { userId, appointmentId } = req.body;
      const code = Math.random().toString(36).substring(2, 12).toUpperCase();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Expires in 24 hours

      const accessCode = await prisma.accessCode.create({
        data: {
          userId: parseInt(userId),
          appointmentId: parseInt(appointmentId),
          code,
          expiresAt,
        },
      });

      res.status(201).json(accessCode);
    } catch (error) {
      next(error);
    }
  }
];