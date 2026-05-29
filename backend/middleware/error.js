const { AppError } = require('../utils/AppError');

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  let statusCode = error.statusCode || 500;
  let message = error.message || 'Error interno del servidor';

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  // Multer file size error
  if (error.code === 'LIMIT_FILE_SIZE') {
    statusCode = 400;
    message = 'El archivo excede el tamano maximo permitido (20MB).';
  }

  console.error(`[${statusCode}] ${message}`);

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
  });
};

module.exports = { errorHandler };
