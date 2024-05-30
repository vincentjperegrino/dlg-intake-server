'use strict';

class BaseError {
    constructor(message, keyword = '', pointer = '') {
        this.message = message;
        this.keyword = keyword;
        this.pointer = pointer;
    }

    map () {
        return {
            error: {
                message: this.message,
                keyword: this.keyword,
                errorPointer: this.pointer
            }
        };
    }
}

module.exports = BaseError;
