import { ValidationError } from 'sequelize';

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Default error object
  let error = {
    message: err.message || 'An unexpected error occurred',
    status: err.status || 500,
    errors: err.errors || []
  };

  // Handle Sequelize errors
  if (err instanceof ValidationError) {
    error.message = 'Validation error';
    error.status = 400;
    error.errors = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
  }

  // Handle specific error types
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

  // Handle custom error types
  if (err.name === 'NotFoundError') {
    error.status = 404;
  } else if (err.name === 'UnauthorizedError') {
    error.status = 401;
  } else if (err.name === 'ForbiddenError') {
    error.status = 403;
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