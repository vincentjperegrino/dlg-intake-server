'use strict';

const { PrismaClient } = require('@prisma/client');

class GetController {
    constructor (params) {
        this.params = params;
        this.prisma = new PrismaClient();
    }

    async process (cb) {
        const users = await this.prisma.users.findFirst({
            where: {
                id: this.params.id
            },
            include: {
                userInformation: true
            }
        });
        cb(null, users);
    }
}

module.exports = GetController;