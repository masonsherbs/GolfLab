import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';
import { body, validationResult } from 'express-validator';
import { ValidationError, UnauthorizedError } from '../utils/customErrors.js';

// Validation middleware
export const validateRegistration = [
  body('username').isString().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export const validateLogin = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const register = [
  validateRegistration,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword
        }
      });
      res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (error) {
      if (error.code === 'P2002') {
        next(new ValidationError([{ msg: 'Email already in use' }]));
      } else {
        next(error);
      }
    }
  }
];

export const login = [
  validateLogin,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new UnauthorizedError('Authentication failed: User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedError('Authentication failed: Invalid password');
      }

      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          accessLevel: user.accessLevel 
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({ 
        message: 'Login successful',
        token, 
        userId: user.id,
        accessLevel: user.accessLevel
      });
    } catch (error) {
      next(error);
    }
  }
];
export const logout = async (req, res, next) => {
  try {
    // In a real-world scenario, you might want to invalidate the token on the server side
    // For now, we'll just send a success response
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { userId } = req.user; // Assuming you have middleware that decodes the token and attaches user info to req
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    const newToken = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        accessLevel: user.accessLevel 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
      message: 'Token refreshed successfully',
      token: newToken
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    try {
      const { userId } = req.user; // Assuming you have middleware that decodes the token and attaches user info to req
      const { currentPassword, newPassword } = req.body;

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new UnauthorizedError('User not found');
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedError('Current password is incorrect');
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword }
      });

      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      next(error);
    }
  }
];