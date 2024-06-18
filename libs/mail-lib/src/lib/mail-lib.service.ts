import {Injectable} from '@nestjs/common';
import * as nodemailer from 'nodemailer';


@Injectable()
export class MailLibService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env['MAIL_HOST'],
            port: Number(process.env['MAIL_PORT']),
            secure: process.env['MAIL_SECURE'] === 'true', // true for 465, false for other ports
            auth: {
                user: process.env['MAIL_USER'], // generated ethereal user
                pass: process.env['MAIL_PASS'], // generated ethereal password
            },
        });
    }

    async sendMail(to: string, subject: string, text: string): Promise<void> {
        const mailOptions = {
            from: process.env['MAIL_FROM'], // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
        };

        await this.transporter.sendMail(mailOptions);
    }
}
