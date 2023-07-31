import { Validator, ValidationError } from "express-json-validator-middleware";

// Create validator object (uses Ajv internally)
const validator = new Validator()

// Export validate middleware for use in endpoints
export const validate = validator.validate

// Export error handling middleware
export const validateErrorMiddleware = (error, request, response, next) => {
    if (response.headersSent) {
        return next(error);
    }

    const isValidationError = error instanceof ValidationError;
    if (!isValidationError) {
        return next(error);
    }

    response.status(400).json({
        errors: error.validationErrors,
    });

    next();
}