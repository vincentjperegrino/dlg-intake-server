'use strict';

(require('dotenv')).config();

const {
    NODE_ENV,
    PORT,
    TOKEN_EXPIRATION
} = process.env

module.exports = {
    nodeEnv: NODE_ENV || 'development',
    port: PORT || 3000,
    auth: {
        expiresIn: TOKEN_EXPIRATION
    }
}
