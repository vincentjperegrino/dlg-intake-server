'use strict';

const ResponseMapper = require('./response-mapper');
const schema = require('./schema/auth-schema');

class AuthMapper extends ResponseMapper{
    constructor(value) {
        super(schema, value)
    }

    map() {
        return this.responseMap();
    }
}

module.exports = AuthMapper;
