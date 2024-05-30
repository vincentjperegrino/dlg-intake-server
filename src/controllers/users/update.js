'use strict';

const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const saltRounds = 10;

class UpdateController {
    constructor(params) {
        this.params = params;
        this.prisma = new PrismaClient();
    }

    async process(cb) {
        try {
            const updateData = { ...this.params };

            if (updateData.password) {
                updateData.password = bcrypt.hashSync(this.params.password, saltRounds);
            }

            const user = await this.prisma.users.update({
                where: { id: this.params.id },
                data: {
                    firstName: updateData.firstName,
                    lastName: updateData.lastName,
                    middleName: updateData.middleName,
                    email: updateData.email,
                    password: updateData.password,
                    privilege: updateData.privilege,
                    userInformation: updateData.userInformation ? {
                        update: {
                            civilStatus: updateData.userInformation.civilStatus,
                            gender: updateData.userInformation.gender,
                            birthDate: new Date(updateData.userInformation.birthDate),
                            ssn: updateData.userInformation.ssn,
                            itin: updateData.userInformation.itin,
                            phoneNumber: updateData.userInformation.phoneNumber,
                            usage: updateData.userInformation.usage,
                            ssnStatus: updateData.userInformation.ssnStatus
                        }
                    } : undefined
                },
                include: {
                    userInformation: true
                }
            });

            cb(null, user);
        } catch (error) {
            cb(error, null);
        }
    }
}

module.exports = UpdateController;