import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PSWD
    }
});

export const sendEmail = async ({ to, subject, htmlContent, attachments }) => {
    console.log("to"+to)
    console.log("subject"+subject)
    console.log("htmlContent"+htmlContent)
    console.log("attachments"+attachments)

    const mailOptions = {
        from: process.env.EMAIL,
        to:to,
        subject:subject,
        html: htmlContent,
        attachments: attachments || [
            {
                filename: 'logo.png', 
                path: 'C:/Users/The user/source/repos/driversWeb/server/logo.png', 
                cid: 'logo' 
            }
        ]
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};




