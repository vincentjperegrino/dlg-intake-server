'use strict';

const { PrismaClient } = require('@prisma/client');

class DeleteController {
    constructor(params) {
        this.params = params;
        this.prisma = new PrismaClient();
    }

    async process(cb) {
        try {
            const user = await this.prisma.users.update({
                where: { id: this.params.id },
                data: { isActive: false },
                include: { userInformation: true }
            });

            cb(null, user);
        } catch (error) {
            cb(error, null);
        }
    }
}

module.exports = DeleteController;