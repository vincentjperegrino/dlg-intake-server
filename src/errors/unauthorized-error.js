'use strict';

const BaseError = require("./base-error");

class UnauthorizedError extends BaseError{
    constructor() {
        const message = 'Unauthorized';
        const keyword = 'unauthorized';

        super(keyword, message);
    }
}

module.exports = UnauthorizedError;
