'use strict';

const BaseError = require("./base-error");

class ForbiddenErrorMapper extends BaseError{
    constructor() {
        const message = 'Current permission does not support this operation';
        const keyword = 'forbidden';

        super(keyword, message);
    }
}

module.exports = ForbiddenErrorMapper;
