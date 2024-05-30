'use strict';

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const prisma = new PrismaClient();

async function main() {
  bcrypt.hash('admin', saltRounds, async function (error, hash) {
    if (error) {
      throw new Error('An error occured while hashing the password');
    }

    const password = hash;

    await prisma.users.upsert({
      where: {
        id: 1,
      },
      update: {},
      create: {
        email: 'admin@dlg.com',
        firstName: 'Super',
        lastName: 'Admin',
        password,
        privilege: 'admin',
        userInformation: {
          create: {
            civilStatus: 'single',
            gender: 'male',
            birthDate: new Date(),
            ssn: '123-45-6789',
            itin: '987-65-4321',
            phoneNumber: '1234567890',
            usage: 'call',
            ssnStatus: 'noSsn',
          },
        },
      },
    });
  });
}

main()
  .then(async function () {
    await prisma.$disconnect();
  })
  .catch(async function (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
