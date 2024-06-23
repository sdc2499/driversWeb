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
    console.log('Driver accepted request:', requestId);
    const request = pendingRequests.find(req => req.id === requestId);
    if (request) {
      io.to(request.socketId).emit('driverFound', { driverId: socket.id });
      io.emit('rideRequestClosed', requestId);
      pendingRequests = pendingRequests.filter(req => req.id !== requestId);

      sendRatingEmail('rsorscher1@gmail.com', request.driverId);
    }
  });



  socket.on('requestChat', (data) => {
    console.log('🙃🙃🙃Chat request received from customer:', data);
    io.emit('chatRequestForSecretary', { ...data, socketId: socket.id });
  });

  socket.on('respondToChatRequest', (response) => {
    console.log('🙃🙃Chat request response received:', response);
    io.to(response.customerSocketId).emit('chatRequestResponse', response);
  });

  socket.on('sendMessage', (message) => {
    console.log('🙃Message received:', message);
    io.to(message.to).emit('receiveMessage', message);
  });



});
server.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
});




