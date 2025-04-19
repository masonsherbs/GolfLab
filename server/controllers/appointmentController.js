import prisma from '../prisma.js';
import { body, param, query, validationResult } from 'express-validator';
import { NotFoundError, ValidationError } from '../utils/customErrors.js';

// Validation middleware
export const validateAppointment = [
  body('userId').isInt().withMessage('User ID must be an integer'),
  body('dateTime').isISO8601().toDate().withMessage('Invalid date and time'),
  body('status').isIn(['scheduled', 'completed', 'cancelled']).withMessage('Invalid status'),
];

export const validateId = [
  param('id').isInt().withMessage('ID must be an integer'),
];

export const validateUserId = [
  param('userId').isInt().withMessage('User ID must be an integer'),
];

export const validateStatus = [
  param('status').isIn(['scheduled', 'completed', 'cancelled']).withMessage('Invalid status'),
];

export const validateDateRange = [
  query('startDate').isISO8601().toDate().withMessage('Invalid start date'),
  query('endDate').isISO8601().toDate().withMessage('Invalid end date'),
];

export const createAppointment = [
  validateAppointment,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const appointment = await prisma.appointment.create({
        data: req.body,
      });
      res.status(201).json(appointment);
    } catch (error) {
      next(error);
    }
  }
];

export const getLatestAppointment = async (req, res, next) => {
  try {
    const appointment = await prisma.appointment.findFirst({
      orderBy: { dateTime: 'desc' },
    });
    if (!appointment) {
      throw new NotFoundError('No appointments found');
    }
    res.json(appointment);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const appointments = await prisma.appointment.findMany();
    res.status(200).json(appointments);
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
      const appointment = await prisma.appointment.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      if (!appointment) {
        throw new NotFoundError('Appointment not found');
      }
      res.status(200).json(appointment);
    } catch (error) {
      next(error);
    }
  }
];

export const update = [
  validateId,
  validateAppointment,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const updatedAppointment = await prisma.appointment.update({
        where: { id: parseInt(req.params.id) },
        data: req.body,
      });
      res.status(200).json(updatedAppointment);
    } catch (error) {
      if (error.code === 'P2025') {
        next(new NotFoundError('Appointment not found'));
      } else {
        next(error);
      }
    }
  }
];

export const deleteAppointment = [
  validateId,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      await prisma.appointment.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.status(204).send();
    } catch (error) {
      if (error.code === 'P2025') {
        next(new NotFoundError('Appointment not found'));
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
      const appointments = await prisma.appointment.findMany({
        where: { userId: parseInt(req.params.userId) },
      });
      res.status(200).json(appointments);
    } catch (error) {
      next(error);
    }
  }
];

export const getByStatus = [
  validateStatus,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const appointments = await prisma.appointment.findMany({
        where: { status: req.params.status },
      });
      res.status(200).json(appointments);
    } catch (error) {
      next(error);
    }
  }
];

export const updateStatus = [
  validateId,
  body('status').isIn(['scheduled', 'completed', 'cancelled']).withMessage('Invalid status'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const updatedAppointment = await prisma.appointment.update({
        where: { id: parseInt(req.params.id) },
        data: { status: req.body.status },
      });
      res.status(200).json(updatedAppointment);
    } catch (error) {
      if (error.code === 'P2025') {
        next(new NotFoundError('Appointment not found'));
      } else {
        next(error);
      }
    }
  }
];

export const getByDateRange = [
  validateDateRange,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const { startDate, endDate } = req.query;
      const appointments = await prisma.appointment.findMany({
        where: {
          dateTime: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        },
      });
      res.status(200).json(appointments);
    } catch (error) {
      next(error);
    }
  }
];