const { ApiError } = require('../errors/apiError');

function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(err.toJSON());
  }

  console.error(err); // helps during testing/debugging

  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong'
    }
  });
}

module.exports = errorHandler;