'use strict';

module.exports = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            format: 'email'
        },
        token: {
            type: 'string'
        },
        password: {
            type: 'string'
        }
    },
    anyOf: [
        { required: ['email'] },
        { required: ['token', 'password'] }
    ],
    additionalProperties: false
};