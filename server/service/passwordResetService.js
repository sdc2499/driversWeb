import { QueryItem } from "./queryItem.js";
import { executeQuery } from "./executeQuery.js";
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sha256 } from 'js-sha256';

const generateOTP = () => {
    return crypto.randomBytes(3).toString('hex');
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PSWD
    }
});

export class PasswordResetService {

    async passwordReset(phone) {
        const queryItem = new QueryItem();
        const result = await executeQuery("SELECT email,id FROM db.users where phone=?;", [phone]);
        console.log(result[0].id)
        let id = result[0].id
        console.log(id)

        try {
            const otp = generateOTP();
            const hashedOTP = await bcrypt.hash(otp, 10);
            console.log(hashedOTP)
            console.log(otp)
            await executeQuery('UPDATE db.passwords SET otp = ? WHERE userId = ?', [hashedOTP, result[0].id]);
            const mailOptions = {
                from: 'sdc2499@gmail.com',
                to: result[0].email,
                subject: 'שחזור סיסמה - סיסמה חד פעמית',
                html: `
                  <div style="font-family: Arial, sans-serif; text-align: center; font-size: 17px;">
                    <h2 style="color: #4CAF50;">שחזור סיסמה</h2>
                    <p>,שלום</p>
                    <p>:קיבלת סיסמה חד פעמית לשחזור הסיסמה שלך באתר שלנו</p>
                    <p style="font-size: 35px; font-weight: bold; color: #333;">${otp}</p>
                    <p>.אנא השתמש בסיסמה זו כדי להיכנס לחשבונך ולהגדיר סיסמה חדשה</p>
                    <p>,בברכה</p>
                    <p>צוות התמיכה</p>
                    <p style="font-size: 14px; color: #888;">אם לא ביקשת לשחזר את הסיסמה שלך, אנא התעלם מהודעה זו.</p>
                    <img src="cid:logo" alt="לוגו" style="max-width: 200px; height: auto; margin-top: 20px;" />

                  </div>
                `,
                attachments: [
                    {
                        filename: 'logo.png', // Replace with your logo's filename
                        path: 'C:/Users/The user/Desktop/פר/driversWeb/server/logo.png', // Replace with the path to your logo file
                        cid: 'logo' // Use the same cid value as used in the img src attribute
                    }
                ]
            };

            await transporter.sendMail(mailOptions);
            return result[0].id;
        } catch (error) {
            throw ('')
        }
    }

    async passwordUpdate(userId, sentPassword, newPassword) {
        const result = await executeQuery("SELECT otp FROM db.passwords WHERE userId = ?;", [userId]);
        const match = await bcrypt.compare(sentPassword, result[0].otp);
        if (match) {
            const hashedNewPassword = sha256(newPassword)
            await executeQuery('UPDATE db.passwords SET password = ?, otp = 0 WHERE userId = ?', [hashedNewPassword, userId]);
            return
        } else {
            throw new Error('The passwords do not match');
        }
    }
}