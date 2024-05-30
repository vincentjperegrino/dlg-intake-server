'use strict';

const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

class PasswordRecoveryController {
    constructor(params) {
        this.params = params;
        this.prisma = new PrismaClient();
    }

    async sendRecoveryEmail(cb) {
        try {
            const user = await this.prisma.users.findUnique({
                where: { email: this.params.email }
            });

            if (!user) {
                throw new Error('User not found');
            }

            const token = crypto.randomBytes(20).toString('hex');
            const expiry = Date.now() + 3600000; // 1 hour from now

            await this.prisma.passwordRecovery.create({
                data: {
                    userId: user.id,
                    resetPasswordToken: token,
                    resetPasswordExpires: new Date(expiry)
                }
            });

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                to: user.email,
                from: process.env.EMAIL_USER,
                subject: 'Password Reset',
                text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                Please click on the following link, or paste this into your browser to complete the process:\n\n
                ${process.env.BACKEND_URL}/reset/${token}\n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n`
            };

            await transporter.sendMail(mailOptions);

            cb(null, { message: 'Recovery email sent' });
        } catch (error) {
            cb(error, null);
        }
    }

    async resetPassword(cb) {
        try {
            const recovery = await this.prisma.passwordRecovery.findFirst({
                where: {
                    resetPasswordToken: this.params.token,
                    resetPasswordExpires: {
                        gt: new Date()
                    }
                },
                include: {
                    user: true
                }
            });

            if (!recovery) {
                throw new Error('Password reset token is invalid or has expired.');
            }

            const hashedPassword = bcrypt.hashSync(this.params.password, 10);

            await this.prisma.users.update({
                where: { id: recovery.userId },
                data: {
                    password: hashedPassword
                }
            });

            await this.prisma.passwordRecovery.delete({
                where: { id: recovery.id }
            });

            cb(null, { message: 'Password has been reset' });
        } catch (error) {
            cb(error, null);
        }
    }
}

module.exports = PasswordRecoveryController;