// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import app from './app.js';
// import { sendRatingEmail } from './mailer.js';

// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST']
//   }
// });

// let pendingRequests = [];

// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   socket.on('newRideRequest', (request) => {
//     console.log('New ride request received:', request);
//     console.log('socket.id:', socket.id);
//     pendingRequests.push({ ...request, socketId: socket.id });
//     io.emit('rideRequestForSecretary', request);
//   });

//   socket.on('priceUpdated', (updatedRequest) => {
//     console.log('Price updated:', updatedRequest);
//     pendingRequests = pendingRequests.map(req =>
//       req.id === updatedRequest.id ? { ...req, price: updatedRequest.price } : req
//     );
//     io.emit('rideRequestForDrivers', updatedRequest);
//   });

//   socket.on('driverAccepted', (requestId) => {
//     console.log('Driver accepted request:', requestId.request);
//     const request = pendingRequests.find(req => req.id === requestId.request);
//     if (request) {
//       console.log("request.socketId     "+request.socketId)
//       console.log("socket.id       "+socket.id)
//       io.to(request.socketId).emit('driverFound', { driverId: socket.id });
//       io.emit('rideRequestClosed', requestId.request);
//       pendingRequests = pendingRequests.filter(req => req.id !== requestId.request);

//       sendRatingEmail('l0583251093@gmail.com', requestId.driverId);
//     }
//   });



//   socket.on('requestChat', (data) => {
//     // Broadcast the chat request to the secretary
//     io.emit('chatRequestForSecretary', data);
//   });

//   socket.on('respondToChatRequest', (data) => {
//     // Send the response back to the customer
//     io.to(data.customerSocketId).emit('chatRequestResponse', data);
//   });

//   socket.on('sendMessage', (message) => {
//     // Broadcast the message to the recipient
//     io.to(message.recipientId).emit('receiveMessage', message);
//     // Optionally send the message back to the sender (if needed for local state)
//     socket.emit('receiveMessage', message);
//   });
//   socket.on('disconnect', () => {
//     console.log(`User disconnected: ${socket.id}`);
//     // ניהול התנתקות: כאן ניתן להוסיף פעולות כגון מחיקת המשתמש מרשימות פעילות ועוד.
//   });
// });
// server.listen(process.env.PORT, () => {
//   console.log(`Server listening on port: ${process.env.PORT}`);
// });










// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import app from './app.js';
// import mysql from 'mysql2'; // יבוא חבילת MySQL
// import { sendRatingEmail } from './mailer.js';

// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST']
//   }
// });

// // הגדרת התחברות למסד הנתונים של MySQL
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Leahsh1093',
//   database: 'db'
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   socket.on('newRideRequest', (request) => {
//     console.log('New ride request received:', request);

//     // הכנסת בקשת נסיעה חדשה למסד הנתונים של MySQL
//     const sql = 'INSERT INTO rides (request_details, status) VALUES (?, ?)';
//     const values = [JSON.stringify(request), 'pending'];

//     db.query(sql, values, (err, result) => {
//       if (err) {
//         console.error('Error inserting ride request into MySQL:', err);
//         return;
//       }
//       request.id = result.insertId; // השמת המזהה שנוצר לאובייקט הבקשה
//       io.emit('rideRequestForSecretary', request);
//     });
//   });

//   socket.on('priceUpdated', (updatedRequest) => {
//     console.log('Price updated:', updatedRequest);

//     // עדכון מחיר במסד הנתונים של MySQL
//     const sql = 'UPDATE rides SET price = ? WHERE id = ?';
//     const values = [updatedRequest.price, updatedRequest.id];

//     db.query(sql, values, (err, result) => {
//       if (err) {
//         console.error('Error updating price in MySQL:', err);
//         return;
//       }
//       io.emit('rideRequestForDrivers', updatedRequest);
//     });
//   });

//   socket.on('driverAccepted', (requestId) => {
//     console.log('Driver accepted request:', requestId.request);

//     // עדכון סטטוס ל-'completed' ושליחת אימייל
//     const sql = 'UPDATE rides SET status = ?, driver_id = ? WHERE id = ?';
//     const values = ['completed', socket.id, requestId.request];

//     db.query(sql, values, (err, result) => {
//       if (err) {
//         console.error('Error updating ride status in MySQL:', err);
//         return;
//       }
//       io.emit('rideRequestClosed', requestId.request);

//       // שליחת אימייל לדרכי דרך
//       sendRatingEmail('l0583251093@gmail.com', socket.id);
//     });
//   });

//   // טיפול באירועי סוקט נוספים...

// });

// server.listen(process.env.PORT, () => {
//   console.log(`Server listening on port: ${process.env.PORT}`);
// });













import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js'; // נניח שיש קובץ זה שמייצג את האפליקציה שלך
import mysql from 'mysql2'; // יבוא של חבילת MySQL
import { sendRatingEmail } from './mailer.js'; // נניח שיש פונקציה זו לשליחת אימיילים


// יצירת שרת HTTP והגדרת שרת ה-socket.io
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // ניתן לשנות לכתובת התואמת לסביבת הפיתוח שלך
    methods: ['GET', 'POST']
  }
});

