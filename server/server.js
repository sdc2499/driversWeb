import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { sendRatingEmail } from './mailer.js';
import 'dotenv/config';
import { query } from '../server/service/query.js'

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

async function updateRidePrice(updatedRequest) {
  const sql = 'UPDATE rides SET price = ?, status = ? WHERE id = ?';
  const values = [updatedRequest.price, 'price_updated', updatedRequest.id];
  const result = await query(sql, values)
  return
} 

async function driverAccepted(requestId) {
  const sql = 'UPDATE rides SET status = ?, driver_id = ? WHERE id = ?';
  const values = ['request_closed_with_driver', requestId.driverId, requestId.request];
  const result = await query(sql, values)

  return
}

async function newRideRequest(request) {
  let t;
  let tt;
  request.requestType === 'package' ? (t = "package_size", tt = request.packageSize) : (t = "passengers", tt = request.passengers)
  let sql = `INSERT INTO rides (price, customer_id, status, pickup_location, destination, ${t},isRated) VALUES ( ?, ?, ?, ?, ?, ?,?)`;
  let values = [
    null,
    request.customerId,
    'request_opened',
    request.from,
    request.to,
    tt,
    0
  ];
  const result = await query(sql, values)
  return result.insertId
}
io.on('connection', (socket) => {
  socket.on('newRideRequest', async (request) => {
    const result = await newRideRequest(request)
    request.id = result
    io.emit('rideRequestForSecretary', { ...request, socketId: socket.id });
  });

 
  socket.on('priceUpdated', async (updatedRequest) => {
    updateRidePrice(updatedRequest)
    io.emit('rideRequestForDrivers', updatedRequest);
  });

  socket.on('driverAccepted', async (requestId) => {
    driverAccepted(requestId)
    io.to(requestId.socketId).emit('driverFound', { driverId: requestId.driverId });
    console.log(requestId)
    console.log(requestId.request)
    io.emit('rideRequestClosed', requestId.request);
    sendRatingEmail('l0583251093@gmail.com', socket.id);
  });



  socket.on('requestChat', (data) => {
    io.emit('chatRequestForSecretary', data);
  });

  socket.on('respondToChatRequest', (data) => {
    io.to(data.customerSocketId).emit('chatRequestResponse', data);
  });

  socket.on('sendMessage', (message) => {
    io.to(message.recipientId).emit('receiveMessage', message);
    socket.emit('receiveMessage', message);
  });

});

server.listen(process.env.PORT, () => {
  console.log(`The server is running on port: ${process.env.PORT}`);
});