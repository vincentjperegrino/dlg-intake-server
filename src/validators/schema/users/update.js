'use strict';

const privileges = require('./../privilege');
const civilStatus = require('./../civil-status');
const gender = require('./../gender');
const ssnStatus = require('./../ssn-status');
const phoneUsage = require('./../phone-usage');

module.exports = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        },
        firstName: {
            type: 'string'
        },
        middleName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        email: {
            type: 'string',
            format: 'email'
        },
        password: {
            type: 'string'
        },
        privilege: {
            type: 'string',
            enum: privileges
        },
        userInformation: {
            type: 'object',
            properties: {
                civilStatus: {
                    type: 'string',
                    enum: civilStatus
                },
                gender: {
                    type: 'string',
                    enum: gender
                },
                birthDate: {
                    type: 'string',
                    format: 'date-time'
                },
                ssn: {
                    type: 'string'
                },
                itin: {
                    type: 'string'
                },
                phoneNumber: {
                    type: 'string'
                },
                usage: {
                    type: 'string',
                    enum: phoneUsage
                },
                ssnStatus: {
                    type: 'string',
                    enum: ssnStatus
                }
            },
            required: [
                'civilStatus',
                'gender',
                'birthDate',
                'ssn',
                'itin',
                'phoneNumber',
                'usage',
                'ssnStatus'
            ]
        }
    },
    required: ['id'],
    additionalProperties: false
};