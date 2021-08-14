class AppError extends Error {
    constructor(message, resStatusCode) {
        super(message);
        this.resStatusCode = resStatusCode;
    }
}

class ValidationError extends AppError {
    constructor(message) {
        super(`Validation Error: ${message}`, 400);
    }
}

module.exports = {
    AppError,
    ValidationError
};