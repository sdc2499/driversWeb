// mailer.js
import nodemailer from 'nodemailer';

export const sendRatingEmail = async (userEmail, driverId) => {
    console.log("👨🏼‍🦰"+userEmail+"   "+driverId)
    const transporter = nodemailer.createTransport({
        service: 'gmail', // השתמש בספק SMTP המתאים לך
        auth: {
            user: 'sdc2499@gmail.com',
            pass: 'mi7ra!cle'
        }
    });

    const mailOptions = {
        from: 'sdc2499@gmail.com',
        to: userEmail,
        subject: 'Rate Your Driver',
        text: `Thank you for your ride! Please rate your driver by clicking the link below: \nhttp://your-frontend-url.com/rate/${driverId}`
    };

    try {
        console.log("hi try")
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
