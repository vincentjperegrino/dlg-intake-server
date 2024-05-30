'use strict';

const privileges = require('./../privilege');

module.exports = {
    type: 'object',
    properties: {
        email: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
        privilege: {
            type: 'string',
            enum: privileges
        }
    },
    required: [
        'email',
        'password',
        'privilege'
    ]
}
