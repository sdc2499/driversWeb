import nodemailer from 'nodemailer';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

//לסדר את הקישור ולסדר את ההבטחה בדירוג נהג
export const sendRatingEmail = async (userEmail, driverId) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PSWD
        }
    });

    function generateToken(data) {
        return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
    

    const data = { userId: 16, driverId: 11, rideId: 57 };
    const token = generateToken(data);


    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'דרג את הנהג שלך',
        text: `תודה על הנסיעה! אנא דרג את
         הנהג שלך על ידי לחיצה על הקישור הבא:
           \nhttp://localhost:5173/rating/${token}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
