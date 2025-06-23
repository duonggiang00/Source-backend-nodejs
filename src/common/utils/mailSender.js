import { EMAIL_PASSWORD } from "../configs/enviroment.js";
import nodemailer from 'nodemailer'
import createError from "./error.js";

const sendMail = async (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "duonggiang00@gmail.com",
            pass: EMAIL_PASSWORD,
        },
    })
    const mailOptions = {
        from: "Giang",
        to: email,
        subject: subject,
        text: text,
    };
    
    try {
        await transporter.sendMail(mailOptions);
    }
    catch (error) {
        throw createError(500, `fail to send mail ${error.message}`);
    }
}
export default sendMail
