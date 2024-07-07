import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { sendRatingEmail } from './email/emailService.js';
import 'dotenv/config';
import { executeQuery } from '../server/service/executeQuery.js'
import { QueryItem } from "../server/service/queryItem.js";

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

async function updateRidePrice(updatedRequest) {
  const queryItem = new QueryItem();
  const updateQuery = queryItem.updateItemQuery("rides", "price = ?, status = ?");
  const values = [updatedRequest.price, 2, updatedRequest.id];
  const result = await executeQuery(updateQuery, values)
  return
}

async function driverAccepted(requestId) {
  const queryItem = new QueryItem();
  const updateQuery = queryItem.updateItemQuery("rides", "status = ?, driverId = ?");
  const values = [3, requestId.driverId, requestId.request];
  const result = await executeQuery(updateQuery, values)

  return
}

async function newRideRequest(request,socketId) {
  const queryItem = new QueryItem();
  let t;
  let tt;
  request.requestType === 'package' ? (t = "packageSize", tt = request.packageSize) : (t = "passengers", tt = request.passengers)
  const postQuery = queryItem.postItemQuery("rides", "?,?, ?, ?, ?, ?, ?,?,?,?", `(price, costumerId, status, pickupLocation, destination, ${t},isRated,date,time,socketId)`);
  let values = [
    null,
    request.costumerId,
    1,
    request.from,
    request.to,
    tt,
    0,
    request.date,
    request.time,
    socketId
  ];
  const result = await executeQuery(postQuery, values)

  return result.insertId
}

io.on('connection', (socket) => {
  socket.on('newRideRequest', async (request) => {
    const result = await newRideRequest(request,socket.id )
    request.id = result
    io.emit('rideRequestForSecretary', { ...request, socketId: socket.id });
  });


  socket.on('priceUpdated', async (updatedRequest) => {
    updateRidePrice(updatedRequest)
    io.emit('rideRequestForDrivers', updatedRequest);
  });

  socket.on('driverAccepted', async (request) => {
    console.log("hi driver")
    console.log(request.socketId)
    driverAccepted(request)
    io.to(request.socketId).emit('driverFound', { driverId: request.driverId });
    console.log(request)
    console.log(request.request)
    io.emit('rideRequestClosed', request.request);
    sendRatingEmail(request.costumerEmail, { costumerId: request.costumerId, driverId: request.driverId, rideId: request.request });
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