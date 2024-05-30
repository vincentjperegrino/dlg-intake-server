'use strict';

const Ajv = require('ajv');

const addFormat = require('ajv-formats');
const ajv = new Ajv();
addFormat(ajv);

module.exports = function (payload, schema) {
    const validator = ajv.compile(schema);

    if (!validator(payload)) {
        return {
            isValid: false,
            errors: validator.errors
        };
    }

    return {
        isValid: true,
        errors: []
    };
};
