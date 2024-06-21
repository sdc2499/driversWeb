import twilio from 'twilio';

const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';

const client = twilio(accountSid, authToken);

export const sendRatingWhatsApp = async (userPhoneNumber, driverId) => {
    try {
        await client.messages.create({
            body: `Thank you for your ride! Please rate your driver by clicking the link below: \nhttp://your-frontend-url.com/rate/${driverId}`,
            from: 'whatsapp:+14155238886', // מספר ה-WhatsApp שניתן לך על ידי Twilio
            to: `whatsapp:${userPhoneNumber}`
        });
        console.log('WhatsApp message sent');
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
    }
};

// ACb7ceb24ec262a0900657f2a7ed945de0
// 906eaa1f0a166a09525736e425668cd8