// התחברות לבסיס הנתונים של MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Leahsh1093',
  database: 'db'
});



// התחברות לבסיס הנתונים
db.connect((err) => {
  if (err) {
    console.error('שגיאה בהתחברות ל-MYSQL:', err);
    return;
  }
  console.log('מחובר לבסיס הנתונים של MySQL');
});
  let i;
// אירוע ה-connection של socket.io - מבצע פעולות כאשר משתמש מתחבר
io.on('connection', (socket) => {
  console.log('משתמש מחובר:', socket.id);
  // אירוע לקבלת בקשת נסיעה חדשה
  // socket.on('newRideRequest', (request) => {
  //   console.log('קיבל בקשת נסיעה חדשה:', request);

  //   // שאילתת הכנסה לבסיס הנתונים של MySQL לשמירת הבקשה החדשה
  //   const sql = 'INSERT INTO rides (request_details, price, customer_id, status, pickup_location, destination, package_size, passengers) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  //   const values = [
  //     JSON.stringify(request),
  //     null,
  //     request.customerId,
  //     'request_opened',
  //     request.from,
  //     request.to,
  //     request.packageSize,
  //     request.passengers
  //   ];

  let pendingRequests = [];

  socket.on('newRideRequest', (request) => {
    console.log('קיבל בקשת נסיעה חדשה:', request);

    pendingRequests.push({ ...request, socketId: socket.id });
    i = socket.id
    let sql, values;
    console.log('i     ', i);
    // בדיקה אם הבקשה היא למשלוח חבילה או להסעת אנשים
    if (request.requestType === 'package') {
      // שאילתת הכנסה לבסיס הנתונים של MySQL לשמירת הבקשה למשלוח חבילה
      sql = 'INSERT INTO rides (request_details, price, customer_id, status, pickup_location, destination, package_size) VALUES (?, ?, ?, ?, ?, ?, ?)';
      values = [
        JSON.stringify(request),
        null,
        request.customerId,
        'request_opened',
        request.from,
        request.to,
        request.packageSize
      ];
    } else if (request.requestType === 'people') {
      // שאילתת הכנסה לבסיס הנתונים של MySQL לשמירת הבקשה להסעת אנשים
      sql = 'INSERT INTO rides (request_details, price, customer_id, status, pickup_location, destination, passengers) VALUES (?, ?, ?, ?, ?, ?, ?)';
      values = [
        JSON.stringify(request),
        null,
        request.customerId,
        'request_opened',
        request.from,
        request.to,
        request.passengers
      ];
    }

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('שגיאה בהכנסת בקשת נסיעה ל-MYSQL:', err);
        return;
      }
      request.id = result.insertId; // הוספת מזהה ייחודי שנוצר לבקשה לאובייקט הבקשה
      io.emit('rideRequestForSecretary', request); // שליחת אירוע לסקרטריה
    });
  });

  // אירוע לעדכון מחיר הנסיעה
  socket.on('priceUpdated', (updatedRequest) => {
    console.log('עודכן מחיר:', updatedRequest);

    // שאילתת עדכון בבסיס הנתונים של MySQL לעדכון המחיר
    const sql = 'UPDATE rides SET price = ?, status = ? WHERE id = ?';
    const values = [updatedRequest.price, 'price_updated', updatedRequest.id];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('שגיאה בעדכון מחיר ב-MYSQL:', err);
        return;
      }
      io.emit('rideRequestForDrivers', updatedRequest); // שליחת אירוע לנהגים
    });
  });

  // אירוע שהנהג אישר את הבקשה
  socket.on('driverAccepted', (requestId) => {
    console.log('הנהג אישר את הבקשה:', requestId.request);
    const sql = 'UPDATE rides SET status = ?, driver_id = ? WHERE id = ?';
    const values = ['request_closed_with_driver', socket.id, requestId.request];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('שגיאה בעדכון סטטוס הנסיעה ב-MYSQL:', err);
        return;
      }
      console.log("ii     "+i)
      io.to(i).emit('driverFound', { driverId: socket.id });
      io.emit('rideRequestClosed', requestId.request); // שליחת אירוע שהבקשה הושלמה
      sendRatingEmail('l0583251093@gmail.com', socket.id); // שליחת אימייל לדרכי דרך
    });
  });

  // אירוע לבקשת צ'אט חדשה לסקרטריה
  socket.on('requestChat', (data) => {
    io.emit('chatRequestForSecretary', data);
  });

  // אירוע למענה לבקשת צ'אט מהלקוח
  socket.on('respondToChatRequest', (data) => {
    io.to(data.customerSocketId).emit('chatRequestResponse', data);
  });

  // אירוע לשליחת הודעה חדשה
  socket.on('sendMessage', (message) => {
    io.to(message.recipientId).emit('receiveMessage', message); // שליחת הודעה לנמען
    socket.emit('receiveMessage', message); // אם נדרש, שליחת הודעה גם לשולח
  });

});

// הפעלת השרת על פורט שהוגדר בסביבת הפעולה
server.listen(process.env.PORT, () => {
  console.log(`השרת פועל על פורט: ${process.env.PORT}`);
});
