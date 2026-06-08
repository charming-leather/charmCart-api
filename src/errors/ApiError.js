class ApiError extends Error {
    constructor(statusCode, errorCode, message, details = null) {
        super(message)

        this.statusCode = statusCode
        this.errorCode = errorCode
        this.details = details

        Error.captureStackTrace(this, this.constructor)
    }

    toJSON() {
        return {
            success: false,
            error: {
                code: this.errorCode,
                message: this.message,
                details: this.details
            }
        }
    }

    // 400
    static badRequest(message = 'Bad Request', details = null) {
        return new ApiError(400, 'BAD_REQUEST', message, details)
    }

    // 401
    static unauthorized(message = 'Unauthorized') {
        return new ApiError(401, 'UNAUTHORIZED', message)
    }

    // 403
    static forbidden(message = 'Forbidden') {
        return new ApiError(403, 'FORBIDDEN', message)
    }

    // 404
    static notFound(message = 'Not Found') {
        return new ApiError(404, 'NOT_FOUND', message)
    }

    // 409
    static conflict(message = 'Conflict') {
        return new ApiError(409, 'CONFLICT', message)
    }

    // 500
    static internal(message = 'Internal Server Error', details = null) {
        return new ApiError(500, 'INTERNAL_SERVER_ERROR', message, details)
    }
}


class DatabaseError extends ApiError {
    constructor(message = 'Database Error', details = null) {
        super(500, 'DATABASE_ERROR', message, details)
    }
}

module.exports = {
    ApiError,
    DatabaseError
}