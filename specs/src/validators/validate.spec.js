'use strict';

const validate = require('./../../../src/validators/validate');

const schema = {
    type: 'object',
    properties: {
        some_property: {
            type: 'string'
        }
    }
};

const payload = {
    some_property: 'some_value'
};

describe('src/validators/validate.js', function () {
    it('should return an object with empty errors if payload is properly formatted', async function () {
        const validation = validate(payload, schema);

        expect(validation.isValid).toBe(true);
        expect(validation.errors.length).toBe(0);
    });

    it('should return an object with errors if payload is not properly for  matted', async function () {
        payload.some_property = 0;

        const validation = validate(payload, schema);

        expect(validation.isValid).toBe(false);
        expect(validation.errors.length).toBeGreaterThan(0);
    })
});
