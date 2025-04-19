import { NotFoundError, ValidationError, UnauthorizedError, ForbiddenError } from '../utils/customErrors.js';
import { Prisma } from '@prisma/client';

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Default error object
  let error = {
    message: err.message || 'An unexpected error occurred',
    status: err.status || 500,
    errors: err.errors || []
  };

  // Handle custom errors
  if (err instanceof ValidationError) {
    error.status = 400;
    error.errors = err.errors;
  } else if (err instanceof NotFoundError) {
    error.status = 404;
  } else if (err instanceof UnauthorizedError) {
    error.status = 401;
  } else if (err instanceof ForbiddenError) {
    error.status = 403;
  }
  // Handle Prisma errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        error.status = 409;
        error.message = 'Unique constraint violation';
        break;
      case 'P2003':
        error.status = 400;
        error.message = 'Foreign key constraint violation';
        break;
      case 'P2025':
        error.status = 404;
        error.message = 'Record not found';
        break;
      default:
        error.status = 500;
        error.message = 'Database error';
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    error.status = 400;
    error.message = 'Validation error';
  }
  // Handle other specific error types
  else {
    switch (err.name) {
      case 'JsonWebTokenError':
        error.status = 401;
        error.message = 'Invalid token';
        break;
      case 'TokenExpiredError':
        error.status = 401;
        error.message = 'Token expired';
        break;
    }
  }

  // If we're in development, include the stack trace
  if (process.env.NODE_ENV === 'development') {
    error.stack = err.stack;
  }

  // Send the error response
  res.status(error.status).json({
    error: {
      message: error.message,
      status: error.status,
      errors: error.errors,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    }
  });
};

export default errorHandler;