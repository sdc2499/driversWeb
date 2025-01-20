import express from 'express';
import {sendEmail} from '../email/mailer.js'; 

const emailRouter = express.Router();

emailRouter.post('/sendEmail', async (req, res) => {
    const { name, phone, message } = req.body;

    if (!name || !phone || !message) {
        return res.status(400).json({ error: 'יש למלא את כל השדות.' });
    }

    const htmlContent = `
        <div dir="rtl" style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; text-align: right;">
            <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); max-width: 600px; margin: auto;">
                <h1 style="color: #333; font-size: 24px; text-align: center;">פנייה חדשה מלקוח</h1>
                <p style="color: #666; font-size: 18px; line-height: 1.6;">יש לך הודעה חדשה מלקוח זמינלי.</p>
                <p style="color: #666; font-size: 18px; line-height: 1.6;"><strong>שם הפונה:</strong> ${name}</p>
                <p style="color: #666; font-size: 18px; line-height: 1.6;"><strong>טלפון:</strong> ${phone}</p>
                <p style="color: #666; font-size: 18px; line-height: 1.6;"><strong>הודעה:</strong></p>
                <p style="background-color: #f1f1f1; padding: 15px; border-radius: 5px; color: #333; font-size: 18px; line-height: 1.6;">
                    ${message}
                </p>
                <p style="color: #666; font-size: 16px; text-align: center; margin-top: 20px;">צוות האתר</p>
            </div>
        </div>
    `;

    try {
        await sendEmail({
            to: process.env.EMAIL, 
            subject: 'פנייה חדשה מלקוח',
            htmlContent,
        });
        res.status(200).json({ message: 'המייל נשלח בהצלחה!' });
    } catch (error) {
        console.error('Error sending contact email:', error);
        res.status(500).json({ error: 'שגיאה בשליחת המייל.' });
    }
});

export default emailRouter;
