import { QueryItem } from "./queryItem.js";
import { executeQuery } from "./executeQuery.js";
import { sendPasswordResetEmail } from '../email/emailService.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sha256 } from 'js-sha256';

const generateOTP = () => {
    return crypto.randomBytes(3).toString('hex');
};

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
            await sendPasswordResetEmail(result[0].email, otp);
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