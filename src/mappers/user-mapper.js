'use strict';

const ResponseMapper = require('./response-mapper');
const schema = require('./schema/user-schema');

class UserMapper extends ResponseMapper{
    constructor(value) {
        super(schema, value)
    }

    map() {
        return this.responseMap();
    }
}

module.exports = UserMapper;
