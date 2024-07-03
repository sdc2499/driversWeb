import { RideService } from '../service/rideService.js';
//נראה לי אנחנו לא משתמשות בכלום מפה 
export default class RideController {

async waitingForPrice(req, res, next){
    try {
        const rideService = new RideService();
        const result = await rideService.getWaitingForPrice();
        console.log(result+result[0])
        return res.status(200).json({ data: result, status: 200 });
    }
    catch (ex) {
        const err = {}
        err.statusCode = 500;
        err.message = ex.message;
        next(err)
    }
}

async waitingForDriver(req, res, next){
    try {
        const rideService = new RideService();
        const result = await rideService.getWaitingForDriver();
        console.log(result+result[0])
        return res.status(200).json({ data: result, status: 200 });
    }
    catch (ex) {
        const err = {}
        err.statusCode = 500;
        err.message = ex.message;
        next(err)
    }
}
//     async booking(req, res, next) {
//         const tripDetails = req.body.tripDetails;

//         const messageDetails = {
//             from: 'whatsapp:+972559550124', // מספר ה-WhatsApp שלך ב-Twilio
//             body: " קיבלנו בקשה לנסיעה.מחפשים נהגים זמינים.נא להמתין...",
//             to: 'whatsapp:+972587668574' // קוד הקבוצה ב-WhatsApp
//         };

//         client.messages.create(messageDetails)
//             .then((message) => {
//                 console.log('הודעה נשלחה בהצלחה: ', message.sid);
//                 setTimeout(() => {
//                     console.log('לא נמצא נהג לנסיעה');
//                     res.status(404).json({ error: 'לא נמצא נהג לנסיעה' });
//                 }, 3 * 60 * 1000);


//                 // הוספת פונקציה ששומעת להודעות חדשות מהנהג
//                 const client = new twilio.Client();
//                 client.on('message', (msg) => {
//                     console.log('הודעה מהנהג:', msg.body);
//                     // בדיקה האם הנהג אישר את הנסיעה
//                     if (msg.body === 'אישור') {
//                         clearTimeout(timeout);
//                         resolve('נהג אישר את הנסיעה');
//                     }
//                 })

//                 res.status(200).json({ message: 'הודעה נשלחה בהצלחה' });
//             })
//             .catch((error) => {
//                 console.error('שגיאה בשליחת הודעה: ', error);
//                 res.status(500).json({ error: 'שגיאה בשליחת הודעה' });
//             });
//     }






// // // שליחת הודעה לנהגים בקבוצת WhatsApp
// // const sendTripNotification = (tripDetails) => {
// //     const messageDetails = {
// //         from: 'whatsapp:YOUR_TWILIO_WHATSAPP_NUMBER',
// //         body: קיבלנו בקשה לנסיעה. מחפשים נהגים זמינים. נא להמתין...,
// //         to: 'whatsapp://chat?code=YOUR_WHATSAPP_GROUP_CODE'
// //     };

// //     return client.messages.create(messageDetails);
// // };

// // // המתנה לתגובה מהנהג
// // const waitForDriverResponse = () => {
// //     return new Promise((resolve, reject) => {
// //         const timeout = setTimeout(() => {
// //             clearTimeout(timeout);
// //             reject({ status: 404, message: 'לא נמצא נהג לנסיעה' });
// //         }, 3 * 60 * 1000);

// //         const client = new twilio.Client();
// //         client.on('message', (msg) => {
// //             console.log('הודעה מהנהג:', msg.body);
// //             if (msg.body === 'אישור') {
// //                 clearTimeout(timeout);
// //                 resolve('נהג אישר את הנסיעה');
// //             }
// //         });
// //     });
// // };

// // // טיפול בתגובה מהנהג
// // const handleDriverResponse = (response) => {
// //     console.log(response);
// //     return { message: 'נהג אישר את הנסיעה' };
// // };

// // // טיפול בשגיאה
// // const handleError = (error) => {
// //     console.error('שגיאה בשליחת הודעה או בהמתנה לתגובה מהנהג: ', error);
// //     if (error.status) {
// //         return { error: error.message };
// //     } else {
// //         return { error: 'שגיאה בשליחת הודעה או בהמתנה לתגובה מהנהג' };
// //     }
// // };

// // // משתנה שמכיל את פונקציות הקונטרולר
// // const tripController = {
// //     sendTripNotification,
// //     waitForDriverResponse,
// //     handleDriverResponse,
// //     handleError
// // };

// // module.exports = tripController;



//     // async booking(req, res, next) {
//     //     try {
//     //         const rideService = new RideService();
//     //         await rideService.booking(req.body);
//     //         return res.status(200).json({ status: 200 });
//     //     } catch (ex) {
//     //         const err = {};
//     //         switch (ex.message) {
//     //             default:
//     //                 err.statusCode = 500;
//     //                 break;
//     //         }
//     //         err.message = ex.message;
//     //         next(err);
//     //     }
//     // }

}