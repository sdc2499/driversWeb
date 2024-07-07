import jwt from 'jsonwebtoken';

export const generateToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const createRatingEmailContent = (token) => `
    <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f9f9f9; padding: 20px;">
        <div style="text-align: center; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin-left: 20%;">
            <h1 style="font-size: 24px; color: #333;">תודה שבחרתם בנו!</h1>
            <p style="font-size: 18px; color: #666;">
                אנחנו שמחים שהייתם איתנו בנסיעה זו ומקווים שהחוויה הייתה נעימה ובטוחה.
            </p>
            <p style="font-size: 18px; color: #666;">
                חשוב לנו לשפר את השירות שלנו כל הזמן, ולשם כך נשמח לקבל את דעתכם על הנהג שלכם.
            </p>
            <p style="font-size: 18px; color: #666;">
                אנא הקדישו מספר רגעים לדרג את הנהג שלכם על ידי לחיצה על הקישור הבא:
            </p>
            <a href="http://localhost:5173/rating/${token}" style="font-size: 20px; color: red; display: inline-block; margin-top: 10px;">
                 לדרוג לחצו כאן 👈🏼
            </a>
            <p style="font-size: 18px; color: #666; margin-top: 20px;">
                תודה רבה על שיתוף הפעולה!
            </p>
            <p style="font-size: 18px; color: #666;">
                בברכה,<br>
                צוות השירות
            </p>
            <img src="cid:logo" alt="לוגו" style="max-width: 200px; height: auto; margin-top: 20px;" />
        </div>
    </div>
`;

export const createPasswordResetEmailContent = (otp) => `
    <div style="font-family: Arial, sans-serif; text-align: center; font-size: 17px;">
        <h2 style="color: #4CAF50;">שחזור סיסמה</h2>
        <p>,שלום</p>
        <p>:קיבלת סיסמה חד פעמית לשחזור הסיסמה שלך באתר שלנו</p>
        <p style="font-size: 35px; font-weight: bold; color: #333;">${otp}</p>
        <p>.אנא השתמש בסיסמה זו כדי להיכנס לחשבונך ולהגדיר סיסמה חדשה</p>
        <p>,בברכה</p>
        <p>צוות התמיכה</p>
        <p style="font-size: 14px; color: #888;">אם לא ביקשת לשחזור את הסיסמה שלך, אנא התעלם מהודעה זו.</p>
        <img src="cid:logo" alt="לוגו" style="max-width: 200px; height: auto; margin-top: 20px;" />
    </div>
`;
