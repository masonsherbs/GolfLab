import prisma from '../prisma.js';
import { body, param, validationResult } from 'express-validator';
import { NotFoundError, ValidationError } from '../utils/customErrors.js';

// Validation middleware
export const validateUser = [
  body('username').isString().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('accessLevel').isInt({ min: 1, max: 3 }).withMessage('Access level must be between 1 and 3'),
];

export const validateId = [
  param('id').isInt().withMessage('ID must be an integer'),
];

export const validateUsername = [
  param('username').isString().notEmpty().withMessage('Username is required'),
];

export const validateEmail = [
  param('email').isEmail().withMessage('Invalid email'),
];

export const validateAccessLevel = [
  body('accessLevel').isInt({ min: 1, max: 3 }).withMessage('Access level must be between 1 and 3'),
];

export const createUser = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const user = await prisma.user.create({
        data: req.body,
      });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
];

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = [
  validateId,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      if (!user) {
        throw new NotFoundError('User not found');
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
];

export const updateUser = [
  validateId,
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(req.params.id) },
        data: req.body,
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      if (error.code === 'P2025') {
        next(new NotFoundError('User not found'));
      } else {
        next(error);
      }
    }
  }
];

export const deleteUser = [
  validateId,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      await prisma.user.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.status(204).send();
    } catch (error) {
      if (error.code === 'P2025') {
        next(new NotFoundError('User not found'));
      } else {
        next(error);
      }
    }
  }
];

export const getUserByUsername = [
  validateUsername,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const user = await prisma.user.findUnique({
        where: { username: req.params.username },
      });
      if (!user) {
        throw new NotFoundError('User not found');
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
];

export const getUserByEmail = [
  validateEmail,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const user = await prisma.user.findUnique({
        where: { email: req.params.email },
      });
      if (!user) {
        throw new NotFoundError('User not found');
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
];

export const updateAccessLevel = [
  validateId,
  validateAccessLevel,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(req.params.id) },
        data: { accessLevel: req.body.accessLevel },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      if (error.code === 'P2025') {
        next(new NotFoundError('User not found'));
      } else {
        next(error);
      }
    }
  }
];