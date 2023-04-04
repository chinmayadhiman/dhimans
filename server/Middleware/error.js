const colors = require('colors');
const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {

    let error = { ...err };
    error.message = err.message;

    /// Log to console for
    //console.log(err.stack.red)
    console.log(err)

    /// Mongoose bad object Id
    if (err.name === 'CastError') {
        const message = `Resource not found`;
        error = new ErrorResponse(message, 404);
    }

    /// Mongoose Duplicate Key
    if (err.code === 11000) {
        const message = `Duplicate fields value entered`;
        error = new ErrorResponse(message, 400);
    }

    /// Mongoose Validation Error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    console.log(err.name.blue)

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
}

module.exports = errorHandler;