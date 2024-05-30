'use strict';

const BaseError = require("./base-error");

class AjvValidationError extends BaseError {
    constructor(ajvValidation) {
        const validationErrorMessage = ajvValidation.errors[0].message;
        const validationErrorKeyword = ajvValidation.errors[0].keyword;
        const validationErrorPointer = ajvValidation.errors[0].params.missingProperty ||
                            validationError.instancePath || '';

        super(validationErrorMessage, validationErrorKeyword, validationErrorPointer);
    }
}

module.exports = AjvValidationError;
