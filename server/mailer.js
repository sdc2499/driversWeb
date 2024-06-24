// mailer.js
import nodemailer from 'nodemailer';
import 'dotenv/config';

export const sendRatingEmail = async (userEmail, driverId) => {
    console.log("👨🏼‍🦰" + userEmail + "   " + driverId)
    const transporter = nodemailer.createTransport({
        service: 'gmail', // השתמש בספק SMTP המתאים לך
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PSWD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'דרג את הנהג שלך',
        text: `תודה על הנסיעה! אנא דרג את הנהג שלך על ידי לחיצה על הקישור הבא:  \nhttp://localhost:5173/home/costumer/11/rating/${driverId}`
    };

    try {
        console.log("hi try")
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
