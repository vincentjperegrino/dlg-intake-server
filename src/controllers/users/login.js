'use strict';

(require('dotenv')).config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { PrismaClient } = require('@prisma/client');

class LoginController {
    constructor (params) {
        this.params = params;

        this.prisma = new PrismaClient();
    }

    async process (cb) {
        const user = await this.prisma.users.findFirst({
            where: {
                email: this.params.email,
                privilege: this.params.privilege,
                isActive: true,
                isVerified: true
            }
        });

        if(!user) {
            cb(new Error('Invalid login credentials'), null);
        }

        if (bcrypt.compareSync(this.params.password, user.password)) {
            const expiration = process.env.TOKEN_EXPIRATION || '24h';

            const webtoken = jwt.sign(user, process.env.SECRET_KEY, {
                expiresIn: expiration
            });
            return cb(null, {
                token: webtoken,
                expiresIn: expiration
            });
        }

        cb(new Error('Invalid login credentials'), null);
    }
}

module.exports = LoginController;