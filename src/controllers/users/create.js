'use strict';

const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const saltRounds = 10;

class CreateController {
    constructor(params) {
        this.params = params;
        this.prisma = new PrismaClient();
    }

    async process(cb) {
        try {
            const hashedPassword = bcrypt.hashSync(this.params.password, saltRounds);

            const user = await this.prisma.users.create({
                data: {
                    firstName: this.params.firstName,
                    lastName: this.params.lastName,
                    email: this.params.email,
                    password: hashedPassword,
                    isActive: true,
                    isVerified: false,
                    privilege: this.params.privilege,
                    userInformation: this.params.userInformation ? {
                        create: {
                            civilStatus: this.params.userInformation.civilStatus,
                            gender: this.params.userInformation.gender,
                            birthDate: new Date(this.params.userInformation.birthDate),
                            ssn: this.params.userInformation.ssn,
                            itin: this.params.userInformation.itin,
                            phoneNumber: this.params.userInformation.phoneNumber,
                            usage: this.params.userInformation.usage,
                            ssnStatus: this.params.userInformation.ssnStatus
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

module.exports = CreateController;