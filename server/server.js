import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { sendRatingEmail } from './mailer.js';

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

let pendingRequests = [];

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('newRideRequest', (request) => {
    console.log('New ride request received:', request);
    pendingRequests.push({ ...request, socketId: socket.id });
    io.emit('rideRequestForSecretary', request);
  });

  socket.on('priceUpdated', (updatedRequest) => {
    console.log('Price updated:', updatedRequest);
    pendingRequests = pendingRequests.map(req =>
      req.id === updatedRequest.id ? { ...req, price: updatedRequest.price } : req
    );
    io.emit('rideRequestForDrivers', updatedRequest);
  });

  socket.on('driverAccepted', (requestId) => {
    console.log('Driver accepted request:', requestId.request);
    const request = pendingRequests.find(req => req.id === requestId.request);
    if (request) {
      io.to(request.socketId).emit('driverFound', { driverId: socket.id });
      io.emit('rideRequestClosed', requestId.request);
      pendingRequests = pendingRequests.filter(req => req.id !== requestId.request);

      sendRatingEmail('l0583251093@gmail.com', requestId.driverId);
    }
  });



  socket.on('requestChat', (data) => {
    // Broadcast the chat request to the secretary
    io.emit('chatRequestForSecretary', data);
  });

  socket.on('respondToChatRequest', (data) => {
    // Send the response back to the customer
    io.to(data.customerSocketId).emit('chatRequestResponse', data);
  });

  socket.on('sendMessage', (message) => {
    // Broadcast the message to the recipient
    io.to(message.recipientId).emit('receiveMessage', message);
    // Optionally send the message back to the sender (if needed for local state)
    socket.emit('receiveMessage', message);
  });
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    // ניהול התנתקות: כאן ניתן להוסיף פעולות כגון מחיקת המשתמש מרשימות פעילות ועוד.
  });
});
server.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
});




