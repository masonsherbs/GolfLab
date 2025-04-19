import { ValidationError as SequelizeValidationError } from 'sequelize';
import { NotFoundError, ValidationError, UnauthorizedError, ForbiddenError } from '../utils/customErrors.js';

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
  // Handle Sequelize errors
  else if (err instanceof SequelizeValidationError) {
    error.message = 'Validation error';
    error.status = 400;
    error.errors = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
  }

  // Handle specific error types
  else {
    switch (err.name) {
      case 'SequelizeUniqueConstraintError':
        error.status = 409;
        error.message = 'Resource already exists';
        break;
      case 'SequelizeForeignKeyConstraintError':
        error.status = 400;
        error.message = 'Invalid foreign key';
        break;
      case 'SequelizeDatabaseError':
        error.status = 500;
        error.message = 'Database error';
        break;
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