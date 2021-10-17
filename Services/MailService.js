const nodemailer = require("nodemailer");

class MailService {
    transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    async sendActivationUser(to, link){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: "flexxxer6@gmail.com",
            subject: "Hello ✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>",
        });
    }
}

module.exports = new MailService();