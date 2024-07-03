import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js'; // נניח שיש קובץ זה שמייצג את האפליקציה שלך
import { sendRatingEmail } from './mailer.js'; // נניח שיש פונקציה זו לשליחת אימיילים
import 'dotenv/config';
import { query } from '../server/service/query.js'


const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {

  socket.on('newRideRequest', async (request) => {
    console.log('new ride request:', request);
    let sql, values;
    // בדיקה אם הבקשה היא למשלוח חבילה או להסעת אנשים
    if (request.requestType === 'package') {
      sql = 'INSERT INTO rides (price, customer_id, status, pickup_location, destination, package_size) VALUES ( ?, ?, ?, ?, ?, ?)';
      values = [
        null,
        request.customerId,
        'request_opened',
        request.from,
        request.to,
        request.packageSize
      ];
    } else if (request.requestType === 'people') {
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
    const result = await query(sql, values)
    request.id = result.insertId; // הוספת מזהה ייחודי שנוצר לבקשה לאובייקט הבקשה
    io.emit('rideRequestForSecretary', { ...request, socketId: socket.id }); // שליחת אירוע לסקרטריה
  });


  socket.on('priceUpdated', async (updatedRequest) => {
    console.log('price updated:', updatedRequest);
    const sql = 'UPDATE rides SET price = ?, status = ? WHERE id = ?';
    const values = [updatedRequest.price, 'price_updated', updatedRequest.id];
    const result = await query(sql, values)
    io.emit('rideRequestForDrivers', updatedRequest); // שליחת אירוע לנהגים
  });




  socket.on('driverAccepted', async (requestId) => {
    console.log('driver accepted:', requestId);
    const sql = 'UPDATE rides SET status = ?, driver_id = ? WHERE id = ?';
    const values = ['request_closed_with_driver', requestId.driverId, requestId.request];
    const result = await query(sql, values)
    io.to(requestId.socketId).emit('driverFound', { driverId: requestId.driverId });
    io.emit('rideRequestClosed', requestId.request);
    sendRatingEmail('l0583251093@gmail.com',socket.id);
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
