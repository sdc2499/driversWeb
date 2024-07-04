import { QueryItem } from "./queryItem.js";
import { query } from "./query.js";
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import crypto from 'crypto';



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
        const result = await query("SELECT email,id FROM db.users where phone=?;", [phone]);
        console.log(result[0].id)
        let id = result[0].id
        console.log(id)

        try {
            const otp = generateOTP();
            const hashedOTP = await bcrypt.hash(otp, 10);
            console.log(hashedOTP)
            console.log(otp)
            await query('UPDATE db.passwords SET otp = ? WHERE userId = ?', [hashedOTP, result[0].id]);
            const mailOptions = {
                from: 'sdc2499@gmail.com',
                to: result[0].email,
                subject: 'סיסמה חד פעמית לשחזור סיסמה',
                text: `הסיסמה החד פעמית שלך היא:\n ${otp}`
            };
            await transporter.sendMail(mailOptions);
            return;
        } catch (error) {
            throw ("dfsf")
            return;
        }
    }

    async passwordUpdate() {
        const queryItem = new QueryItem();
        
        // let queryDriver = queryItem.upgradeToDriverQuery("?,".repeat(Object.keys(driverDetails).length + 2) + "?");
        // const result = await query(queryDriver, [id, id, ...Object.values(driverDetails), 0, 0]);
        return;
    }

}


// const express = require('express');
// const router = express.Router();
// const nodemailer = require('nodemailer');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');
// const db = require('./db'); // כאן הוסף את חיבור ה-DB שלך

// // פונקציה ליצירת סיסמה חד פעמית
// const generateOTP = () => {
//     return crypto.randomBytes(4).toString('hex');
// };

// // הגדרת nodemailer
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'youremail@gmail.com', // החלף באימייל שלך
//         pass: 'yourpassword' // החלף בסיסמא שלך
//     }
// });

// // מסלול לשליחת סיסמה חד פעמית למייל
// router.post('/send-temp-password', async (req, res) => {
//     const { phone } = req.body;

//     try {
//         // חפש את המשתמש לפי מספר הטלפון
//         const [user] = await db.query('SELECT * FROM users WHERE phone = ?', [phone]);
//         if (!user) {
//             return res.status(404).json({ message: 'המשתמש לא נמצא' });
//         }

//         // יצירת סיסמה חד פעמית והצפנתה
//         const otp = generateOTP();
//         const hashedOTP = await bcrypt.hash(otp, 10);

//         // עדכון טבלת המשתמשים עם הסיסמה החד פעמית
//         await db.query('UPDATE users SET otp = ? WHERE phone = ?', [hashedOTP, phone]);

//         // שליחת מייל עם הסיסמה החד פעמית
//         const mailOptions = {
//             from: 'youremail@gmail.com', // החלף באימייל שלך
//             to: user.email,
//             subject: 'סיסמה חד פעמית לשחזור סיסמה',
//             text: `הסיסמה החד פעמית שלך היא: ${otp}`
//         };

//         await transporter.sendMail(mailOptions);

//         res.status(200).json({ message: 'סיסמה זמנית נשלחה בהצלחה.' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'שגיאה בשליחת סיסמה זמנית.' });
//     }
// });

// module.exports = router;
