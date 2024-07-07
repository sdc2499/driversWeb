import { sendEmail } from './mailer.js';
import { createRatingEmailContent, generateToken, createPasswordResetEmailContent } from './emailTemplates.js';

export const sendRatingEmail = async (userEmail, obj) => {
    const data = { costumerId: obj.costumerId, driverId: obj.driverId, rideId: obj.rideId };
    const token = generateToken(data);
    const htmlContent = createRatingEmailContent(token);

    await sendEmail({
        to: userEmail,
        subject: 'דרג את הנהג שלך',
        htmlContent,
    });
};

export const sendPasswordResetEmail = async (userEmail, otp) => {
    const htmlContent = createPasswordResetEmailContent(otp);

    await sendEmail({
        to: userEmail,
        subject: 'שחזור סיסמה - סיסמה חד פעמית',
        htmlContent,
    });
};
