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
    const mailOptions = {
        from: process.env.EMAIL,
        to:to,
        subject:subject,
        html: htmlContent,
        attachments: attachments || [
            {
                filename: 'logo.png', 
                path: 'C:/Users/The user/Desktop/פר/driversWeb/server/logo.png', 
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


// import nodemailer from 'nodemailer';
// import 'dotenv/config';
// import jwt from 'jsonwebtoken';

// export const sendRatingEmail = async (userEmail, obj) => {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.EMAIL,
//             pass: process.env.EMAIL_PSWD
//         }
//     });

//     function generateToken(data) {
//         return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
//     }

//     console.log("ff  " + obj.costumerId)
//     const data = { costumerId: obj.costumerId, driverId: obj.driverId, rideId: obj.rideId };
//     const token = generateToken(data);


//     const mailOptions = {
//         from: process.env.EMAIL,
//         to: userEmail,
//         subject: 'דרג את הנהג שלך',
//         html: `
//         <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f9f9f9; padding: 20px;">
//             <div style="text-align: center; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin-left: 20%;">
//                 <h1 style="font-size: 24px; color: #333;">תודה שבחרתם בנו!</h1>
//                 <p style="font-size: 18px; color: #666;">
//                     אנחנו שמחים שהייתם איתנו בנסיעה זו ומקווים שהחוויה הייתה נעימה ובטוחה.
//                 </p>
//                 <p style="font-size: 18px; color: #666;">
//                     חשוב לנו לשפר את השירות שלנו כל הזמן, ולשם כך נשמח לקבל את דעתכם על הנהג שלכם.
//                 </p>
//                 <p style="font-size: 18px; color: #666;">
//                     אנא הקדישו מספר רגעים לדרג את הנהג שלכם על ידי לחיצה על הקישור הבא:
//                 </p>
//                 <a href="http://localhost:5173/rating/${token}" style="font-size: 20px; color: red; display: inline-block; margin-top: 10px;">
//                      לדרוג לחצו כאן 👈🏼
//                 </a>
//                 <p style="font-size: 18px; color: #666; margin-top: 20px;">
//                     תודה רבה על שיתוף הפעולה!
//                 </p>
//                 <p style="font-size: 18px; color: #666;">
//                     בברכה,<br>
//                     צוות השירות
//                 </p>
//                   <img src="cid:logo" alt="לוגו" style="max-width: 200px; height: auto; margin-top: 20px;" />
//             </div>
//         </div>
//     `,
//         attachments: [
//             {
//                 filename: 'logo.png', 
//                 path: 'C:/Users/The user/Desktop/פר/driversWeb/server/logo.png', 
//                 cid: 'logo' 
//             }
//         ]
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log('Email sent');
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// };

